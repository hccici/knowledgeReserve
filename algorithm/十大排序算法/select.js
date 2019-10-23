function select(arr) {
    arr = [].concat(arr)
    let minIndex
    for (let i = 0; i <= arr.length - 2; i++) {
        minIndex = i//每次选择是，总是选择第一个数为最小的
        for (let j = i + 1; j <= arr.length - 1; j++) {
            if (arr[minIndex] > arr[j]) {
                minIndex = j
            }
        }
        // 把最小的数方法放到最前面
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
    return arr
}
let t = [1, 20, 3, 12, 99, 7]
console.log(select(t))