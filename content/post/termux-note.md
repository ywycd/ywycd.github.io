---
title: "Termux笔记"
date: 2021-03-27T15:55:42+08:00
tags: ["Termux", "adb", "ssh"]
draft: false
---
## 前言

Termux是An­droid终端模拟器，手机下载安装打开即可。支持 apt、pkg软件包管理，而且完美支持 Python、PHP、Ruby、Go、Nodejs、MySQL 等工具。你还可以用它安装Linux系统，可以做很多事情。第一次是从酷安下载提示网络问题，看评论区知道酷安版不完整。转去play下载。play插件收费，而在F-Droid商店上免费。后面play不再更新，换到F-Droid版。官方有提供[备份和恢复](https://wiki.termux.com/wiki/Backing_up_Termux) 方案。文章根据国光大佬、酷安分享、p3terx教程，自己总结记录。

```shell
termux-setup-storage
cd /data/data/com.termux/files
# 备份
tar -zcvf /sdcard/termux-backup.tar.gz home usr
# 恢复
tar -zxf /sdcard/termux-backup.tar.gz --recursive-unlink --preserve-permissions
```

转移成功，开屏问候语改变。其他基本没变化。

## 基本操作

### 选项和菜单

长按屏幕会调出显示菜单项（包括复制、粘贴、更多），方便我们进行复制或者粘贴。

![](https://image.3001.net/images/20200418/15872022768181.png)

More 菜单的说明如下：

```bash
长按屏幕
├── COPY:    # 复制
├── PASTE:   # 粘贴
├── More:    # 更多
   ├── Select URL:             # 提取屏幕所有网址
   └── Share transcipt:        # 分享命令脚本
   └── Reset:                  # 重置
   └── Kill process:           # 杀掉当前会话进程
   └── Style:                  # 风格配色 需要自行安装
   └── Keep screen on:         # 保持屏幕常亮
   └── Help:                   # 帮助文档
```

左侧屏幕向右滑出来导航栏，可选收起/弹出键盘，新建/切换会话(ses­sion) 。通知栏会显示有多少会话。

![](https://image.3001.net/images/20200418/15872022029549.png)

### 常用快捷

`音量减`模拟 `Ctrl` 键。下面列一些常用的按键。

- `Ctrl + A` -> 将光标移动到行首
- `Ctrl + C` -> 中止当前进程
- `Ctrl + D` -> 注销终端会话
- `Ctrl + E` -> 将光标移动到行尾
- `Ctrl + K` -> 从光标删除到行尾
- `Ctrl + U` -> 从光标删除到行首
- `Ctrl + L` -> 相当于`clear`命令，清屏
- `Ctrl + Z` -> 挂起（发送 SIGTSTP 到）当前进程

`音量加`也可以作为产生特定输入的`特殊键`.

- `音量加 + E` -> Esc键
- `音量加 + T` -> Tab键
- `音量加 + 1` -> F1（`音量增加 + 2` → F2…以此类推）
- `音量加 + 0` -> F10

### 定制常用按键

我们可以通过 `~/.termux/termux.properties` 文件来进行定制。默认不存在，先创建这个文件。当时刚下载自己设置（看了教程，已创建目录）失败后卸载。后面安装借用酷安NibaZShab配置好的when，成功设置按键、安装fish终端、screenfetch等。后续有修改，博客做个记录。
自用按键表

```bash
extra-keys = [ \ ['ESC','|','/','PGUP','UP','PDDN','END'], \ ['TAB','CTRL','ALT','LEFT','DOWN','RIGHT','ENTER'] \ ]

```
![IMG_20210328_095759.jpg](http://i.endpot.com/image/A4R0C/IMG_20210328_095759.jpg)

### 基本命令

Termux 除了支持 `apt` 命令外，还在此基础上封装了`pkg`命令，`pkg` 命令向下兼容 `apt` 命令。执行 `pkg upgrade` 相当于执行了 `apt update && apt upgrade`，简化了操作流程。
pkg命令如下。

```bash
pkg search <query>              # 搜索包
pkg install <package>           # 安装包
pkg uninstall <package>         # 卸载包
pkg reinstall <package>         # 重新安装包
pkg update                      # 更新源
pkg upgrade                     # 升级软件包
pkg list-all                    # 列出可供安装的所有包
pkg list-installed              # 列出已经安装的包
pkg show <package>              # 显示某个包的详细信息
pkg files <package>             # 显示某个包的相关文件夹路径
```

安装一些常用工具，方便后续操作。

```bash
pkg i -y curl wget tree vim nano git
```

### 修改问候语

`vim $PREFIX/etc/motd`换成你想显示的。也可以使用`touch ~/.hushlogin`让它不显示。

### 目录结构

```bash
echo $HOME
/data/data/com.termux/files/home

echo $PREFIX
/data/data/com.termux/files/usr

echo $TMPDIR
/data/data/com.termux/files/usr/tmp/
```

### root权限

可以利用`proot`可以为手机没有root的用户来模拟一个root的环境。手机已root，推荐使用tsu，`pkg install tsu -y`。
> tsu，这是一个`su`的 Termux 版本，是一个真正的root权限，用来在termux上替代`su`。
### 缩放文本
可以使用缩放手势（双指放大缩小）来调整其字体大小。
![](https://image.3001.net/images/20200418/15872024914185.png)

## 进阶配置

### adb连接

酷安ID萌系生物研究员分享，安装adb和fastboot。

```bash
pkg update
pkg i -y git
cd ~
git clone https://github.com/Magisk-Modules-Repo/adb-ndk.git 
cd ./adb-ndk/bin/
mv -f adb.bin adb
chmod +x ./*
mv -f ./* $PREFIX/bin/
cd ~
rm -rf adb-ndk/
```

可连接其他设备。有在线adb网站，测试需要usb连接手机，在局域网内。

换到F-Droid版，adb提示log文件无权限。新建修改权限，chmod，更改文件目录失败。重新安装可行。简单的方法，点开网络adb调试，有的开发者模式里没有，要借用其他app，需root。`adb devices`会出来权限弹窗，点接受就可以。

```bash
adb disconnect
adb kill-server
adb devices
```

还不行就三连，重启手机。
### ssh服务

同样萌系生物研究员大佬分享的教程。

安装openssh `pkg i -y openssh`，进行配置。

```bash
mkdir -p $PREFIX/etc/ssh/ ; ssh-keygen -f ~/.ssh/id_rsa -t rsa -b 4096 -N '' -m PEM ; cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys ; chmod -R 700 ~/.ssh/ ; chmod 600 ~/.ssh/authorized_keys ; echo -e "port 8022\nPrintMotd yes\nPasswordAuthentication no\nSubsystem sftp /data/data/com.termux/files/usr/libexec/sftp-server\nPubkeyAuthentication yes\nPermitRootLogin yes\nAuthorizedKeysFile .ssh/authorized_keys" > $PREFIX/etc/ssh/sshd_config ; pkill sshd ; sshd
```

设置密码，输入`passwd`进行设置。记得`pkill sshd && sshd`重启sshd。

ssh服务网上还有其他教程，国光大佬教程就有电脑/Termux生成密钥的不同方法。

电脑连接termux，`ssh 192.168.x.x -p 8022 -i C:id_rsa`。Termux不需要设置用户名。win10cmd连接提示`Permissions for C:id_rsa are too open` 。~~chmod 600 id_rsa复制到电脑失败，换成400也一样。~~

### 传输文件
可以使用SSH自带的scp命令进行文件传输。

复制文件
```bash
# scp 本地文件路径 远程主机用户名@远程主机名或IP:远程文件保存的位置路径
scp local_file remote_username@remote_ip:remote_folder
```

复制目录
```bash
# scp -r 本地文件夹路径 远程主机用户名@远程主机名或IP:远程文件夹保存的位置路径
scp -r local_folder remote_username@remote_ip:remote_folder
```


### sftp

一般情况下，开启sshd就会顺带帮你开sftp服务，方便管理termux的内部文件。另外下载termux:api，跟termux对应商店下载，不要混用。装完termux:api的apk后，还需要输`pkg i -y termux-api ; cat ~/.ssh/id_rsa | termux-clipboard-set`，这时候它会自动把私钥文本复制到剪切板。termux:api的其他用法国光的教程里有详细说明。termux其他插件，boot开机启动，widge桌面小部件etc。

打开solid explorer或其他支持sftp的文件管理器，新建云连接，选择sftp。远程主机名localhost,端口8022。验证方式选SSH私钥，用户名乱填，最后粘贴刚才自动复制的内容。实际路径`/data/data/com.termux/files/home`。

用termux建立软链接。比如新建QQ下载，这样可以`home`目录下去访问QQ文件夹。
`ln -s /data/data/com.termux/files/home/storage/shared/tencent/QQfile_recv QQ`。删除软链接，用`unlink`命令。测试`unlink QQ`可删除。
![](https://image.3001.net/images/20200418/15872085834532.png)

### fish终端alias

照研究员教程加了alias，termux-clipboard-get 获取剪切板内容，termux-clipboard-set 写入剪切板。发现重进就消失。考虑是不是fish要换路径。查阅资料，发现fish是[function](https://fishshell.com/docs/current/cmds/alias.html?highlight=alias) 设置。tsu看文件有无创建，同样操作切换为普通账户才能成功创建。

```bash
alias get='termux-clipboard-get'
# This is equivalent to entering the following function
function get
    termux-clipboard-get $argv
end
# save the function 
funcsave get
```

这样会保存在~/.config/fish/functions文件夹下，名为xx.fish。

## 结尾

这些还只是冰山一角，使用好Termux可以方便很多。

## 参考文献

[Termux 高级终端安装使用配置教程 | 国光](https://www.sqlsec.com/2018/05/termux.html#toc-heading-165)

[Termux 使用教程 - P3TERX](https://p3terx.com/archives/termux-tutorial-1.html)

[Termux Wiki](https://wiki.termux.com/wiki/Main_Page)


