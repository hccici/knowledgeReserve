/* 
二分搜索只对排好序的数组有效
从中间开始找，如果中间值刚好等于直接返回，小于则在左边数组找，大于则在右边数组找
*/
function search(arr, target) {
    let lp = 0;
    let rp = arr.length - 1
    while (lp <= rp) {
        let mp = Math.floor((lp + rp) / 2)
        if (target < arr[mp]) {
            rp = mp - 1
        } else if (target > arr[mp]) {
            lp = mp + 1
        } else {
            return mp
        }
    }
    return -1
}
let a = [1, 3, 5, 7, 9]
console.log(search(a, 7))
console.log(search(a, 10))