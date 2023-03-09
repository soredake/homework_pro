"use strict";

const orders = JSON.parse(localStorage.getItem("orders")) || [];
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
// Элементы на странице
const orderBg = document.querySelector(".orderBg");
const orderDetailsBg = document.querySelector(".orderDetailsBg");
const requireInput = document.querySelector(".requireInput");
const ordersDiv = document.querySelector(".orders");
const backButton = document.querySelector(".backToCatalog");
const catalog = document.getElementById("main");
const orderInfo = document.querySelector(".orderInfo");
const removeOrderButton = document.createElement("div");
const noOrdersElement = document.querySelector(".noOrders");

function addOrderDetails(text) {
  document.querySelector(".orderDetailsContent").innerHTML += `<p>${text}</p>`;
}

function findActiveAttribute(type) {
  return document.querySelector(`[data-${type}-active]`);
}

function findActiveId(type) {
  return parseInt(findActiveAttribute(type).getAttribute(`data-${type}-id`));
}

function eraseDiv(id) {
  document.getElementById(id).innerHTML = "";
}

function changeElementDisplay(element, style) {
  element.style.display = style;
}

function changeActiveAttribute(block, add, event) {
  const activeElement = document.querySelector(`[data-${block}-active]`);
  if (activeElement) {
    activeElement.removeAttribute(`data-${block}-active`);
    activeElement.classList.remove("active");
  }
  if (add === true) {
    event.target.classList.add("active");
    event.target.setAttribute(`data-${block}-active`, true);
  }
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

  changeActiveAttribute("category", true, event);
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

  changeActiveAttribute("product", true, event);
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
    changeElementDisplay(orderBg, "block");
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
  const invalidInputs = document.querySelectorAll("input:invalid");

  if (invalidInputs.length) {
    changeElementDisplay(requireInput, "block");
    return;
  }

  if (orderDetailsContent.innerHTML) {
    orderDetailsContent.innerHTML = "";
  }

  localStorage.getItem("totalOrdersCount") ||
    localStorage.setItem("totalOrdersCount", 0);
  const totalOrders = JSON.parse(localStorage.getItem("totalOrdersCount"));
  const order = {
    orderId: totalOrders + 1,
    name: form.elements.name.value,
    surname: form.elements.surname.value,
    patronymic: form.elements.patronymic.value,
    finalPrice: activeProduct.price,
    city: cityObj[form.elements.city.value],
    deliveryLocation: form.elements.deliveryLocation.value,
    payment: paymentObj[form.elements.payment.value],
    quantity: form.elements.quantity.value,
    products: [{ name: activeProduct.name, price: activeProduct.price }],
    comment: form.elements.commentary.value,
    date: Date.now(),
  };
  localStorage.setItem("totalOrdersCount", totalOrders + 1);
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  addOrderDetails(`<b>Вы успешно купили:</b> ${activeProduct.name}`);
  addOrderDetails(
    `Товар будет доставлен в город <b>${
      cityObj[form.elements.city.value]
    }</b> в отделение новой почты номер <b>${
      form.elements.deliveryLocation.value
    }</b>`
  );
  changeElementDisplay(requireInput, "none");
  changeElementDisplay(orderDetailsBg, "block");
});

document.querySelector(".myOrders").addEventListener("click", function () {
  const ordersList = document.querySelector(".ordersList");
  const currentOrders = document.querySelectorAll("div[data-order-id]");

  currentOrders.forEach((element) => element.remove());

  if (orders.length !== 0) {
    changeElementDisplay(noOrdersElement, "none");
  }

  orders.forEach((order) => {
    const orderElement = document.createElement("div");
    const orderContent = document.createElement("div");
    const date = new Date(order.date);
    const orderDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${String(
      date.getMinutes()
    ).padStart(2, "0")}`;
    orderContent.textContent = `${orderDate} - $${order.finalPrice}`;
    orderContent.classList.add("order");
    orderElement.setAttribute("data-order-id", order.orderId);
    removeOrderButton.textContent = "X";
    removeOrderButton.classList.add("removeOrder");
    orderElement.classList.add("flex", "gap-10px");
    orderElement.appendChild(orderContent);
    orderElement.appendChild(removeOrderButton);
    ordersList.appendChild(orderElement);

    orderContent.addEventListener("click", function (event) {
      const parent = event.target.parentElement;
      const orderId = parseInt(parent.getAttribute("data-order-id"));
      const orderIndex = orders
        .map((object) => object.orderId)
        .indexOf(orderId);
      const order = orders[orderIndex];
      const activeOrder = document.querySelector(".active-order");

      orderInfo.innerHTML = `
      <p><b>Номер заказа</b>: ${order.orderId}</p>
      <p><b>Дата покупки</b>: ${orderDate}</p>
      <p><b>Что было куплено:</b> ${order.products[0].name}</p>
      <p><b>Город:</b> ${order.city}</p>
      <p><b>Склад новой почты:</b> ${order.deliveryLocation}</p>
      <p><b>Сумма:</b> $${order.finalPrice}</p>
      <p><b>Количество:</b> ${order.quantity}</p>
      `;
      if (order.comment) {
        orderInfo.innerHTML += `
      <p><b>Комментарий:</b> ${order.comment}</p>
      `;
      }

      if (activeOrder) {
        activeOrder.classList.remove("active-order");
      }
      orderContent.classList.add("active-order");
      changeElementDisplay(orderInfo, "block");
    });
  });
  changeElementDisplay(ordersDiv, "flex");
  changeElementDisplay(backButton, "block");
  changeElementDisplay(catalog, "none");
});

window.addEventListener("click", function (event) {
  if (event.target === orderBg) {
    changeElementDisplay(orderBg, "none");
    document.getElementById("form").reset();
  } else if (event.target === orderDetailsBg) {
    changeElementDisplay(orderDetailsBg, "none");
    changeElementDisplay(orderBg, "none");
    eraseDiv("info");
    eraseDiv("products");
    changeElementDisplay(requireInput, "none");
    changeActiveAttribute("category");
    document.getElementById("form").reset();
  } else if (event.target === backButton) {
    changeElementDisplay(ordersDiv, "none");
    changeElementDisplay(backButton, "none");
    changeElementDisplay(catalog, "flex");
    changeElementDisplay(orderInfo, "none");
  } else if (event.target === removeOrderButton) {
    const parent = event.target.parentElement;
    const orderId = parseInt(parent.getAttribute("data-order-id"));
    const orderIndex = orders.map((object) => object.orderId).indexOf(orderId);
    if (
      event.target.previousElementSibling.classList.contains("active-order")
    ) {
      changeElementDisplay(orderInfo, "none");
    }
    orders.splice(orderIndex, 1);
    localStorage.setItem("orders", JSON.stringify(orders));
    parent.remove();
    if (JSON.parse(localStorage.getItem("orders")).length === 0) {
      changeElementDisplay(noOrdersElement, "block");
    }
  }
});
