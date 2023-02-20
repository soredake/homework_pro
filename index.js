"use strict";

function addHtml(text, value) {
  document.getElementsByClassName(
    "registration_results"
  )[0].innerHTML += `<p><b>${text}</b>: ${value}</p>`;
}

const genderObj = {
  M: "Чоловік",
  F: "Жінка",
};

const languagesObj = {
  uk: "Український",
  ru: "Російська",
  en: "Англійська",
};

document
  .querySelector('input[type="button"]')
  .addEventListener("click", function () {
    let nameLength = document.querySelector('input[name="name"]:invalid');
    let surnameLength = document.querySelector('input[name="surname"]:invalid');
    let birthdayLength = document.querySelector(
      'input[name="birthday"]:invalid'
    );
    let adressLength = document.querySelector(
      'textarea[name="address"]:invalid'
    );
    let checkedLanguagesLength = document.querySelectorAll(
      'input[name="languages"]:checked'
    ).length;
    const results = document.getElementsByClassName("results")[0];
    const registration_results = document.getElementsByClassName(
      "registration_results"
    )[0];
    const form = document.forms.registration;
    const languagesElems = form.languages;
    const checkedLanguages = [];
    const city = form.city;

    if (nameLength) {
      alert("Введите имя");
      return;
    }

    if (surnameLength) {
      alert("Введите фамилию");
      return;
    }

    if (birthdayLength) {
      alert("Введите день рождения");
      return;
    }

    if (adressLength) {
      alert("Введите адрес");
      return;
    }

    if (!checkedLanguagesLength) {
      alert("Выберете хотя бы один язык");
      return;
    }

    for (let index = 0; index < languagesElems.length; index++) {
      if (languagesElems[index].checked) {
        checkedLanguages.push(languagesObj[languagesElems[index].value]);
      }
    }

    if (registration_results.innerHTML) {
      registration_results.innerHTML = "";
    }

    if (!results.style.visibility) {
      results.style.visibility = "visible";
    }

    addHtml("Имя", form.elements.name.value);
    addHtml("Фамилия", form.elements.surname.value);
    addHtml("Дата рождения", form.elements.birthday.value);
    addHtml("Пол", genderObj[form.elements.gender.value]);
    addHtml("Языки", checkedLanguages.join(", "));
    addHtml("Адрес", form.elements.address.value);
    addHtml("Город", city.options[city.selectedIndex].textContent);
  });
