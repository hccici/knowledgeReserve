/* 来实现一下类上的静态方法 */
const pending = 'PENDING';
const fulfilled = 'FULFILLED';
const rejected = 'REJECTED';
class MyPromise {
    constructor(exe) {
        // 定义内部储存数据
        this.value = undefined; // 为了在then、catch中方便取值
        this.reason = undefined;
        this.status = pending;
        this.onFulfilledCallback = [];
        this.onRejectedCallback = [];
        const resolve = (value) => {
            // 只有pending状态才能够改变
            if (this.status === pending) {
                this.status = fulfilled;
                this.value = value;
                this.onFulfilledCallback.forEach(fn => {
                    fn && fn(value);
                });
            }
        };
        const reject = (reason) => {
            // 只有pending状态才能够改变
            if (this.status === pending) {
                this.status = rejected;
                this.reason = reason;
                this.onRejectedCallback.forEach(fn => {
                    fn && fn(reason);
                });
            }
        };
        try {
            exe(resolve, reject);
        } catch (err) {
            reject(err);
        }

    }
    then(onFulfilled, onRejected) {
        const self = this;
        // 1、始终返回一个MyPromise实例（np），实现链式调用
        return new MyPromise((resolve, reject) => {
            /* 因为构造函数中不一定是异步操作，在调用then之前就已经执行resolve了，所有根据status判断是加入待执行数组，还是直接执行 */
            /* 利用setTimeout把onFulfilled, onRejected操作变成微任务，目的是保证在宏代码都执行完毕后相应异步的代码才执行 */
            // 2、为了激活第二个then，第一个then中的onFulfilled或onRejected被调用之后，应该调用这个MyPromise实例中的resolve或reject，激活第二个then
            if (self.status === pending) {
                // 3、封装一个新方法，在调用onFulfilled之后调用resolve
                self.onFulfilledCallback.push(() => {
                    // 4、判断onFulfilled的返回值returnValue，如果returnValue是MyPromise的实例，
                    // *那么给returnValue设定一个then并把resolve, reject做为他的onFulfilled, onRejected，等待returnValue处理完异步后激活我们np的then
                    // 如果不是，激活我们np的then
                    try {
                        const returnValue = onFulfilled(self.value);
                        returnValue instanceof MyPromise ? returnValue.then(resolve, reject) : resolve(returnValue);
                    } catch (err) {
                        reject(err);
                    }
                });
                // 同理
                this.onRejectedCallback.push(() => {
                    try {
                        const returnValue = onRejected(self.reason);
                        returnValue instanceof MyPromise ? returnValue.then(resolve, reject) : reject(returnValue);
                    } catch (err) {
                        reject(err);
                    }
                });
            } else if (this.status === fulfilled) {
                setTimeout(() => {
                    if (onFulfilled) {
                        try {
                            const returnValue = onFulfilled(self.value);
                            returnValue instanceof MyPromise ? returnValue.then(resolve, reject) : resolve(returnValue);
                        } catch (err) {
                            reject(err);
                        }
                    }
                });
            } else {
                setTimeout(() => {
                    if (onRejected) {
                        try {
                            const returnValue = onRejected(self.reason);
                            returnValue instanceof MyPromise ? returnValue.then(resolve, reject) : reject(returnValue);
                        } catch (err) {
                            reject(err);
                        }
                    }
                });
            }
        });
    }
    catch(onRejected) {
        this.then(undefined, onRejected);
    }
    static all(arr) {
        let index = 0
        const res = []
        return new MyPromise((resolve, reject) => {
            // 遍历数组
            while (index < arr.length) {
                // 因为数组中不都是promise，所以同意转成promise
                MyPromise.resolve(arr[index]).then((val) => {
                    res.push(val)
                    if (res.length === arr.length) {
                        resolve(res)
                    }
                }, (reason) => {
                    reject(reason)
                })
                index++
            }
        })
    }
    static resolve(val) {
        // 如果是promise，返回原来这个promise
        if (val instanceof MyPromise) {
            return val
        }
        return new MyPromise((resolve, reject) => {
            resolve(val)
        })
    }
    static reject(reason) {
        if (reason instanceof MyPromise) {
            return reason
        }
        return new MyPromise((resolve, reject) => {
            reject(reason)
        })
    }
    static race(arr) {
        let index = 0
        return new MyPromise((resolve, reject) => {
            // 遍历数组
            while (index < arr.length) {
                // 因为数组中不都是promise，所以同意转成promise
                MyPromise.resolve(arr[index]).then((val) => {
                    resolve(val)
                }, (reason) => {
                    reject(reason)
                })
                index++
            }
        })
    }
}
/* var p = MyPromise.resolve([10,2,3]);
p.then(function(v) {
  console.log(v[0]); // 10
}); */

/* var original = MyPromise.resolve(33);
var cast = MyPromise.resolve(original);
cast.then(function (value) {
    console.log('value: ' + value);
});
console.log('original === cast ? ' + (original === cast)); */

var p1 = MyPromise.resolve(3);
var p2 = 1337;
var p3 = new MyPromise((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
});

MyPromise.all([p1, p2, p3]).then(values => {
    console.log(values); 
});

var p4 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        reject('xixi')
    }, 1000);
})
MyPromise.all([p2, p4, p3]).then(values => {
    console.log(values);
}, (reason) => {
    console.log(reason)
});
MyPromise.race([p3, p4]).then(values => {
    console.log(values); 
}, (reason) => {
    console.log(reason)
})