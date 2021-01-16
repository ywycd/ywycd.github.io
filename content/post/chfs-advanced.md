---
title: "Chfs设置"
date: 2021-01-16T17:14:23+08:00
draft: false
---
chfs文件共享服务器

自建网盘支持webdav，NextCloud功能太多。从[N1 docker 镜像分享](https://www.right.com.cn/forum/thread-911375-1-1.html)找到了chfs。`docker exec chfs addusr 用户名 密码 权限`添加账户，网页提示更新。[官网](http://iscute.cn/chfs)  
有分享文件需求，看了下其他[zfile](https://github.com/zhaojun1998/zfile) [h5ai](https://larsjung.de/h5ai/)。先升级chfs，有[docker镜像](https://hub.docker.com/r/jonnyan404/chfs)。根据介绍运行，不过不理想。配置`--path=/data`首页会显示分享。用`--path="d:\\projects|e:\\nsis"`失败，应该是因为没映射目录。  
在目录下新建，但匿名会全部显示，研究rule。用`--rule="::r|ceshizu:ceshizu123:r:test:rwd"`失败，修改重复测试，受到`--rule="::|`匿名用户什么权限都没有启发，`:::share:r|admin:admin123:rwd`成功（遗漏:失败过）。访问权限分为四种：""(不可访问)，"R"(只读)，"W"(读写)，"D"(写+删除)。  
老是删除重建，考虑自定义配置文件`--file=/data/xxx.ini`，顺便加上https访问。一直默认配置，发现ini没保存，重新填写。[配置文件模板地址](http://iscute.cn/asset/chfs.ini)

```docker
docker run --restart=on-failure:3 -d --name chfs -p 8080:443  -v /path/you/dir:/data jonnyan404/chfs --file=/data/xxx.ini
```

设置完毕。之前webdav配置要重新修改，不然网络出错（ssl证书问题）。
