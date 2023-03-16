"use strict";

const images = ["image1", "image2", "image3", "image4", "image5", "image6"];
const numberOfImages = images.length;
const statusEl = document.querySelector(".statusEl");
const indexEl = document.querySelector(".indexEl");
let currentIndex = 1;
let timer;

const changeImage = () => {
  const imageItem = document.querySelector("img");
  imageItem.setAttribute("src", `/media/image${currentIndex}.jpg`);
};

const changeImageTimer = () => {
  if (currentIndex === numberOfImages) {
    currentIndex = 1;
  } else {
    ++currentIndex;
  }
  changeImage();
  indexEl.innerHTML = `Текущий index: ${currentIndex}`;
};

document.querySelector("main").addEventListener(
  "click",
  (event) => {
    const action = event.target.getAttribute("data-action");

    if (!action) {
      return;
    }

    
    if (action === "prev") {
      if (currentIndex === 1) {
        currentIndex = numberOfImages;
      } else {
        --currentIndex;
      }
    } else if (action === "next") {
      if (currentIndex === numberOfImages) {
        currentIndex = 1;
      } else {
        ++currentIndex;
      }
    }
    changeImage();
    // clearInterval(timer);

    // timer = setInterval(changeImageTimer, 3000);
    indexEl.innerHTML = `Текущий index: ${currentIndex}`;
  },
  true
);

// timer = setInterval(changeImageTimer, 3000);
indexEl.innerHTML = `Текущий index: ${currentIndex}`;
