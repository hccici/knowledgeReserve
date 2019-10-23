/*
* js的数组是一个动态数组，有着其他语言数组没有的优势，push和shift方法能够轻松实现队列的功能。
* 为了更直观的使用队列，我们利用push和shift方法定义一个队列的构造函数
* */
function Queue() {
    this.dataSet=[];//维护的数组
    this.getSize=function () {
        return this.dataSet.length;
    };
    this.enqueue=function (data) {
        this.dataSet.push(data);
    };
    this.dequeue=function () {
        return this.dataSet.shift();
    };
    this.isEmpty=function () {
        return this.getSize()===0;
    };
    this.toString=function () {
        return dataSet
    }
}
export {
    Queue
} 