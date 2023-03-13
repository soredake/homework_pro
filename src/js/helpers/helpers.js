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
    elements.forEach((element) => element.classList.add("invalid"));
  } else {
    elements.forEach((element) => element.classList.remove("invalid"));
  }
}

function resetForm() {
  document.getElementById("addForm").reset();
}

function toggleBodyScrolling() {
  const body = document.querySelector("body");
  const scrollState = body.style.overflow;
  if (scrollState === "hidden") {
    body.style.overflow = "auto";
  } else {
    body.style.overflow = "hidden";
  }
}

function closeModal(event) {
  if (event.target !== this) {
    return;
  }
  changeElementDisplay(".inputRequired", "none");
  resetForm();
  changeElementDisplay(event.target, "none");
}

function addUserToList(user) {
  const parentDiv = createElement(
    "div",
    "",
    { className: "user", "data-row-id": user.id },
    null,
    "#usersList"
  );
  const fullName = `${user.name} ${user.lastName}`;
  createElement("div", fullName, null, null, parentDiv);
  showUserButtons(user, parentDiv);
}
