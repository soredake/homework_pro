console.log("Часть 1:");

const numbers = [3, 5, 11, 22, 55];

for (let n in numbers) {
  console.log(`${numbers[n]} в квадрате это ${numbers[n] ** 2}`);
}

console.log("Часть 2:");

const cities = {
  Киев: "Украина",
  Лондон: "Великобритания",
  Таллин: "Эстония",
};

for (let c in cities) {
  console.log(`${c} это ${cities[c]}`);
}

console.log("Часть 3:");

const numbersAgain = [2, 6, 5, 9, 15, 0, 10, 4];

for (let na in numbersAgain) {
  if (numbersAgain[na] > 4 && numbersAgain[na] < 11) {
    console.log(`${numbersAgain[na]} больше четырёх но меньше одиннадцати`);
  }
}
