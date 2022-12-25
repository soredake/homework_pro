function sum(base = 0) {
  return function (num2) {
    base = base + num2;
    console.log(base);
  };
}

let add = sum();

add(3);
add(5);
add(20);

const array = [1, 2, 3, 4, 5, 6, 7];

// вариант подлиннее
// function removeElement(array, element) {
//   for (let i in array) {
//     if (array[i] == element) {
//       array.splice(i, 1);
//     }
//   }
// }

function removeElement(array, element) {
  array.splice(array.indexOf(element), 1);
}

removeElement(array, 5);
console.log(array);
