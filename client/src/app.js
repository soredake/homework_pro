import { getCategoriesList } from "./functions.js";
import {
  clearContent,
  createCartGridRow,
  createElement,
  createMenu,
} from "./domHelpers.js";
import Cart from "./Cart.js";

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
  ]);

  for (let productId in storage) {
    const { name, amount, price } = storage[productId];
    const calculatedPrice = amount * price;

    createCartGridRow([
      { content: name },
      { content: amount },
      { content: calculatedPrice },
    ]);
  }
});
