CentOS 7.2 (64-bit system)
MySQL 5.6.24

## MySQL 依赖 libaio，所以先要安装 libaio

```
yum search libaio  # 检索相关信息
yum install libaio # 安装依赖包
```

## 检查 MySQL 是否已安装

```
yum list installed | grep mysql

如果要重新安装, 先卸载
yum -y remove mysql-libs.x86_64
```

## 下载 MySQL Yum Repository
```
wget http://dev.mysql.com/get/mysql-community-release-el7-5.noarch.rpm
```
如果  *-bash: wget: 未找到命令*，先 *yum install wget*

## 添加 MySQL Yum Repository

```
yum localinstall mysql-community-release-el7-5.noarch.rpm
```

## 验证下是否添加成功

```bash
yum repolist enabled | grep "mysql.*-community.*"
```
提示如下

```bash
[root@bogon software]# yum repolist enabled | grep "mysql.*-community.*"
mysql-connectors-community/x86_64        MySQL Connectors Community           1
mysql-tools-community/x86_64             MySQL Tools Community                1
mysql56-community/x86_64                 MySQL 5.6 Community Server          13
```

## 选择要启用 MySQL 版本

查看 MySQL 版本，执行
```
yum repolist all | grep mysql
```

可以通过类似下面的语句来启动某些版本
```bash
yum-config-manager --disable mysql56-community
yum-config-manager --enable mysql57-community-dmr
```

## 通过 Yum 来安装 MySQL

```
yum install mysql-community-server 
```

执行
```
rpm -qi mysql-community-server.x86_64 0:5.6.24-3.el7
```
执行
```
whereis mysql
```
可以看到 MySQL 的安装目录是 /usr/bin/

```
[root@localhost ~]# whereis mysql
mysql: /usr/bin/mysql /usr/lib64/mysql /usr/share/mysql /usr/share/man/man1/mysql.1.gz
```

## 启动和关闭 MySQL Server

```
systemctl start  mysqld

systemctl status  mysqld

systemctl stop mysqld
```

完毕

参考来源 [http://www.centoscn.com/mysql/2016/0315/6844.html](http://www.centoscn.com/mysql/2016/0315/6844.html)


