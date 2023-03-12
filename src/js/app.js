// TODO: как грузить список пользователей изначально и при этом в глобал скоупе иметь переменную с ними?
let users = JSON.parse(localStorage.getItem("users"));
const addForm = document.querySelector(".addForm");

function addUserHandler() {
  const form = document.forms.orderConfirmation;
  const orderDetailsContent = document.querySelector(".orderDetailsContent");
  const activeProductId = findActiveId("product");
  const activeCategoryId = findActiveId("category");
  const activeProduct =
    data[activeCategoryId - 1].products[activeProductId - 1];

  if (findInvalidInputs().length) {
    invalidElementsClassHelper(findInvalidInputs(), true);
    changeElementDisplay(inputRequired, "block");
    return;
  }

  if (orderDetailsContent.innerHTML) {
    orderDetailsContent.innerHTML = "";
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

function handleModalClose(event) {
  console.log(event.target);
  // console.log(event.currentTarget);
  // changeElementDisplay(event.target, "none");
  // TODO: спроси об этом, нормально ли так делать?
  if (event.target !== this) {
    return;
  }
  removeElement(event.target);
}

function handleUserDeleteConfirmation(params) {}

function askDeleteConfirmation(user) {
  // Фон для модалки
  // TODO: как избежать срабатывания на child элементах?
  // TODO: можно ли сделать модалку для подвтерждения удаления статичной?
  const modalCloseHandler = {
    click: {
      callback: handleModalClose,
    },
  };
  const parentSelector = "#main";
  createElement(
    "div",
    "",
    {
      className: "modalBase",
      id: "deleteConfirmationModal",
    },
    modalCloseHandler,
    parentSelector
  );
  // Контент модалки
  const deleteConfirmationHandler = {
    click: {
      callback: handleUserDeleteConfirmation,
      isOnCapture: true,
    },
  };
  const parentModalSelector = "#deleteConfirmationModal";
  createElement(
    "div",
    `Вы точно хотите удалить: ${user.name}?`,
    {
      className: "modalContent",
      id: "deleteConfirmationContent",
    },
    deleteConfirmationHandler,
    parentModalSelector
  );
  // Кнопка удаления
  createElement(
    "input",
    "",
    { value: "Delete", type: "button", name: "delete", "data-id": user.id },
    null,
    "#deleteConfirmationContent"
  );
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
    // deleteUserHandler(user.id);
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
  // TODO: стоит ли грузить начальный список заново если localstorage = [] (имеет в себе пустой массив)?
  localStorage.setItem("users", JSON.stringify(initialUsers));
  users = JSON.parse(localStorage.getItem("users"));
}

window.addEventListener("load", function () {
  if (this.localStorage.getItem("users") === null) {
    loadInitialUsers();
  }
  showUsers();
});

window.addEventListener("click", function (event) {
  if (event.target === addForm) {
    changeElementDisplay(".addForm", "none");
    document.querySelector("form").reset();
  }
});
