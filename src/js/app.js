"use strict";

let apartmentsCount;
let tenantsCount;
let houses = [];
let apartmentIndex = 0;
let tenantIndex = 0;
let houseIndex = 0;
const startHouseCreationButton = document.querySelector(".startHouseCreation");
const apartmentModal = new bootstrap.Modal("#apartmentModal");
const tenantModal = new bootstrap.Modal("#tenantModal");
const houseCreationForm = document.querySelector(
  'form[name="houseCreationInitial"]'
);
const apartmentForm = document.querySelector('form[name="apartmentForm"]');
const tenantForm = document.querySelector('form[name="tenantForm"]');
const createApartmentButton = document.querySelector(".createApartment");
const addTenantButton = document.querySelector(".addTenantButton");
const successToast = new bootstrap.Toast(document.querySelector(".toast"));
const styleObj = {
  euro: "Евроремонт",
  standard: "Стандартный",
};

const validateInputs = (form, alertEl) => {
  const invalidInputs = findInputs(form, true);
  if (invalidInputs.length >= 1) {
    changeInvalidFieldClass(invalidInputs, true);
    changeElementDisplay(document.querySelector(alertEl), "block");
    return false;
  }
  return true;
};

const viewHouseInfo = (e) => {
  const index = e.target.getAttribute("data-index");
  const houseInfoEl = document.querySelector(".houseInfo");
  const house = houses[index];
  houseInfoEl.innerHTML = "";

  createElement(
    "div",
    `В этом доме ${house.floors} этажей.`,
    null,
    null,
    houseInfoEl
  );

  for (let aIndex = 0; aIndex < house.apartments.length; aIndex++) {
    const apartment = house.apartments[aIndex];
    const style = apartment.style;
    createElement(
      "div",
      `<b>Квартира номер ${aIndex + 1}:</b>`,
      {
        class: "",
      },
      null,
      houseInfoEl
    );
    createElement(
      "div",
      `Ремонт: ${styleObj[style]}`,
      {
        class: "",
      },
      null,
      houseInfoEl
    );
    createElement(
      "div",
      `Количество комнат: ${apartment.roomsCount}`,
      {
        class: "",
      },
      null,
      houseInfoEl
    );
    createElement(
      "div",
      `Жильцы:`,
      {
        class: "",
      },
      null,
      houseInfoEl
    );

    for (
      let tIndex = 0;
      tIndex < house.apartments[aIndex].tenants.length;
      tIndex++
    ) {
      createElement(
        "div",
        `${house.apartments[aIndex].tenants[tIndex].getInfo()}`,
        {
          class: "",
        },
        null,
        houseInfoEl
      );
    }
  }
};

const hideThenShowModal = (modal) => {
  modal.hide();
  setTimeout(() => {
    modal.show();
  }, 400);
};

const editModal = (index, mode) => {
  if (mode === "apartment") {
    document.querySelector(
      "#apartmentModalTitle"
    ).textContent = `Создание квартиры номер ${index + 1}`;
    apartmentForm.reset();
  } else {
    document.querySelector(
      "#tenantsModalTitle"
    ).textContent = `Заполнение данных жителя номер ${
      index + 1
    } для квартиры номер ${apartmentIndex + 1}`;
    tenantForm.reset();
    addTenantButton.value = "Добавить жителя";

    if (
      apartmentIndex + 1 === apartmentsCount &&
      tenantIndex + 1 === tenantsCount
    ) {
      addTenantButton.value = "Завершить создание дома";
    }
  }
};

const startHouseCreation = () => {
  if (!validateInputs(houseCreationForm, "#houseCreationAlert")) {
    return;
  }

  if (apartmentIndex === 0 || tenantIndex === 0) {
    const newHouse = new House(houseCreationForm.elements.floorsCount.value);
    houses.push(newHouse);
  }

  apartmentsCount = parseInt(houseCreationForm.elements.apartmentsCount.value);

  changeElementDisplay("#houseCreationAlert", "none");

  editModal(apartmentIndex, "apartment");
  apartmentModal.show();
};

const createApartment = () => {
  if (!validateInputs(apartmentForm, "#apartmentAlert")) {
    return;
  }

  tenantsCount = parseInt(apartmentForm.elements.tenantsCount.value);

  changeElementDisplay("#apartmentAlert", "none");

  const newApartment = new Apartment(
    apartmentForm.elements.style.value,
    apartmentForm.elements.roomsCount.value
  );
  houses[houseIndex].addApartment(newApartment);
  editModal(tenantIndex);
  tenantModal.show();
};

const createTenant = () => {
  const newTenant = new Tenant(
    tenantForm.elements.tenantName.value,
    tenantForm.elements.tenantAge.value
  );
  houses[houseIndex].apartments[apartmentIndex].addTenant(newTenant);
};

const createTenantHandler = () => {
  if (!validateInputs(tenantForm, "#tenantAlert")) {
    return;
  }

  createTenant();
  changeElementDisplay("#apartmentAlert", "none");

  if (tenantIndex + 1 === tenantsCount) {
    if (apartmentIndex + 1 === apartmentsCount) {
      const housesInfo = document.querySelector(".houses");
      tenantModal.hide();
      apartmentModal.hide();

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
          "data-bs-toggle": "modal",
          "data-bs-target": "#houseInfoModal",
          "data-index": `${houseIndex}`,
          class: "btn btn-primary",
          value: `Дом номер ${houseIndex + 1}`,
        },
        viewHouseInfoHandler,
        housesInfo
      );
      ++houseIndex;

      apartmentIndex = 0;
      tenantIndex = 0;

      successToast.show();

      return;
    }
    ++apartmentIndex;
    tenantIndex = 0;
    editModal(apartmentIndex, "apartment");
    tenantModal.hide();
    hideThenShowModal(apartmentModal);
    return;
  }
  ++tenantIndex;
  editModal(tenantIndex);
  hideThenShowModal(tenantModal);
};

startHouseCreationButton.addEventListener("click", startHouseCreation);
createApartmentButton.addEventListener("click", createApartment);
addTenantButton.addEventListener("click", createTenantHandler);

window.addEventListener("load", () => {
  const inputs = document.querySelectorAll('input:not([type="button"])');
  inputs.forEach((element) => {
    element.addEventListener("change", invalidFieldHandler);
  });

  houseCreationForm.reset();
});
