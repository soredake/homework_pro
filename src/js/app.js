"use strict";

const order = document.querySelector(".orderBg");
const orderDetails = document.querySelector(".orderDetailsBg");
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
  creditcard: "Банковская карта",
};

function addHtml(text) {
  document.querySelector(".orderDetailsContent").innerHTML += `<p>${text}</p>`;
}

function requireInput(requiresFilling) {
  alert(`Введите: ${requiresFilling}`);
}

function findActiveAttribute(type) {
  if (type === 0) {
    return document.querySelector("[data-category-active]");
  } else if (type === 1) {
    return document.querySelector("[data-product-active]");
  }
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
    findActiveAttribute(0).getAttribute("data-category-id")
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
    order.style.display = "block";
  });
  parent.appendChild(buyButton);
}

window.addEventListener("load", function () {
  showCategories();
});

document.querySelector(".confirmOrder").addEventListener("click", function () {
  const requiresFilling = [];
  const nameLength = document.querySelector('input[name="name"]:invalid');
  const surnameLength = document.querySelector('input[name="surname"]:invalid');
  const patronymicLength = document.querySelector(
    'input[name="patronymic"]:invalid'
  );
  const deliveryLocationLength = document.querySelector(
    'input[name="deliveryLocation"]:invalid'
  );
  const quantityLength = document.querySelector(
    'input[name="quantity"]:invalid'
  );
  const orderDetailsContent = document.querySelector(".orderDetailsContent");
  const form = document.forms.orderConfirmation;
  const activeProductId = parseInt(
    findActiveAttribute(1).getAttribute("data-product-id")
  );
  const activeCategoryId = parseInt(
    findActiveAttribute(0).getAttribute("data-category-id")
  );
  const activeProduct =
    data[activeCategoryId - 1].products[activeProductId - 1];

  nameLength && requiresFilling.push("имя");
  surnameLength && requiresFilling.push("фамилия");
  patronymicLength && requiresFilling.push("отчество");
  deliveryLocationLength && requiresFilling.push("адрес");
  quantityLength && requiresFilling.push("количество");

  if (requiresFilling.length) {
    requireInput(requiresFilling.join(", "));
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
  orderDetails.style.display = "block";
});

window.onclick = function (event) {
  if (event.target == order) {
    order.style.display = "none";
  }
  if (event.target == orderDetails) {
    orderDetails.style.display = "none";
    order.style.display = "none";
  }
};
