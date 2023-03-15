"use strict";

const updateImage = (currentUnitTime, unit, stopAt) => {
  currentUnitTime.forEach((value, index) => {
    const el = document.querySelector(`img[alt="${unit} ${index + 1}"]`);
    const currTime = el.getAttribute("src").replace(/\D/g, "");
    const secondElement = document.querySelector(`img[alt="${unit} 2"]`);
    const secondElementNumber = secondElement
      .getAttribute("src")
      .replace(/\D/g, "");
    if (index === 0 && currTime === stopAt && secondElementNumber !== 0) {
      secondElement.setAttribute("src", `./media/0.png`);
    } else if (currTime === value) {
      return;
    }
    el.setAttribute("src", `./media/${value}.png`);
  });
};

const updateTime = () => {
  const d = new Date();
  const currHours = d.getHours().toString().padStart(2, "0").split("");
  const currMinutes = d.getMinutes().toString().padStart(2, "0").split("");
  const currSeconds = d.getSeconds().toString().padStart(2, "0").split("");

  updateImage(currHours, "hour", "0");
  updateImage(currMinutes, "minute", "6");
  updateImage(currSeconds, "second", "6");
};

updateTime();

setInterval(updateTime, 1000);
