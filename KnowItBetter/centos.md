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

[知乎](https://www.zhihu.com/question/19887245)

[pod](https://github.com/yyx990803/pod)

```
$ [sudo] npm install pod -g
```

#### 如何使用 pod 构建

服务器端
```
pod create myapp
```
电脑端
```
git clone ssh://root@119.28.99.145/app/repos/myapp.git
...
git push
```
