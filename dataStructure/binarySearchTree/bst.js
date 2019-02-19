/*
* 二分搜索树特性：
* 1、所有的左孩子小于其父节点，所有的右孩子大于其父节点
* 2、中序遍历的结果是一个从小到大排列的结果
* */

//定义一个节点的构造函数
function Node(data, left, right) { //维护的数据，左孩子，右孩子
    this.data = data;
    this.left = left;
    this.right = right;
}

//定义一个二分搜索数构造函数
function BST() {
    this.root = null;//初始化时根节点为空
    this.size = 0;//初始化时节点数量为0
    /*返回当前节点数*/
    this.getSize = function () {
        return this.size;
    };
    /*判断该树是否为空*/
    this.isEmpty = function () {
        return this.size === 0;
    };
    /*向二分搜索树中添加新的元素*/
    this.insert = function (data) {
        /* 向以node为根节点的树中插入元素，返回插入新节点后该树的根。
        * 这个函数不暴露给使用者，因为用户不必去关心怎么插入节点，使得新的树还能保持二分搜索树的特性。
        * 采用递归的方法: 分解成小问题（递归入口）:向一棵二分搜索树插入新节点=向它的左或者右子树插入新的节点，新的子树再连上原本子树的父节点，
        * 基本问题（递归出口）：当要插入的树的根节点为null时，说明已经到了最后位置，把新的节点作为新的子树返回给上一级
        * */
        var _this = this;

        function _insert(node, data) {
            if (node == null) {
                _this.size++;
                return new Node(data, null, null)
            }
            if (data > node.data) {
                node.right = _insert(node.right, data)
            } else if (data < node.data) {
                node.left = _insert(node.left, data)
            }
            //注意_insert一定要返回当前作用树的根节点，无论改没改变，还有就是当数据在搜索树中已经存在了，就什么也不做，返回当前作用树的根节点
            return node;
        }

        this.root=_insert(this.root, data);
    };
    /*二分搜索树的前序遍历*/
    this.preOrder = function () {
        /*递归:分：读取当前树的根节点+访问当前根节点的左孩子+访问当前根节点的右孩子，基：当前树为空*/
        var rst=[];
        function _preOrder(node) {
            if (node == null) {
                return
            }
            rst.push(node.data);
            _preOrder(node.left);
            _preOrder(node.right);
        }
        _preOrder(this.root);
        return rst;
    };
    /*二分搜索树的中序遍历*/
    this.inOrder = function () {
        var rst=[];
        /*递归:分：读取当前树的根节点+访问当前根节点的左孩子+访问当前根节点的右孩子，基：当前树为空*/
        function _inOrder(node) {
            if (node == null) {
                return
            }
            _inOrder(node.left);
            rst.push(node.data);
            _inOrder(node.right);
        }
        _inOrder(this.root);
        return rst;
    };
    /*二分搜索树的后序遍历*/
    this.postOrder = function () {
        var rst=[];
        /*递归:分：读取当前树的根节点+访问当前根节点的左孩子+访问当前根节点的右孩子，基：当前树为空*/
        function _postOrder(node) {
            if (node == null) {
                return
            }
            _postOrder(node.left);
            _postOrder(node.right);
            rst.push(node.data);
        }
        _postOrder(this.root);
        return rst;
    };

}