---
title: "Action排队中解决"
date: 2024-02-13T04:47:17Z
tags: ["github"]
draft: false
---
  码字更新，推送git。发现action排队中，查看GitHub Pages Action生成deploy_key填入，推送还是排队中。
  查看action-hugo，更新workflow。推送不行，Fine-grained tokens的权限，action和workflow选读写。误传某key推送git。
  ac出错无法发布，更改hugo版本不行。本地hugo也出错，查看对应md多了<<<head等字符，第一次推送git pull加的吧。本地hugo测试陆续修改错出错md。`hugo server -d` 访问ok。更换GITHUB_TOKEN。
  又说commit behind，提示git pull。
  ```
  git fetch
  git rebase 
  git push origin main
  ```
  推送build出错，119格式不支持换'0.80.0'。Deploy出错忘记把with下的deploy_token改成github_token。