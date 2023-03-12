// TODO: как грузить список пользователей изначально и при этом в глобал скоупе иметь переменную с ними?
let users = JSON.parse(localStorage.getItem("users"));
// const addForm = document.querySelector(".addForm");

function addOrSaveUserHandler(action) {
  // console.log(action);
  const form = document.forms.addForm;
  const formContent = document.querySelector('form[name="addForm"]');
  const inputRequired = document.querySelector(".inputRequired");
  // const activeProductId = findActiveId("product");
  // const activeCategoryId = findActiveId("category");
  // const activeProduct = data[activeCategoryId - 1].products[activeProductId - 1];

  if (findInvalidFormInputs().length) {
    invalidElementsClassHelper(findInvalidFormInputs(), true);
    changeElementDisplay(".inputRequired", "block");
    return;
  }

  const order = {
    orderId: Date.now().toString(36),
    name: form.elements.name.value,
    surname: form.elements.surname.value,
    patronymic: form.elements.patronymic.value,
    finalPrice: activeProduct.price,
    city: cityObj[form.elements.city.value],
    deliveryLocation: form.elements.deliveryLocation.value,
    payment: paymentObj[form.elements.payment.value],
    quantity: form.elements.quantity.value,
    products: [{ name: activeProduct.name, price: activeProduct.price }],
    comment: form.elements.commentary.value,
    date: Date.now(),
  };
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  addOrderDetails(`<b>Вы успешно купили:</b> ${activeProduct.name}`);
  addOrderDetails(
    `Товар будет доставлен в город <b>${
      cityObj[form.elements.city.value]
    }</b> в отделение новой почты номер <b>${
      form.elements.deliveryLocation.value
    }</b>`
  );
  changeElementDisplay(inputRequired, "none");
  changeElementDisplay(orderDetailsBg, "block");
}

document.querySelector(".addBtn").addEventListener("click", function () {
  const formTitle = document.querySelector("#formTitle");
  const inputs = document.querySelectorAll('form[name="addForm"] input');
  formTitle.innerHTML = "Добавить пользователя";
  changeElementDisplay(".addForm", "block");
  for (const element of inputs) {
    element.addEventListener("change", invalidFieldHandler);
  }
  document
    .querySelector("#addOrEditUser")
    .addEventListener("click", addOrSaveUserHandler);
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

function askDeleteConfirmation(user, event) {
  const deleteUserText = document.querySelector(".deleteUserText");
  const deleteConfirmationPromptBg = document.querySelector(
    ".deleteConfirmationPromptBg"
  );
  deleteUserText.innerHTML = `Вы точно хотите удалить пользователя <b>${user.name}</b>?`;
  changeElementDisplay(deleteConfirmationPromptBg, "block");
  document
    .querySelector('.deleteConfirmationPrompt input[value="Удалить"]')
    .addEventListener("click", function () {
      deleteUserHandler(user.id);
      changeElementDisplay(deleteConfirmationPromptBg, "none");
    });
  document
    .querySelector('.deleteConfirmationPrompt input[value="Назад"]')
    .addEventListener("click", function () {
      changeElementDisplay(deleteConfirmationPromptBg, "none");
    });
  // TODO: нужно ли после удаление выводить зелёную иконку уведомляющую о том что пользователь успешно удалён?
}

function deleteUserHandler(id) {
  const index = users.findIndex((user) => user.id == id);
  users.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(users));
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
    askDeleteConfirmation(user, event);
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
    const fullName = `${user.name} ${user.lastName}`;
    createElement("div", fullName, null, null, parentDiv);
    showUserButtons(user, parentDiv);
  });
}

function showUsers() {
  showUsersListHeader();
  showUsersList();
}

function loadInitialUsers() {
  // TODO: стоит ли грузить начальный список заново если localstorage = [] (имеет в себе пустой массив после удаления всех пользователей)?
  localStorage.setItem("users", JSON.stringify(initialUsers));
  users = JSON.parse(localStorage.getItem("users"));
}

window.addEventListener("load", function () {
  if (
    this.localStorage.getItem("users") === null ||
    this.localStorage.getItem("users") === "[]"
  ) {
    loadInitialUsers();
  }
  showUsers();
});

window.addEventListener("click", function (event) {
  // console.log(event.target.classList.contains("addForm"));
  if (event.target.classList.contains("addForm")) {
    changeElementDisplay(event.target, "none");
    changeElementDisplay(".inputRequired", "none");
    resetForm();
  } else if (event.target.classList.contains("deleteConfirmationPromptBg")) {
    changeElementDisplay(event.target, "none");
  }
});
