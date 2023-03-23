"use strict";

const contentElement = document.querySelector(".content");
const categoryButtons = document.querySelector(".categoryButtons");
const contentButtons = document.querySelector(".contentButtons");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
let currentIndex;
let currentCategory;
let results;
// films: Array(4) [ "https://swapi.dev/api/films/1/", "https://swapi.dev/api/films/2/", "https://swapi.dev/api/films/3/", … ]
// homeworld: "https://swapi.dev/api/planets/1/"
// species: Array []
// starships: Array [ "https://swapi.dev/api/starships/13/" ]
// vehicles: Array []
const peopleObj = {
  birth_year: "Год рождения",
  eye_color: "Цвет глаз",
  gender: "Пол",
  hair_color: "Цвет волос",
  height: "Рост",
  mass: "Вес",
  skin_color: "Цвет кожи",
};

// "residents": [
//     "https://swapi.dev/api/people/1/",
//     "https://swapi.dev/api/people/2/",
//     "https://swapi.dev/api/people/4/",
//     "https://swapi.dev/api/people/6/",
//     "https://swapi.dev/api/people/7/",
//     "https://swapi.dev/api/people/8/",
//     "https://swapi.dev/api/people/9/",
//     "https://swapi.dev/api/people/11/",
//     "https://swapi.dev/api/people/43/",
//     "https://swapi.dev/api/people/62/"
// ],
// "films": [
//     "https://swapi.dev/api/films/1/",
//     "https://swapi.dev/api/films/3/",
//     "https://swapi.dev/api/films/4/",
//     "https://swapi.dev/api/films/5/",
//     "https://swapi.dev/api/films/6/"
// ],

const planetObj = {
  rotation_period: "Скорость вращения",
  orbital_period: "Орбитальный период",
  diameter: "Диаметр",
  climate: "Климат",
  gravity: "Гравитация",
  terrain: "Местность",
  surface_water: "Процент воды на планете",
  population: "Население",
};

const showElementInfo = (e) => {
  const infoModal = new bootstrap.Modal(document.getElementById("elementInfo"));
  const index = e.target.getAttribute("data-index");
  const modalContent = document.querySelector(".modal-body");
  const modalTitle = document.querySelector("#elementInfoLabel");

  if (modalContent.innerHTML) {
    modalContent.innerHTML = "";
  }

  modalTitle.innerHTML = results[index].name;
  Object.keys(peopleObj).forEach((key) => {
    const value = peopleObj[key];
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
