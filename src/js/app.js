"use strict";

const modalButton = document.querySelector('[data-bs-toggle="modal"]');
const showAlertButton = document.getElementById("showAlert");
const tooltipOptions = { title: "Tooltip text.", trigger: "hover" };
const tooltip = new bootstrap.Tooltip(modalButton, tooltipOptions);
const alertElement = document.getElementById("alertElement");

const alert = (type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>Ничего себе! Фантастика!</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
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
