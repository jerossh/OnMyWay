另外新增一个报错的提醒

```
nodejs出现events.js:72中抛出错误
```
一般表示端口被占用，新开一个端口即可～～～

## git 文件锁
```
$ git gc --prune=now
$ git remote prune origin
```
无法清理就去手动删除
另外 pod 也有一个清理死文件的
```
pod prune
```

## event err 160

同72一样，也是开新端口就好、、

## 假如 cnpm install bcrypt

相关在： [node-gyp](https://github.com/nodejs/node-gyp)

需要安装以下的 安装包

```
yum install -y python
yum -y install gcc automake autoconf libtool make
yum install gcc gcc-c++
```

# ssh 崩溃问题

由于 windows 系统 cmd 的一些缺陷，导致了服务端 ssh 的崩溃, 端口被占用。目前不知道怎么解决，都是墨妙棋妙好了。

重启ssh 服务

```
service sshd restart
```
最后发现是 阿里云 设置了 ip 限制的原因。。。 自己的 ip 整天变。

```发现
```
