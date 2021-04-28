// 数的广度优先遍历和深度优先遍历
const tree = {
    val: 'a',
    children: [
        {
            val: 'b',
            children: [
                {
                    val: 'd',
                    children: [],
                },
                {
                    val: 'e',
                    children: [],
                }
            ],
        },
        {
            val: 'c',
            children: [
                {
                    val: 'f',
                    children: [],
                },
                {
                    val: 'g',
                    children: [],
                }
            ],
        }
    ],
};
// dfs 1、访问根节点 2、dfs它的子节点
const dfs = function (n) {
    console.log(n.val)
    n.children.forEach(child => {
        dfs(child)
    })
}
// dfs(tree)

// bfs 1、根节点入队 2、出队头结点并访问 3、把当前出队的头结点的孩子结点入队 4、直到队列为空，重复2、3操作
const bfs = function (root) {
    const q = [root]
    while (q.length > 0) {
        const n = q.shift()
        console.log(n.val)
        n.children.forEach(child => {
            q.push(child)
        })
    }
}
bfs(tree)