---
title: "Hetzner折腾"
date: 2020-09-21T13:22:39+08:00
tags: ["seedbox", "old"]
draft: false
---
注册，依靠翻译、fq完成。购买需要身份验证，等他们上班。11点发验证身份，lj英语编了下。2点还没回复，睡了一觉。  

5点醒来，看邮箱，发现被拒，账号被删。不信邪，换邮箱重新注册，找了下验证模板。被现实打击，回复很快，但还是被删。找金毛大佬代购，170/月。后面还越涨越高。

 1.Hetzner 独服一键安装系统（软 RAID0）
 
注意：这个方法只适用于软 RAID（不支持硬 RAID）、多硬盘且所有硬盘大小相同的 Hetzner 独立服务器。
SSH 连接服务，输入
```shell
echo x | installimage -p /boot:ext3:1G,/:ext4:all -l 0 -r yes -i images/Ubuntu-1804-bionic-64-minimal.tar.gz -a -n Hz && reboot
```
[硬RAID0](https://npchk.info/hetzner-raid0/) 安装 Ubuntu 18.04。

 2.盒子软件安装
 
一般的刷子完全可以仅依赖[星大脚本](https://github.com/Aniverse/inexistence  ) ,此时还可以大喊 [efs](https://github.com/amefs/quickbox-lite ) 牛逼！ 

手动安装 `bash <(wget --no-check-certificate -qO- https://github.com/Aniverse/inexistence/raw/master/inexistence.sh)`

用户名asdw,qB、De、rT、FlexGet等。 [自动删种](https://github.com/jerrymakesjelly/autoremove-torrents) 和 [Flexget示例](https://github.com/Aniverse/WiKi/blob/master/Flexget.md)

