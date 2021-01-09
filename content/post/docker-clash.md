---
title: "Docker Clash记录"
date: 2020-05-17T13:10:41+08:00
tags: ["docker", "old"]
draft: false
---
起因：[clash](https://github.com/Dreamacro/clash) N多分支，体验了luci openclash不稳定，改动后经常失效，换成docker clash。
## 配置文件准备
### docker-compose.yml 
启动clash
```yml
    version: '3.4'
    services:
      clash:
        image: dreamacro/clash:latest-arm64v8
        volumes:
          - ./config.yaml:/root/.config/clash/config.yaml
          - ./dashboard:/ui
        ports:
          - "7890:7890"
          - "7891:7891"
          - "7892:7892"
          - "9090:9090"
          - "1053:1053"
        restart: always
        # When your system is Linux, you can use `network_mode: "host"` directly.
        network_mode: "host"
        container_name: clash
 ```
9090是web ui端口。1053 dns端口，小钢炮53端口被占。`volumes:- ./dashboard:/ui` /宿主机路径:/容器路径，开始这里不明白，错了好几回。
UI有两种[官方](https://github.com/Dreamacro/clash-dashboard/tree/gh-pages)，`http://localhost:9090/ui`[yacd](https://github.com/haishanh/yacd/tree/gh-pages)节点收起。`http://localhost:8080/`。网页版http://yacd.haishan.me/，登陆后可看。
两种ui都用的话，另一种要nignx加载。学习了[--rm指令](https://www.ruanyifeng.com/blog/2018/02/nginx-docker.html)，容器停止就会删除。
### config.yaml
代理配置[示例](https://gist.githubusercontent.com/lddsb/b041bb03a8c1295a77d00a5235636ec1/raw/21f0731f40fd53f7b47ad6e45f17f15c811f6b3e/config.yml)
```yml
    port: 7890
    socks-port: 7891
    allow-lan: true
    external-controller: 0.0.0.0:8080
```
照搬openclash设定，订阅转换参考[subconverter](https://github.com/tindy2013/subconverter)
## 启动clash
进入放置两个配置文件目录，运行`docker-compose up -d`  。查看clash日志，会发现5个端口在监听，代理节点规则加载。日常用SwitchyOmega连接sock5节点，细分网站代理。

还可以局域网转发，有点难，没尝试过。docker里有clash网关。

参考网址：

 1. [在Docker中使用Clash]( https://zmcdbp.com/run-clash-in-docker/)
 2. [Clash Docker & Openwrt 配置与踩坑记录](https://wuyefan.wordpress.com/2020/02/12/clash-docker-openwrt-%E9%85%8D%E7%BD%AE%E4%B8%8E%E8%B8%A9%E5%9D%91%E8%AE%B0%E5%BD%95/amp/)
