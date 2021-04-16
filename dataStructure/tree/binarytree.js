const bt = {
    val: 1,
    left: {
        val: 2,
        left: {
            val: 4,
            left: null,
            right: null,
        },
        right: {
            val: 5,
            left: null,
            right: null,
        },
    },
    right: {
        val: 3,
        left: {
            val: 6,
            left: null,
            right: null,
        },
        right: {
            val: 7,
            left: null,
            right: null,
        },
    },
};
// 会用递归和非递归的方法实现
/* 
非递归思路：递归实际上是利用了函数执行栈，所以我们可以使用栈来实现。
*/
// 先序遍历
/* 
1、访问根结点。
2、先序遍历它的左子树。
3、先序遍历它的右子树。
*/
const preorder = function (n) {
    if (!n) return
    console.log(n.val)
    preorder(n.left)
    preorder(n.right)
}
// 1、把根节点入栈 2、出栈节点访问 3、把当前节点的左右节点分别入栈（注意顺序）4、重复2、3操作直到队列为空
const preorder2 = function (n) {
    const stack = [n]
    while (stack.length > 0) {
        const curN = stack.pop()
        console.log(curN.val)
        // 注意顺序
        curN.right && stack.push(curN.right)
        curN.left && stack.push(curN.left)
    }
}
//  preorder2(bt)

// 中序遍历
/* 
1、中序遍历它的左子树。
2、访问根结点。
3、中序遍历它的右子数。
*/
const inorder = function (n) {
    if (!n) return
    inorder(n.left)
    console.log(n.val)
    inorder(n.right)
}
// 利用一个指针，指针指向一个节点时，把这个节点入栈，指针向当前节点的左节点移动，当指针移动到空节点时，出栈访问节点c，这时候说明c的左子树都访问完了，访问右子树
const inorder2 = function (n) {
    const stack = []
    let p = n
    while (p || stack.length > 0) { //当p指向存在时，说明还有右子树，对右子树进行同样的操作，当p指向不存在时，但是stack里有内容，取出当前，访问它的右子树（能取出，说明左子树已经访问完）
        while (p) {
            stack.push(p)
            p = p.left
        }
        const curN = stack.pop()
        console.log(curN.val)
        p = curN.right
    }
}
// inorder2(bt)

// 后序遍历
/* 
1、后序遍历它的左子树。
2、后序遍历它的右子数。
3、访问根结点。
*/
const postorder = function (n) {
    if (!n) return
    postorder(n.left)
    postorder(n.right)
    console.log(n.val)
}
// 先序遍历时一搜索到就访问，而后序遍历刚好相反，先搜索到的最后才访问，利用这点我们可以在先序遍历的基础上改良一下，新建一个数组来储存输出的值
const postorder2 = function (n) {
    const stack = [n]
    const arr = []
    while (stack.length > 0) {
        const curN = stack.pop()
        arr.push(curN.val)
        // 注意顺序
        curN.left && stack.push(curN.left)
        curN.right && stack.push(curN.right)
    }
    arr.reverse().forEach(i => {
        console.log(i)
    })
}
postorder2(bt)