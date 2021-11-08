/* Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。 */
const object1 = {};

Object.defineProperty(object1, 'property1', {
  value: 42,
  writable: false
});

object1.property1 = 77;
// throws an error in strict mode

console.log(object1.property1);
// expected output: 42

var o = {};
Object.defineProperty(o, 'a', {
  value: 1,
  configurable: false,
  writable: true
});
Object.defineProperty(o, 'a', {
  writable: false
});
o.a = 2
console.log(o.a)

/* 实现自存档对象 */
function Archive(keys) {
  const value = {};
  const history = {};
  keys.forEach((key) => {
    Object.defineProperty(this, key, {
      get() {
        return value[key]
      },
      set(val) {
        value[key] = val
        if (Array.isArray(history[key])) {
          history[key].push(val)
        } else {
          history[key] = [val]
        }
      }
    })
  })
  this.getValueHistory = function (key) {
    return history[key]
  }
}
/* const arc = new Archive(['a', 'b'])
console.log(arc.a)
arc.a = 1
arc.a = 2
console.log(arc.a)
arc.b = 3
console.log(arc.b)
arc.b = 4
console.log(arc.b)
console.log(arc.getValueHistory('a'))
console.log(arc.getValueHistory('b'))
console.log(arc.getValueHistory('c')) */

/* 
继承属性
*/

// 如果访问者的属性是被继承的，它的 get 和 set 方法会在子对象的属性被访问或者修改时被调用。如果这些方法用一个变量存值，该值会被所有对象共享。
// 所有类实例对象都可访问修改同一个资源

function myclass() {
}

var value;
Object.defineProperty(myclass.prototype, "x", {
  get() {
    return value;
  },
  set(x) {
    value = x;
  }
});

var a = new myclass();
var b = new myclass();
a.x = 1;
console.log(b.x); // 1

// 不像访问者属性，值属性始终在对象自身上设置，而不是一个原型。然而，如果一个不可写的属性被继承，它仍然可以防止修改对象的属性。

function myclass() {
}

myclass.prototype.x = 1;
Object.defineProperty(myclass.prototype, "y", {
  writable: false,
  value: 1
});

var a = new myclass();
a.x = 2;
console.log(a.x); // 2
console.log(myclass.prototype.x); // 1
a.y = 2; // Ignored, throws in strict mode
console.log(a.y); // ! 1
console.log(myclass.prototype.y); // 1