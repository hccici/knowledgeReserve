/* 
原理：判断这个类的prototype是否在这个实例的原型链上
*/
function selfInstanceOf(i, c) {
    let p = i.__proto__;
    while (p !== c.prototype) {
        if (p === null) {
            return false;
        }
        p = p.__proto__;
    }
    return true;
}
function Animal() {}
function Cat() {}
function Dog() {}
Animal.prototype.say = function () {
    console.log("hi");
};
Cat.prototype.__proto__ = Animal.prototype;
Dog.prototype.__proto__ = Animal.prototype;
const lili = new Cat();
lili.say();
console.log(selfInstanceOf(lili, Cat));
console.log(selfInstanceOf(lili, Dog));
console.log(selfInstanceOf(lili, Animal));
