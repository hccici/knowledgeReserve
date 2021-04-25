/*最小堆特性：
* 1、数据结构一颗特殊的完全二叉树（从最右边开始缺）。
* 2、堆顶元素是这个数据集中最小的元素。、
* 3、可以用数组实现，下面以索引从0开始的数组实现，下面是数组实现最大堆的特性:
*      1、对于当前节点（索引为n），其左孩子的索引等于2*n+1。
*      2、对于当前节点（索引为n），其右孩子的索引等于2*n+2。
*      3、对于当前节点（索引为n），其父节点索引等于Math.floor((n-1)/2)
* */
class MinHeap {
    constructor() {
        this.heap = []
    }
    _getParentIndex(index) {
        return Math.floor((index - 1) / 2)
    }
    _getLeftIndex(index) {
        return 2 * index + 1
    }
    _getRightIndex(index) {
        return 2 * index + 2
    }
    _swap(i1, i2) {
        const temp = this.heap[i1]
        this.heap[i1] = this.heap[i2]
        this.heap[i2] = temp
    }
    _shiftUp(index) {
        if (index === 0) return // 如果是栈顶元素，就不操作了
        const parentIndex = this._getParentIndex(index)
        const parentData = this.heap[parentIndex]
        const curData = this.heap[index]
        if (curData < parentData) {
            this._swap(index, parentIndex)
            this._shiftUp(parentIndex)
        }
    }
    _shiftDown(index) {
        const leftIndex = this._getLeftIndex(index)
        const rightIndex = this._getRightIndex(index)
        // 如果左节点不存在，说明已经到最底了
        if (!this.heap[leftIndex]) return
        let compareIndex = leftIndex
        if (this.heap[leftIndex] > this.heap[rightIndex]) { // 2 > undifine false
            compareIndex = rightIndex
        }
        if (this.heap[index] > this.heap[compareIndex]) {
            this._swap(index, compareIndex)
            this._shiftDown(compareIndex)
        }
    }
    // 插入元素时，应该插入数组尾部，然后不断上移，直到移动到合适位置
    insert(data) {
        this.heap.push(data)
        this._shiftUp(this.heap.length - 1)
    }
    // 删除堆顶时，为了不破坏原有结构，用组尾替换组顶，删除组尾，并且堆顶开始下沉，直到出现在合适位置
    delete() {
        this.heap[0] = this.heap.pop()
        this._shiftDown(0)
    }
    size() {
        return this.heap.length
    }
    get() {
        return this.heap[0]
    }
}
const heap = new MinHeap()
heap.insert(5)
heap.insert(10)
heap.insert(2)
heap.insert(3)
heap.delete()
heap.delete()