console.log("Value of age is:", age);
console.log("Age after addig 5 is:", addFiveToAge(age));
var age = 20;
// console.log("Adding 5 with 10: ", addFive(10));
console.log("Age after addig 5 is:", addFiveToAge(age));
console.log("Value of age is:", age);

function addFive(number) {
  var result = number + 5;
  return result;
}

function addFiveToAge(age) {
  return age + 5;
}
