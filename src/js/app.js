"use strict";

const images = ["image1", "image2", "image3", "image4", "image5", "image6"];
let currentIndex = 1;

document.querySelector("main").addEventListener(
  "click",
  function (event) {
    const action = event.target.getAttribute("data-action");
    const numberOfImages = images.length;
    const imageItem = document.querySelector("img");
    const prevButton = document.querySelector("[data-action=prev]");
    const nextButton = document.querySelector("[data-action=next]");

    if (!action) {
      return;
    }

    if (action === "prev") {
      if (currentIndex === 1) {
        return;
      } else {
        nextButton.classList.remove("inactive");
      }
      currentIndex = currentIndex - 1;
      if (currentIndex === 1) {
        prevButton.classList.add("inactive");
      }
      imageItem.setAttribute("src", `/media/image${currentIndex}.jpg`);
    } else if (action === "next") {
      if (currentIndex === numberOfImages) {
        return;
      } else {
        prevButton.classList.remove("inactive");
      }
      currentIndex = currentIndex + 1;
      if (currentIndex === numberOfImages) {
        nextButton.classList.add("inactive");
      }
      imageItem.setAttribute("src", `/media/image${currentIndex}.jpg`);
    }
  },
  true
);
