// 2.5 配置项
// 在使用new Schema(config)时，我们可以追加一个参数options来配置Schema的配置，形如：
var ExampleSchema = new Schema(config,options);
// 或者使用
var ExampleSchema = new Schema(config);
ExampleSchema.set(option,value);
// 可供配置项有：safe、strict、capped、versionKey、autoIndex

// 2.5.1 safe——安全属性（默认安全），两种格式
new Schema({...},{safe:true});
new Schema({...},{safe:{j:1,w:2,wtimeout:10000}});   // j表示做1份日志，w表示做2个副本（尚不明确），超时时间10秒

// 2.5.2 strict——严格配置（默认启用）
// 确保Entity的值存入数据库前会被自动验证，如果你没有充足的理由，请不要停用，例子
var ThingSchema = new Schema({a:String});
var ThingModel = db.model('Thing',SchemaSchema);
var thing = new Thing({iAmNotInTheThingSchema:true});
thing.save();                                       //iAmNotInTheThingSchema这个属性将无法被存储
// 如果取消严格选项，iAmNotInTheThingSchema将会被存入数据库
// 该选项也可以在构造实例时使用，例如：
var ThingModel = db.model('Thing');
var thing1 = new ThingModel(doc,true);              //启用严格
var thing2 = new ThingModel(doc,false);             //禁用严格

// 2.5.3 shardKey
// 需要mongodb做分布式，才会使用该属性

// 2.5.4 capped——上限设置
// 如果有数据库的批量操作，该属性能限制一次操作的量，例如：
new Schema({...},{capped:1024});  //一次操作上线1024条数据
// 当然该参数也可是JSON对象，包含size、max、autiIndexId属性
new Schema({...},{capped:{size:1024, max:100, autoIndexId:true}});

// 2.5.5 versionKey——版本锁
// 版本锁是Mongoose默认配置（__v属性）的，如果你想自己定制，如
new Schema({...},{versionKey:'__someElse'});
// 此时存入数据库的版本锁就不是__v属性，而是__someElse，相当于是给版本锁取名字。
// 具体怎么存入都是由Mongoose和MongoDB自己决定，当然，这个属性你也可以去除
new Schema({...},{versionKey:false});
// 除非你知道你在做什么，并且你知道这样做的后果

// 2.5.6 autoIndex——自动索引
// 该内容将在索引章节单独讲解


// 3. Documents
// Document是与 MongoDB 文档一一对应的模型，Document可等同于Entity，具有属性和操作性
// 注意：Document的`CRUD都必须经过严格验证的，参看2.5.2 Schema的strict严格配置
// 3.1 查询
// 查询内容过多，专题讲解

// 3.2 更新
// 有许多方式来更新文件，以下是常用的传统方式：
PersonModel.findById(id,function(err,person){
  person.name = 'MDragon';
  person.save(function(err){});
});
// 这里，利用Model模型查询到了person对象，该对象属于Entity，可以有save操作，如果使用 Model操作，需注意：
PersonModel.findById(id,function(err,person){
  person.name = 'MDragon';
  var _id = person._id; //需要取出主键_id
  delete person._id;    //再将其删除
  PersonModel.update({_id:_id},person,function(err){});
  //此时才能用Model操作，否则报错
});
// update第一个参数是查询条件，第二个参数是更新的对象，但不能更新主键，这就是为什么要删除主键的原因。
// 当然这样的更新很麻烦，可以使用 $set 属性来配置，这样也不用先查询，如果更新的数据比较少，可用性还是很好的：
PersonModel.update({_id:_id},{$set:{name:'MDragon'}},function(err){});
// 需要注意，Document的CRUD操作都是异步执行，callback第一个参数必须是err，而第二个参数各个方法不一样，
// update的callback第二个参数是更新的数量，如果要返回更新后的对象，则要使用如下方法
Person.findByIdAndUpdate(_id,{$set:{name:'MDragon'}},function(err,person){
  console.log(person.name); //MDragon
});
// 　类似的方法还有 findByIdAndRemove，如同名字，只能根据id查询并作 update/remove 操作，操作的数据仅一条

// 3.3 新增
// 如果是 Entity，使用save方法，如果是Model，使用create方法
//使用Entity来增加一条数据
var krouky = new PersonModel({name:'krouky'});
krouky.save(callback);
//使用Model来增加一条数据
var MDragon = {name:'MDragon'};
PersonModel.create(MDragon,callback);
// 两种新增方法区别在于，如果使用Model新增时，传入的对象只能是纯净的JSON对象，不能是由Model创建的实体，原因是：由Model
// 创建的实体krouky虽然打印是只有{name:'krouky'}，但是krouky属于Entity，包含有Schema属性和Model数据库行为模型。
// 如果是使用Model创建的对象，传入时一定会将隐藏属性也存入数据库，虽然3.x追加了默认严格属性，但也不必要增加操作的报错

// 3.4 删除
// 和新增一样，删除也有2种方式，但Entity和Model都使用remove方法


// 4.Sub Docs
// 如同SQL数据库中2张表有主外关系，Mongoose将2个Document的嵌套叫做Sub-Docs（子文档）
// 简单的说就是一个Document嵌套另外一个Document或者Documents:
var ChildSchema1 = new Schema({name:String});
var ChildSchema2 = new Schema({name:String});
var ParentSchema = new Schema({
  children1:ChildSchema1,   //嵌套Document
  children2:[ChildSchema2]  //嵌套Documents，数组的形式也可以？
});
// Sub-Docs享受和Documents一样的操作，但是Sub-Docs的操作都由父类去执行
var ParentModel = db.model('Parent',parentSchema);
var parent = new ParentModel({
  children2:[{name:'c1'},{name:'c2'}]
});
parent.children2[0].name = 'd';
parent.save(callback);
// parent在执行保存时，由于包含children2，他是一个数据库模型对象，因此会先保存chilren2[0]和chilren2[1]。
// 如果子文档在更新时出现错误，将直接报在父类文档中，可以这样处理：
ChildrenSchema.pre('save',function(next){
  if('x' === this.name) return next(new Error('#err:not-x'));
  next();
});
var parent = new ParentModel({children1:{name:'not-x'}});
parent.save(function(err){
  console.log(err.message); //#err:not-x
});

// 4.1 查询子文档
var child = parent.children.id(id);

// 4.2 新增、删除、更新
// 子文档是父文档的一个属性，因此按照属性的操作即可，不同的是在新增父类的时候，子文档是会被先加入进去的。
// 如果ChildrenSchema是临时的一个子文档，不作为数据库映射集合，可以这样：
var ParentSchema = new Schema({
  children:{
    name:String
  }
});
//其实就是匿名混合模式

// 5.Model
// 5.1 什么是Model
// Model模型，是经过Schema构造来的，除了Schema定义的数据库骨架以外，还具有数据库行为模型，他相当于管理数据库属性、行为的类
//先创建Schema
var TankSchema = new Schema({
 name:'String',
 size:'String'
});
//通过Schema创建Model
var TankModel = mongoose.model('Tank',TankSchema);

// 5.2 操作Model
// 该模型就能直接拿来操作，具体查看API，例如：
var tank = {'something',size:'small'};
TankModel.create(tank);
// 注意：你可以使用Model来创建Entity，Entity实体是一个特有Model具体对象，但是他并不具备Model的方法，只能用自己的方法。
//通过Model创建Entity
var tankEntity = new TankModel('someother','size:big');
tankEntity.save();

// 6.Query
// 查询是数据库中运用最多也是最麻烦的地方，这里对Query解读的并不完善，仅仅是自己的一点领悟而已。

// 6.1 查询的方式
// 通常有2种查询方式，一种是直接查询，一种是链式查询（2种查询都是自己命名的）

// 6.1.1 直接查询
// 在查询时带有回调函数的，称之为直接查询，查询的条件往往通过API来设定，例如：
PersonModel.findOne({'name.last':'dragon'},'some select',function(err,person){
  //如果err==null，则person就能取到数据
});

// 6.1.2 链式查询
// 在查询时候，不带回调，而查询条件通过API函数来制定，例如：
var query = PersonModel.findOne({'name.last':'dragon'});
query.select('some select');
query.exec(function(err,pserson){
//如果err==null，则person就能取到数据
});
// 这种方式相对直接查询，分的比较明细，如果不带callback，则返回query，query没有执行的预编译查询语句，
// 该query对象执行的方法都将返回自己，只有在执行exec方法时才执行查询，而且必须有回调。
// 因为query的操作始终返回自身，我们可以采用更形象的链式写法
Person
  .find({ occupation: /host/ })
  .where('name.last').equals('Ghost')
  .where('age').gt(17).lt(66)
  .where('likes').in(['vaporizing', 'talking'])
  .limit(10)
  .sort('-occupation')
  .select('name occupation')
  .exec(callback);

// 7.Validation
// 数据的存储是需要验证的，不是什么数据都能往数据库里丢或者显示到客户端的，数据的验证需要记住以下规则：
// 验证始终定义在SchemaType中
// 验证是一个内部中间件
// 验证是在一个Document被保存时默认启用的，除非你关闭验证
// 验证是异步递归的，如果你的SubDoc验证失败，Document也将无法保存
// 验证并不关心错误类型，而通过ValidationError这个对象可以访问

// 7.1 验证器
// required 非空验证
// min/max 范围验证（边值验证）
// enum/match 枚举验证/匹配验证
// validate 自定义验证规则
// 以下是综合案例：
var PersonSchema = new Schema({
  name:{
    type:'String',
    required:true //姓名非空
  },
  age:{
    type:'Nunmer',
    min:18,       //年龄最小18
    max:120     //年龄最大120
  },
  city:{
    type:'String',
    enum:['北京','上海']  //只能是北京、上海人
  },
  other:{
    type:'String',
    validate:[validator,err]  //validator是一个验证函数，err是验证失败的错误信息
  }
});

// 7.2 验证失败
// 如果验证失败，则会返回err信息，err是一个对象该对象属性如下
err.errors                //错误集合（对象）
err.errors.color          //错误属性(Schema的color属性)
err.errors.color.message  //错误属性信息
err.errors.path             //错误属性路径
err.errors.type             //错误类型
err.name                //错误名称
err.message                 //错误消息
// 一旦验证失败，Model和Entity都将具有和err一样的errors属性

// 8.Middleware中间件
// 8.1 什么是中间件
// 中间件是一种控制函数，类似插件，能控制流程中的init、validate、save、remove 方法

// 8.2 中间件的分类
// 中间件分为两类
var schema = new Schema(...);
schema.pre('save',function(next){
  //做点什么
  next();
});

// 8.2.2 Parallel并行
// 并行提供更细粒度的操作
var schema = new Schema(...);
schema.pre('save',function(next,done){
  //下一个要执行的中间件并行执行
  next();
  doAsync(done);
});

// 8.3 中间件特点
// 一旦定义了中间件，就会在全部中间件执行完后执行其他操作，使用中间件可以雾化模型，避免异步操作的层层迭代嵌套

// 8.4 使用范畴
// 复杂的验证
// 删除有主外关联的doc
// 异步默认
// 某个特定动作触发异步任务，例如触发自定义事件和通知
// 例如，可以用来做自定义错误处理
schema.pre('save',function(next){
  var err = new Eerror('some err');
  next(err);
});
entity.save(function(err){
  console.log(err.message); //some err
});
