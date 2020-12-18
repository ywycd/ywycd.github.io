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
