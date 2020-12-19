---
title: "Bitwarden服务器搭建记录"
date: 2020-12-02T13:50:42+08:00
tags: ["docker","bitwarden"]
draft: false
---
N多人推荐bitwarden，群友介绍下也起了自建的念头。过程也踩了好多坑，终于部署成功。选择了[bitwarden_rs](https://github.com/dani-garcia/bitwarden_rs)第三方版，轻量而且高级功能免费。安装教程也多。

## 准备

机器上安装好docker，域名，https代理工具（nginx等）

##  安装

`docker pull bitwardenrs/server:latest`  

相关配置
```docker
docker run -d --name bitwarden \
  -e SIGNUPS_ALLOWED=true \
  -e WEBSOCKET_ENABLED=true \
  -e LOG_FILE=/data/bitwarden.log \
  -e DOMAIN=https://bitwarden.example.tld/vault/ \
  -p 8880:80 \
  -p 3012:3012 \
  -v /bw-data/:/data/ \
  bitwardenrs/server:latest
```

也可用Docker Compose运行。~~主机上用Compose遇到localhost:port timeout。经常提示容器名已存在（未运行成功），`docker ps`又找不到相关。无奈放弃。~~  

## 设置Nginx

主机有nginx，抄教程运行成功。但这样自带流量统计页404。~~开始还以为是另外配置的云监控弄的，注释掉无用。发现是`location / {`问题。~~ wiki有[sub-path](https://github.com/dani-garcia/bitwarden_rs/wiki/Proxy-examples)例子。

```nginx
# Define the server IP and ports here.
upstream bitwardenrs-default { server 127.0.0.1:8880; }
upstream bitwardenrs-ws { server 127.0.0.1:3012; }

# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name bitwardenrs.example.tld;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name bitwardenrs.example.tld;

    # Specify SSL Config when needed
    #ssl_certificate /path/to/certificate/letsencrypt/live/bitwardenrs.example.tld/fullchain.pem;
    #ssl_certificate_key /path/to/certificate/letsencrypt/live/bitwardenrs.example.tld/privkey.pem;
    #ssl_trusted_certificate /path/to/certificate/letsencrypt/live/bitwardenrs.example.tld/fullchain.pem;

    client_max_body_size 128M;

    ## Using a Sub Path Config
    # Path to the root of your installation
    location /vault/ {
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;

      proxy_pass http://bitwardenrs-default;
    }

    location /vault/notifications/hub/negotiate {
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;

      proxy_pass http://bitwardenrs-default;
    }

    location /vault/notifications/hub {
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection $http_connection;
      proxy_set_header X-Real-IP $remote_addr;

      proxy_pass http://bitwardenrs-ws;
    }

    # Optionally add extra authentication besides the ADMIN_TOKEN
    # If you don't want this, leave this part out
    location ^~ /vault/admin {
      # See: https://docs.nginx.com/nginx/admin-guide/security-controls/configuring-http-basic-authentication/
      auth_basic "Private";
      auth_basic_user_file /path/to/htpasswd_file;

      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;

      proxy_pass http://bitwardenrs-default;
    }

}
```

在nginx文件做相应修改。家里nas也试过跑docker，但最后找不到网页。*没配置https环境，装了nginx，提示配置文件出错。设置frp穿透域名，无法访问。ip+端口失败。*

## 网页、客户端



输入对应网址可打开网页。开始显示`502 bad gateway`，搜索查了下是加上限制。**最重要还是上面端口没改成对应。** 创建账户，导入keepass数据（导出相应格式，网页端导入），要等会。  
体验了安卓版，先连接到自建服务器。可自动填充，创建账户密码会提示是否保存到bitwarden。但TOTP空白，还以为跟kp一样。~~chrome内核浏览器/原来有包名无法填充~~第二天看文档，加别人指点，发现空白是填key，后面复制。包名是格式不一样，等有时间统一修改。浏览器可安装扩展。  

## 备份恢复

主要是sqlite3数据库文件，其他bw-data目录有附件文件夹、图标缓存文件夹、密钥等。    

*设置nginx过程顺便解决了[云监控](http://freetribe.me/691.html)问题。开始是docker跑，映射html，中途无法访问。*   惯例搜索，记录解决方法。  

```nginx
location /ss {
    index index.html;
    alias /usr/local/ServerStatus/web/;
    autoindex on;
   }
```
## 进阶

设置-域名规则，可设置通用网站（域名不同账密相同）。实际加了两个通用（如淘宝支付宝、微博新浪），测试只有淘宝新浪有填充，显示2个。另外添加也不行。在淘宝新建URI，选默认匹配检测，下面几项具体看[文档](https://bitwarden.com/help/article/uri-match-detection/)。只剩微博一项就可以匹配成功。后续都在项目里新添URI。  
看了下[自定义字段](https://bitwarden.com/help/article/custom-fields/)说明，不是想象中简单的备注。看了下YT视频，回来发现说明里是动图。简单说获取网页输入框的ID，填写自定义字段（名称ID，值内容），保存后会自动填充。后续网站如果需要多步验证可以设置。  
关闭用户注册、网页端
```
SIGNUPS_ALLOWED=false
WEB_VAULT_ENABLED=false
```









