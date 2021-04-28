// 递归实现
function flatten(arr) {
    let res = []
    arr.forEach(item => {
        if (Array.isArray(item)) {
            res.push(...flatten(item))
        } else {
            res.push(item)
        }
    })
    return res
}
// toString实现
function flatten1(arr) {
    return arr.toString().split(',').map(item => +item)
}
const arr = [1, [2, [3, 4]]];
// console.log(flatten(arr));
let s = flatten1(arr)
console.log(s);