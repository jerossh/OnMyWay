## form-data:

multipart/form-data

既可以上传文件，也可以上传键值对，它采用了键值对的方式，所以可以上传多个文件。

## x-www-form-urlencoded：

application/x-www-from-urlencoded,

会将表单内的数据转换为键值对，比如,name=Java&age=23

## raw

可以上传任意格式的文本，可以上传text、json、xml、html等

## binary

相当于Content-Type:application/octet-stream.

从字面意思得知，只可以上传二进制数据，通常用来上传文件，由于没有键值，所以，一次只能上传一个文件。
