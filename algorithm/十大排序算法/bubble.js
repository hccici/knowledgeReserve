function bubble(arr) {
    arr = [].concat(arr)
    for (let i = 0; i <= arr.length - 1; i++) {//比较多少趟，因为经过length-1次排序后，0位置肯定是最小的，所以不用比较了
        for (let j = 0; j <= arr.length - 1 - i; j++) {//比较两个相邻元素，因为外循环每次结束后，最后一个一定是最大的，所以不用比较了
            let temp;
            if (arr[j] > arr[j + 1]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr
}
let t = [1, 20, 3, 12, 99, 7]
console.log(bubble(t))