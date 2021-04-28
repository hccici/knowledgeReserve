/* 获取指定范围、数量的随机数 */
function getRandoms(start, end, nums) {
    let res = []
    for (let i = 0; i < nums; i++) {
        res.push(getRandom(start, end))
    }
    return res
}
function getRandom(start, end) {
    let d = start - end;
    return end + Math.round(Math.random() * d)
}
console.log(getRandoms(10, 20, 2))