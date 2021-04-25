/* 归并排序主要分为两个步骤：分和并,
分成最小的（数组中只有一个元素），合并的时候排序（合并时两个数组都是有序的）
O(nlogn)
*/
Array.prototype.mergeSort = function () {
    function exc(arr) {
        // 分到数组中还剩一个就行了
        if (arr.length === 1) {
            return arr
        }
        const mid = Math.floor(arr.length / 2)
        const leftArr = []
        const rightArr = []
        for (let i = 0; i < arr.length; i++) {
            if (i < mid) {
                leftArr.push(arr[i])
            } else {
                rightArr.push(arr[i])
            }
        }
        // 得到排好序的数组
        const orderLeftArr = exc(leftArr)
        const orderRightArr = exc(rightArr)
        // 合并的时候排序
        const resArr = []
        while (orderLeftArr.length > 0 || orderRightArr.length > 0) {
            if (orderLeftArr.length > 0 && orderRightArr.length > 0) {
                resArr.push(orderRightArr[0] > orderLeftArr[0] ? orderLeftArr.shift() : orderRightArr.shift())
            } else if (orderLeftArr.length > 0) {
                resArr.push(orderLeftArr.shift())
            } else {
                resArr.push(orderRightArr.shift())
            }
        }
        return resArr
    }
    const res = exc(this)
    res.forEach((item, key) => {
        this[key] = item
    })
}
const t = [1, 20, 3, 12, 99, 7, 20]
t.mergeSort()
console.log(t)