function findInvalidFormInputs() {
  return document.querySelectorAll("#changeForm input:invalid");
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

function changeInvalidFieldClass(elements, add) {
  if (add === true) {
    elements.forEach((element) => element.classList.add("invalid"));
  } else {
    elements.forEach((element) => element.classList.remove("invalid"));
  }
}

function resetForm() {
  document.querySelector("#changeForm").reset();
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

function closeModal(event, noCheck) {
  if (event.target !== this && noCheck === false) {
    return;
  }
  changeElementDisplay(".inputRequired", "none");
  if (findInvalidFormInputs()) {
    changeInvalidFieldClass(findInvalidFormInputs());
  }
  resetForm();
  changeElementDisplay(event.target, "none");
}

function addUserToList(user) {
  const parentDiv = createElement(
    "div",
    "",
    { className: "userWrapper", "data-row-id": user.id },
    null,
    "#usersList"
  );
  const fullName = `${user.name} ${user.lastName}`;
  createElement("div", fullName, null, null, parentDiv);
  showUserButtons(user, parentDiv);
}

function loadUsers() {
  const users = JSON.parse(localStorage.getItem("users"));
  if (users === null) {
    localStorage.setItem("users", JSON.stringify(initialUsers));
    return JSON.parse(localStorage.getItem("users"));
  } else {
    return users;
  }
}
