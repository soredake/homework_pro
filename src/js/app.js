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
  buyButton.addEventListener("click", function () {
    alert(`Вы успешно купили: ${product.name}`);
    eraseDiv("products");
    eraseDiv("info");
    changeActiveAttribute("category");
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
