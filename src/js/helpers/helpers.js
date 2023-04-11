const findInvalidFormInputs = () =>
  document.querySelectorAll("#changeForm input:invalid");

const invalidFieldHandler = (event) => {
  if (event.target.checkValidity() === true) {
    event.target.classList.remove("invalid");
  } else {
    event.target.classList.add("invalid");
  }
  if (findInvalidFormInputs().length === 0) {
    changeElementDisplay(document.querySelector(".inputRequired"), "none");
  }
};

const changeInvalidFieldClass = (elements, add) => {
  if (add === true) {
    elements.forEach((element) => element.classList.add("invalid"));
  } else {
    elements.forEach((element) => element.classList.remove("invalid"));
  }
};

const closeModal = (event, noCheck) => {
  if (event.target !== this && noCheck === false) {
    return;
  }
  changeElementDisplay(".inputRequired", "none");
  if (findInvalidFormInputs()) {
    changeInvalidFieldClass(findInvalidFormInputs());
  }
  changeForm.reset();
  changeElementDisplay(event.target, "none");
};

const addUserToList = (user) => {
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
};

const loadUsers = () => {
  const users = JSON.parse(localStorage.getItem("users"));
  if (users === null) {
    localStorage.setItem("users", JSON.stringify(initialUsers));
    return JSON.parse(localStorage.getItem("users"));
  } else {
    return users;
  }
};
