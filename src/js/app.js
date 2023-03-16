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
  // console.log(numberOfImages);
  // console.log(`Текущий index: ${currentIndex}`);
  // const nextIndex = currentIndex + 1;
  // if (currentIndex === numberOfImages) {
  // currentIndex = 1;
  // changeImage();
  // currentIndex = currentIndex + 1;
  // return;
  // } else {
  if (currentIndex === numberOfImages) {
    currentIndex = 1;
  } else {
    currentIndex = currentIndex + 1;
  }
  // indexEl.innerHTML = `Текущий index: ${currentIndex}`;
  changeImage();
  // }
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
      currentIndex = currentIndex - 1;
      changeImage();
    } else if (action === "next") {
      // console.log(currentIndex);
      if (currentIndex === numberOfImages) {
        // currentIndex = currentIndex + 1;
        changeImage();
        currentIndex = 1;
        return;
      }
      changeImage();
      currentIndex = currentIndex + 1;
    }

    setInterval(changeImageTimer, 3000);
    statusEl.innerHTML = `<b><Таймер включён</b>`;
    indexEl.innerHTML = `Текущий index: ${currentIndex}`;
  },
  true
);

indexEl.innerHTML = `Текущий index: ${currentIndex}`;

const threeSecondTimer = setInterval(changeImageTimer, 3000);
