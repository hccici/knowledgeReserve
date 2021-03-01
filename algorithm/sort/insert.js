function insert(arr) {
    arr = [].concat(arr)
    for (let i = 0; i <= arr.length - 1; i++) {
        for (let j = i - 1; j >= 0; j--) {//要从大到小来比较，这样找到后，后面元素才不用后移一位，在比较的过程中就可以把大的元素移动
            if (arr[j + 1] < arr[j]) {
                [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
            }
        }
    }
    return arr
}

function a(func) {
    func()
}
a(a => 1)
let t = [1, 20, 3, 12, 99, 8, 20]
console.log(insert(t))