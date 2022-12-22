console.log("Часть один:");

const length = 4;
const valueToFill = "hello";
let arrayToFill = [];

function fillArray(length, valueToFill) {
  console.log(`Количество элементов для заполнения: ${length}`);
  console.log(`Чем заполняем: ${valueToFill}`);
  for (let i = 0; i < length; i++) {
    arrayToFill.push(valueToFill);
  }
  return arrayToFill;
}

console.log(fillArray(length, valueToFill)); // ['hello', 'hello', 'hello', 'hello']

console.log("Часть два:");

let obj = {
  width: 10,
  height: 5,
  title: "Test Array",
  count: 4,
};

function multiplyNumeric(obj) {
  
}

// console.log(multiplyNumeric(obj));
// {
//   width: 100,
//   height: 25,
//   title: 'Test Array',
//   count: 16
// }
