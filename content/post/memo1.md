---
title: "备忘录1"
date: 2024-03-22T09:59:53Z
tags: ["memo"]
draft: false
---
有的文章里链接已无法访问，最好还是本地备份。记录解决方法，免得下次还要搜索挺久。

[用 cURL 自動更新 Cloudflare IP 地址實現 DDNS](https://ignorance.nova.moe/ddns-with-cloudflare/)

登录 Cloudflare 账号，然后在「My Profile」创建「API Token」，权限Zone.Zone, Zone.DNS ，用-H “Authorization: Bearer xxxxxxxx”授权。

**获得 ZoneID 和 Record ID**

`curl -X GET "https://api.cloudflare.com/client/v4/zones -H “Authorization: Bearer xxxxxxxx”`
获取所有 Zones，找到对应域名的 Zone ID。
`curl -X GET "https://api.cloudflare.com/client/v4/zones/<域名的 ZoneID>/dns\_records" -H "Authorization: Bearer xxxxxxx"      -H "Content-Type:application/json"`
再找到对应的 Record ID。

**修改 Record 解析**
```sh
home\_ip=$(curl ip.sb)
curl -X PUT "https://api.cloudflare.com/client/v4/zones/<域名的 ZoneID>/dns\_records/<Record ID>" \\
     -H "Authorization: Bearer xxxxxxx" \\
     -H "Content-Type: application/json" \\
     --data '{"type":"A","name":"domain","content":"'$home\_ip'","ttl":120,"proxied":false}'
```
修改ip变量和域名，cron定时更新。

笔记本新帐户键盘输入字母变成数字和字符，搜索是因为那几个键数字小键盘。`FN+NumLK`。

[屏蔽 bilibili / bilibili 漫画的青少年模式提示](https://bbs.letitfly.me/d/1129)
b漫把日期调到很多年后，打开app，再把日期改回来。

[屏蔽QQ升级提示和弹窗（需root）](https://bbs.letitfly.me/d/1192)

准备可root文件管理器和终端。QQ检测更新的配置文件地址为/data/data/com.tencent.mobileqq/files/upgrade_config/config_upgrade_xxxxxx（xxxxxx为QQ号）。使用编辑文本的方式打开它，照注释按需求修改。

保存文件后还要修改文件权限，防止屑QQ再改回去。然而使用chmod修改还是会改回，所以我们使用更加强力的chattr。
打开终端后先获取root权限，输入su/tsu回车。根据自身情况修改以下指令：
```sh
busybox chattr +i /data/data/com.tencent.mobileqq/files/upgrade_config/config_upgrade_xxxxxx
```
修改完后复制进入终端执行即可。如果想测试是否修改成功，可以尝试用文件管理器删除config_upgrade_xxxxxx文件，无法删除即修改成功。偶尔还是会提示更新。另外卸载QQ之前记得把权限修改回去，只需要把指令中的+i改为-i即可。
