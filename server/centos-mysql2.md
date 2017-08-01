```bash
mysql -u 用户名 -p
```
会车，然后输入密码

## 建立一个名为xhkdb的数据库：
```bash
create database xhkdb;  // 不要忘记封号
```

## 创建数据库并分配用户：
```bash
GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP,ALTER ON 数据库名.* TO 数据库名@localhost IDENTIFIED BY '密码';
```


## 使用数据库
```bash
use databaseName
show tables
```

## 导入数据
```ssh
LOAD DATA LOCAL INFILE 文件相对地址 INTO TABLE 表名 CHARACTER SET utf8;

例子
LOAD DATA LOCAL INFILE 'csv/cuspea.csv' INTO TABLE Cuspeas CHARACTER SET utf8;
```


## 错误

*The MySQL server is running with the --secure-file-priv option so it cannot execute this statement

权限问题

*ERROR 1045 (28000): Access denied for user

也是权限问题，好吧，那怎么办？
