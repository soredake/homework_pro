"use strict";

let houses = [];
const createHouseButton = document.querySelector(".createHouse");
const myModal = new bootstrap.Modal("#modal");
const myModalEl = document.querySelector("#modal");
const placeholderModal = new bootstrap.Modal("#placeholderModal");

const createHouse = () => {
  const form = document.forms.houseCreation;
  const appartmentsCount = form.elements.appartmentsCount.value;

  // for (let index = 0; index < array.length; index++) {
  //   const element = array[index];
  // }
};

createHouseButton.addEventListener("click", () => {
  // alert("works");
  // createHouse();
  myModal.hide();
  // myModal.show();
  // myModal.toggle();
  setTimeout(() => {
    // placeholderModal.toggle();
    myModal.show();
  }, 900);
  // setTimeout(myModal.hide(), 10);
  // myModalEl.addEventListener("hidden.bs.modal", (event) => {
  // setTimeout(myModal.show(), 900);
  // });

  // placeholderModal.modal("hide");
});
