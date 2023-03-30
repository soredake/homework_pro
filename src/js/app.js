"use strict";

let houses = [];
let house;
let apartments = [];
let apartment;
let apartmentsCount;
let apartmentIndex = 1;
const startHouseCreationButton = document.querySelector(".startHouseCreation");
const apartmentModal = new bootstrap.Modal("#apartmentModal");
const apartmentModalTitle = document.querySelector("#apartmentModalTitle");
const houseCreationForm = document.querySelector(
  'form[name="houseCreationInitial"]'
);
const createApartmentButton = document.querySelector('.createApartment')
// const modalEl = document.querySelector("#modal");

const apartmentCreation = (number) => {
  const apartmentForm = document.querySelector('form[name="apartmentForm"]');
  const inputs = findInputs(apartmentForm);
  apartmentModalTitle.textContent = `Создание квартиры номер ${number}`;

  inputs.forEach((element) => {
    element.addEventListener("change", invalidFieldHandler);
  });
};


createApartmentButton.addEventListener("click", () => {
  const invalidInputs = findInputs(apartmentForm, true);

};

startHouseCreationButton.addEventListener("click", () => {
  const form = document.forms.houseCreationInitial;
  const invalidInputs = findInputs(houseCreationForm, true);

  apartmentsCount = form.elements.apartmentsCount.value;

  if (invalidInputs.length >= 1) {
    changeInvalidFieldClass(invalidInputs, true);
    changeElementDisplay("#houseCreationAlert", "block");
    return;
  }

  changeElementDisplay("#houseCreationAlert", "none");

  apartmentCreation(apartmentIndex);
  apartmentModal.show();
});

// createHouseButton.addEventListener("click", () => {
//   modal.hide();
//   setTimeout(() => {
//     modal.show();
//   }, 900);
// });

window.onload = () => {
  const inputs = findInputs(houseCreationForm);
  inputs.forEach((element) => {
    element.addEventListener("change", invalidFieldHandler);
  });
};
