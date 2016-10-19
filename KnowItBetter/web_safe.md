# Content Security Polic

## 一、简介

CSP 的实质就是白名单制度，开发者明确告诉客户端，哪些外部资源可以加载和执行，等同于提供白名单。它的实现和执行全部由浏览器完成，开发者只需提供配置。

#### 启用方式

* HTTP 头信息

```
Content-Security-Policy: script-src 'self'; object-src 'none';
style-src cdn.example.org third-party.org; child-src https:
```

* &lg;meta&gt;标签

```html
<meta http-equiv="Content-Security-Policy" content="script-src 'self'; object-src 'none'; style-src cdn.example.org third-party.org; child-src https:">
```

上面代码中，CSP 做了如下配置。

```
* <object>标签：不信任任何URL，即不加载任何资源
* 样式表：只信任cdn.example.org和third-party.org
* 框架（frame）：必须使用HTTPS协议加载
* 其他资源：没有限制
```

## 二、 限制选项

* 资源加载限制
* default-src
* URL 限制
* 其他限制
* report-uri

## 三、Content-Security-Policy-Report-Only

除了Content-Security-Policy，还有一个Content-Security-Policy-Report-Only字段，表示不执行限制选项，只是记录违反限制的行为。
它必须与report-uri选项配合使用。

```
Content-Security-Policy-Report-Only: default-src 'self'; ...; report-uri /my_amazing_csp_report_parser;
```

## 四、选项值

每个限制选项可以设置以下几种值，这些值就构成了白名单。

* 主机名：example.org，https://example.com:443
* 路径名：example.org/resources/js/
* 通配符：*.example.org，*://*.example.com:*（表示任意协议、任意子域名、任意端口）
* 协议名：https:、data:
* 关键字'self'：当前域名，需要加引号
* 关键字'none'：禁止加载任何外部资源，需要加引号

如果同一个限制选项使用多次，只有第一次会生效。

```
# 错误的写法
script-src https://host1.com; script-src https://host2.com

# 正确的写法
script-src https://host1.com https://host2.com
```

## 五、script-src 的特殊值

除了常规值，script-src还可以设置一些特殊值。注意，下面这些值都必须放在单引号里面。

```
'unsafe-inline'：允许执行页面内嵌的&lt;script>标签和事件监听函数
unsafe-eval：允许将字符串当作代码执行，比如使用eval、setTimeout、setInterval和Function等函数。
nonce值：每次HTTP回应给出一个授权token，页面内嵌脚本必须有这个token，才会执行
hash值：列出允许执行的脚本代码的Hash值，页面内嵌脚本的哈希值只有吻合的情况下，才能执行。
```
## 六、注意点

* script-src和object-src是必设的，除非设置了default-src。
* script-src不能使用unsafe-inline关键字（除非伴随一个nonce值），也不能允许设置data:URL。下面是两个恶意攻击的例子。
* 必须特别注意 JSONP 的回调函数。
  ```
  <script
  src="/path/jsonp?callback=alert(document.domain)//">
  </script>
  ```
  上面的代码中，虽然加载的脚本来自当前域名，但是通过改写回调函数，攻击者依然可以执行恶意代码。

  其他资料 参考[MDN CSP策略指令](https://developer.mozilla.org/zh-CN/docs/Web/Security/CSP/CSP_policy_directives)
