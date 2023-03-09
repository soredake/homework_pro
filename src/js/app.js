const users = JSON.parse(localStorage.getItem("users")) || [];
const addForm = document.querySelector(".addForm");

function addUserHandler() {
  const form = document.forms.addForm;
  const invalidInputs = document.querySelectorAll("input:invalid");
  const requireInput = document.querySelector(".requireInput");
  if (invalidInputs.length) {
    changeElementDisplay(".requireInput", "block");
    return;
  }

  // if (orderDetailsContent.innerHTML) {
  //   orderDetailsContent.innerHTML = "";
  // }

  const user = {
    id: Date.now(),
    name: form.elements.name.value,
    lastName: form.elements.surname.value,
    email: form.elements.email.value,
  };
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  // addOrderDetails(`<b>Вы успешно купили:</b> ${activeProduct.name}`);
  // addOrderDetails(
  //   `Товар будет доставлен в город <b>${
  //     cityObj[form.elements.city.value]
  //   }</b> в отделение новой почты номер <b>${
  //     form.elements.deliveryLocation.value
  //   }</b>`
  // );
  // alert(`Вы добавили пользователя: ${form.elements.name.value}`);
  changeElementDisplay(requireInput, "none");
  changeElementDisplay(orderDetailsBg, "block");
}

document.querySelector(".addBtn").addEventListener("click", function () {
  changeElementDisplay(".modalBase", "block");
  document
    .querySelector(".addUserButton")
    .addEventListener("click", addUserHandler);
});

function showUsersListHeader() {
  const headerDiv = createElement("div", "", null, null, "#usersList");
  createElement("div", "Full name", null, null, headerDiv);
  createElement("div", "Actions", null, null, headerDiv);
}

function viewUserHandler(user) {
  const parentSelector = "#userView";
  clearContent(parentSelector);
  createElement("div", `Name: ${user.name}`, null, null, parentSelector);
  createElement(
    "div",
    `Last name: ${user.lastName}`,
    null,
    null,
    parentSelector
  );
  createElement("div", `Email: ${user.email}`, null, null, parentSelector);
}

function editUserHandler(user) {}

function deleteUserHandler(id) {
  const index = users.findIndex((user) => user.id == id);
  users.splice(index, 1);
  removeElement(`div[data-row-id="${id}"`);
}

function handleUserButtonsClick(event) {
  const action = event.target.getAttribute("name");
  const id = event.target.getAttribute("data-id");
  const user = users.find((user) => user.id == id);

  if (action === "view") {
    viewUserHandler(user);
  } else if (action === "edit") {
    editUserHandler(user);
  } else if (action === "delete") {
    deleteUserHandler(user.id);
  }
}

function showUserButtons(user, parentElement) {
  const buttonsHandlers = {
    click: {
      callback: handleUserButtonsClick,
      isOnCapture: true,
    },
  };
  const actionsButtonsDiv = createElement(
    "div",
    "",
    null,
    buttonsHandlers,
    parentElement
  );
  createElement(
    "input",
    "",
    {
      value: "View",
      type: "button",
      name: "view",
      "data-id": user.id,
    },
    null,
    actionsButtonsDiv
  );
  createElement(
    "input",
    "",
    { value: "Edit", type: "button", name: "edit", "data-id": user.id },
    null,
    actionsButtonsDiv
  );
  createElement(
    "input",
    "",
    { value: "Delete", type: "button", name: "delete", "data-id": user.id },
    null,
    actionsButtonsDiv
  );
}

function showUsersList() {
  users.forEach(function (user) {
    const parentDiv = createElement(
      "div",
      "",
      { "data-row-id": user.id },
      null,
      "#usersList"
    );
    const fullname = `${user.name} ${user.lastName}`;
    createElement("div", fullname, null, null, parentDiv);
    showUserButtons(user, parentDiv);
  });
}

function showUsers() {
  showUsersListHeader();
  showUsersList();
}

window.addEventListener("load", function () {
  showUsers();
});

window.addEventListener("click", function (event) {
  if (event.target === addForm) {
    changeElementDisplay(".addForm", "none");
    document.querySelector("form").reset();
  }
});
