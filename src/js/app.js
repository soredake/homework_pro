"use strict";

let house;
let apartment;
let apartmentsCount;
let tenantsCount;
let houses = [];
let apartments = [];
let apartmentIndex = 1;
let tenantIndex = 1;
const startHouseCreationButton = document.querySelector(".startHouseCreation");
const apartmentModal = new bootstrap.Modal("#apartmentModal");
const tenantModal = new bootstrap.Modal("#tenantModal");
const apartmentModalTitle = document.querySelector("#apartmentModalTitle");
const tenantsModalTitle = document.querySelector("#tenantsModalTitle");
const houseCreationForm = document.querySelector(
  'form[name="houseCreationInitial"]'
);
const apartmentForm = document.querySelector('form[name="apartmentForm"]');
const tenantForm = document.querySelector('form[name="tenantForm"]');
const createApartmentButton = document.querySelector(".createApartment");
const addTenantButton = document.querySelector(".addTenantButton");

const hideThenShowModal = (modal) => {
  modal.hide();
  setTimeout(() => {
    modal.show();
  }, 400);
};

const showApartmentModal = (number) => {
  apartmentModalTitle.textContent = `Создание квартиры номер ${number}`;
  apartmentForm.reset();
};

const showTenantModal = (number) => {
  tenantsModalTitle.textContent = `Заполнение данных жителя номер ${number} для квартиры номер ${apartmentIndex}`;
  tenantForm.reset();
};

startHouseCreationButton.addEventListener("click", () => {
  const invalidInputs = findInputs(houseCreationForm, true);

  apartmentsCount = houseCreationForm.elements.apartmentsCount.value;

  if (invalidInputs.length >= 1) {
    changeInvalidFieldClass(invalidInputs, true);
    changeElementDisplay("#houseCreationAlert", "block");
    return;
  }

  changeElementDisplay("#houseCreationAlert", "none");

  showApartmentModal(apartmentIndex);
  apartmentModal.show();
});

createApartmentButton.addEventListener("click", () => {
  const invalidInputs = findInputs(apartmentForm, true);
  if (invalidInputs.length >= 1) {
    changeInvalidFieldClass(invalidInputs, true);
    changeElementDisplay("#apartmentAlert", "block");
    return;
  }

  apartment = {};
  tenantIndex = 1;
  tenantsCount = apartmentForm.elements.tenantsCount.value;

  changeElementDisplay("#apartmentAlert", "none");

  apartment = new Apartment(
    apartmentForm.elements.style.value,
    apartmentForm.elements.roomsCount.value
  );
  apartments.push(apartment);
  // console.log(apartment);

  showTenantModal(tenantIndex);
  tenantModal.show();
});

addTenantButton.addEventListener("click", () => {
  const invalidInputs = findInputs(tenantForm, true);
  if (invalidInputs.length >= 1) {
    changeInvalidFieldClass(invalidInputs, true);
    changeElementDisplay("#tenantAlert", "block");
    return;
  }

  const tenant = new Tenant(
    tenantForm.elements.tenantName.value,
    tenantForm.elements.tenantAge.value
  );
  // console.log(tenant);

  apartment.addTenant(tenant);

  changeElementDisplay("#apartmentAlert", "none");
  if (tenantIndex == tenantsCount) {
    if (apartmentIndex == apartmentsCount) {
      tenantModal.hide();
      apartmentModal.hide();
      const newHouse = new House(apartments);
      console.log(newHouse);
      houses.push(newHouse);
      console.log(houses);

      // TODO: показывать уведомление об успешно созданном доме
      return;
    }
    ++apartmentIndex;
    showApartmentModal(apartmentIndex);
    tenantModal.hide("");
    hideThenShowModal(apartmentModal);
    return;
  }
  ++tenantIndex;
  showTenantModal(tenantIndex);
  hideThenShowModal(tenantModal);
});

window.onload = () => {
  const inputs = document.querySelectorAll('input:not([type="button"])');
  inputs.forEach((element) => {
    element.addEventListener("change", invalidFieldHandler);
  });
};
