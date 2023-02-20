"use strict";

function addHtml(text, value) {
  document.getElementsByClassName(
    "registration_results"
  )[0].innerHTML += `<p><b>${text}</b>: ${value}</p>`;
}

function requireInput(requiresFilling) {
  alert(`Введите: ${requiresFilling}`);
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
    const requiresFilling = [];
    const nameLength = document.querySelector('input[name="name"]:invalid');
    const surnameLength = document.querySelector(
      'input[name="surname"]:invalid'
    );
    const birthdayLength = document.querySelector(
      'input[name="birthday"]:invalid'
    );
    const addressLength = document.querySelector(
      'textarea[name="address"]:invalid'
    );
    const checkedLanguagesLength = document.querySelectorAll(
      'input[name="languages"]:checked'
    ).length;
    const results = document.getElementsByClassName("results")[0];
    const registration_results = document.getElementsByClassName(
      "registration_results"
    )[0];
    const form = document.forms.registration;
    const languagesElements = form.languages;
    const checkedLanguages = [];
    const city = form.city;

    nameLength && requiresFilling.push("имя");
    surnameLength && requiresFilling.push("фамилия");
    birthdayLength && requiresFilling.push("день рождения");
    addressLength && requiresFilling.push("адрес");
    !checkedLanguagesLength && requiresFilling.push("язык");

    if (requiresFilling.length) {
      requireInput(requiresFilling.join(", "));
      return;
    }

    for (let index = 0; index < languagesElements.length; index++) {
      if (languagesElements[index].checked) {
        checkedLanguages.push(languagesObj[languagesElements[index].value]);
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
