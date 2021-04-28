function fn(a){

    console.log(1,a);   // function
    var a=123;
  
    console.log(2,a); // 123
  
    function a(){}
  
    console.log(3,a); // 123
    console.log(4,b);
    var b = function(){}
  
    console.log(5,b); // function
  }
  
  fn(1)