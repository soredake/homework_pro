"use strict";

const images = ["image1", "image2", "image3", "image4", "image5", "image6"];
const numberOfImages = images.length;
const statusEl = document.querySelector(".statusEl");
const indexEl = document.querySelector(".indexEl");
// const prevButton = document.querySelector("[data-action=prev]");
// const nextButton = document.querySelector("[data-action=next]");
let currentIndex = 1;

const changeImage = () => {
  const imageItem = document.querySelector("img");
  imageItem.setAttribute("src", `/media/image${currentIndex}.jpg`);
};

const changeImageTimer = () => {
  if (currentIndex === numberOfImages) {
    currentIndex = 1;
  } else {
    // currentIndex = currentIndex + 1;
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

    clearInterval(threeSecondTimer);
    statusEl.innerHTML = `<b>Таймер выключён</b>`;

    if (action === "prev") {
      if (currentIndex === 1) {
        currentIndex = numberOfImages;
      }
      --currentIndex;
      changeImage();
    } else if (action === "next") {
      if (currentIndex === numberOfImages) {
        changeImage();
        currentIndex = 1;
        return;
      }
      changeImage();
      ++currentIndex;
    }

    setTimeout(setInterval(changeImageTimer, 3000), 3000);
    statusEl.innerHTML = `<b>Таймер включён</b>`;
    indexEl.innerHTML = `Текущий index: ${currentIndex}`;
  },
  true
);

indexEl.innerHTML = `Текущий index: ${currentIndex}`;

const threeSecondTimer = setInterval(changeImageTimer, 3000);
