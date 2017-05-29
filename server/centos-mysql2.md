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
