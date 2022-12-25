function sum(num1 = 0) {
  return function (num2) {
    num1 = num1 + num2;
    return num1;
  };
}

let add = sum();

console.log(add(3));
console.log(add(5));
console.log(add(20));

const array = [1, 2, 3, 4, 5, 6, 7];

// вариант подлиннее
// function removeElement(array, element) {
//   for (let i in array) {
//     if (array[i] == element) {
//       array.splice(i, 1);
//       return array;
//     }
//   }
// }

function removeElement(array, element) {
  array.splice(array.indexOf(element), 1);
  return array;
}

console.log(removeElement(array, 5));
