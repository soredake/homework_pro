import { getCategoriesList, orderProducts } from "./functions.js";
import {
  clearContent,
  createCartGridRow,
  createElement,
  createMenu,
} from "./domHelpers.js";
import Cart from "./Cart.js";
import { customizeChickenHamburger } from "./handlers.js";

window.addEventListener("load", async () => {
  const { data: categories } = await getCategoriesList();
  createMenu(categories);
});

document.getElementById("modalOpenBtn").addEventListener("click", () => {
  const storage = Cart.storage;

  clearContent("#cartModal .modal-body");

  if (Object.keys(Cart.storage).length === 0) {
    const modalBodyElement = document.querySelector("#cartModal .modal-body");
    createElement({
      tagName: "div",
      content: "No order have been made.",
      parent: modalBodyElement,
    });
    return;
  }

  createCartGridRow([
    { content: "Name" },
    { content: "Amount" },
    { content: "Price" },
    { content: "Additional" },
  ]);

  for (let productId in storage) {
    const { amount, price, size, toppings } = storage[productId];
    let { name } = storage[productId];
    const calculatedPrice = amount * price;
    let additional;

    if (size) {
      name = size.charAt(0).toUpperCase() + size.slice(1) + " " + name;
    }
    if (toppings) {
      const toppingsString = toppings.join(", ");
      additional =
        toppingsString.charAt(0).toUpperCase() + toppingsString.slice(1);
    }

    createCartGridRow([
      { content: name },
      { content: amount },
      { content: calculatedPrice },
      { content: additional },
    ]);
  }
});

document
  .getElementById("addToCartCustomizedBurger")
  .addEventListener("click", () => {
    const form = document.forms.customizeBurger;
    const checkedToppings = document.querySelectorAll(
      '[name="toppings"]:checked'
    );
    const modalEl = document.getElementById("customizeHamburgerModal");
    const productId = parseInt(modalEl.getAttribute("data-product-id"));
    let toppings = [];

    for (let index = 0; index < checkedToppings.length; index++) {
      toppings.push(checkedToppings[index].value);
    }
    customizeChickenHamburger(form.elements.size.value, toppings, productId);
  });

document.getElementById("orderButton").addEventListener("click", () => {
  orderProducts(Cart.storage);
});
