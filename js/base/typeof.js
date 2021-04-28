/* 
JavaScript有八种内置类型：
空值（null)
未定义(undefined)
布尔值（boolean)
数字（number)
字符串（string)
对象 (object)
符号（symbol, ES6中新增)
大整数（BigInt, ES2020 引入）

ps：除对象外，其他统称为“基本类型”。
*/
console.log(typeof null) // 'object'

console.log(typeof undefined) // "undefined"
console.log(typeof false) // "boolean"
console.log(typeof 1) // "number"
console.log(typeof '1') // "string"
console.log(typeof {}) // "object" 
console.log(typeof []) // "object" 
console.log(typeof new Date()) // "object"
console.log(typeof Symbol()) // "Symbol"
console.log(typeof 123n) // 'bigint'

/* 注意：虽然返回function，但是function不是js的内置类型，它是object的子类。 ！typeof 可以用来区分函数其他对象。*/
function foo() {}
console.log(typeof foo) // 'function'

/* 使用 typeof不能 判断对象具体是哪种类型。所有typeof 返回值为 "object" 的对象（如数组，正则等）都包含一个内部属性 [[class]](我们可以把它看做一个内部的分类)。这个属性无法直接访问，一般通过 Object.prototype.toString(...)来查看。
 */

console.log(Object.prototype.toString.call(new Date)) // "[object Date]"
console.log(Object.prototype.toString.call([])) // "[object Array]"
console.log(Object.prototype.toString.call(/reg/ig)) // "[object RegExp]"

/* 
instanceof 运算符也常常用来判断对象类型 */
[1] instanceof Array; // true
[1] instanceof Object; // true
[1] instanceof RegExp; // false
new Date instanceof Date; // true

/* 
typeof原理： 不同的对象在底层都表示为二进制，在Javascript中二进制前（低）三位存储其类型信息。

000: 对象
010: 浮点数
100：字符串
110： 布尔
1： 整数

typeof null 为"object", 原因是因为 不同的对象在底层都表示为二进制，在Javascript中二进制前（低）三位都为0的话会被判断为Object类型，null的二进制表示全为0，自然前三位也是0，所以执行typeof时会返回"object"

*/
