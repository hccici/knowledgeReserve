/* 1、回文数 */
var isPalindrome = function (x) {
    if (x < 0 || (x % 10 === 0 && x !== 0)) {
        return false
    }
    var v = 0;
    while (x > v) {
        v = v * 10 + (x % 10)
        x = Math.floor(x / 10)
    }
    return x === v || x === (Math.floor(v / 10))
};
console.dir(isPalindrome(11))
/* 2、在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。 */
function Find(target, array) {
    //从左下角开始找
    var point = { x: 0, y: array.length - 1 }, range = { x: array[0].length - 1, y: 0 }
    while (point.x <= range.x && point.y >= range.y) {
        if (target > array[point.y][point.x]) {
            point.x += 1
        } else if (target < array[point.y][point.x]) {
            point.y -= 1
        } else if (target === array[point.y][point.x]) {
            return true
        }
    }
    return false
}
/* 3、替换空格 */
function replaceSpace(str) {
    return str.replace(/\s/g, function (t) {
        console.log(t)
        return '%20'
    })
}
console.log(replaceSpace('ss ss'))
module.exports = {}
/* 斐波那契序列 */
function Fibonacci(n) {
    if (n === 0 || n === 1) {
        return n
    }
    return Fibonacci(n-1)+Fibonacci(n-2)
}
console.log('Fibonacci',Fibonacci(39))