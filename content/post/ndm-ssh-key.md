---
title: "小钢炮ssh设置密钥登录（免密）"
date: 2020-12-19T20:19:05+08:00
draft: false
---
小钢炮设置[密钥认证](https://www.jianshu.com/p/0c8c00fb1f79)，无需密码。  
**第一步 生成密钥对**

```bash
#用dropbearkey生成密钥对
path=/etc/dropbear #生成私钥的地方，可随意填写
dropbearkey -t rsa -f ${path}/key_dropbear -s 2048
#保存公钥到~/.ssh/authorized_keys
dropbearkey -t rsa -f $path/key_dropbear -s 2048 -y | sed -n 2p > ~/.ssh/authorized_keys
#转换私钥成可以读取的文件
dropbearconvert dropbear openssh ${path}/key_dropbear ${path}/key_openssh
#打印私钥
cat ${path}/key_openssh #把私钥复制到记事本备用
```

也可 ip地址/admin/system/admin 网页添加。运行上面后发现保存公钥提示无法打开目录，修改下。原来是在恩山看到作者，后面无意发现简书地址。   
**第二步 禁用密码登录**  
修改`/etc/init.d/S50dropbear`文件，第 10 行添加“-s”参数。如`DROPBEAR_ARGS="$DROPBEAR_ARGS -R -s"`。其他-p 要开启的ssh端口。注意备份,保存并重启。`./etc/init.d/S50dropbear restart`或startup处重启。