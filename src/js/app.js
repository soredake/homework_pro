"use strict";

const images = ["image1", "image2", "image3", "image4", "image5", "image6"];
const numberOfImages = images.length;
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
  if (currentIndex === numberOfImages) {
    changeImage();
    currentIndex = 1;
    return;
  } else {
    changeImage();
    currentIndex = currentIndex + 1;
  }
};
document.querySelector("main").addEventListener(
  "click",
  (event) => {
    const action = event.target.getAttribute("data-action");

    if (!action) {
      return;
    }

    clearInterval(threeSecondTimer);

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
  },
  true
);

const threeSecondTimer = setInterval(changeImageTimer, 3000);
