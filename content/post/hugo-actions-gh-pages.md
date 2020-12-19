---
title: "hugo通过Github Action部署到Github Pages"
date: 2020-12-19T21:16:07+08:00
tags: ["hugo", "github"]
draft: false
---
通过Action部署到Github Pages。查了一些资料，有点不知道下一步。terminal修改后考虑部署到github，之前用even主题到netlify。  
本地win有hugo文档，部署到git仓库，查阅有建私人仓库、其他repositories。简单点username.github.io建两个branch。  

## 上传xx.github.io

添加远程，分支提示无法建立，切换分支、加ssh不行。加ssh key提示已使用，不是正确的密钥。看[gh-pages](https://github.com/peaceiris/actions-gh-pages) 有提。  

```shell
ssh-keygen -t rsa -b 4096 -C "$(git config user.email)" -f gh-pages -N ""
# You will get 2 files:
#   gh-pages.pub (public key)
#   gh-pages     (private key)
```

重建key，clip < ~/.ssh/xxx.pub复制到Deploy Keys。  具体步骤如下，等待上传。

```shell
git checkout -b main
git add .
git commit -m "first commit"
git push origin main
```

## 部署action

win无法新建.github文件夹，用git bash mkdir。建立`.github/workflows/gh-pages.yml`看文档做修改。新建名为ACTIONS_DEPLOY_KEY的Secrets，内容上面生成的私钥。git push后自动生成分支。

```yml
name: github pages

on:
  push:
    branches:
      - main  

jobs:
  deploy:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2
        with:
          submodules: true  
          fetch-depth: 0    

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: '0.74.3'
          extended: true

      - name: Build
        run: hugo --minify

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          deploy_key: ${{ secrets.ACTIONS_DEPLOY_KEY }}
          publish_dir: ./public
          commit_message: ${{ github.event.head_commit.message }}
```

## 访问问题

推送后默认改为gh-pages。访问xx.github.io显示404，以为没加README.md。Settings里GitHub Pages Source下切换分支，可行。  
修改terminal，灯大说的那些用上一些。折腾主题时间大于写博客，还是记录点东西吧。