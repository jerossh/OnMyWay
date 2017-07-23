mongoose 增删改查可分为模型和实例的不同实现。

subdocument 上的功能很少，查询方法也不一样：
```
instance.notices.id(noticeId)
```
上面查询中会返回一个 subdoc。subdoc有 remove 方法，但没有 update 和 save。
要保存还是要保存其父对象。

## 查询功能
查询一组id
```js
Team.find({
    '_id': { $in: teamIds }
}, function(err, teamData) {
    console.log("teams name  " + teamData);
});
```

## 修改功能
```js
// 直接修改 $set
query.findByIdAndUpdate(id, {$set:{'name': '修改为张三'}});
上面也等价于
query.findByIdAndUpdate(id, {'name': '修改为张三'});
```

修改数组
有push sort 等等，[数组修改](https://docs.mongodb.com/manual/reference/operator/update-array/)

```js

// 待修改数据
{ "_id" : 1, "grades" : [ 80, 85, 90 ] }
{ "_id" : 2, "grades" : [ 88, 90, 92 ] }
{ "_id" : 3, "grades" : [ 85, 100, 90 ] }
// 修改值
db.students.update(
   { _id: 1, grades: 80 },
   { $set: { "grades.$" : 82 } }
)

如果待修改的是 doc
{
  _id: 4,
  grades: [
     { grade: 80, mean: 75, std: 8 },
     { grade: 85, mean: 90, std: 5 },
     { grade: 90, mean: 85, std: 3 }
  ]
}
这样修改
db.students.update(
   { _id: 4, "grades.grade": 85 },
   { $set: { "grades.$.std" : 6 } }
)

如果要 匹配多个条件，在修改
db.students.update(
   {
     _id: 4,
     grades: { $elemMatch: { grade: { $lte: 90 }, mean: { $gt: 80 } } }
   },
   { $set: { "grades.$.std" : 6 } }
)
修改的结果是
{
  _id: 4,
  grades: [
    { grade: 80, mean: 75, std: 8 },
    { grade: 85, mean: 90, std: 6 },
    { grade: 90, mean: 85, std: 3 }
  ]
}




db.students.update(
   { _id: 1 },
   { $push: { scores: 89 } } // scores 数组增加 一项 89
)

db.students.update(
   { name: "joe" },
   { $push: { scores: { $each: [ 90, 92, 85 ] } } } // 增加数组
)

更加复杂的添加，
db.students.update(
   { _id: 5 },
   {
     $push: {
       quizzes: {
          $each: [ { wk: 5, score: 8 }, { wk: 6, score: 7 }, { wk: 7, score: 6 } ], // 添加三项
          $sort: { score: -1 }, // 对该数组进行排序
          $slice: 3 // 只保留三项
          }
     }
   }
)
```

$pushAll 相当于 $push 和 $each 的的联合使用

对应的 $addToSet 和 $push 相似，$addToSet只有原数组中不存在才会添加否则不会有任何动作。

$position，可以和push 配合，制定数组中添加的位置； $pop是指定位置被删除。

$pull 匹配的项目被删除；$pullAll 删除多项



