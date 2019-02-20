/*
* 二分搜索树特性：
* 1、左子树的所有节点小于其父节点，右子树的所有节点大于其父节点
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

        this.root = _insert(this.root, data);
    };
    /*二分搜索树的前序遍历*/
    this.preOrder = function () {
        /*递归:分：读取当前树的根节点+访问当前根节点的左孩子+访问当前根节点的右孩子，基：当前树为空*/
        var rst = [];

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
        var rst = [];

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
        var rst = [];

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
    /*二分搜索树的层序遍历*/
    this.levelOrder = function () {
        /* 实现层序遍历需要借助队列这个数据结构，规则如下：
        *    1、访问一个节点时，把这个节点入列。
        *    2、把节点出列操作这个节点数据时，同时如果这个节点有左右节点，把左右节点入列
        * */
        var rst = [];
        var queue = new Queue();
        queue.enqueue(this.root);
        while (!queue.isEmpty()) {
            //出列
            var cur = queue.dequeue();
            rst.push(cur.data);
            //入列
            if (cur.left != null) {
                queue.enqueue(cur.left)
            }
            if (cur.right != null) {
                queue.enqueue(cur.right)
            }
        }
        return rst;
    };
    /*寻找最小元素*/
    this.getMin = function () {
        //根据特性最小节点一定是最左下角的节点
        var cur = this.root;
        var prev;
        while (cur != null) {
            prev = cur;
            cur = cur.left
        }
        return prev.data;
    };
    /*寻找最大元素*/
    this.getMax = function () {
        //根据特性，最大元素一定在最右下角
        var cur = this.root, prev;
        while (cur != null) {
            prev = cur;
            cur = cur.right;
        }
        return prev.data;
    };
    /*删除树中存在的元素*/
    this.remove = function (data) {
        /* 递归思想：
        *  入：两种种情况，1、当前节点连上，在其左子树移除元素后返回的节点。
        *             2、当前节点连上，在其左子树移除元素后返回的节点。
        *  出：两种情况，1、找不到待删除元素。
        *             2、找到了元素，删除了当前节点。
        * */
        // 删除掉以node为根的二分搜索树中值为e的节点, 递归算法
        // 返回删除节点后新的二分搜索树的根
        var _this = this;

        function _remove(node, data) {
            /*出口*/
            //找不到删除元素
            if (node == null) {
                return null
            }
            //删除了当前根节点
            if (node.data === data) {
                //当前节点没有左子树,当前节点位置由其右节点占据
                if (node.left == null) {
                    _this.size--;
                    return node.right;//返回右子树的根节点，由上一层函数指向
                }
                //当前节点没有右子树，当前节点位置由其左节点占据 
                else if (node.right == null) {
                    _this.size--;
                    return node.left;
                }
                //当前节点有左右子树，用右子树的最小节点代替
                else {
                    var cur = node.right, prev;
                    while (cur.left != null) {
                        prev = cur;
                        cur = cur.left
                    }
                    prev.left = null;
                    _this.size--;
                    cur.left = node.left;
                    cur.right = node.right;
                    return cur;//返回上一层函数
                }
            }
            /*入口*/
            //当在右子树中删除了节点
            if (data > node.data) {
                node.right = _remove(node.right, data);
                return node;//记得这个函数都要返回修改过后的根节点
            } else {
                node.left = _remove(node.left,data);
                return node;
            }
        }

        _remove(_this.root,data);
    }
}