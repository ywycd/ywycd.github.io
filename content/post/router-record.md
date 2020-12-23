---
title: "路由器刷机记录"
date: 2020-12-22T20:35:56+08:00
tags: ["enshan", "github","ddns"]
draft: false
---
最开始买的tp-link，宿舍上了斐迅0元购（辛酸泪），接触刷机[恩山](https://www.right.com.cn/forum/forum.php)和[拆机](https://www.acwifi.net/)。官改-breed刷高格-openwrt-Padavan养老。刷高格是为了多拨，实际未使用。高格改版（有纯净版加插件），插件添加失败，转到op阵营。op有一贴分享精简加插件，接触编译。杜绝隔段时间就刷机，换成老毛子。  

## 固件

恩山搜索型号，看有哪些固件可刷。目前有在使用op（插件丰富）、老毛子。[op插件](https://www.right.com.cn/forum/forum.php?mod=viewthread&tid=344825&extra=page%3D2%26filter%3Ddigest%26digest%3D1)结合[lede](https://github.com/coolsnowwolf/lede)说明编译，自建虚拟机科学或[action](https://p3terx.com/archives/build-openwrt-with-github-actions.html)，曾经出现过[gitpod](https://www.right.com.cn/forum/thread-1573038-1-1.html)。老毛子有[hanwckf](https://github.com/hanwckf/rt-n56u)、[chongshengB](https://github.com/chongshengB/Padavan-build)，感谢移植第一人荒野无灯，同样有[Action](https://github.com/muziling/Padavan-build)。换hanwckf源插件添加不了，上虚拟机编译，没追新。  

## 插件

科学，别人分享的实操失败，不得不提ssr+/clash好用，设备上基本都换成小猫咪。  
DNS污染，tracker无法访问，开始dns-forwarder有用。后续失效[修改版coredns](https://blog.minidump.info/2019/12/enhanced-coredns/)部署失败，换新域名解决。去广告，电脑用过adbyby，现在主要用uBlock Origin,订阅[halflife](https://gitee.com/halflife/list/raw/master/ad.txt)，局域网adghome。  
内网vpn。编译过老毛子里的vpn，只有softethervpn成功，还有其他方案。  

## DDNS

动态公网ip，ddns域名+端口实现外网访问，远程操作。op的ddns脚本在`Network→IP Addresses and Names`选取。选[哪家](https://v2ex.com/t/560093),目前使用noip,he.net,cf，noip需要每30天激活，he需要域名，注册免费域名推荐freenom。  
但cf限制.tk等免费域名使用api，无法ddns、acme.sh。Github上有好多优秀工具。老毛子自带inadyn出错，运行curl提示`(60) Cert verify failed`。借用某人脚本，加上-sk可行,cf的[curl](https://ignorance.nova.moe/ddns-with-cloudflare/)。wan重连运行脚本，不用隔5分钟测ip变化。老毛子添加脚本，**系统管理-配置管理-保存**，不然重启丢失。  

```shell
curl -sk -4 "https://dyn.example.com:password@dyn.dns.he.net/nic/update?hostname=dyn.example.com"					
curl -sk https://username:password@dynupdate.no-ip.com/nic/update?hostname=example.com

home_ip=$(curl ip.sb)
curl -sk -X PUT "https://api.cloudflare.com/client/v4/zones/<域名的 ZoneID>/dns_records/<Record 的 ZoneID>" \
     -H "Authorization: Bearer xxxxxxx" \
     -H "Content-Type: application/json" \
     --data '{"type":"A","name":"home.nova.moe","content":"'$home_ip'","ttl":120,"proxied":false}'

```

## 内网穿透

使用frp，主要小钢炮自带。[这家](https://www.ioiox.com/frp.html)，[自建服务器](https://www.iyuu.cn/archives/286/)教程。frp更新  

```bash
wget https://github.com/fatedier/frp/releases/download/v0.34.1/frp_0.34.1_linux_arm64.tar.gz
tar -zxvf frp_0.34.1_linux_arm64.tar.gz
```
**没事别恢复出厂设置，别恢复，别恢复**出厂后原来破解方法失效，拆机ttl有点麻烦。可找客服改桥接。10001按4快速报修，但人工简直智障，选宽带检测正常重启，然后就自动挂掉了！！！试了好几次，还是先找其他人。http://192.168.1.1/bridge_route.gch自助修改。














