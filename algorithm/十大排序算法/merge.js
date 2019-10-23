/* 归并排序主要分为两个步骤：分和并,
分成最小的（数组中只有一个元素），合并的时候排序（合并时两个数组都是有序的）
*/
function merge(arr) {
    arr = [...arr]
    return _saperate_merge(arr)
}
function _saperate_merge(arr) {
    //达到最小,不再分
    if (arr.length <= 1) {
        return arr
    }
    let left, right, middleIndex;
    middleIndex = Math.floor(arr.length / 2)
    left = arr.slice(0, middleIndex)
    right = arr.slice(middleIndex)
    return _merge(_saperate_merge(left), _saperate_merge(right))
}
function _merge(left, right) {
    let tArr = []
    //这里的left和right都是有序的
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            tArr.push(left.shift())
        } else {
            tArr.push(right.shift())
        }
    }
    //合并三个数组（left和right其中一个为空,有数的里面的数都比tArr的大）
    return [...tArr, ...left, ...right]
}
let t = [1, 20, 3, 12, 99, 7, 20]
console.log(merge(t))