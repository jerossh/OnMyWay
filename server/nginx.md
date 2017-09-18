### 为什么要用Nginx反向代理NodeJS而不直接用NodeJS呢？

Nginx是经过实践证明的高性能反向代理服务器,有很多已经很稳定的模块(gzip,virtual host...)
通过Nginx处理静态文件可以降低NodeJS的负担
Nginx可以做多机的负载均衡(虽然目前和我没关系)

这里是Nginx反向代理NodeJS的配置文件:

```
location / {
    try_files $uri @nodejs;//尝试查找是否存在请求的静态文件
  }
  location @nodejs{
    proxy_http_version 1.1;
    proxy_set_header Host $host;//为反向设置原请求头
    proxy_set_header X-Read-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Upgrade $http_upgrade;//设置WebSocket Upgrade
    proxy_set_header Connection "upgrade";
    proxy_pass http://localhost:3000;
  }
  location ~ \.(gif|png|jpg|css|js)$ {
    root /srv/http/www;//静态文件的位置，例如express中的public目录
    try_files $uri @nodejs;
    expires 7d;//设置静态文件7天过期
  }
```

# 2
```
location ~ \.(jpg|png|jpeg|gif)$  {
        expires 30d;
        root   /data/www/wizzer.cn/;
}

location ~ \.(js|css)$  {
        expires 2h;
        root   /data/www/wizzer.cn/;
}
```

## Q&A

#### Q:为什么在静态文件的location里还写着try_files $uri @nodejs;呢？

A:因为假如用Socket.IO之类的node库，它们的js/css文件要从node中获取，所以要判断如果找不到静态文件时就尝试去node里获取。

#### Q:为什么看别的try_files里面有$uri/,这个只有$uri？

A:因为写上$uri/会显示Nginx的404，这时候应用内就等于有2个404页面。。不加$uri/就只有node中的404页面。


#### 如果需要 原域名和ip

A：
```
server {
    listen 443;
    server_name kapuw.net;
    ssl on;
    ssl_certificate   cert/214087429970291.pem;
    ssl_certificate_key  cert/214087429970291.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    location / {
        proxy_pass http://127.0.0.1:3008;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```
