console.log("Часть 1:");

let ext;

function sum(x) {
  console.log(x);
  return function (y) {
    // x = 3
    // y = 5
    ext = x + y; // 8
    x = ext;
    // console.log(`x равно ${x}`);
    // console.log(`y равно ${y}`);
    // console.log(`ext равно ${ext}`);
    return ext;
  };
}

let add = sum(3);

// console.log(add(3));
console.log(add(5));
console.log(add(20));

// sum(3) = 3
// sum(5) = 8
// sum(20) = 28

console.log("Часть 2:");

const array = [1, 2, 3, 4, 5, 6, 7];

console.log(array);

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
