"use strict";
const hour_1 = document.querySelector('img[alt="hour 1"]');
const hour_2 = document.querySelector('img[alt="hour 2"]');
const minute_1 = document.querySelector('img[alt="minute 1"]');
const minute_2 = document.querySelector('img[alt="minute 2"]');
const second_1 = document.querySelector('img[alt="second 1"]');
const second_2 = document.querySelector('img[alt="second 2"]');

const updateTime = () => {
  const d = new Date();

  // seconds
  const splitSeconds = d.getSeconds().toString().split("");
  // console.log(splitSeconds);
  splitSeconds.forEach((second, index) => {
    const el = document.querySelector(`img[alt="second ${index + 1}"]`);
    const currSec = el.getAttribute("src").replace(/\D/g, "").padStart(2, "0");
    // console.log(currSec);
    // console.log(index);
    const second2image = second_2.getAttribute("src");
    // console.log(second2image);
    if (index === 0 && currSec === "6" && second2image !== `./media/0.png`) {
      console.log(`условие сработало`);
      console.log(`${currSec}   +  ${index}    + ${second2image}`);
      second_2.setAttribute("src", `./media/0.png`);
    } else if (currSec === second) {
      return;
      // (currSec === "0" || currSec === "6")
    }
    el.setAttribute("src", `./media/${second}.png`);
  });
};

updateTime();

setInterval(updateTime, 1000);
