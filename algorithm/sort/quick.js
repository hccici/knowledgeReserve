/* 
1、选取一个基准值。
2、把比这个小的放到一个数组（左），大的放到一个数组（右）。
3、对左右数组再进行快速排序，重组后得到排好序的数组。
O(nlogn)
*/
function quick(arr) {
    //如果数组中只有一个数或者为空，那么返回
    if (arr.length < 2) {
        return arr
    }
    let pivot = arr[0], left = [], right = []
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] >= pivot) {
            right.push(arr[i])
        } else {
            left.push(arr[i])
        }
    }
    return [...quick(left), pivot, ...quick(right)]
}
let t = [1, 20, 3, 12, 99, 8, 20]
console.log(quick(t))