function findInvalidFormInputs() {
  return document.querySelectorAll('form[name="addForm"] input:invalid');
}

function invalidFieldHandler(event) {
  if (event.target.checkValidity() === true) {
    event.target.classList.remove("invalid");
  } else {
    event.target.classList.add("invalid");
  }
  if (findInvalidFormInputs().length === 0) {
    changeElementDisplay(document.querySelector(".inputRequired"), "none");
  }
}

function invalidFieldsHelper(elements, add) {
  if (add === true) {
    console.log(elements);
    elements.forEach((element) => element.classList.add("invalid"));
  } else {
    elements.forEach((element) => element.classList.remove("invalid"));
  }
}

function resetForm() {
  document.querySelector("#addForm").reset();
}
