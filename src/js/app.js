"use strict";

const modal = document.querySelector(".modal");
const modalCloseButton = document.querySelector(".modal-close-button");
const productObj = {
  name: "Название товара",
  price: "Цена",
  info: "Информация о товаре",
};

modalCloseButton.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

window.addEventListener("load", function () {
  showCategories();
});

function addHtml(text, value) {
  document.getElementsByClassName(
    "registration_results"
  )[0].innerHTML += `<p><b>${text}</b>: ${value}</p>`;
}

function showCategories() {
  const parent = document.getElementById("categories");
  parent.addEventListener("click", handleCategoryClick);

  for (let value of data) {
    const element = document.createElement("div");
    element.textContent = value.name;
    element.setAttribute("data-category-id", value.id);
    parent.appendChild(element);
  }
}

function handleCategoryClick(event) {
  const id = parseInt(event.target.getAttribute("data-category-id"));
  const products = data[id - 1].products;

  if (!id) {
    return;
  }

  changeActiveAttribute("category", 1, event);
  showProducts(products);
  eraseDiv("info");
}

function showProducts(products) {
  const parent = document.getElementById("products");
  parent.innerHTML = "";
  parent.addEventListener("click", handleProductClick);

  for (let value of products) {
    const element = document.createElement("div");
    element.textContent = `${value.name} - ${value.price}$`;
    element.setAttribute("data-product-id", value.id);
    parent.appendChild(element);
  }
}

function handleProductClick(event) {
  const id = parseInt(event.target.getAttribute("data-product-id"));
  const activeCategoryId = parseInt(
    findActiveCategory().getAttribute("data-category-id")
  );
  const products = data[activeCategoryId - 1].products;
  const product = products[id - 1];

  if (!id) {
    return;
  }

  changeActiveAttribute("product", 1, event);
  showInfo(product);
}

function showInfo(product) {
  const parent = document.getElementById("info");
  parent.innerHTML = "";

  for (const value in productObj) {
    const element = document.createElement("div");
    parent.appendChild(element);
    element.innerHTML = `<b>${productObj[value]}:</b> ${product[value]}`;
    if (value === "price") {
      element.innerHTML += "$";
    }
  }
  const buyButton = document.createElement("button");
  buyButton.innerHTML = "Купить товар";
  buyButton.classList.add("buyButton");
  buyButton.addEventListener("click", function () {
    modal.style.display = "block";
  });
  parent.appendChild(buyButton);
}

function findActiveCategory() {
  return document.querySelector("[data-category-active]");
}

function changeActiveAttribute(block, action, event) {
  const activeCategoryOrProduct = document.querySelector(
    `[data-${block}-active]`
  );
  if (activeCategoryOrProduct) {
    activeCategoryOrProduct.removeAttribute(`data-${block}-active`);
    activeCategoryOrProduct.classList.remove("active");
  }
  if (action === 1) {
    event.target.classList.add("active");
    event.target.setAttribute(`data-${block}-active`, true);
  }
}

function eraseDiv(id) {
  const element = document.getElementById(id);
  element.innerHTML = "";
}

document.querySelector(".confirmOrder").addEventListener("click", function () {
  const requiresFilling = [];
  const nameLength = document.querySelector('input[name="name"]:invalid');
  const surnameLength = document.querySelector('input[name="surname"]:invalid');
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
