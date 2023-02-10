"use strict";
function getStringFromUser(message) {
  let value;
  do {
    value = prompt(message);
  } while (!value);
  return value;
}

function removeSymbols(text, symbols) {
  let editedText;
  editedText = text;
  symbols.forEach((symbol) => {
    editedText = editedText.replaceAll(symbol, "");
  });
  return `Изменённый текст: ${editedText}`;
}

function askForTextAndSymbols() {
  let text;
  let symbolsToDelete;
  let symbolsToDeleteArray;
  text = getStringFromUser(
    "Введите текст из которого мы будем удалять символы"
  );
  symbolsToDelete = getStringFromUser(
    "Введите символы которые мы будем удалять"
  );
  symbolsToDeleteArray = symbolsToDelete.split("");
  alert(removeSymbols(text, symbolsToDeleteArray));
}

function getNumberFromUser(message) {
  let number;
  do {
    number = parseInt(prompt(message));
  } while (!number || number < 0);
  return number;
}

function twoDimensionalArray() {
  let mainArrayLength;
  let array = [];
  mainArrayLength = getNumberFromUser("Введите длину основного массива");
  for (let arrayIndex = 0; arrayIndex < mainArrayLength; arrayIndex++) {
    let thisArrayLength;
    let newArray = [];
    thisArrayLength = getNumberFromUser(
      `Введите количество элементов в массиве ${arrayIndex + 1}`
    );
    for (let elementIndex = 0; elementIndex < thisArrayLength; elementIndex++) {
      let element = prompt(
        `Введите значение элемента ${elementIndex + 1} в массиве ${
          arrayIndex + 1
        }`
      );
      newArray.push(element);
    }
    array.push(newArray);
  }

  alert(JSON.stringify(array, "", 2));
}
