function Person(name) {
    this.name = name;
}
Person.prototype.type = 'animal'
var a = new Person('小明');
console.log(a.name);
console.log(a.type);
function _new() {
    /* 
    1、创建一个新的对象a。
    2、使用a去执行这个构造函数（即这个构造函数中的this指向a）
    3、把a的__proto__指向构造函数的prototype
    4、这个构造函数是否返回一个对象，是_new返回这个对象，否返回a\
     */
    var newObj = {};
    var [constructor, ...args] = [...arguments];
    var result = constructor.apply(newObj, args);
    newObj.__proto__ = constructor.prototype
    if (result && (typeof result === 'object' || typeof result === 'function')) {
        return result;
    }
    return newObj;
}
var b = _new(Person, '小黄');
console.log(b.name);
console.log(b.type);
// 实现一个忘了使用new也能实例化的构造函数
function Dog(name) {
    // 如果this不在原型链上，实例化并重新
    if (!(this instanceof Dog)) {
        return new Dog(name)
    }
    this.name = name
}
Dog.prototype.say = function () {
    console.log('wangwang!')
}
// let d1 =new Dog('小天')
let d1 =Dog('小天')
console.log(d1.name)
console.log(d1.say())