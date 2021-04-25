/* 
(打扑克给牌排序)
O（n*2）
*/
Array.prototype.insertSort = function () {
    for (let i = 1; i < this.length; i++) {
        for (let j = i; j >= 0; j--) {
            if (this[j - 1] > this[j]) {
                let temp = this[j]
                this[j] = this[j - 1]
                this[j - 1] = temp
            } else {
                break
            }
        }
    }
}
let arr = [1, 34, 5, 7, 20, 9]
arr.insertSort()
console.log(arr)