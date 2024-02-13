---
title: "Action排队中解决"
date: 2024-02-13T04:47:17Z
tags: ["github"]
draft: false
---
 码字更新推送，发现action排队，查看GitHub Pages Action生成deploy_key填入，推送还是排队。

 查看action-hugo，更新workflow。推送不了，Fine-grained tokens的权限action和workflow选读写。误传某key推送git。

 ac出错无法发布，更改hugo版本不行。本地hugo也出错，查看对应md多了head等字符，第一次推送git pull加的吧。本地hugo测试陆续修改出错md。`hugo server -d` 访问ok。更换GITHUB_TOKEN。
 
又说commit behind，提示git pull。

  ```
  git fetch
  git rebase 
  git push origin main
  ```
 
推送build出错，119格式不支持换'0.80.0'。Deploy出错忘记把with下的deploy_token改成github_token。格式有点不太对，本地运行修改再推送。