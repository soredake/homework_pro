"use strict";

window.addEventListener("load", function () {
  showCategories();

  // 2. add event listeners for categories
  // 3
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

  showProducts(products, id);
}

function showProducts(products) {
  const parent = document.getElementById("products");
  parent.innerHTML = "";
  parent.addEventListener("click", handleProductClick);

  for (let value of products) {
    const element = document.createElement("div");
    element.textContent = `${value.name} - $${value.price}`;
    element.setAttribute("data-product-id", value.id);
    parent.appendChild(element);
  }
}

function handleProductClick(event) {
  const id = parseInt(event.target.getAttribute("data-product-id"));
  console.log(event.target);
  if (!id) {
    return;
  }

  let product;

  for (let value of data) {
    if (value.id === id) {
      products = value.products;
      break;
    }
  }
  console.log("Текущий список продуктов:" + JSON.stringify(products));

  for (let value of products) {
    if (value.id === id) {
      product = value;
      break;
    }
  }
  console.log("Текущий продукт:" + JSON.stringify(product));

  // product = {
  //   name =
  // }

  showInfo(product);
}

function showInfo(product) {
  const parent = document.getElementById("info");
  parent.innerHTML = "";
  console.log(`Имя продукта: ${product.name}`);
  console.log(`Цена продукта: ${product.price}`);
}
