/* 手动实现MyPromise的常用方法 基本异步版本*/
/* 三个状态 */
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
        const resolve = (value) =>{
            // 只有pending状态才能够改变
            if(this.status === pending){
                this.status = fulfilled;
                this.value = value; 
                this.onFulfilledCallback.forEach(fn=>{
                    fn && fn(value);
                });
            }
        };
        const reject = (reason) => {
            // 只有pending状态才能够改变
            if(this.status === pending){
                this.status = rejected;
                this.reason = reason;
                this.onRejectedCallback.forEach(fn=>{
                    fn && fn(reason);
                });
            }
        };
        try{
            exe(resolve, reject);
        }catch(err){
            reject(err);
        }
        
    }
    then(onFulfilled, onRejected) {
        /* 因为构造函数中不一定是异步操作，在调用then之前就已经执行resolve了，所有根据status判断是加入待执行数组，还是直接执行 */
        /* 利用setTimeout把onFulfilled, onRejected操作变成微任务，目的是保证在主代码都执行完毕后相应异步的代码才执行 */
        if(this.status === pending){
            this.onFulfilledCallback.push(onFulfilled);
            this.onRejectedCallback.push(onRejected);
        }else if(this.status === fulfilled){
            setTimeout(()=>{
                onFulfilled && onFulfilled(this.value);
            });
        }else {
            setTimeout(()=>{
                onRejected && onRejected(this.reason);
            });
        }
       
    }
    catch(onRejected) {
        this.then(undefined, onRejected);
    }
    static all(){}
    static resolve(){}
    static reject(){}
    static race(){}
}
// 异步操作的
new MyPromise((resolve)=>{
    setTimeout(()=>{
        resolve(100); 
    }, 1000);
}).then((value)=>{
    console.log(value);
});
// 直接返回结果的
new MyPromise((resolve)=>{
    resolve(200); 
}).then((value)=>{
    console.log(value);
});
console.log('end');