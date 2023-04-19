"use strict";

class Hamburger {
  static SIZE_SMALL = {
    price: 50,
    calories: 20,
  };
  static SIZE_BIG = {
    price: 100,
    calories: 40,
  };

  static TOPPING_SAUCE = {
    price: 15,
    calories: 0,
  };
  static TOPPING_MAYO = {
    price: 20,
    calories: 5,
  };

  constructor(size) {
    this.toppings = [];
    this.size = size;
  }

  addTopping(topping) {
    this.toppings.push(topping);
  }

  calculatePrice() {
    let price = this.size.price;

    this.toppings.forEach((t) => (price += t.price));

    return price;
  }
}
