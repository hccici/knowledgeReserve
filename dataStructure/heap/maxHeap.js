/*最大堆特性：
* 1、数据结构一颗特殊的完全二叉树（从最右边开始缺）。
* 2、堆顶元素是这个数据集中最大的元素。、
* 3、可以用数组实现，下面以索引从0开始的数组实现，下面是数组实现最大堆的特性:
*      1、对于当前节点（索引为n），其左孩子的索引等于2*n+1。
*      2、对于当前节点（索引为n），其右孩子的索引等于2*n+2。
*      3、对于当前节点（索引为n），其父节点索引等于Math.floor((n-1)/2)
* */
function MaxHeap(dataSet) {
    var _this = this;
    /*获取大小*/
    this.getSize = function () {
        return this.dataSet.length;
    };
    /*判断是否为空*/
    this.isEmpty = function () {
        return this.getSize() === 0;
    };
    /*向堆中添加元素*/
    this.add = function (data) {
        //为了不破坏最大堆的栈顶元素（index=0）是这个数据集的最大元素，我们添加data到数组末尾后要有一个上浮
        this.dataSet.push(data);
        siftUp(this.getSize() - 1);
    };
    /*查看堆中最大元素*/
    this.getMax = function () {
        return this.dataSet[0];
    };

    /*根据当前节点的索引得到其父节点的索引*/
    function parentIndex(index) {
        if (index === 0) {
            return 0;
        } else {
            return Math.floor((index - 1) / 2);
        }
    }

    /*根据当前节点的索引得到其左节点的索引*/
    function leftIndex(index) {
        return 2 * index + 1;
    }

    /*根据当前节点的索引得到其右节点的索引*/
    function rightIndex(index) {
        return 2 * index + 2;
    }

    /*使指定索引的元素上浮,直到碰到比它大的元素*/
    function siftUp(index) {
        while (index > 0 && _this.dataSet[index] > _this.dataSet[parentIndex(index)]) {
            var t = _this.dataSet[index];
            _this.dataSet[index] = _this.dataSet[parentIndex(index)];
            _this.dataSet[parentIndex(index)] = t;
            index = parentIndex(index);
        }
    }

    /*使指定索引的元素下沉，直到碰到比它小的元素*/
    function siftDown(index) {
        var maxSon;
        //选出其左右节点最大的，与其交换位置，使大的上浮
        while (leftIndex(index) < _this.getSize()) {
            maxSon = leftIndex(index);
            //如果当前索引的节点有右节点，也就是maxSon+1没有超出边界
            if ((maxSon + 1) < _this.getSize() && _this.dataSet[maxSon + 1] > _this.dataSet[maxSon]) {
                maxSon++;//maxSon指向最大的
            }
            //如果当前索引的节点比他的左右节点都要大,终止循环
            if (_this.dataSet[index] >= _this.dataSet[maxSon]) {
                break;
            } else {  //与最大子节点交换位置，使得最大的上浮
                var t = _this.dataSet[index];
                _this.dataSet[index] = _this.dataSet[maxSon];
                _this.dataSet[maxSon] = t;
                index = maxSon;
            }
        }
    }

    if (dataSet != null) {
        this.dataSet = dataSet;
        //使所有的非叶子节点下沉
        for (var i = parentIndex(this.dataSet.length); i >= 0; i--) {
            siftDown(i);
        }
    } else {
        this.dataSet = [];
    }


}
var mh = new MaxHeap([1, 20, 4, 5, 18, 7, 13]);
console.log(mh.getMax());
mh.add(90);
console.log(mh.getMax());
mh.add(2);
console.log(mh.getMax());