---
title: "自动签到"
date: 2021-01-09T15:30:25+08:00
tags: ["github", "qiandao"]
draft: false
---
开始会打开各app、网站，后面停了就懒得继续，手动太累。签到升级，获得更多的权限。简单介绍下相关工具。

## qiandao

17年注册，中间邮箱一直提示签到失败，全停。后面发现可以自己添加网站签到，重新使用。有的模板已经无法使用。可能chrome版本问题，现在用cookies获取工具（已运行）老是一串代码，无法删除。只能修改变量，手动填写。

官方 [github](https://github.com/binux/qiandao)[blog](https://binux.blog/2014/09/introduction-to-qiandao-today/)                             [地址](https://qiandao.today/) [备用](https://qiandao.binux.me/)  
分支: https://github.com/AragonSnow/qiandao 还在更新  
[制作签到模板](https://github.com/binux/qiandao/blob/master/docs/har-howto.md)  进行签到，保存har文件，上传网站，编辑测试。保存后新建签到，可选时间间隔。某网站已经维护三次，更了解一点（技术小白言）。 可以自行docker搭建。  
[QianDao.today签到平台高级使用不完全手册](https://www.quchao.net/QianDaoEXP.html)  
获取cookies，万能F12。或者用[Get Cookie For FPlus](https://www.crx4chrome.com/extensions/embffhododclmgpnabmjmgoekpnoboic/)插件。  
感谢[discuz 点击签到模板视频](https://www.youtube.com/watch?v=Sj_YkhSEtk4) ，学到了formhash和日志输出。   

## 贴吧云签到

源码[github](https://github.com/MoeNetwork/Tieba-Cloud-Sign)  [网友搭建](https://www.tieba.ga/index.php?mod=login) 运行好多年。中间网站打不开，搜索到action[签到贴吧](https://github.com/ghosx/tieba)。  

## 哔哩哔哩签到

之前挂在qiandao，发现漫画也有[签到](https://github.com/srcrs/BilibiliTask)。有漫画兑换需求，[这个](https://github.com/happy888888/BiliExp)功能更多，但定时老是晚几十分钟。手动抢了几次，能不能抢到靠运气。其他下载功能好用。Secrets变量用EditThisCookie。  

## 魂签到

官方[GitHub](https://github.com/inu1255/soulsign-chrome)，一个chrome的插件，可以自动签到，每天只要打开浏览器就可以自动签到，不用填写账号密码，不用手动抓取cookie，只需要 添加脚本+登录账号。[脚本发布站点](https://soulsign.inu1255.cn/)。[该网站](https://www.heji.ltd/405.html#)介绍。  

## 其他

单网站，搜索网站+签到，看有没有前人造轮子。
