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

console.log(fillArray(length, valueToFill));

console.log("Часть два:");

let obj = {
  width: 10,
  height: 5,
  title: "Test Array",
  count: 4,
};

function multiplyNumeric(obj) {
  if (typeof obj != "object") {
    console.log("Это не объект :(");
  } else {
    for (const key in obj) {
      if (typeof obj[key] == "number") {
        obj[key] = obj[key] ** 2;
      } else {
        console.log(`Ключ '${key}' - не цифра, пропускаем`);
      }
    }
  }
  return obj;
}

console.log(multiplyNumeric(obj));
