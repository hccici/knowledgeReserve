/*
1、循环n-1趟
2、在数组中选择最小的数下标，然后给交换到前面去
O（n*2）
*/
Array.prototype.selectSort = function () {
    for (let i = 0; i < this.length - 1; i++) {
        let minIndex = i
        for (let j = i + 1; j < this.length; j++) {
            if (this[minIndex] > this[j]) {
                minIndex = j
            }
        }
        if(minIndex !== i){
            let temp = this[i]
            this[i] = this[minIndex]
            this[minIndex] = temp
        }
    }
}
let arr = [1, 34, 5, 7, 20]
arr.selectSort()
console.log(arr)