## mac 安装建议

国内由于 homebrew 更新太慢，可以用迅雷下载官网的。

#### 安装完成后，记得记下最后一步中的密码

另外使用终端 我设置变量失败了，所以使用终端控制 mysql 有点复杂。建议使用

## mysql workbench

官方的 mysql 工具。使用体验不错，第一次登录上去修改初始化的密码，mysql 才可以使用。

项目中建议心间一个 普通权限的 账号 使用。


## 在Mac OS X上怎么彻底卸载mysql
```
打开终端窗口
使用mysqldump备份你的数据库将文本文件!
停止数据库服务器
sudo rm /usr/local/mysql
sudo rm -rf /usr/local/mysql*
sudo rm -rf /Library/StartupItems/MySQLCOM
sudo rm -rf /Library/PreferencePanes/My*
edit /etc/hostconfig and remove the line MYSQLCOM=-YES-
rm -rf ~/Library/PreferencePanes/My*
sudo rm -rf /Library/Receipts/mysql*
sudo rm -rf /Library/Receipts/MySQL*
sudo rm -rf /private/var/db/receipts/*mysql*
```