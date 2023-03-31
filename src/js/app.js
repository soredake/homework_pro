"use strict";

let house;
let apartment;
let apartmentsCount;
let tenantsCount;
let houses = [];
let apartments = [];
let apartmentIndex = 1;
let tenantIndex = 1;
let housesIndex = 0;
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

const viewHouseInfo = (e) => {
  const index = e.target.getAttribute("data-index");
  console.log(houses[index]);
};

const hideThenShowModal = (modal) => {
  modal.hide();
  setTimeout(() => {
    modal.show();
  }, 400);
};

const editModal = (index, mode) => {
  if (mode === "apartment") {
    apartmentModalTitle.textContent = `Создание квартиры номер ${index}`;
    apartmentForm.reset();
  } else {
    tenantsModalTitle.textContent = `Заполнение данных жителя номер ${index} для квартиры номер ${apartmentIndex}`;
    tenantForm.reset();
    addTenantButton.value = "Добавить жителя";

    if (apartmentIndex == apartmentsCount && tenantIndex == tenantsCount) {
      addTenantButton.value = "Завершить создание дома";
    }
  }
};

const startHouseCreation = () => {
  const invalidInputs = findInputs(houseCreationForm, true);

  apartmentsCount = houseCreationForm.elements.apartmentsCount.value;

  if (invalidInputs.length >= 1) {
    changeInvalidFieldClass(invalidInputs, true);
    changeElementDisplay("#houseCreationAlert", "block");
    return;
  }

  changeElementDisplay("#houseCreationAlert", "none");

  editModal(apartmentIndex, "apartment");
  apartmentModal.show();
};

const createApartment = () => {
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

  editModal(tenantIndex);
  tenantModal.show();
};

const createTenant = () => {
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
  apartment.addTenant(tenant);

  changeElementDisplay("#apartmentAlert", "none");
  if (tenantIndex == tenantsCount) {
    if (apartmentIndex == apartmentsCount) {
      const housesInfo = document.querySelector(".houses");
      tenantModal.hide();
      apartmentModal.hide();
      const newHouse = new House(apartments);
      houses.push(newHouse);

      const viewHouseInfoHandler = {
        click: {
          callback: viewHouseInfo,
          isOnCapture: true,
        },
      };
      createElement(
        "input",
        null,
        {
          type: "button",
          "data-index": `${housesIndex}`,
          class: "btn btn-primary",
          value: `Информация о доме ${housesIndex}`,
        },
        viewHouseInfoHandler,
        housesInfo
      );
      ++housesIndex;

      return;
    }
    ++apartmentIndex;
    editModal(apartmentIndex, "apartment");
    tenantModal.hide("");
    hideThenShowModal(apartmentModal);
    return;
  }
  ++tenantIndex;
  editModal(tenantIndex);
  hideThenShowModal(tenantModal);
};

startHouseCreationButton.addEventListener("click", startHouseCreation);
createApartmentButton.addEventListener("click", createApartment);
addTenantButton.addEventListener("click", createTenant);

window.onload = () => {
  const inputs = document.querySelectorAll('input:not([type="button"])');
  inputs.forEach((element) => {
    element.addEventListener("change", invalidFieldHandler);
  });
};
