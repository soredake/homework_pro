"use strict";

const contentElement = document.querySelector(".content");
const categoryButtons = document.querySelector(".categoryButtons");
const contentButtons = document.querySelector(".contentButtons");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
let currentIndex;
let results;

const getCurrentCategory = () => {
  return contentElement.getAttribute("data-category");
};

const showElementInfo = (e) => {
  const infoModal = new bootstrap.Modal(document.getElementById("elementInfo"));
  const index = e.target.getAttribute("data-index");
  const modalContent = document.querySelector(".modal-body");
  const modalTitle = document.querySelector("#elementInfoLabel");
  const category = getCurrentCategory();
  let categoryObj;

  if (category == "people") {
    categoryObj = peopleObj;
  } else if (category == "planets") {
    categoryObj = planetsObj;
  } else if (category == "vehicles") {
    categoryObj = vehiclesObj;
  }

  if (modalContent.innerHTML) {
    clearContent(modalContent);
  }

  modalTitle.innerHTML = results[index].name;

  Object.keys(categoryObj).forEach((key) => {
    const value = categoryObj[key];
    createElement(
      "div",
      `<b>${value}:</b> ${results[index][key]}`,
      null,
      null,
      modalContent
    );
  });

  infoModal.show();
};

const displayData = (category) => {
  clearContent(contentElement);
  contentElement.innerHTML = "Loading...";
  contentElement.setAttribute("data-category", category);

  const apiRequest = new Request(
    `https://swapi.dev/api/${category}/?page=${currentIndex}`
  );
  fetch(apiRequest)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Error received when fetching data: ${response.status}`
        );
      }

      return response.json();
    })
    .then((response) => {
      results = response.results;
      const next = response.next;
      const previous = response.previous;

      clearContent(contentElement);

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
  const category = event.target.getAttribute("data-category");
  if (category && event.target.disabled === false) {
    currentIndex = 1;
    displayData(category);
    markCategoryActive(event.target);
    changeElementDisplay(contentButtons, "flex");
  }
});

contentButtons.addEventListener("click", (event) => {
  const action = event.target.value;
  const category = getCurrentCategory();
  if (action === "Previous") {
    --currentIndex;
    nextButton.disabled = false;
    displayData(category, "prev");
  } else if (action === "Next") {
    ++currentIndex;
    prevButton.disabled = false;
    displayData(category, "next");
  }
});
