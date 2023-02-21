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
      currentIndex = currentIndex - 1;
      if (currentIndex === 1) {
        prevButton.style.visibility = "hidden";
      }
      nextButton.style.visibility = "visible";
      imageItem.setAttribute("src", `/media/image${currentIndex}.jpg`);
    } else if (action === "next") {
      currentIndex = currentIndex + 1;
      if (currentIndex === numberOfImages) {
        nextButton.style.visibility = "hidden";
      }
      prevButton.style.visibility = "visible";
      imageItem.setAttribute("src", `/media/image${currentIndex}.jpg`);
    }
  },
  true
);
