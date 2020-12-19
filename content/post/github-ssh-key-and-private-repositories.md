---
title: "下载私人仓库和SSH认证"
date: 2020-12-04T16:41:58+08:00
tags: ["github","ssh"]
draft: false
---
## 下载私人仓库

博客内容在私人仓库，现在想下载到电脑上备着，后面继续记录。  

查阅发现`git clone https://myusername@github.com/ownersusername/repo_name.git`有用，其他出错/要权限（win git bash创建不了文件换cmd下载）。下载到电脑、小钢炮。小钢炮输密码（clone、push）不方便，研究如何ssh验证。无法使用ssh-keygen，电脑复制过去不行。  

## SSH认证

生成密钥`ssh-keygen -t ed25519 -C "your_email@example.com"`，普通人一路回车。复制密钥（记得修改）`clip < ~/.ssh/id_ed25519.pub` 。[详见](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/connecting-to-github-with-ssh)  点击头像-Settings-SSH and GPG keys新增，取名随意，区分开来。测试连接`ssh -T git@github.com`。

```
Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```

提示这个，恭喜配置成功。  

**小钢炮只能另辟蹊径** ssh-keygen不存在。开始用[ssh-copy-id root@n1地址](https://bbs.hassbian.com/thread-8491-1-1.html)失败。复制电脑key过去无用。ssh -T提示`Connection to git@github.com:22 exited: No auth methods could be used.`感谢那个[久远的帖子](https://forum.archive.openwrt.org/viewtopic.php?id=47551)。  

```bash
# Generate your identity key on openwrt
dropbearkey -t rsa -f ~/.ssh/id_rsa
# Convert public key from dropbear binary to openssh text
# Copy and paste output from below to bitbucket account ssh keys
dropbearkey -y -f ~/.ssh/id_rsa | head -n 2 | tail -1
# Change git ssh command
echo "#!/bin/sh" > ~/.gitssh.sh
echo "dbclient -y -i ~/.ssh/id_rsa \$*" >> ~/.gitssh.sh
chmod +x ~/.gitssh.sh
echo "export GIT_SSH=\$HOME/.gitssh.sh" >> /etc/profile
# Now login again to openwrt
# Now use git (finally)
git clone git@github.com:<user>/<repo>.git
```

运行时提示dbclient: Exited: Error resolving '$*' port '22'. Name or service not known。看最后回复修改后成功。  
内置的是dropbear，通过转换才行。`ssh -i .ssh/id_rsa git@github.com`测试连接。  
`git clone git@github.com:username/repo_name.git`无需密码，上面地址要输。  

## git config设置

git config --global user.name "John Doe"  

git config --global user.email "johndoe@example.com"     

设置[代理](https://www.v2ex.com/t/641227)  git config --global http.proxy 'socks5h://localhost:port'  
查看配置`git config -l`










