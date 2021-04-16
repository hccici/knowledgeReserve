// apply的实现
Function.prototype.c_apply = function (c, a) {
    var context = c || window
    var args = a || []
    context.fn = this
    var result = context.fn(...args)
    delete context.fn
    return result
}
// call、bind基于apply
Function.prototype.c_call = function () {
    var context = arguments[0] || window
    var args = []
    for (var i = 1; i < arguments.length; i++) {
        args.push(arguments[i])
    }
    return this.c_apply(context, args)
}
Function.prototype.c_bind = function() {
    var args = [...arguments]
    return function() {
        Function.prototype.c_call(...args)
    }
}
var dog = {
    say: '汪汪'
}
var cat = {
    say: '喵喵'
}
function say(str) {
    console.log(this.say, str)
}
say.c_apply(dog, ['你好'])
say.c_call(cat, '嘻嘻')

var t = say.bind(dog, '哈哈')
t()