---
title: "Tailscale内网穿透"
date: 2024-04-16T15:05:32Z
tags: ["tailsacle", "headscale"]
draft: false
---
最初看到讨论连接内网最好有几种方案，免得失联干着急。异地办理移动宽带公网v6想外网访问，搜索发现tailscale，更为易用、功能更完善的 WireGuard。

## 配置

[官网](https://tailscale.com/) 客户端`tailscale up`验证登录第三方，最好选直连方便点。

### Linux

[官方静态二进制文件](https://pkgs.tailscale.com/stable/#static)  [安装](https://tailscale.com/download/linux)

```sh
wget https://pkgs.tailscale.com/stable/tailscale_1.38.2_arm64.tgz
tar zxvf tailscale_1.38.2_arm64.tgz
cp tailscale_1.38.2_arm64/tailscaled /usr/sbin/tailscaled
cp tailscale_1.38.2_arm64/tailscale /usr/bin/tailscale
cp tailscale_1.38.2_arm64/systemd/tailscaled.service /lib/systemd/system/tailscaled.service
cp tailscale_1.38.2_arm64/systemd/tailscaled.defaults /etc/default/tailscaled
```

启动 tailscaled.service 并设置开机自启

```sh
systemctl enable --now tailscaled
```

hiboy的[老毛子插件](https://opt.cn2qq.com/opt-script/) [wireguard-go](https://gcore.jsdelivr.net/gh/HiboyHiboy/opt-file/wireguard-go) [tailscale](https://gcore.jsdelivr.net/gh/HiboyHiboy/opt-file/tailscale)。hanwckf版尝试失败懒得刷机，N1小钢炮entware安装wireguard缺少依赖。wireguard安装和使用比较苛刻，内核要求高，应该源码编译能成功。docker wireguard几年前的镜像。下载tgz解压进文件夹运行`./tailscale up`验证，日志提示upnp。

### Android

play或F-Droid下载客户端，1.30.0 版本开始支持自定义服务器。重复点开关闭右上角的“三个点“会出现 `Change server` 选项。

### Windows

安装。headscale自建打开`https://<HEADSCALE>/windows`注册表或命令行，目录命令行才可以。

## 局域网

目前只是点对点互通。打通局域网，内网一台设备安装tailscale转发后，也可访问其他。

### 设置路由转发

```sh
echo 'net.ipv4.ip_forward = 1' | tee /etc/sysctl.d/ipforwarding.conf
echo 'net.ipv6.conf.all.forwarding = 1' | tee -a /etc/sysctl.d/ipforwarding.conf
sysctl -p /etc/sysctl.d/ipforwarding.conf
```

客户端运行，自行修改子网，多条路由用 `,` 隔开

```sh
tailscale up --accept-routes=true --accept-dns=false --advertise-routes=192.168.2.0/24 --reset
```

其他节点启动时需要增加 `--accept-routes=true`。

[登录控制台](https://login.tailscale.com/admin/machines)对应设备点击右边三点，选`Edit route settings`勾选路由save。`Exit node`出口节点指所有流量经过设备。`Disabled key expiry` 长期连接可选，不然6个月需重新验证。

### NDM自启

[老毛子安装tailscale](https://www.right.com.cn/forum/thread-8279487-1-1.html)下载脚本，路由器空间和cpu问题打算放N1。出错修改内容，不像debian复制就行。打通不成功走中继，重启可直连。开机启动`null::sysinit:/bin/sh /root/tailscale.sh start` 添加到 `/etc/inittab` 最后。entware是`null::sysinit:/bin/sh /opt/etc/init.d/rc.unslung start`。

```sh
#!/bin/sh
tailscale="/root/tailscale/tailscale"
tailscaled="/root/tailscale/tailscaled"
[ -f "/root/tailscale/tailscale" ] && tailscale="/root/tailscale/tailscale"
[ -f "/root/tailscale/tailscaled" ] && tailscaled="/root/tailscale/tailscaled"
tag=$(curl -k --silent "https://api.github.com/repos/lmq8267/tailscale/releases/latest" | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/')
[ -z "$tag" ] && tag="$( curl -k -L --connect-timeout 20 --silent https://api.github.com/repos/lmq8267/tailscale/releases/latest | grep 'tag_name' | cut -d\" -f4 )"

tailscale_start () {
     [ -f $tailscale ] && chmod 777 $tailscale
     [ -f $tailscaled ] && chmod 777 $tailscaled
     taiver=$($tailscaled -version | sed -n '1p')
     echo "$tag"
     echo "$taiver"
     $tailscaled --cleanup
     killall tailscaled tailscale
     killall -9 tailscaled tailscale
     su_cmd2="$tailscaled --state=/var/lib/tailscale/tailscaled.state --socket=/var/run/tailscale/tailscaled.sock"
     eval "$su_cmd2" &
     sleep 5
     iptables -C INPUT -i tailscale0 -j ACCEPT
     if [ "$?" != 0 ] ; then
       iptables -A INPUT -i tailscale0 -j ACCEPT
     fi
     taiarp=$(ifconfig tailscale0 | grep NOARP | awk '{print }')
     [ -n "$taiarp" ] && ifconfig tailscale0 arp && echo "【Tailscale】" "检测到接口已禁用arp地址解析协议,正在开启arp!"
     su_cmd="$tailscale up --accept-routes=true --accept-dns=false --advertise-routes=192.168.2.0/24  --reset"
     echo "【Tailscale】" "启用子网路由"
     eval "$su_cmd" &
     sleep 30
     taip=`$tailscale ip`
     echo "【Tailscale】" "tailscale_IP:$taip"
     exit 0
}  

tailscale_restart () {
  echo "【Tailscale】" "重新启动"
  tailscale_start
  
}

tailscale_close () {
  iptables -D INPUT -i tailscale0 -j ACCEPT
  $tailscaled --cleanup
  killall tailscaled tailscale
  killall -9 tailscaled tailscale
  sleep 8
  [ -z "`pidof tailscaled`" ] && [ -z "`pidof tailscale`" ] && echo "【Tailscale】" "tailscale已关闭!"
}

case $1 in
start)
	tailscale_start
	;;
restart)
	tailscale_restart
	;;
stop)
	tailscale_close
	;;
esac
```

常用命令

查看ip`tailscale ip -4` 网络状况`tailscale status`

测试连接

```sh
tailscale ping <hostname-or-ip>
```

设备状况

```sh
tailscale status
```

## 开源版headscale

自定义网段无限设备。折腾很久终于成功运行加webui，再看到[docker安装headscale+headscale-webui](https://github.com/iFargle/headscale-webui/issues/79)回复，[Docker安装headscale内网穿透服务](http://www.putianhui.cn/posts/2ac21da921f0/)。

## 免费套餐

现在用户3设备100 ，`No more limits on subnet routers` [price-3](https://tailscale.com/blog/pricing-v3)。当时用户1设备20路由1 [price-2](https://tailscale.com/blog/2021-06-new-pricing)。

## Reference

[Tailscale 基础教程：Headscale 的部署方法和使用教程](https://icloudnative.io/posts/how-to-set-up-or-migrate-headscale/)

[padavan安装tailscale脚本和自建中继服务器derper](https://www.right.com.cn/forum/thread-8279487-1-1.html)

[Tailscale CLI](https://tailscale.com/kb/1080/cli)

[Tailscale 放鬆免費版的使用限制，以及商業版的計算方式](https://blog.gslin.org/archives/2023/04/19/11148/tailscale-%E6%94%BE%E9%AC%86%E5%85%8D%E8%B2%BB%E7%89%88%E7%9A%84%E4%BD%BF%E7%94%A8%E9%99%90%E5%88%B6%EF%BC%8C%E4%BB%A5%E5%8F%8A%E5%95%86%E6%A5%AD%E7%89%88%E7%9A%84%E8%A8%88%E7%AE%97%E6%96%B9%E5%BC%8F/)
