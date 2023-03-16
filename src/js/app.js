"use strict";

const updateTime = () => {
  const d = new Date();

  // Часы
  const splitHours = d.getHours().toString().padStart(2, "0").split("");
  splitHours.forEach((hour, index) => {
    const el = document.querySelector(`img[alt="hour ${index + 1}"]`);
    const currHour = el.getAttribute("src").replace(/\D/g, "");
    const hour2 = document.querySelector('img[alt="hour 2"]');
    const hour2image = hour2.getAttribute("src");
    if (index === 0 && currHour == "0" && hour2image !== `./media/0.png`) {
      hour2.setAttribute("src", `./media/0.png`);
    } else if (currHour === hour) {
      return;
    }
    el.setAttribute("src", `./media/${hour}.png`);
  });

  // Минуты
  const splitMinutes = d.getMinutes().toString().padStart(2, "0").split("");
  splitMinutes.forEach((minute, index) => {
    const el = document.querySelector(`img[alt="minute ${index + 1}"]`);
    const currMin = el.getAttribute("src").replace(/\D/g, "");
    const minute2 = document.querySelector('img[alt="minute 2"]');
    const minute2image = minute2.getAttribute("src");
    if (index === 0 && currMin == "6" && minute2image !== `./media/0.png`) {
      minute2.setAttribute("src", `./media/0.png`);
    } else if (currMin === minute) {
      return;
    }
    el.setAttribute("src", `./media/${minute}.png`);
  });

  // Секунды
  const splitSeconds = d.getSeconds().toString().padStart(2, "0").split("");
  splitSeconds.forEach((second, index) => {
    const el = document.querySelector(`img[alt="second ${index + 1}"]`);
    const currSec = el.getAttribute("src").replace(/\D/g, "");
    const second2 = document.querySelector('img[alt="second 2"]');
    const second2image = second2.getAttribute("src");
    if (index === 0 && currSec == "6" && second2image !== `./media/0.png`) {
      second2.setAttribute("src", `./media/0.png`);
    } else if (currSec === second) {
      return;
    }
    el.setAttribute("src", `./media/${second}.png`);
  });
};

updateTime();

setInterval(updateTime, 1000);
