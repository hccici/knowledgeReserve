/*
     数组去重的4种方法
 */
const testArr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}];

console.log('1、利用set:');
function u1(arr){
    return Array.from(new Set(arr));
}
console.log(u1(testArr));

console.log('2、两层for循环+splice:');
function u2(arr) {
    const arrCopy = [].concat(arr);
    let length = arrCopy.length;
    for(let i = 0;i <length;i++){
        for(let j=i+1;j<length;j++){
            if(arrCopy[i]===arrCopy[j]){
                arrCopy.splice(j,1);
                // 去除后，要消除数组长度变化的副作用
                j--;
                length--;
            }
        }
    }
    return arrCopy;
}
console.log(u2(testArr));

console.log('3、利用indexOf:');// include、map也是同样原理
function u3(arr) {
    const newArr = [];
    for(let i=0;i<arr.length;i++){
        if(newArr.indexOf(arr[i])===-1){
            newArr.push(arr[i]);
        }
    }
    return newArr;
}
console.log(u3(testArr));

console.log('4、利用filter:');
function u4(arr) {
    return arr.filter((item,index)=>{
        return arr.indexOf(item) === index; 
    });
}
console.log(u4(testArr));