"use strict";
function removeSymbols(text, symbols) {
  let editedText = text;
  symbols.forEach((symbol) => {
    editedText = editedText.replaceAll(symbol, "");
  });
  return `Изменённый текст: ${editedText}`;
}

function askForTextAndSymbols() {
  let text;
  let symbolsToDelete;
  do {
    text = prompt("Введите текст из которого мы будем удалять символы");
  } while (!text);
  do {
    symbolsToDelete = prompt("Введите символы которые мы будем удалять").split(
      ""
    );
  } while (symbolsToDelete.length <= 0);

  alert(removeSymbols(text, symbolsToDelete));
}

function twoDimensionalArray() {
  let mainArrayLength;
  do {
    mainArrayLength = parseInt(prompt("Введите длину основного массива"));
  } while (!mainArrayLength || mainArrayLength < 0);
  let array = [];
  for (let arrayIndex = 0; arrayIndex < mainArrayLength; arrayIndex++) {
    let thisArrayLength;
    do {
      thisArrayLength = parseInt(
        prompt(`Введите количество элементов в массиве ${arrayIndex + 1}`)
      );
    } while (!thisArrayLength || thisArrayLength < 0);
    let newArray = [];
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
