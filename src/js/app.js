"use strict";

// Bootstrap
const openModal = document.querySelector('[data-bs-toggle="modal"]');
const showAlertButton = document.getElementById("showAlert");
const tooltip = new bootstrap.Tooltip(openModal, {
  title: "Замечательный tooltip",
  trigger: "hover",
});
const bootstrapAlert = document.getElementById("alertElement");
const alert = (type, message, alertElement) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `<div class="alert alert-${type} alert-dismissible" role="alert">
       <div>${message}</div>
       <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;

  alertElement.append(wrapper);
};

showAlertButton.addEventListener("click", () => {
  if (bootstrapAlert.innerHTML) {
    bootstrapAlert.innerHTML = "";
    return;
  }
  alert("success", "Ничего себе! Фантастика!", bootstrapAlert);
});

// Moment.js
const myBirthDate = new Date("1997/02/19");
const myBirthDateElement = document.querySelector(".myBirthDate");
const birthDateInput = document.querySelector('input[name="birthDateInput"]');
const formatDate = document.querySelector(".formatDate");
const dateAlert = document.querySelector(".dateAlert");
const birthDayFormat = "DD MMMM YYYY";
const checkInputValidity = (el) => el.checkValidity();
const requireCorrectDateInput = () => {
  alert("danger", `Введите дату в формате <b>YYYY/MM/DD</b>`, dateAlert);
};

moment.locale("ru");
myBirthDateElement.innerHTML = `<b>Дата моего рождения:</b> ${moment(
  myBirthDate
).format(birthDayFormat)} года<br><b>В формате UNIX:</b>
  ${moment(myBirthDate).format("x")}`;


formatDate.addEventListener("click", () => {
  dateAlert.innerHTML = "";
  if (checkInputValidity(birthDateInput) === false) {
    requireCorrectDateInput();
  } else {
    alert(
      "success",
      `Дата в формате ${birthDayFormat}: <b>${moment(
        birthDateInput.value
      ).format(birthDayFormat)} года</b>`,
      dateAlert
    );
  }
});

birthDateInput.addEventListener("change", () => {
  dateAlert.innerHTML = "";
  if (checkInputValidity(birthDateInput) === false) {
    birthDateInput.classList.add("invalid");
    requireCorrectDateInput();
  } else {
    birthDateInput.classList.remove("invalid");
  }
});

window.addEventListener("load", () => {
  checkInputValidity(birthDateInput) || birthDateInput.classList.add("invalid");
});
