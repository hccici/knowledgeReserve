/* 
1、循环n-1趟
2、两两比较，大（小）于的交换位置
O（n*2）
*/
Array.prototype.bubbleSort = function () {
    for (let i = 0; i < this.length - 1; i++) {
        for (let j = 0; j < this.length - 1 - i; j++) {
            if (this[j] > this[j + 1]) {
                let temp = this[j]
                this[j] = this[j + 1]
                this[j + 1] = temp
            }
        }
    }
}
let arr = [1, 34, 5, 7, 20]
arr.bubbleSort()
console.log(arr)