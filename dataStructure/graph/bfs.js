/* 口诀：
1、新建一个队列，把根节点入队,并记录、访问。
2、队头出队，把当前出队的节点的相邻节点（未访问过的）入队并记录、访问。
3、如果队列还有数据，重复2操作，直到队列为空。
*/
const data = require('./data')
const bfs = (n) => {
    const visited = new Set()
    const queue = [n]
    console.log(n)
    visited.add(n)
    while (queue.length !== 0) {
        const e = queue.shift()
        data[e].forEach(item => {
            if (!visited.has(item)) {
                queue.push(item)
                console.log(item)
                visited.add(item)
            }
        })
    }
}
bfs('2')