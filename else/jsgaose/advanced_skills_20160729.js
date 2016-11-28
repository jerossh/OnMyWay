// 用来检测类型
Object.prototype.toString.call(value);
// 非原生构造函数没办法检测，只会返回 [object Object]
// 检测原生JSON
var isNativeJSON = window.JSON && Object.prototype.toString.call(JSON) == [object JSON]

// 作用域安全的构造器，忘加 new 作用域也不会出错
function Person(name, age, job) {
  if (this intanceof Person) {
    this.name = name;
    this.age = age;
    this.job = job;
  } else {
    return new Person(name, age, job);
  }
}

// 但是则样子，窃取模式就会出问题
