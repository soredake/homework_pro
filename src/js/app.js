"use strict";

const contentElement = document.querySelector(".content");
const nextButton = document.querySelector('[value="Next"]');
let currentIndex;
let currentCategory;

const fetchData = (value) => {
  const apiRequest = new Request(`https://swapi.dev/api/${value}/`);

  clearContent(contentElement);

  contentElement.innerHTML = "Ожидаем загрузки...";

  fetch(apiRequest)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json();
    })
    .then((response) => {
      const data = response.results;
      contentElement.innerHTML = "";
      data.forEach((e) => {
        createElement(
          "div",
          e.name,
          { class: "btn btn-secondary btn-sm" },
          null,
          contentElement
        );
      });
    });
};

const markButtonActive = (e) => {
  const currActive = document
    .querySelector(".buttons")
    .querySelector("[disabled]");
  if (currActive) {
    currActive.disabled = false;
  }
  e.disabled = true;
};

document
  .querySelector(".categoryButtons")
  .addEventListener("click", (event) => {
    const value = event.target.value.toLowerCase();
    if (value && event.target.disabled === false) {
      fetchData(value, event.target);
      markButtonActive(event.target);
    }
  });

document.querySelector(".contentButtons").addEventListener("click", (event) => {
  const value = event.target.value;
  if (value === "Previous") {
  } else if (value === "Next") {
    fetchData(value, event.target);
    markButtonActive(event.target);
  }
});
