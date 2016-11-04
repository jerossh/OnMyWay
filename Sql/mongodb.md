# 系统启动 mongod
### 针对 windows
```
cd C:\Program Files\MongoDB\Server\3.2\bin
mongod -dbpath "C:\Program Files\MongoDB\Server\3.2\data\d
```

### mac，打开终端
```
sudo mongod
```

### centos
```
service mongod start
```

# 备份恢复数据

```
mongodump -h localhost -d zhongyukuaiji -o e:\data\dump
mongorestore -h localhost -d zhongyukuaiji --directoryperdb 数据所在目录
```
