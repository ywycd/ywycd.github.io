---
<<<<<<< HEAD
title: "Change to Clash Premium"
date: 2021-04-06T12:14:52Z
tags: ["", ""]
draft: true
---

=======
title: "docker切换为Clash-premium"
date: 2021-04-06T12:14:52Z
tags: ["docker"]
draft: false
---
  EMBY推荐使用clash tun模式，加上其他原因考虑换成clash-premium。惯例查阅资料，开启tun，结果显示`Start Tun interface error: CreateTUN(\"utun\") failed; /dev/net/tun does not exist`。另外从[comzyh](https://github.com/comzyh/clash/releases) 处下载tun内核，改名放到/dev/net/tun，错误。配置.yml里加devices，提示`ERROR: for clash  Cannot start service clash: linux runtime spec devices: error gathering device information while adding custom device "/dev/net/tun": not a device node` 可能需要映射，或者系统运行tun，无奈放弃。
  
  复制[该博客](https://zhezhiyu.xyz/archives/94) Premiere版完整配置。由于不是直接订阅clash, `proxy-providers`改为`proxies`，其他地方有修改。Premiere支持订阅规则，用RULE-SET。后续发现局域网走代理，加`- RULE-SET,lancidr,DIRECT`。
  ```yaml
mixed-port: 7890
#socks-port: 7891
redir-port: 7892
#authentication:
  #- "user1:pw1"
allow-lan: true
bind-address: '*'
mode: Rule
log-level: info
external-controller: 0.0.0.0:9090
external-ui: /ui
secret: "pw"
interface-name: eh0
#tun: 
     #enable: true
     #stack: system # or gvisor
     #dns-hijack:
       #- tcp://8.8.8.8:53
       #- 8.8.8.8:1053
     #macOS-auto-route: true
dns:
  enable: true
  ipv6: false
  listen: 0.0.0.0:1053
  enhanced-mode: redir-host
  nameserver:
    - 114.114.114.114
    - 119.29.29.29
    - 223.5.5.5
    - tls://dns.rubyfish.cn:853
  fallback:
    - tls://8.8.8.8:853
    - tcp://208.67.222.222:443
    - https://doh.pub/dns-query

rule-providers:
  reject:
  # 拦截域名,可选拦截
    type: http
    behavior: domain
    url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt"
    path: ./ruleset/reject.yaml
    interval: 86400
 
  icloud:
  # iCloud直连域名,建议直连
    type: http
    behavior: domain
    url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt"
    path: ./ruleset/icloud.yaml
    interval: 86400
 
  apple:
  # 苹果直连域名,建议直连
    type: http
    behavior: domain
    url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt"
    path: ./ruleset/apple.yaml
    interval: 86400
 
  google:
  # 谷歌直连域名,建议直连
    type: http
    behavior: domain
    url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt"
    path: ./ruleset/google.yaml
    interval: 86400
 
  proxy:
  # 需要代理的域名
    type: http
    behavior: domain
    url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt"
    path: ./ruleset/proxy.yaml
    interval: 86400
 
  direct:
  # 直连域名
    type: http
    behavior: domain
    url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt"
    path: ./ruleset/direct.yaml
    interval: 86400
 
  gfw:
  # GFW域名列表
    type: http
    behavior: domain
    url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt"
    path: ./ruleset/gfw.yaml
    interval: 86400
 
  greatfire:
  # GreatFire域名
    type: http
    behavior: domain
    url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/greatfire.txt"
    path: ./ruleset/greatfire.yaml
    interval: 86400
 
  tld-not-cn:
  # 非中国大陆使用的顶级域名列表
    type: http
    behavior: domain
    url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt"
    path: ./ruleset/tld-not-cn.yaml
    interval: 86400
 
  telegramcidr:
  # TG使用的IP地址
    type: http
    behavior: ipcidr
    url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt"
    path: ./ruleset/telegramcidr.yaml
    interval: 86400
 
  cncidr:
  # 中国IP段
    type: http
    behavior: ipcidr
    url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt"
    path: ./ruleset/cncidr.yaml
    interval: 86400
 
  lancidr:
  # 局域网IP段
    type: http
    behavior: ipcidr
    url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt"
    path: ./ruleset/lancidr.yaml
    interval: 86400
 
proxies:
  - name: 'ss1'
    type: ss
    server: 'your-server.com'
    port: 2333
    cipher: rc4-md5
    password: 'your-password'
  - { name: "vmess2", type: vmess, server: server, port: 443, uuid: uuid, alterId: 32, cipher: auto, tls: true } 
  
proxy-groups:
  - name: 'auto'
    type: url-test
    proxies: 
      - ss1
      - vmess2
    url: 'https://www.gstatic.com/generate_204'
    interval: 300
  - name: 'Proxy'
    type: select
    proxies: 
      - auto
      - ss1
      - vmess2
rules:
  - PROCESS-NAME,v2ray,DIRECT
  - PROCESS-NAME,Surge%203,DIRECT
  - PROCESS-NAME,ss-local,DIRECT
  - PROCESS-NAME,privoxy,DIRECT
  - PROCESS-NAME,trojan,DIRECT
  - PROCESS-NAME,trojan-go,DIRECT
  - PROCESS-NAME,naive,DIRECT
  - PROCESS-NAME,Thunder,DIRECT
  - PROCESS-NAME,DownloadService,DIRECT
  - PROCESS-NAME,qBittorrent,DIRECT
  - PROCESS-NAME,Transmission,DIRECT
  - PROCESS-NAME,fdm,DIRECT
  - PROCESS-NAME,aria2c,DIRECT
  - PROCESS-NAME,Folx,DIRECT
  - PROCESS-NAME,NetTransport,DIRECT
  - PROCESS-NAME,uTorrent,DIRECT
  - PROCESS-NAME,WebTorrent,DIRECT
  - DOMAIN,animebytes.tv,DIRECT
  - DOMAIN,clash.razord.top,DIRECT
  - DOMAIN,yacd.haishan.me,DIRECT
  - DOMAIN,embyserver.media,EMBY
  - RULE-SET,reject,🛑 全球拦截
  - RULE-SET,icloud,DIRECT
  - RULE-SET,apple,DIRECT
  - RULE-SET,google,DIRECT
  - RULE-SET,lancidr,DIRECT
  - RULE-SET,proxy,🔰 节点选择
  - RULE-SET,greatfire,🔰 节点选择
  - RULE-SET,gfw,🔰 节点选择
  - RULE-SET,telegramcidr,📲 电报信息
  - RULE-SET,direct,DIRECT
  - GEOIP,CN,DIRECT
  - MATCH,🐟 漏网之鱼
  ```
  [Clash Premium 规则集](https://github.com/Loyalsoldier/clash-rules)
  [wiki](https://lancellc.gitbook.io/clash/)
  [官方wiki](https://github.com/Dreamacro/clash/wiki)
  
  看wiki, 加了h2的vmess节点, 添加成功。
  ```yaml
proxies:
  - name: "vmess-h2"
    type: vmess
    server: server
    port: 443
    uuid: uuid
    alterId: 32
    cipher: auto
    network: h2
    tls: true
    h2-opts:
      host:
        - http.example.com
        - http-alt.example.com
      path: /
  ``` 
    
docker-compose.yml内容如下。ui换成yacd。version改为3.7就报错，查阅后发现是docker和docker-compose版本不是最新的原因。 在线网页`clash.razord.top`和`yacd.haishan.me`。
```yml
version: '3.6'
services:
  clash:
    image: dreamacro/clash-premium:latest
    #devices:
      #- /dev/net/tun
    volumes:
      - ./config.yaml:/root/.config/clash/config.yaml
      - ./yacd-gh-pages:/ui
    ports:
      - "7890:7890"
      #- "7891:7891"
      - "7892:7892"
      - "9090:9090"
      - "1053:1053"
    restart: always
    network_mode: "host"
    container_name: clash
```
  
  
  
  
>>>>>>> a5fcc59fc3d7a08275fcf39bd271fab0c6622f91
