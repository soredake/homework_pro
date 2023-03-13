// TODO: как грузить список пользователей изначально и при этом в глобал скоупе иметь переменную с ними?
let users = JSON.parse(localStorage.getItem("users"));

function showAddEditForm(edit, user) {
  const formTitle = document.querySelector("#formTitle");
  const formInputs = document.querySelectorAll('form[name="addForm"] input');

  invalidFieldsHelper(findInvalidFormInputs());

  if (edit) {
    const types = ["name", "lastName", "email"];
    const addFormBg = document.getElementById("addForm");
    addFormBg.setAttribute("data-id", user.id);
    formTitle.innerHTML = `Изменить пользователя ${user.name} ${user.lastName}`;
    types.forEach((type) => {
      document.querySelector(`input[name="${type}"]`).value = user[type];
    });
    addOrEditButton.value = "Сохранить";
  } else {
    formTitle.innerHTML = "Добавить пользователя";
  }

  formInputs.forEach(function (input) {
    input.addEventListener("change", invalidFieldHandler);
  });
  changeElementDisplay(".addFormBg", "block");
}

function addOrEditUserHandler(event, edit) {
  const form = document.forms.addForm;
  const id = event.target.parentNode.getAttribute("data-id");
  const index = users.findIndex((user) => user.id == id);
  const action = edit ? "отредактировали" : "добавили";
  let successText = `Вы успешно ${action} пользователя`;

  if (findInvalidFormInputs().length) {
    invalidFieldsHelper(findInvalidFormInputs(), true);
    changeElementDisplay(".inputRequired", "block");
    return;
  }

  const user = {
    id: id || Date.now().toString(36),
    name: form.elements.name.value,
    lastName: form.elements.lastName.value,
    email: form.elements.email.value,
  };

  if (edit) {
    const currentUserElement = document.querySelector(
      `div[data-row-id="${id}"] div`
    );
    currentUserElement.innerHTML = `${user.name} ${user.lastName}`;
    users[index].name = user.name;
    users[index].lastName = user.lastName;
    users[index].email = user.email;
  } else {
    users.push(user);
    successText += ` <b>${user.name} ${user.lastName}</b>`;
    addUserToList(user);
  }
  localStorage.setItem("users", JSON.stringify(users));

  changeElementDisplay(".addFormBg", "none");

  const successModalHandlers = {
    click: {
      callback: closeModal,
      isOnCapture: true,
    },
  };
  const successModalBg = createElement(
    "div",
    "",
    {
      className: "modalBg",
    },
    successModalHandlers,
    "body"
  );
  createElement(
    "div",
    successText,
    {
      className: "modalContent",
    },
    null,
    successModalBg
  );
}

function showUsersListHeader() {
  const headerDiv = createElement("div", "", null, null, "#usersList");
  createElement("div", "<b>Full name</b>", null, null, headerDiv);
  createElement("div", "<b>Actions</b>", null, null, headerDiv);
}

function viewUserHandler(user) {
  const parentSelector = document.querySelector("#userView");
  parentSelector.innerHTML = `
  <h3>Информация о пользователе</h3>
  <p><b>ID: </b>${user.id}</p>
  <p><b>Имя: </b>${user.name} ${user.lastName}</p>
  <p><b>Email: </b>${user.email}</p>`;
  changeElementDisplay("#userView", "block");
}

function askDeleteConfirmation(user) {
  const deleteUserText = document.querySelector(".deleteUserText");
  const deleteConfirmationPrompt = document.querySelector(
    ".deleteConfirmationPrompt"
  );
  deleteConfirmationPrompt.setAttribute("id", user.id);
  removeButton.setAttribute("data-id", user.id);
  deleteUserText.innerHTML = `Вы точно хотите удалить пользователя <b>${user.name}</b>?`;
  changeElementDisplay(deleteConfirmationPromptBg, "block");
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
    showAddEditForm(true, user);
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
      className: "button",
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
    {
      className: "button",
      value: "Edit",
      type: "button",
      name: "edit",
      "data-id": user.id,
    },
    null,
    actionsButtonsDiv
  );
  createElement(
    "input",
    "",
    {
      className: "button",
      value: "Delete",
      type: "button",
      name: "delete",
      "data-id": user.id,
    },
    null,
    actionsButtonsDiv
  );
}

function showUsersList() {
  users.forEach((user) => addUserToList(user));
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
  } else if (event.target === deleteConfirmationPromptBg) {
    changeElementDisplay(event.target, "none");
  }
});

// Кнопка подтверждения удаления пользователя
removeButton.addEventListener("click", function (event) {
  const id = event.target.getAttribute("data-id");
  deleteUserHandler(id);
  changeElementDisplay(deleteConfirmationPromptBg, "none");
});

// Кнопка назад в форме
backButton.addEventListener("click", function () {
  changeElementDisplay(deleteConfirmationPromptBg, "none");
});

// Кнопка добавления пользователя
showAddOrEditFormButton.addEventListener("click", function () {
  showAddEditForm();
});

// Кнопка подтверждения сохранения и добавления пользователя
addOrEditButton.addEventListener("click", function (event) {
  action = addOrEditButton.getAttribute("value");
  if (action === "Сохранить") {
    addOrEditUserHandler(event, true);
  } else if (action === "Добавить") {
    addOrEditUserHandler(event);
  }
});
