mongoose 增删改查可分为模型和实例的不同实现。

subdocument 上的功能很少，查询方法也不一样：
```
instance.notices.id(noticeId)
```
上面查询中会返回一个 subdoc。subdoc有 remove 方法，但没有 update 和 save。
要保存还是要保存其父对象。
