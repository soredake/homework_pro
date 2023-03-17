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
  document.querySelector(selector).innerHTML = "";
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
