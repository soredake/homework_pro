"use strict";

const contentElement = document.querySelector(".content");
const categoryButtons = document.querySelector(".categoryButtons");
const contentButtons = document.querySelector(".contentButtons");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
let currentIndex;
let currentCategory;
let results;
const peopleObj = {
  birth_year: "Год рождения",
  eye_color: "Цвет глаз",
  gender: "Пол",
  hair_color: "Цвет волос",
  height: "Рост",
  mass: "Вес",
  skin_color: "Цвет кожи",
};

const showElementInfo = (e) => {
  const infoModal = new bootstrap.Modal(document.getElementById("elementInfo"));
  const index = e.target.getAttribute("data-index");
  const modalContent = document.querySelector(".modal-body");
  const modalTitle = document.querySelector("#elementInfoLabel");
  // films: Array(4) [ "https://swapi.dev/api/films/1/", "https://swapi.dev/api/films/2/", "https://swapi.dev/api/films/3/", … ]
  // homeworld: "https://swapi.dev/api/planets/1/"
  // species: Array []
  // starships: Array [ "https://swapi.dev/api/starships/13/" ]
  // vehicles: Array []

  modalTitle.innerHTML = results[index].name;

  if (modalContent.innerHTML) {
    modalContent.innerHTML = "";
  }

  Object.keys(peopleObj).forEach((key) => {
    // console.log(results[index][key]);
    const value = peopleObj[key];
    // console.log(key);
    // console.log(results[index][key]);
    // console.log(`${results[index]}`);
    // return;
    createElement(
      "div",
      `<b>${value}:</b> ${results[index][key]}`,
      {
        class: "",
      },
      null,
      modalContent
    );
  });

  // console.log(m);
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
