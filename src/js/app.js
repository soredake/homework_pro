"use strict";

const contentElement = document.querySelector(".content");
const categoryButtons = document.querySelector(".categoryButtons");
const contentButtons = document.querySelector(".contentButtons");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
let currentIndex;
let currentCategory;
let results;

const showElementInfo = (e) => {
  const infoModal = new bootstrap.Modal(document.getElementById("elementInfo"));
  const index = e.target.getAttribute("data-index");
  const modalContent = document.querySelector(".modal-body");
  const modalTitle = document.querySelector("#elementInfoLabel");
  let currObj;

  if (currentCategory === "people") {
    currObj = peopleObj;
  } else if (currentCategory === "planets") {
    currObj = planetsObj;
  } else if (currentCategory === "vehicles") {
    currObj = vehiclesObj;
  }

  if (modalContent.innerHTML) {
    modalContent.innerHTML = "";
  }

  modalTitle.innerHTML = results[index].name;
  Object.keys(currObj).forEach((key) => {
    const value = currObj[key];
    createElement(
      "div",
      `<b>${value}:</b> ${results[index][key]}`,
      null,
      null,
      modalContent
    );
  });

  if (results[index].films.length >= 1) {
    const moviesEl = createElement(
      "div",
      "<b>Был в фильмах:</b>",
      {
        class: "",
      },
      null,
      modalContent
    );
    results[index].films.forEach((key) => {
      console.log(key);
      const apiRequest = new Request(key);
      fetch(apiRequest)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Произошла ошибка: ${response.status}`);
          }

          return response.json();
        })
        .then((response) => {
          const subResults = response;
          createElement("div", subResults.title, null, null, moviesEl);
        });
    });
  }
  infoModal.show();
};

const displayData = () => {
  clearContent(contentElement);
  contentElement.innerHTML = "Ожидаем загрузки...";

  const apiRequest = new Request(
    `https://swapi.dev/api/${currentCategory}/?page=${currentIndex}`
  );
  fetch(apiRequest)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json();
    })
    .then((response) => {
      results = response.results;
      const next = response.next;
      const previous = response.previous;

      contentElement.innerHTML = "";

      const showInfoHandler = {
        click: {
          callback: showElementInfo,
          isOnCapture: true,
        },
      };
      results.forEach((e, i) => {
        createElement(
          "div",
          e.name,
          {
            class: "btn btn-secondary btn-sm",
            "data-index": i,
          },
          showInfoHandler,
          contentElement
        );
      });

      if (!next) {
        prevButton.disabled = false;
        nextButton.disabled = true;
      } else if (!previous) {
        prevButton.disabled = true;
        nextButton.disabled = false;
      }
    });
};

const markCategoryActive = (e) => {
  const currActive = categoryButtons.querySelector("[disabled]");
  if (currActive) {
    currActive.disabled = false;
  }
  e.disabled = true;
};

categoryButtons.addEventListener("click", (event) => {
  const category = event.target.value.toLowerCase();
  if (category && event.target.disabled === false) {
    currentCategory = category;
    currentIndex = 1;
    displayData();
    markCategoryActive(event.target);
    changeElementDisplay(contentButtons, "flex");
  }
});

contentButtons.addEventListener("click", (event) => {
  const value = event.target.value;
  if (value === "Previous") {
    --currentIndex;
    nextButton.disabled = false;
    displayData(currentCategory, "prev");
  } else if (value === "Next") {
    ++currentIndex;
    prevButton.disabled = false;
    displayData(currentCategory, "next");
  }
});
