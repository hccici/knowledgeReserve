/* 口诀：
1、访问根节点。
2、对跟节点的相邻节点（未访问过的）进行深度优先遍历（递归了，重复1）
*/
const data = require('./data')
const visited = new Set()
const dfs = (n) => {
    console.log(n)
    visited.add(n)
    data[n].forEach(item => {
        if (!visited.has(item)) {
            dfs(item)
        }
    })
}
dfs('2');