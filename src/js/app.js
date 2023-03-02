"use strict";

const orderBg = document.querySelector(".orderBg");
const orderDetailsBg = document.querySelector(".orderDetailsBg");
const requireInput = document.querySelector(".requireInput");
const productObj = {
  name: "Название товара",
  price: "Цена",
  info: "Информация о товаре",
};
const cityObj = {
  odessa: "Одесса",
  kyiv: "Киев",
  lviv: "Львов",
  ivanofrankovsk: "Ивано-Франковск",
};
const paymentObj = {
  cod: "Наложенный платёж",
  creditCard: "Банковская карта",
};

function addHtml(text) {
  document.querySelector(".orderDetailsContent").innerHTML += `<p>${text}</p>`;
}

function findActiveAttribute(type) {
  return document.querySelector(`[data-${type}-active]`);
}

function findActiveId(type) {
  return parseInt(findActiveAttribute(type).getAttribute(`data-${type}-id`));
}

function changeActiveAttribute(block, action, event) {
  const activeElement = document.querySelector(
    `[data-${block}-active]`
  );
  if (activeElement) {
    activeElement.removeAttribute(`data-${block}-active`);
    activeElement.classList.remove("active");
  }
  if (action === 1) {
    event.target.classList.add("active");
    event.target.setAttribute(`data-${block}-active`, true);
  }
}

function eraseDiv(id) {
  document.getElementById(id).innerHTML = "";
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
  const activeCategoryId = findActiveId("category");
  const products = data[activeCategoryId - 1].products;
  const product = products[id - 1];

  if (!id) {
    return;
  }

  changeActiveAttribute("product", 1, event);
  showInfo(product);
}

function hideOrShowElement(element, action) {
  if (action === 1) {
    element.style.display = "none";
  } else if (action === 2) {
    element.style.display = "block";
  }
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
    hideOrShowElement(orderBg, 2);
  });
  parent.appendChild(buyButton);
}

window.addEventListener("load", function () {
  showCategories();
});

document.querySelector(".confirmOrder").addEventListener("click", function () {
  const form = document.forms.orderConfirmation;
  const orderDetailsContent = document.querySelector(".orderDetailsContent");
  const activeProductId = findActiveId("product");
  const activeCategoryId = findActiveId("category");
  const activeProduct =
    data[activeCategoryId - 1].products[activeProductId - 1];

  if (document.querySelectorAll('input:invalid').length) {
    hideOrShowElement(requireInput, 2);
    return;
  }

  if (orderDetailsContent.innerHTML) {
    orderDetailsContent.innerHTML = "";
  }

  addHtml(`<b>Вы успешно купили:</b> ${activeProduct.name}`);
  addHtml(
    `Товар будет доставлен в город <b>${
      cityObj[form.elements.city.value]
    }</b> в отделение новой почты номер <b>${
      form.elements.deliveryLocation.value
    }</b>`
  );
  hideOrShowElement(requireInput, 1);
  hideOrShowElement(orderDetailsBg, 2);
});

window.addEventListener("click", function (event) {
  if (event.target === orderBg) {
    hideOrShowElement(orderBg, 1);
    document.getElementById("form").reset();
  } else if (event.target === orderDetailsBg) {
    hideOrShowElement(orderDetailsBg, 1);
    hideOrShowElement(orderBg, 1);
    eraseDiv("info");
    eraseDiv("products");
    hideOrShowElement(requireInput, 1);
    changeActiveAttribute("category");
    document.getElementById("form").reset();
  }
});
