## 部署应用环境

```
yum install nginx
```

#### 启动 nginx

```
service nginx start
```

<!-- ## 部署 node
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
``` -->

## 部署node
直接通过
```
sudo yum install nodejs
```
版本太老，不知道多久没更新了, 可以添加新的源
```
# 4.x
curl --silent --location https://rpm.nodesource.com/setup_4.x | bash -
# 5.x
curl --silent --location https://rpm.nodesource.com/setup_5.x | bash -
# 6.x
curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
# 7.x
curl --silent --location https://rpm.nodesource.com/setup_7.x | bash -
```

所以还是获取的形式更新.

准备命令 wget
```
yum -y install gcc make gcc-c++ openssl-devel wget
```
下载并解压
```
wget https://nodejs.org/dist/v6.2.0/node-v6.2.0.tar.gz
tar -zvxf node-v6.2.0.tar.gz
```
编译以及安装
```
make && make install
```
验证是否安装配置成功：
```
node -v
```
#### 用 n 更新或操作 node

```
n stable
n latest
n 版本号
n         
n rm 版本号
```

- n 用 npm 安装
- npm 用 yum 安装

#### 用 nvm 部署 node

由于 n 的方式部署node 连接失败后产生严重后果，2017年2月 折腾了一天后 使用 nvm 重新部署

```
<!-- 获取 -->
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash

<!-- 安装nvm -->
command -v nvm

<!-- 安装 node  -->
nvm install node
```

## npm 切换淘宝源
```bash
npm config set registry https://registry.npm.taobao.org 
npm info underscore （如果上面配置正确这个命令会有字符串response）
```


## 如何在生产服务器上部署 Node.js 应用

#### 安装mongo

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
创建文记得修改 vi .podrc

[具体案例](https://github.com/yyx990803/pod#configuration)
记得 上线解析好的域名 设置 *NODE_ENV=production*

电脑端
```
git clone ssh://root@119.28.99.145/app/repos/myapp.git
...
git push
```

配置 .podhook

```
cnpm install
bower install -–allow-root
pod start 项目名称
```

#### 使用原生 pm2

由于pod 一年多没有更新且 内置的 pm2过于老旧 建议 用 原生pm2 代替。
原生pm2 语法与pod 类似，切换起来没有难度。
pod目前 仅用于 git 的作用

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


## 国内主机的问题

由于墙的问题，国内主机的npm install 命令经常失败
而且淘宝的 cnpm 常用命令无法绑定
```
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
```
以上会报错

只能使用以下命令绑定 cnpm
```
alias cnpm="npm --registry=https://registry.npm.taobao.org \
--cache=$HOME/.npm/.cache/cnpm \
--disturl=https://npm.taobao.org/dist \
--userconfig=$HOME/.cnpmrc"
```

愤怒，又因为墙的原因白忙活了一天。服务器尽量还是使用墙外的把。最好是对电信联通线路优化过的


## yum 使用阿里云

阿里云是最近新出的一个镜像源。得益与阿里云的高速发展，这么大的需求，肯定会推出自己的镜像源。
阿里云Linux安装镜像源地址：http://mirrors.aliyun.com/
CentOS系统更换软件安装源
第一步：备份你的原镜像文件，以免出错后可以恢复。
```
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
```
第二步：下载新的CentOS-Base.repo 到/etc/yum.repos.d/
```
CentOS 5
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-5.repo
CentOS 6
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-6.repo
CentOS 7
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
```
第三步：运行yum makecache生成缓存
```
yum clean all
yum makecache
```
