// 1、原型链继承
/* 
原理：子类的prototype指向父类的实例
缺点：
1、父类的实例属性被所有子类所共享
2、在创建子类的实例时，不能向父类的构造函数中传递参数。
*/
function Parent() {
    this.isShow = true
    this.info = {
        name: "yhd",
        age: 18,
    };
}

Parent.prototype.getInfo = function () {
    debugger;
    console.log(this.info);
    console.log(this.isShow); // true
}

function Child() { };
Child.prototype = new Parent();

let Child1 = new Child();
Child1.info.gender = "男";
Child1.getInfo();  // {name: "yhd", age: 18, gender: "男"}

let child2 = new Child();
child2.getInfo();  // {name: "yhd", age: 18, gender: "男"}
child2.isShow = false

console.log('ss', Child1.isShow); // false


//  2、借用构造函数继承
/* 
原理：在子类的构造函数中，使用call调用父类的构造函数
优点：
1、属性和方法不会被子类所共享。
2、可以向父类的构造函数中传递参数。

缺点：
1、不能访问父类原型上的属性
*/
function Dog(name) {
    this.name = name
    this.category = '宠物'
}
Dog.prototype.say = function () {
    console.log('汪汪！')
}

function Husky(name, iq) {
    Dog.call(this, name)
    this.iq = iq
}

var dog1 = new Husky('旺财',250)
var dog2 = new Husky('嘻嘻',250)
dog2.category = "汪星人"
console.log(dog1)
console.log(dog2)
// dog1.say()

// 3、组合式继承 4、寄生组合式继承
/* 
组合式继承：其实就是原型链继承+借用构造函数，但是会发现父类的构造函数被调用了两次，子类的实例和子类prototype上有着重复的属性，虽然不影响使用，但是增加了额外的开销
寄生组合式继承：就是组合式继承的优化，子类prototype不在是父类的实例，而是一个空对象（其prototype等于父类的prototype）的实例
*/
//原型式继承，相当于 Object.create()
function object(o){
    function F(){}
    F.prototype = o;
    return new F();
}
 
//寄生式继承
function inheritPrototype(subType, superType){
    var prototype = object(superType.prototype); //创建对象
    prototype.constructor = subType;
    subType.prototype = prototype;
    // 为什么不直接subType.prototype = superType.prototype，因为constructor应该是不同的
}
 
//寄生组合式继承
function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
    console(this.name);
};
function SubType(name, age){
    SuperType.call(this, name);
    this.age = age;
}
inheritPrototype(SubType, SuperType);
SubType.prototype.sayAge = function(){
    console(this.age);
};