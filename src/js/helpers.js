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

const findInputs = (selector, invalid) => {
  const parent =
    typeof selector === "string" ? document.querySelector(selector) : selector;
  if (invalid) {
    return parent.querySelectorAll("input:invalid");
  } else {
    return parent.querySelectorAll('input:not([type="button"])');
  }
};

const invalidFieldHandler = (event) => {
  if (event.target.checkValidity() === true) {
    event.target.classList.remove("invalid");
  } else {
    event.target.classList.add("invalid");
  }
};

const changeInvalidFieldClass = (elements, add) => {
  if (add === true) {
    elements.forEach((element) => element.classList.add("invalid"));
  } else {
    elements.forEach((element) => element.classList.remove("invalid"));
  }
};

const resetForm = (form) => {
  document.querySelector(form).reset();
};
