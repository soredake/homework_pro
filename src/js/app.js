"use strict";

const modalButton = document.querySelector('[data-bs-toggle="modal"]');
const showAlertButton = document.getElementById("showAlert");
const tooltipOptions = { title: "Замечательный tooltip", trigger: "hover" };
const tooltip = new bootstrap.Tooltip(modalButton, tooltipOptions);
const alertElement = document.getElementById("alertElement");
const birthDateElement = document.querySelector(".birthDate");
const birthDateInput = document.querySelector('input[name="birthDateInput"]');
const birthDateInputButton = document.querySelector(".birthDateInputButton");
const birthDate = new Date("1997/2/19");
const dateInAnotherFormat = document.querySelector(".dateInAnotherFormat");

const alert = (type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">
       <div>Ничего себе! Фантастика!</div>
       <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`,
  ].join("");

  alertElement.append(wrapper);
};

showAlertButton.addEventListener("click", () => {
  if (alertElement.innerHTML) {
    alertElement.innerHTML = "";
    return;
  }
  alert("success");
});

moment.locale("ru");
birthDateElement.innerHTML = `<b>Дата моего рождения:</b> ${moment(
  birthDate
).format("DD MMMM YYYY")} года <br><b>В формате UNIX:</b>
  ${moment(birthDate).format("x")}`;

birthDateInputButton.addEventListener("click", function () {
  dateInAnotherFormat.innerHTML = `Дата в формате "DD MMMM YYYY": <b>
    ${moment(birthDateInput.value).format("DD MMMM YYYY")}</b>`;
});

birthDateInput.addEventListener("change", function (event) {
  const el = event.target;
  const isInvalid = el.checkValidity();
  if (isInvalid === true) {
    el.classList.add("invalid");
  } else {
    el.classList.remove("invalid");
  }
});
