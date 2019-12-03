/* 经典面向对象语言中例如java，要创建一个实例对象，必须要有类，所以对单例模式的定义是：保证一个类只有一个实例，
并提供一个全局访问点。但是js中并没有类的定义（es6出现了类的语法糖），但是也可以通过new和原型链模拟出来。 */
/* 下面不管new了几次，获取到的都是同一个对象 */
//1、普通实现,创建一个变量来记录这个实例是否存在，同时要使用闭包避免这个变量对全局的污染，只有new这个类的过程中，才能访问到
var Cat = (function () {
    var single;
    return function (name) {
        if (single) {
            return single
        }
        this.name = name
        single = this
    }
})()
var cat1 = new Cat('噜噜')
var cat2 = new Cat('饱饱')
console.log("cat1: ", cat1)
console.log("cat2: ", cat2)
console.log("cat1===cat2: ", cat1 === cat2)
//都是同一只猫。有时候我们又想获取不同的猫，所以可以把创建实例的部分和管理单例部分分开来。
//2、使用单例方法包装普通的类。
function createSingleton(fn) {//注意这里的fn一定要返回一个值
    var single;
    return function () {
        return single || (single = fn.apply(this, arguments))
    }
}

var Dog = function (name) {
    this.name = name
    return this //注意这里的fn一定要返回一个值
}
var DogKing=createSingleton(Dog)
var dog1 = new DogKing('明明')
var dog2 = new DogKing('白白')
console.log("dog1: ", dog1)
console.log("dog2: ", dog2)
console.log("dog1===dog2: ", dog1 === dog2)
/* js中对于单例模式的定义是： 返回的是同一个对象。
事实上js中的类就是一个函数，更多对于单例模式应用，是这个函数无论调用多少次，只执行一次。 */
// 例如：模拟一个按钮无论点击多少次，只能签到一次
var comeNum=0;
var _clickCome=function(){
    comeNum++
    return true //返回真值
}
var clickCome=createSingleton(_clickCome)
clickCome()
clickCome()
clickCome()
clickCome()
console.log(comeNum)