---
title: "记录docker运行容器"
tags: ["docker","enshan","github"]
date: 2020-11-16T06:21:11+08:00
draft: false
---
  docker各平台都有，转移方便。使用时注意选对应平台。不用时可删除。
  
  - portainer（网页管理）、nginx
  - 80x86/typecho 
  安装使用方便，自带主题、插件够用。
  - adguardhome
  广告屏蔽。目前是安在旁路由上，主路由DNS指向旁路由。
  - openwrt
  旁路由有些功能受限。跑op是为了科学，装插件等。Github上有工具自动编译，本地和网上都尝试过。
  - clash
  当时嫌弃openclash不稳定，修改配置就失效。东拼西凑写好配置，运行成功。目前主要浏览器插件使用。新版配置文件要改，没升级。`subconverter`订阅转换。
  - PT
  灯大修改版qb、filebrowser,IYUU,flexget etc
  - enshan
  [大佬](https://www.right.com.cn/forum/thread-911375-1-1.html)移植到N1的镜像。sshd ssh跳板。freenom 域名续期。chfs 网盘支持webdav。添加用户`docker exec chfs addusr 用户名 密码 权限`
  - noip
  [自动续期](https://github.com/simao-silva/noip-renewer)之前有另一个大佬的方案，但搬不到arm64，试过alpine，放弃。开始家里机器显示finished，但没续期。后来上vps提示host xx confirmed。加了定时任务、docker代理，看后续是否续期。
  
  TBC....
