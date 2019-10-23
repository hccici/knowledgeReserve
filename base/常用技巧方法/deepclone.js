/* 
  使用递归实现：输入旧对象,返回新对象。
  拆解：输入值是object类型，创建一个新的newObj,为了给它赋值，递归输入对象的属性，当输入值不是object类型的时候返回这个值，最终返回一个新对象。
*/
function deepclone(oldObj) {
    if (typeof oldObj === 'object' && oldObj !== null) {//typeof null得到'object'
        var newObj = oldObj.constructor()//[]、{},这里原型链上的属性已经附上
        for(var key in oldObj){
            if(oldObj.hasOwnProperty(key)){//只赋值自己的属性
                newObj[key]=deepclone(oldObj[key])
            }
        }
        return newObj
    }
    //递归出口，返回简单数据类型
    // 如果是regexp、和date，新建后返回
    if(oldObj instanceof Date){
        return new Date(oldObj)
    }
    if(oldObj instanceof RegExp){
        return new RegExp(oldObj)
    }
    return oldObj
}
var student1={
    name: '小蔡',
    hobby: ['唱跳','rap','篮球'],
    say: function(){
        console.log('汪汪')
    },
    family: {
        father: {
            name: '大蔡'
        }
    }
}
var student2=deepclone(student1);
student1.family.father=null
console.log(student1)
console.log(student2)