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
const myBirthDate = new Date("1997/2/19");
const myBirthDateElement = document.querySelector(".myBirthDate");
const birthDateInput = document.querySelector('input[name="birthDateInput"]');
const formatDate = document.querySelector(".formatDate");
const dateAlert = document.querySelector(".dateAlert");
const birthDayFormat = "DD MMMM YYYY";
moment.locale("ru");
myBirthDateElement.innerHTML = `<b>Дата моего рождения:</b> ${moment(
  myBirthDate
).format(birthDayFormat)} года<br><b>В формате UNIX:</b>
  ${moment(myBirthDate).format("x")}`;

const checkInputValidity = (el) => el.checkValidity();
const changeElementDisplay = (el, hide) =>
  hide === true ? (el.style.display = "none") : (el.style.display = "block");
const requireCorrectDateInput = () => {
  // dateAlert.innerHTML = `Введите дату в формате <b>YYYY/MM/DD</b>`;
  alert("danger", `Введите дату в формате <b>YYYY/MM/DD</b>`, dateAlert);
  // birthDateInput.classList.add("invalid");
  // birthDateInput.classList.remove("dateSuccess");
  // dateAlert.classList.add("invalid");
  // dateAlert.classList.remove("dateSuccess");
  // changeElementDisplay(dateAlert);
};

formatDate.addEventListener("click", () => {
  if (checkInputValidity(birthDateInput) === false) {
    requireCorrectDateInput();
  } else {
    // dateAlert.innerHTML = `Дата в формате "${birthDayFormat}": <b>
    // ${moment(birthDateInput.value).format(birthDayFormat)} года</b>`;
    // dateAlert.classList.remove("invalid");
    // dateAlert.classList.add("dateSuccess");
    // changeElementDisplay(dateAlert);
    alert(
      "success",
      `${moment(birthDateInput.value).format(birthDayFormat)} года`,
      dateAlert
    );
  }
});

// birthDateInput.addEventListener("change", () => {
//   if (checkInputValidity(birthDateInput) === false) {
//     requireCorrectDateInput();
//   } else {
//     birthDateInput.classList.remove("invalid");
//     changeElementDisplay(dateAlert, true);
//   }
// });

// window.addEventListener("load", () => {
//   checkInputValidity(birthDateInput) || birthDateInput.classList.add("invalid");
// });
