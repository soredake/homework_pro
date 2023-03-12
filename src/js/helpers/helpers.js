function findInvalidFormInputs() {
  return document.querySelectorAll('form[name="addForm"] input:invalid');
}

function invalidFieldHandler(element) {
  if (element.target.checkValidity() === true) {
    element.target.classList.remove("invalid");
  } else {
    element.target.classList.add("invalid");
  }
  if (findInvalidFormInputs().length === 0) {
    changeElementDisplay(document.querySelector(".inputRequired"), "none");
  }
}

function invalidElementsClassHelper(elements, add) {
  if (add === true) {
    elements.forEach((element) => element.classList.add("invalid"));
  } else {
    elements.forEach((element) => element.classList.remove("invalid"));
  }
}

function resetForm() {
  document.querySelector('form[name="addForm"]').reset();
}
