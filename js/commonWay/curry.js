/* 函数柯里化:
   把一个原本只能接受多个参数的函数（参数缺少会报错）变成一个可以接受一个或多个参数的函数，参数不完全时返回一个新的函数，接收余下原本该接收的参数，参数满足时，返回原本函数结果
*/
function curry(fn, ...args) {
    return fn.length > args.length
        ? (...newArgs) => curry(fn, ...args, ...newArgs)
        : fn(...args);

}
// 电影院活动： 学生7折、老人5折
function ticket(type, money) {
    if (type === 'student') {
        return money * 0.7;
    }
    if (type === 'oldMan') {
        return money * 0.5;
    }
}
//柯里化后
let cTicket = curry(ticket);
let studentTicket = cTicket('student'), oldManTicket = cTicket('oldMan');
console.log(studentTicket(20));
console.log(oldManTicket(20));
console.log(studentTicket(30));
console.log(oldManTicket(30));
/*
 柯里化的好处：
 参数复用：如上，计算不同电影的电影票价钱时，'student'写一遍就好
 提前返回：提前得到了学生票的优惠折扣studentTicket
 延迟执行：给出票的类型时，并不马上需要计算价钱，可以等待电影的价格（能够串起来使用）
*/