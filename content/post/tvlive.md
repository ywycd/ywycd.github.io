---
title: "电视直播"
date: 2024-02-12T11:29:46Z
tags: ["enshan", "live"]
draft: false
---
去年广电整改，直播软件纷纷失效，好处是盒子能直接进直播。

最开始信号线连电视看，某次升级换成网络盒子连网线插卡使用。某天盒子坏看不了，问客服说要自费才能上门更换。当时N1刷机安软件，两个遥控器不太方便后面买刷过的魔百盒（商家随机发的CM311-3），没赶上魔百盒最便宜的时段。905l3a芯片性能更好。直播ipv6源、php代理、dtmb地波购买天线等方法。手机卡v6，但光猫设置v4/v6桥接无v6地址放弃。

## php服务器

手机ksweb搭建方便，工具phpMyAdmin安装MySQL数据库。另外下载[php](https://www.right.com.cn/forum/thread-8315423-1-1.html)放htdocs文件夹。测试几天v6源和php代理陆续失效。播放器差不多，重要的是源。之前下过个人维护源的软件已失效。Kodi加载慢会卡，国内用过有个自己跳购物广告台，有的后台自动下载另一软件弹安装界面。考虑操作和加载速度，留tivimate和dyip影音。win直接下载大神的压缩包或者phpstudy。

小钢炮NDM上配置费了好久，各种尝试均失败。照大卫教程搭建php-fpm和nginx环境，下载文件解压，设置/var/www目录权限，`chown -R www-data:www-data /var/www`权限755 `chmod 755 file`。命令运行相应程序，首页显示php信息，访问其他php文件失效提示`WARNING: [pool www] child 6 said into stderr: "ERROR: Unable to open primary script`。搜索问题更改nginx配置文件，权限问题nginx改为www-data，运行提示`nginx: [emerg] "user" directive is not allowed`发现放错目录，不应该在conf.d。 nginx.conf会引入/etc/nginx/conf.d/目录下的*.conf文件，单独nginx.conf是在/etc/nginx/目录下，冲突的问题。另外修改php.ini的`cgi.fix_pathinfo = 0 `。访问被禁看日志显示权限，文件600用户、组root，更改用户、组www-data或者644权限。**网页文件夹755，文件644**。终于能看php代理，转换docker-compose配置运行方便。docker-compose升级`curl -L "https://mirror.ghproxy.com/https://github.com/docker/compose/releases/download/v2.17.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/bin/docker-compose`/usr/bin目录下更改权限，`docker-compose version`。编写自用源上传仓库。有的文件php5.6格式错误，升级7.4。

## 电信IPTV

听说电信组播光猫iptv、组播vlan、igmp开启就能看。曾经有盒子当时没工具没抓包，还好恩山有人分享组播源。光猫桥接路由拨号，老毛子开启iptv组播转内网，pot播不了rtp://。连内网无法访问1.1，`iptables -t nat -A POSTROUTING -o eth3 -d 192.168.1.0/24 -j SNAT --to-source 192.168.1.78`，eth3为MAN的接口，1.78 MAN ip。临时生效，若想永久生效，添加到“在 WAN 上行/下行启动后执行”脚本。设了stb隔离vlan过滤直接没网。路由显示等待ppp连接，电脑连光猫拨号无v6，iptv路由wan要填盒子信息，没填一直connecting。上网和iptv不绑定端口，光猫华为界面 高级配置-路由-IPV4 VLAN绑定配置，LAN1 vlan绑定`41/41,43/43`。光猫lan1连路由wan口，vlan过滤对应填上，stb隔离看有无盒子连。选zeroconf和静态ip都可，静态ip不同网段。网线和wifi可播放，内网udpxy改对应格式可播放，status有客户端。浙江上网41，IPTV43，组播vlan4000。弄完老毛子单线复用，ifconfig发现MAN口变成eth3.41。好像只vlan绑定/过滤43就行。[iptv抓包](https://github.com/luckyyyyy/blog/issues/44)认证后可获取10.x内网，单播rtsp://。

## 源

[恩山](https://www.right.com.cn/forum/forum-182-1.html)和[安歌](https://angtv.cc/) [自动更新源](https://m3u.ibert.me/) [静态源搜索](http://tonkiang.us/) [v4v6源](https://www.cnblogs.com/xxy002/p/17858312.html) [fanmingming台标|egp|v6](https://live.fanmingming.com/) [fmmv6](https://live.fanmingming.com/tv/m3u/ipv6.m3u)

m3u txt格式转换 [黑鸟](https://guihet.com/convert-m3u-js.html) [112114](https://epg.112114.eu.org/cjtrans) [fmmtxt2mu3](https://live.fanmingming.com/txt2m3u/ )

在线m3u转txt https://fanmingming.com/txt?url=   https://angtv.cc/tool/m3ulist.php?url=

[数组转换频道列表工具](https://angtv.cc/tool/szzlist.php)

## 参考文章

[自建DIYP影音和TVBOX的接口PHP服务](https://www.right.com.cn/forum/thread-8315423-1-1.html)

[灯大小钢炮docker五步搭建php-fpm和nginx环境（官方镜像）](https://www.iyuu.cn/archives/129/)

[nginx 启用php解析及解决无法访问报错Primary script unknown的过程](https://www.cnblogs.com/menghome/p/11106648.html)

[从外部访问光猫除了威屁恩,和单臂路由还有没有别的方法](https://www.right.com.cn/forum/thread-464371-1-1.html)
