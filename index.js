"use strict";

function getNumberFromUser(message) {
  let number;
  do {
    number = parseInt(prompt(message));
  } while (!number || number < 0);
  return number;
}

function pow(num, degree) {
  if (degree == 1) {
    return num;
  } else {
    return num * pow(num, degree - 1);
  }
}

function exponentiation() {
  let num;
  let degree;
  num = getNumberFromUser(`Введите число которое будем возводить в степень`);
  degree = getNumberFromUser(
    `Введите степень в которую мы будем возводить число`
  );
  alert(pow(num, degree));
}
