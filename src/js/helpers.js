"use strict";

const createElement = (tagName, content, attributes, handlers, parent) => {
  const parentElement =
    typeof parent === "string" ? document.querySelector(parent) : parent;

  const element = document.createElement(tagName);
  element.innerHTML = content;

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
};

const clearContent = (selector) => {
  const element =
    typeof selector === "string" ? document.querySelector(selector) : selector;
  element.innerHTML = "";
};

const removeElement = (selector) => {
  const element =
    typeof selector === "string" ? document.querySelector(selector) : selector;
  element.remove();
};

const changeElementDisplay = (selector, style) => {
  const element =
    typeof selector === "string" ? document.querySelector(selector) : selector;
  element.style.display = style;
};

const toggleBodyScrolling = () => {
  const body = document.querySelector("body");
  const scrollState = body.style.overflow;
  if (scrollState === "hidden") {
    body.style.overflow = "auto";
  } else {
    body.style.overflow = "hidden";
  }
};

/*
handlers = {
  click: {
    callback: function() {},
    isOnCapture: true | false
  }
  change: function() {},
  ...
}
*/
