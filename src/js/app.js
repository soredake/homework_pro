// TODO: как грузить список пользователей изначально и при этом в глобал скоупе иметь переменную с ними?
let users = JSON.parse(localStorage.getItem("users"));

function addOrSaveUserHandler(action) {
  const form = document.forms.addForm;
  const formContent = document.querySelector('form[name="addForm"]');
  const inputRequired = document.querySelector(".inputRequired");

  if (findInvalidFormInputs().length) {
    invalidFieldsHelper(findInvalidFormInputs(), true);
    changeElementDisplay(".inputRequired", "block");
    return;
  }

  const user = {
    id: Date.now().toString(36),
    name: form.elements.name.value,
    lastName: form.elements.surname.value,
    email: form.elements.email.value,
  };
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

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

  // changeElementDisplay(inputRequired, "none");
  // changeElementDisplay(orderDetailsBg, "block");
}

document.querySelector(".addBtn").addEventListener("click", function () {
  const formTitle = document.querySelector("#formTitle");
  const inputs = document.querySelectorAll('form[name="addForm"] input');
  formTitle.innerHTML = "Добавить пользователя";
  changeElementDisplay(".addFormBg", "block");
  inputs.forEach(function (input) {
    input.addEventListener("change", invalidFieldHandler);
  });
  document
    .querySelector("#addUser")
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
  const deleteConfirmationPrompt = document.querySelector(
    ".deleteConfirmationPrompt"
  );
  deleteConfirmationPrompt.setAttribute("id", user.id);
  deleteUserText.innerHTML = `Вы точно хотите удалить пользователя <b>${user.name}</b>?`;
  changeElementDisplay(deleteConfirmationPromptBg, "block");

  // console.log(
  //   `user после передачи в функцию подтверждения: ${JSON.stringify(user)}`
  // );
  // console.log(`id после передачи в функцию подтверждения: ${user.id}`);

  document
    .querySelector('.deleteConfirmationPrompt input[value="Удалить"]')
    .addEventListener("click", function (event) {
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
  // console.log(`id после начала удаления ${id}`);
  // console.log(users.findIndex((user) => user.id == id));
  const index = users.findIndex((user) => user.id == id);
  // console.log(`Индекс после начала удаления: ${index}`);
  // console.log(`Пользователи до: ${JSON.stringify(users)}`);
  // if (!id) {
    // console.log(`oh no...`);
  // }
  users.splice(index, 1);
  // console.log(`Пользователи после: ${JSON.stringify(users)}`);
  localStorage.setItem("users", JSON.stringify(users));
  removeElement(`div[data-row-id="${id}"`);
}

function handleUserButtonsClick(event) {
  const action = event.target.getAttribute("name");
  const id = event.target.getAttribute("data-id");
  // console.log(`id до вывода формы ${id}`);
  const user = users.find((user) => user.id == id);
  // console.log(`user до вывода формы ${JSON.stringify(user)}`);

  if (action === "view") {
    viewUserHandler(user);
  } else if (action === "edit") {
    editUserHandler(user);
  } else if (action === "delete") {
    askDeleteConfirmation(user);
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
  if (event.target.classList.contains("addFormBg")) {
    changeElementDisplay(event.target, "none");
    changeElementDisplay(".inputRequired", "none");
    resetForm();
    invalidFieldsHelper(findInvalidFormInputs());
  } else if (event.target.classList.contains("deleteConfirmationPromptBg")) {
    changeElementDisplay(event.target, "none");
  }
});
