"use strict";

const images = ["image1", "image2", "image3", "image4", "image5", "image6"];
const totalImageCount = images.length;
const imageElement = document.querySelector("img");
let currentIndex = 1;

const updateIndex = (prev) => {
  if (prev === true) {
    if (currentIndex === 1) {
      currentIndex = totalImageCount;
    } else {
      --currentIndex;
    }
  } else {
    if (currentIndex === totalImageCount) {
      currentIndex = 1;
    } else {
      ++currentIndex;
    }
  }
};

const changeImage = () => {
  imageElement.setAttribute("src", `/media/image${currentIndex}.jpg`);
};

const showNextImage = () => {
  updateIndex();
  changeImage();
};

document.querySelector("main").addEventListener(
  "click",
  (event) => {
    const action = event.target.getAttribute("data-action");

    if (!action) {
      return;
    }

    clearInterval(changeImageTimer);

    if (action === "prev") {
      updateIndex(true);
    } else if (action === "next") {
      updateIndex();
    }

    changeImage();

    changeImageTimer = setInterval(showNextImage, 3000);
  },
  true
);

let changeImageTimer = setInterval(showNextImage, 3000);
