---
title: "My First Post"
date: 2020-10-31T15:55:06+08:00
tags: ["hugo", "github"]
draft: false
---
*跟随灯大脚步，博客从typecho换成hugo。也没几篇记录*

- 起因

看到灯大说typecho参考链接，编辑要翻到最下面。再加上要加端口访问。 好像设置nginx反代，就不用加端口。还是懒。 之前就看到那篇，今天有空就开干。 还是借用在线md编辑器。全局下载速度也慢，慢慢等啊

- 步骤

灯大和Hugo 从入门到会用和网上搜索参考 ##安装 下载二进制文件，在win10部署。解压后添加环境变量，注销账号cmd才运行hugo。 要用git命令，另外安了git

## 建站
hugo new site blog

## 添加主题
    cd xxx/blog;
    git init;
    git submodule add -b ttys3 https://github.com/ttys3/hugo-theme-terminal.git themes/terminal
    echo 'theme = "terminal"' >> config.toml
## 开始写作
hugo new post/my-first-post.md 开启Hugo内置的服务器 hugo server -D http://localhost:1313/ 可访问网站。

提示 <$.Site.Params.FullWidthTheme>: invalid value; expected bool 搜索在issues里找到答案。config.toml里加 [params] fullWidthTheme = false centerTheme = true

## 首页没显示
复制config.toml没用。看别人问题加时间也不行。有提到复制exampleSite里的。 试了下可以显示。格式错误。复制标题可以，修改就不行。但新建md错误。我误删什么了吧。
## 中文乱码
md编码改为utf-8。
## 其他
  默认tags = ["", ""]
  config.toml 加了`[taxonomies]`，要用tags: (换行)-
  centerTheme = true 主题居中显示。
  后面发现灯大修改是在tty3分支。进terminal用`git checkout ttys3`切换，git pull发现已经最新。首页终于出现图片。
  emmm最后还是换成了even主题。灯大主题部署到netlify显示不完全，文章没有内容摘要（不知道第一篇怎么就显示），一样内容even就有摘要。
