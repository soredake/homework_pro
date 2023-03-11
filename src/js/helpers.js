function resetForm() {
  document.getElementById("form").reset();
}

function formatOrderDate(order) {
  const date = new Date(order.date);
  return `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} ${date.getHours()}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
}

function invalidFieldHandler(element) {
  if (element.target.checkValidity() === true) {
    element.target.classList.remove("invalid");
  } else {
    element.target.classList.add("invalid");
  }
  if (findInvalidInputs().length === 0) {
    changeElementDisplay(document.querySelector(".inputRequired"), "none");
  }
}

function findInvalidInputs() {
  return document.querySelectorAll("input:invalid");
}

function invalidElementsClassHelper(elements, add) {
  if (add === true) {
    elements.forEach((element) => element.classList.add("invalid"));
  } else {
    elements.forEach((element) => element.classList.remove("invalid"));
  }
}

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
  const e =
    typeof element === "string" ? document.querySelector(element) : element;
  e.style.display = style;
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
