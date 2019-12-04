/* 回文数 */
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
module.exports={}