---
title: "茅塞顿开"
date: 2020-11-15T22:13:09+08:00
draft: false
---
[破解光猫](https://www.hellozjx.com/2019/08/13/f612/) 按步就班

[n1 smb](https://nanodm.net/post/nanodm/samba-sharing-auto-discovery-configuration-under-padavan-router/) 一直无法识别。照这篇n1开master，成功。原来padavan也有smb服务。

[小钢炮其他设置](https://post.smzdm.com/p/a78e0x0o/) aria2一直出错，看后发现要新建目录。和tr一样必须Dashboard改。如果有注意log也会发现。

[添加cccat黑名单](https://www.v2fly.org/chapter_02/03_routing.html) 网上看到格式，复制进去没用。照其他示例删减不行。看介绍移到routing前面改了下格式，选domain成功。

[小钢炮挂载](https://www.right.com.cn/forum/thread-529613-1-1.html) 停电后大硬盘无法挂载。搜索了下，去掉openwrt挂载未分配硬盘。按这贴加了sdb分区，在启动加了mount /dev/sdb /mnt/sdb。后续再通电可以直接挂载了。
