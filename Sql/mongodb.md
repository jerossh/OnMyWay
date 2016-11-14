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

### Data

- String : 这是最常用的数据类型来存储数据。在MongoDB中的字符串必须是有效的UTF-8。
- Integer : 这种类型是用来存储一个数值。整数可以是32位或64位，这取决于您的服务器。
- Boolean : 此类型用于存储一个布尔值 (true/ false) 。
- Double : 这种类型是用来存储浮点值。
- Min/ Max keys : 这种类型被用来对BSON元素的最低和最高值比较。
- Arrays : 使用此类型的数组或列表或多个值存储到一个键。
- Timestamp : 时间戳。这可以方便记录时的文件已被修改或添加。
- Object : 此数据类型用于嵌入式的文件。
- Null : 这种类型是用来存储一个Null值。
- Symbol : 此数据类型用于字符串相同，但它通常是保留给特定符号类型的语言使用。
- Date : 此数据类型用于存储当前日期或时间的UNIX时间格式。可以指定自己的日期和时间，日期和年，月，日到创建对象。
- Object ID : 此数据类型用于存储文档的ID。
- Binary data : 此数据类型用于存储二进制数据。
- Code : 此数据类型用于存储到文档中的JavaScript代码。
