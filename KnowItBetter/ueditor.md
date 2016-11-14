## 如何部署 ueditor
按照官方的nodejs 栗子里的 ueditor文件夹复制到 public 文件夹，并在是使用的页面引入

```
script(type="text/javascript" charset="utf-8" src="/ueditor/ueditor.config.js")
script(type="text/javascript" charset="utf-8" src="/ueditor/ueditor.all.min.js")
script(type="text/javascript" charset="utf-8" src="/ueditor/lang/zh-cn/zh-cn.js")
```

## 讲其他处理上传的 中间件放在 ueditor 后面

zhongyu 项目中，由于将 multipart 放在 ue 前面，上传图片时候就报错

```
Error: Missing Content-Type
```
正确做法是
```js
app.use('/ueditor/ue', ueditor(path.join(__dirname, 'public'), function (req, res, next) {
  //...
}));
app.use(multipart());
```

## 原生的 ue 打开上传图片对话框速度很慢，需要处理以下上传格式

```js
// ueditor\dialogs\image\image.js
accept: {   title: 'Images',   extensions: 'jpg,jpeg,png',   mimeTypes: 'image/*' }
改为

accept: {   title: 'Images',   extensions: 'jpg,jpeg,png',   mimeTypes: 'image/jpg,image/jpeg,image/png'  }
```

## 定制 工具栏

直接修改文件 ueditor.config.js 中toolbars  数组
