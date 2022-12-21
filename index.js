const numbers = [3, 5, 11, 22, 55];

for (let n in numbers) {
  console.log(`${numbers[n]} в квадрате это ${numbers[n] ** 2}`);
}

const cities = {
  киев: "Украина",
  лондон: "Великобритания",
  таллин: "Эстония",
};

for (let c in cities) {
  console.log(`${c} это ${cities[c]}`);
}

const numbersAgain = [2, 6, 5, 9, 15, 0, 10, 4];

for (let na in numbersAgain) {
  if (numbersAgain[na] > 4 && numbersAgain[na] < 11) {
    console.log(`${numbersAgain[na]} больше четырёх но меньше одиннадцати`);
  }
}
