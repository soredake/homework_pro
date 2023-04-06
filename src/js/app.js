"use strict";

// бургер из описания
const sampleHamburger = new Hamburger(
  Hamburger.SIZE_SMALL,
  Hamburger.STUFFING_CHEESE
);

console.log("Бургер из описания:");
sampleHamburger.addTopping(Hamburger.TOPPING_MAYO);
console.log("Calories: " + sampleHamburger.calculate());
console.log("Price: " + sampleHamburger.calculatePrice());
sampleHamburger.addTopping(Hamburger.TOPPING_SAUCE);
console.log("Price with sauce: " + sampleHamburger.calculatePrice());

// большой бургер
const bigBurger = new Hamburger(Hamburger.SIZE_BIG, Hamburger.STUFFING_POTATO);

console.log("Большой бургер:");
bigBurger.addTopping(Hamburger.TOPPING_MAYO);
bigBurger.addTopping(Hamburger.TOPPING_SAUCE);
console.log("Calories: " + bigBurger.calculate());
console.log("Price: " + bigBurger.calculatePrice());
