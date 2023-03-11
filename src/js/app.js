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
  const isCurrentCategoryActive = event.target.getAttribute(
    "data-category-active"
  );

  if (isCurrentCategoryActive) {
    return;
  }

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
    element.textContent = `${value.name} - $${value.price}`;
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
    const inputs = document.querySelectorAll("form[id=form] input");
    changeElementDisplay(orderBg, "block");
    for (const element of inputs) {
      element.addEventListener("change", invalidFieldHandler);
    }
  });
  parent.appendChild(buyButton);
}

function confirmOrder(orderDetailsBg, inputRequired) {
  const form = document.forms.orderConfirmation;
  const orderDetailsContent = document.querySelector(".orderDetailsContent");
  const activeProductId = findActiveId("product");
  const activeCategoryId = findActiveId("category");
  const activeProduct =
    data[activeCategoryId - 1].products[activeProductId - 1];

  if (findInvalidInputs().length) {
    invalidElementsClassHelper(findInvalidInputs(), true);
    changeElementDisplay(inputRequired, "block");
    return;
  }

  if (orderDetailsContent.innerHTML) {
    orderDetailsContent.innerHTML = "";
  }

  const order = {
    orderId: Date.now().toString(36),
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
  changeElementDisplay(inputRequired, "none");
  changeElementDisplay(orderDetailsBg, "block");
}

function showMyOrders(ordersDiv, backToCatalogButton, noOrdersElement) {
  const currentOrders = document.querySelectorAll("div[data-order-id]");
  currentOrders.forEach((element) => element.remove());

  if (orders.length !== 0) {
    changeElementDisplay(noOrdersElement, "none");
  }

  orders.forEach((order) => {
    const ordersList = document.querySelector(".ordersList");
    const orderElement = document.createElement("div");
    const orderContent = document.createElement("div");
    const removeOrderButton = document.createElement("div");
    orderContent.textContent = `${formatOrderDate(order)} - $${
      order.finalPrice
    }`;
    orderContent.classList.add("order");
    orderElement.setAttribute("data-order-id", order.orderId);
    removeOrderButton.textContent = "X";
    removeOrderButton.classList.add("removeOrder");
    orderElement.classList.add("flex", "gap-10px");
    orderElement.appendChild(orderContent);
    orderElement.appendChild(removeOrderButton);
    ordersList.appendChild(orderElement);
  });
  changeElementDisplay(ordersDiv, "flex");
  changeElementDisplay(backToCatalogButton, "block");
  changeElementDisplay(catalog, "none");
}

function showOrderDetails(event, orderInfo) {
  const parent = event.target.parentElement;
  const orderId = parent.getAttribute("data-order-id");
  const orderIndex = orders.map((object) => object.orderId).indexOf(orderId);
  const order = orders[orderIndex];
  const activeOrder = document.querySelector(".active-order");

  orderInfo.innerHTML = `
  <p><b>Идентификатор заказа</b>: ${order.orderId}</p>
  <p><b>Дата покупки</b>: ${formatOrderDate(order)}</p>
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

  event.target.classList.add("active-order");
  changeElementDisplay(orderInfo, "block");
}

function removeOrder(event, orderInfo, noOrdersElement) {
  const parent = event.target.parentElement;
  const orderId = parent.getAttribute("data-order-id");
  const orderIndex = orders.map((object) => object.orderId).indexOf(orderId);
  if (event.target.previousElementSibling.classList.contains("active-order")) {
    changeElementDisplay(orderInfo, "none");
  }
  orders.splice(orderIndex, 1);
  localStorage.setItem("orders", JSON.stringify(orders));
  parent.remove();
  if (JSON.parse(localStorage.getItem("orders")).length === 0) {
    changeElementDisplay(noOrdersElement, "block");
  }
}

window.addEventListener("load", function () {
  showCategories();
});

window.addEventListener(
  "click",
  function (event) {
    const catalog = document.getElementById("main");
    const orderDetailsBg = document.querySelector(".orderDetailsBg");
    const inputRequired = document.querySelector(".inputRequired");
    const ordersDiv = document.querySelector(".orders");
    const backToCatalogButton = document.querySelector(".backToCatalog");
    const orderInfo = document.querySelector(".orderInfo");
    const noOrdersElement = document.querySelector(".noOrders");
    if (event.target === orderBg) {
      invalidElementsClassHelper(findInvalidInputs());
      changeElementDisplay(inputRequired, "none");
      changeElementDisplay(orderBg, "none");
      resetForm();
    } else if (event.target === orderDetailsBg) {
      invalidElementsClassHelper(findInvalidInputs());
      changeElementDisplay(orderDetailsBg, "none");
      changeElementDisplay(orderBg, "none");
      eraseDiv("info");
      eraseDiv("products");
      changeElementDisplay(inputRequired, "none");
      changeActiveAttribute("category");
      resetForm();
    } else if (event.target === backToCatalogButton) {
      changeElementDisplay(ordersDiv, "none");
      changeElementDisplay(backToCatalogButton, "none");
      changeElementDisplay(catalog, "flex");
      changeElementDisplay(orderInfo, "none");
    } else if (event.target.className === "removeOrder") {
      removeOrder(event, orderInfo);
    } else if (event.target.className === "order") {
      showOrderDetails(event, orderInfo);
    } else if (event.target.className === "myOrders") {
      showMyOrders(backToCatalogButton, catalog, noOrdersElement);
    } else if (event.target.className === "confirmOrder") {
      confirmOrder(orderDetailsBg, inputRequired);
    }
  },
  true
);
