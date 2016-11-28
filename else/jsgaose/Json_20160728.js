// Json 的表示方式， 必须双引号
{
  "name": "Nicholas",
  "age": 29
}
// 相对于对象字面量，没有声明变量，结尾没有封号
{

}
{
  "name": "Nicholas",
  "age": 29,
  "school": {
    "name": "SA merrimack",
    "location": "North Andover, MA"
  }
}

// Json 对象有两个方法 stringify(), parse()
var book = {
  title: "Professional Javasript",
  authors: [
    "Nicholas C. zakas"
  ],
  edition: 3,
  year: 2011
};
var jonText =JSON.stringify(book);
console.log(jonText);
// {"title":"Professional Javasript","authors":["Nicholas C. zakas"],"edition":3,"year":2011}
//不包含任何的空格或者缩进
var bookCopy = JSON.parse(jonText);
console.log(bookCopy);            //变成没有空白和缩进的对象字面量

// JSON.stringify() 有两个参数，第一个是过滤作用(数组或函数)， 第二个是缩进要求
var jonText2 = JSON.stringify(book, ["title", "edition"]);        // 记得双引号
console.log(jonText2);
//{"title":"Professional Javasript","edition":3}
// 如果第一个参数是函数的话， 函数接受两个参数：键名和属性值
var jonText3 = JSON.stringify(book, function(key, value) {
  switch (key) {
    case "authors":
      return value.join(', ');
      break;
    case "year":
      return 5000;
      break;
    case "edition":
      return undefined;
      break;
    default:
      return value;
  }
});
console.log(jonText3);
// {"title":"Professional Javasript","authors":"Nicholas C. zakas","year":5000}

// 第二个参数： 缩进
var jonText4 = JSON.stringify(book, null, 4);
var jonText5 = JSON.stringify(book, null, "- -")
console.log(jonText4);
console.log(jonText5);

// toJSON()
var book = {
  title: "Professional Javasript",
  authors: [
    "Nicholas C. zakas"
  ],
  edition: 3,
  year: 2011,
  toJSON: function() {              　// 只返回这个
    return this.title;
  }
};
var jonText6 =JSON.stringify(book);
console.log(jonText6);
// "Professional Javasript"


// 解析选项
// JSON.parse() 也接收一个参数，函数，和 JSON.stringify 的函数类似
var book = {
  "title" : "Professional Javasript",
  "authors": [
    "Nicholas C. Zakas"
  ],
  edition: 3,
  year: 2011,
  releaseDate: new Date(2011, 11, 1)              // 事件还要好好学习一下
};
var jonText7 = JSON.stringify(book);
console.log('str: '+ jonText7);
// JSON.parse() 赋值后有问题
var bookCopy2 = JSON.parse(jonText7);
console.log(JSON.parse(jonText7));
console.log('|||||' + bookCopy2);
console.log(bookCopy2.releaseDate.getFullYear());     //chrome 出错， 没办法赋值
