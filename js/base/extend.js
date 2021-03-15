function Parent() {
    this.isShow = true
    this.info = {
        name: "yhd",
        age: 18,
    };
 }
 
 Parent.prototype.getInfo = function() {
    console.log(this.info);
    console.log(this.isShow); // true
 }
 
 function Child() {};
 Child.prototype = new Parent();
 
 let Child1 = new Child();
 Child1.info.gender = "男";
 Child1.getInfo();  // {name: "yhd", age: 18, gender: "男"}
 
 let child2 = new Child();
 child2.getInfo();  // {name: "yhd", age: 18, gender: "男"}
 child2.isShow = false
 
 console.log('ss',Child1.isShow); // false
 