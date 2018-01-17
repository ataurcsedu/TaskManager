var x = 0;
x = parseFloat((Math.random() * 10 + 1)); 

switch(x)  {
  case x >= parseFloat(5):
    console.log("the number is bigger than 5");
    break;
  case x <= parseFloat(5):
    console.log("the number is smaller than 5");
    break;
  default:
    console.log("strange number");
}

console.log(x);