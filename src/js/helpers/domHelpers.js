function createElement(tagName, content, attributes, handlers, parent) {
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

function clearContent(selector) {
  const element = document.querySelector(selector);
  element.innerHTML = "";
}

function removeElement(selector) {
  document.querySelector(selector).remove();
}

function changeElementDisplay(selector, style) {
  document.querySelector(selector).style.display = style;
}

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
