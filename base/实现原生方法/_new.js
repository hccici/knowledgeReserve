function Person(name) {
    this.name = name
}
var a = new Person('小明')
console.log(a);
function _new() {
    //1、创建一个新的对象a。2、使用a去执行这个构造函数（即这个构造函数中的this指向a）3、这个构造函数是否返回一个对象，是_new返回这个对象，否返回a
    var newObj = {}
    var [constructor, ...args] = [...arguments]
    var result = constructor.apply(newObj, args)
    if (result && (typeof result === 'object' || typeof result === 'function')) {
        return result
    }
    return newObj
}
var b=_new(Person,'小黄');
console.log(b)
