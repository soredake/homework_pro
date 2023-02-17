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
    const results = document.getElementsByClassName("results")[0];
    let registration_results = document.getElementsByClassName(
      "registration_results"
    )[0];
    const form = document.forms.registration;
    const languagesElems = form.languages;
    const checkedLanguages = [];
    const city = form.city;
    for (let index = 0; index < languagesElems.length; index++) {
      if (languagesElems[index].checked) {
        checkedLanguages.push(languagesObj[languagesElems[index].value]);
      }
    }

    // console.log(`Имя: ${form.elements.name.value}`);
    // console.log(`Фамилия: ${form.elements.surname.value}`);
    // console.log(`Дата рождения: ${form.elements.birthday.value}`);
    // console.log(`Пол: ${genderObj[form.elements.gender.value]}`);
    // console.log(`Языки: ${checkedLanguages.join(", ")}`);
    // console.log(`Адрес: ${form.elements.address.value}`);
    // console.log(`Город: ${city.options[city.selectedIndex].textContent}`);

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
