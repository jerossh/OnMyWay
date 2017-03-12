## yum 无法载入安装源

```
yum clean all (清除缓存) 
yum makecache(建立新缓存) 
yum list 
Test: yuminstall –y sendmail
```

## ssh 失败

如果使用 阿里云服务器，也许是 你开通 ddos 防护导致，把自己的常用 ip 添加到 实例白名单即可