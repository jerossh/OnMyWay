# HTTP 消息结构

- HTTP是基于客户端/服务端（C/S）的架构模型，通过一个可靠的链接来交换信息，是一个无状态的请求/响应协议。
- HTTP使用统一资源标识符（Uniform Resource Identifiers, URI）来传输数据和建立连接。
- 一旦建立连接后，数据消息就通过类似Internet邮件所使用的格式[RFC5322]和多用途Internet邮件扩展（MIME）[RFC2045]来传送。

## 客户端请求消息
HTTP请求到服务器的请求消息包括以下格式:
  1. 请求行（request line）
  2. 请求头部（header）
  3. 空行
  3. 请求数据
![请求报文](http://www.runoob.com/wp-content/uploads/2013/11/2012072810301161.png)

## 服务器响应消息
HTTP响应也由四个部分:
  1. 状态行
  2. 消息头
  3. 空行
  4. 响应正文
![响应数据](http://www.runoob.com/wp-content/uploads/2013/11/httpmessage.jpg)

## 实例
#### get 请求的传递实例
客户端请求：
```
GET /hello.txt HTTP/1.1
User-Agent: curl/7.16.3 libcurl/7.16.3 OpenSSL/0.9.7l zlib/1.2.3
Host: www.example.com
Accept-Language: en, mi
```

服务端响应:
```
HTTP/1.1 200 OK
Date: Mon, 27 Jul 2009 12:28:53 GMT
Server: Apache
Last-Modified: Wed, 22 Jul 2009 19:15:56 GMT
ETag: "34aa387-d-1568eb00"
Accept-Ranges: bytes
Content-Length: 51
Vary: Accept-Encoding
Content-Type: text/plain
```

输出结果
```
Hello World! My payload includes a trailing CRLF.
```
