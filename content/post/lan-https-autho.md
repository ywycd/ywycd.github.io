---
title: "局域网https认证"
date: 2021-04-06T12:15:55Z
tags: ["https"]
draft: false
---
  感谢[本地https快速解决方案](https://www.jianshu.com/p/7cb5c2cffaaa) 教程，开始看过这篇，win10下载失败就没继续。内网Filemanager证书错误，之前用frp曲线救助。证书过期，更换证书出问题，决心研究下这个。
  
  [下载地址]( https://github.com/FiloSottile/mkcert/releases/latest) 下载到本地后，win10cmd运行mkcert，提示不存在。需要加上程序名字运行。-install安装本地可信CA，最后出错。
```
D:\Downloads>mkcert
'mkcert' 不是内部或外部命令，也不是可运行的程序
或批处理文件。

D:\Downloads>mkcert-v1.4.3-windows-amd64 -install
The local CA is already installed in the system trust store! 👍
ERROR: failed to execute "keytool -importcert": exit status 1

Certificate was added to keystore
keytool error: java.io.FileNotFoundException: C:\Program Files (x86)\Java\jre1.8.0_151\lib\security\cacerts (�ܾ����ʡ�)
```
  局域网内使用https，签发证书，加上本机的局域网ip认证。
```
D:\Downloads>mkcert-v1.4.3-windows-amd64 localhost 127.0.0.1 ::1 192.168.2.144
Note: the local CA is not installed in the Java trust store.
Run "mkcert -install" for certificates to be trusted automatically ⚠️

Created a new certificate valid for the following names 📜
 - "localhost"
 - "127.0.0.1"
 - "::1"
 - "192.168.2.144"

The certificate is at "./localhost+3.pem" and the key at "./localhost+3-key.pem" ✅

It will expire on 7 July 2023 🗓
```
先来回忆一下证书可信的三个要素:

- 由可信的CA机构签发
- 访问的地址跟证书认证地址相符
- 证书在有效期内

更新内网机器的https证书，访问https://192.168.2.144是可信的。使用-CAROOT命令可以列出CA证书的存放路径。
```
D:\Downloads>mkcert-v1.4.3-windows-amd64 -CAROOT
C:\Users\ywy\AppData\Local\mkcert
```
  可以看到CA路径下有rootCA-key.pem和rootCA.pem两个文件，用户需要信任rootCA.pem这个文件。将rootCA.pem拷贝副本，并重命名为rootCA.crt(因为windows并不识别pem扩展名，并且Ubuntu也不会将pem扩展名作为CA证书文件对待)，将rootCA.crt文件分发给其他用户，手工导入。

  windows双击rootCA.crt，在证书导入向导中将证书导入`受信任的根证书颁发机构`。
  
  安卓手机设置搜索证书，有的可以直接安装证书。
  
  其他一些高级用法，`[-help]`看说明。比如`-cert-file FILE, -key-file FILE, -p12-file FILE`可以定义输出的证书文件名。`-pkcs12`命令可以产生PKCS12格式的证书。java程序通常不支持PEM格式的证书，但是支持PKCS12格式的证书。

