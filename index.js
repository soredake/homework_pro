"use strict";

const genderObj = {
  M: "Male",
  F: "Female",
};

const languagesObj = {
  en: "English",
  ru: "Russian",
  uk: "Ukrainan",
};

document
  .querySelector('input[type="button"]')
  .addEventListener("click", function () {
    const form = document.forms.registration;
    console.log(`Имя: ${form.elements.name.value}`);
    console.log(`Фамилия: ${form.elements.surname.value}`);
    console.log(`Дата рождения: ${form.elements.birthday.value}`);
    console.log(`Пол: ${genderObj[form.elements.gender.value]}`);
    const languagesElems = form.languages;
    const checkedLanguages = [];
    for (let index = 0; index < languagesElems.length; index++) {
      if (languagesElems[index].checked) {
        checkedLanguages.push(languagesObj[languagesElems[index].value]);
      }
    }
    console.log(`Языки: ${checkedLanguages.join(", ")}`);

    console.log(`Адрес: ${form.elements.address.value}`);

    const city = form.city;
    console.log(`Город: ${city.options[city.selectedIndex].textContent}`);
  });
