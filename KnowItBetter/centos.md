## 部署应用环境

```
yum install nginx
```

#### 启动 nginx

```
service nginx start
```

## 部署 node
你可以通过运行以下命令。
```
sudo yum install epel-release
```
现在可以使用yum命令安装Node.js了。
```
sudo yum install nodejs
```
因为在开发过程中我需要管理节点包，我还要安装新公共管理的软件包管理器，使用以下命令。
```
sudo yum install npm
```

## 如何在生产服务器上部署 Node.js 应用

## 安装mongo

网络上的教程大多不靠谱。

花了一个下午去测试，终于成功。

linux下，mongo有两个包：服务端和工具包

安装服务端：
```
yum install mongodb-server
```
安装工具包：
```
yum install mongodb
```

启动：
```
service mongod start
```

创建数据库文件夹：
```
./bin/mongod --dbpath /data

```


#### 如何使用 pod 构建

[知乎](https://www.zhihu.com/question/19887245)

[pod](https://github.com/yyx990803/pod)

```
$ [sudo] npm install pod -g
```

服务器端: 注意第一次要设置路径，否则可能没有访问权限
```
pod create myapp
```

电脑端
```
git clone ssh://root@119.28.99.145/app/repos/myapp.git
...
git push
```
#### bower
```
bower install –allow-root
```

## 部署ftp

使用 **vsftpd** 和 **4db**
可以访问根目录，但其他的还是有问题

## 梯子

putty
```
wget –no-check-certificate https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocks-go.sh
chmod +x shadowsocks-go.sh
./shadowsocks-go.sh 2>&1 | tee shadowsocks-go.log
```
后台启动
```
shadowsocks-go
```
使用命令
```
启动：/etc/init.d/shadowsocks start
停止：/etc/init.d/shadowsocks stop
重启：/etc/init.d/shadowsocks restart
状态：/etc/init.d/shadowsocks status
```
客户端

[shadowsocks](https://sourceforge.net/projects/shadowsocksgui/files/dist/)
