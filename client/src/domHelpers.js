import { buyProduct, menuClickHandler } from "./handlers.js";

export function createElement({
  tagName,
  content,
  attributes,
  handlers,
  parent,
}) {
  const parentElement =
    typeof parent === "string" ? document.querySelector(parent) : parent;

  const element = document.createElement(tagName);
  element.textContent = content;

  for (let key in attributes) {
    if (key === "className") {
      element.setAttribute("class", attributes[key]);
    } else {
      element.setAttribute(key, attributes[key]);
    }
  }

  for (let key in handlers) {
    element.addEventListener(
      key,
      handlers[key].callback,
      handlers[key].isOnCapture
    );
  }

  parentElement.appendChild(element);

  return element;
}

export function clearContent(selector) {
  const element = document.querySelector(selector);
  element.innerHTML = "";
}

export function createMenu(data) {
  const parentSelector = "ul.nav";
  for (let item of data) {
    const menuItem = createElement({
      parent: parentSelector,
      tagName: "li",
      attributes: {
        className: "nav-item",
        "data-category-id": item.id,
      },
      handlers: {
        click: { callback: menuClickHandler },
      },
    });
    createElement({
      tagName: "a",
      content: item.name,
      attributes: {
        className: "nav-link",
        href: "#",
      },
      parent: menuItem,
    });
  }
}

export function showProducts(products) {
  clearContent("section");
  for (let product of products) {
    const parentDiv = createElement({
      tagName: "div",
      attributes: {
        className: "me-3",
        "data-product-id": product.id,
      },
      parent: "section",
    });
    createElement({
      tagName: "h3",
      parent: parentDiv,
      content: product.name,
    });
    createElement({
      tagName: "p",
      parent: parentDiv,
      content: `${product.price} UAH`,
    });
    if (product.customizable) {
      // add link to page
      createElement({
        tagName: "input",
        attributes: {
          type: "button",
          value: "Open",
        },
        handlers: {
          click: {
            callback: function () {
              const modal = new bootstrap.Modal("#customizeHamburgerModal");
              modal.show();
              clearContent("#customizeHamburgerModal .modal-body");
            },
          },
        },
        parent: parentDiv,
      });
    } else {
      // add button to card
      createElement({
        tagName: "input",
        attributes: {
          type: "button",
          value: "Buy",
        },
        handlers: {
          click: {
            callback: function () {
              const productObjToBuy = { ...product };
              buyProduct(productObjToBuy);
            },
          },
        },
        parent: parentDiv,
      });
    }
  }
}

export function createCartGridRow(columns) {
  const modalBodyElement = document.querySelector("#cartModal .modal-body");

  const row = createElement({
    tagName: "div",
    attributes: {
      className: "row",
    },
    parent: modalBodyElement,
  });

  for (let column of columns) {
    createElement({
      tagName: "div",
      content: column.content,
      attributes: {
        className: "col",
      },
      parent: row,
    });
  }
}
