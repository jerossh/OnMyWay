# js闭包的用途
### 匿名自执行函数

我们知道所有的变量，如果不加上var关键字，则默认的会添加到全局对象的属性上去，这样的临时变量加入全局对象有很多坏处，
比如：别的函数可能误用这些变量；造成全局对象过于庞大，影响访问速度(因为变量的取值是需要从原型链上遍历的)。
除了每次使用变量都是用var关键字外，我们在实际情况下经常遇到这样一种情况，即有的函数只需要执行一次，其内部变量无需维护，
比如UI的初始化，那么我们可以使用闭包：

```js
var datamodel = {    
    table : [],    
    tree : {}    
};    
(function(dm){    
    for(var i = 0; i < dm.table.rows; i++){    
       var row = dm.table.rows[i];    
       for(var j = 0; j < row.cells; i++){    
           drawCell(i, j);    // 不像闭包，难道有一个隐藏的return？
       }    
    }    
    //build dm.tree      
})(datamodel);   
```

我们创建了一个匿名的函数，并立即执行它，由于外部无法引用它内部的变量，
因此在执行完后很快就会被释放，关键是这种机制不会污染全局对象。

### 缓存

再来看一个例子，设想我们有一个处理过程很耗时的函数对象，每次调用都会花费很长时间，
那么我们就需要将计算出来的值存储起来，当调用这个函数的时候，首先在缓存中查找，如果找不到，则进行计算，
然后更新缓存并返回值，如果找到了，直接返回查找到的值即可。闭包正是可以做到这一点，因为它不会释放外部的引用，
从而函数内部的值可以得以保留。

```js
var CachedSearchBox = (function(){    
    var cache = {},    
       count = [];    
    return {    
       attachSearchBox : function(dsid){    
           if(dsid in cache){//如果结果在缓存中    
              return cache[dsid];//直接返回缓存中的对象    
           }    
           var fsb = new uikit.webctrl.SearchBox(dsid);//新建    
           cache[dsid] = fsb;//更新缓存    
           if(count.length > 100){//保正缓存的大小<=100    
              delete cache[count.shift()];    
           }    
           return fsb;          
       },    
       clearSearchBox : function(dsid){    
           if(dsid in cache){    
              cache[dsid].clearSelection();      
           }    
       }    
    };    
})();    
CachedSearchBox.attachSearchBox("input1");    
```

这样，当我们第二次调用CachedSearchBox.attachSerachBox(“input1”)的时候，
我们就可以从缓存中取道该对象，而不用再去创建一个新的searchbox对象。

### 实现封装

可以先来看一个关于封装的例子，在person之外的地方无法访问其内部的变量，而通过提供闭包的形式来访问：

```js
ar person = function(){    
    //变量作用域为函数内部，外部无法访问    
    var name = "default";       
    return {    
       getName : function(){    
           return name;    
       },    
       setName : function(newName){    
           name = newName;    
       }    
    }    
}();    
print(person.name);//直接访问，结果为undefined    
print(person.getName());    
person.setName("abruzzi");    
print(person.getName());    

// 得到结果如下：  

// undefined  
// default  
// abruzzi
```

### 闭包的另一个重要用途是实现面向对象中的对象，传统的对象语言都提供类的模板机制，

```js
function Person(){    
    var name = "default";       

    return {    
       getName : function(){    
           return name;    
       },    
       setName : function(newName){    
           name = newName;    
       }    
    }    
};    


var john = Person();    
print(john.getName());    
john.setName("john");    
print(john.getName());    

var jack = Person();    
print(jack.getName());    
jack.setName("jack");    
print(jack.getName());    

// 运行结果如下：  

// default  
// john  
// default  
// jack  
```
