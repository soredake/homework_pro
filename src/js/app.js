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

  if (!id) {
    return;
  }

  let products = [];

  for (let value of data) {
    if (value.id === id) {
      products = value.products;
      break;
    }
  }

  removeActive("category");
  setActive(event, "category");
  showProducts(products, id);
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
  let product;
  let products = [];
  const currentlyActiveCategoryId = parseInt(
    findActiveCategory().getAttribute("data-category-id")
  );
  if (!id) {
    return;
  }

  for (let value of data) {
    if (value.id === currentlyActiveCategoryId) {
      products = value.products;
      break;
    }
  }

  for (let value of products) {
    if (value.id === id) {
      product = value;
      break;
    }
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
    const products = document.getElementById("products");
    products.innerHTML = "";
    const info = document.getElementById("info");
    info.innerHTML = "";

    const currentlyActiveCategory = findActiveCategory();
    if (currentlyActiveCategory) {
      currentlyActiveCategory.removeAttribute("data-category-active");
      currentlyActiveCategory.classList.remove("active");
    }
  });
  parent.appendChild(buyButton);
}

function findActiveCategory() {
  return document.querySelector("[data-category-active]");
}

function removeActive(action) {
  let findActive = document.querySelector(`[data-${action}-active]`);
  if (findActive) {
    findActive.removeAttribute(`data-${action}-active`);
    findActive.classList.remove("active");
  }
}

function setActive(event, action) {
  event.target.classList.add("active");
  event.target.setAttribute(`data-${action}-active`, true);
}
