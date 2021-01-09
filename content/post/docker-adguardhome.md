---
title: "Docker adguardhome记录"
date: 2020-03-13T17:44:32+08:00
tags: ["docker","old"]
draft: false
---
## 安装
```docker
    docker pull adguard/adguardhome:arm64-latest
```
### 桥接macnet
```docker
    ip link set eth0 promisc on
    docker network create -d macvlan --subnet=192.168.2.0/24 --gateway=192.168.2.1 -o parent=eth0 macnet 
```
启动
```docker
    docker run --name adguardhome -v /root/AdguardHome/workdir:/opt/adguardhome/work -v /root/AdguardHome/confdir:/opt/adguardhome/conf -d --network macnet --ip 192.168.2.143 --restart always adguard/adguardhome:arm64-latest 
```
主路由设置lan口网关、dns，有统计，但xx上网速度不行
### host模式

删除旧容器、设置
```docker
    docker stop adguardhome
    docker rm adguardhome
    rm -rf /root/AdguardHome/confdir/*
    rm -rf /root/AdguardHome/workdir/*
```
启动
```docker
    docker run --name adguardhome \
            -v /root/AdguardHome/workdir:/opt/adguardhome/work \
            -v /root/AdguardHome/confdir:/opt/adguardhome/conf \
            --restart always \
            --net host \
            -d adguard/adguardhome:arm64-latest
```
端口改成1080、1053,指定网关不行。老毛子设置转发(分开填入），统计里只有路由器一个客户端 
```shell
all-servers
server=192.168.1.144#1053 #AdGuardHome
```
[这个](https://www.right.com.cn/forum/forum.php?mod=viewthread&tid=2635946&extra=page%3D2%26filter%3Dtypeid%26typeid%3D21&page=1) 提示后只修改80端口,修改dns成功。但必须添加防火墙规则才能上网。
` iptables -t nat -I POSTROUTING -o eth0 -j MASQUERADE`

小钢炮开启enware,安装cutter、iptables,加规则无门时发现有个iptables-save命令。运行重启路由、小钢炮，可以正常上网，ok。

双开adg再试

## 设置

### 上游dns
```html
1.2.4.8
223.5.5.5
119.29.29.29
114.114.114.114
https://dns.rubyfish.cn/dns-query
tls://dns.google
tls://1.1.1.1
```
勾选 同时查询。Bootstrap DNS 服务器 `114.114.114.114:53`，测试上游后应用

### 规则
```html
https://hosts.nfz.moe/full/hosts
https://gitee.com/banbendalao/adguard/raw/master/ADgk.txt
https://gitee.com/privacy-protection-tools/anti-ad/raw/master/easylist.txt
```
修改AdGuardHome.yaml里的
```yml
  blocked_response_ttl: 60
  ratelimit: 0
 ```
重启容器
##  忘记密码
[wiki](https://github.com/AdguardTeam/AdGuardHome/wiki/Configuration#password-reset) 安装Apache2，自带htpasswd。用termux
使用htpasswd生成加密密码，linux用下面命令。输出结果是`<USERNAME>:<HASH>`

   ` htpasswd -B -n -b <USERNAME> <PASSWORD>`
编辑AdGuardHome.yaml，替换相应内容。
```yml
     users:
     - name: ...
     password: <HASH>
```
开始使用`<USERNAME> <PASSWORD>`，发现登陆不上。termux用<>错误，改成[]生成。window提示语法错误。
注意到`password: <HASH>`，灵感一来不加括号，登陆成功。<>应该是提示可修改。

