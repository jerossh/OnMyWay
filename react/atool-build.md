# 配置 package.json

atool-build 要求 package.json 文件里面增加 entry 字段。

```
"entry": {
    "index": "./src/pathToYourEntry.jsx",
    "another": "./src/anotherEntry.jsx"
}
```

执行构建

```
$ atool-build
```
