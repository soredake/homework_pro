"use strict";

const productObj = {
  name: "Название товара",
  price: "Цена",
  info: "Информация о товаре",
};

window.addEventListener("load", function () {
  showCategories();
});

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

  removeActive("category");
  setActive(event, "category");
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

  removeActive("product");
  setActive(event, "product");
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
  buyButton.addEventListener("click", function () {
    alert(`Вы успешно купили: ${product.name}`);
    eraseDiv("products");
    eraseDiv("info");
    removeActive("category");
  });
  parent.appendChild(buyButton);
}

function findActiveCategory() {
  return document.querySelector("[data-category-active]");
}

function removeActive(action) {
  const findActive = document.querySelector(`[data-${action}-active]`);
  if (findActive) {
    findActive.removeAttribute(`data-${action}-active`);
    findActive.classList.remove("active");
  }
}

function setActive(event, action) {
  event.target.classList.add("active");
  event.target.setAttribute(`data-${action}-active`, true);
}

function eraseDiv(id) {
  const element = document.getElementById(id);
  element.innerHTML = "";
}
