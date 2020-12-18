---
title: "Terminal Fail"
date: 2020-11-05T12:08:19+08:00
draft: false
---
  折腾terminal主题失败，netlify显示不全。但灯大也是netlify部署的。
  
  学习了alias和screen命令。
  
  alias配置文件在~/.bashrc。`source .bashrc`配置生效
  
  `screen -R name` Ctrl+A+D后台运行。输入`screen -R name`可再进入。
   
   更新并推送博客
```
cd blog
git add .
git commit -m "update post"
git push origin master
```
    
 `screen -ls`列出所有screen任务。`screen -X -S [session # number] quit`结束特定任务。

 `screen -wipe`清除任务（dead）。
 
 
 [Hugo 从入门到会用](https://blog.olowolo.com/post/hugo-quick-start/) 提到添加`hasCJKLanguage = true`，试了下终于有摘要！！继续折腾灯大修改版Terminal。**根目录下模板优先级总是高于 /themes/同名模板** 所以复制到博客目录进行修改。
 
 修改archive格式，list.html里`.archive__post h3.archive__post-title `加`margin-right: 370px`。增加tagcloud，照content/archive.md内容新建tagcloud.md，菜单老是显示showmore。layouts/partials/menu.html开始总是失败，看到下面mobile留一个就行。
 
 然后部署到xx.github.io。中间没仔细看教程走弯路，部署完英文有点不一样。