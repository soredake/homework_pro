"use strict";

// Студент номер 1
const frequentlyAbsentStudent = new Student(
  "absent",
  "student",
  "2002",
  [45, 50, 60, 55, 65, 70, 55, 63, 44]
);

console.log("Студент номер 1:");
console.log(frequentlyAbsentStudent);
console.log("Возраст: " + frequentlyAbsentStudent.age);
console.log("Cредняя оценка: " + frequentlyAbsentStudent.averageMark);

for (let i = 0; i < 5; i++) {
  frequentlyAbsentStudent.present();
}

for (let i = 0; i < 20; i++) {
  frequentlyAbsentStudent.absent();
}

console.log(frequentlyAbsentStudent.summary());

// Студент номер два
const okayStudent = new Student(
  "okay",
  "student",
  "2000",
  [75, 75, 73, 80, 78, 85, 72, 76, 88]
);

console.log("Студент номер 2:");
console.log(okayStudent);
console.log("Возраст: " + okayStudent.age);
console.log("Cредняя оценка: " + okayStudent.averageMark);

for (let i = 0; i < 23; i++) {
  okayStudent.present();
}

for (let i = 0; i < 2; i++) {
  okayStudent.absent();
}

console.log(okayStudent.summary());

// Студент номер три
const veryGoodStudent = new Student(
  "veryGood",
  "student",
  "1999",
  [84, 90, 95, 93, 96, 97, 89, 87, 88]
);

console.log("Студент номер 3:");
console.log(veryGoodStudent);
console.log("Возраст: " + veryGoodStudent.age);
console.log("Cредняя оценка: " + veryGoodStudent.averageMark);

for (let i = 0; i < 25; i++) {
  veryGoodStudent.present();
}

console.log(veryGoodStudent.summary());
