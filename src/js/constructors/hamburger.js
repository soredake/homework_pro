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

  static STUFFING_CHEESE = {
    price: 10,
    calories: 20,
  };
  static STUFFING_SALAD = {
    price: 20,
    calories: 5,
  };
  static STUFFING_POTATO = {
    price: 15,
    calories: 10,
  };

  static TOPPING_SAUCE = {
    price: 15,
    calories: 0,
  };
  static TOPPING_MAYO = {
    price: 20,
    calories: 5,
  };

  constructor(size, stuffing) {
    this.toppings = [];
    this.size = size;
    this.stuffing = stuffing;
  }

  addTopping(topping) {
    this.toppings.push(topping);
  }

  calculate() {
    let calories = this.size.calories + this.stuffing.calories;

    this.toppings.forEach((t) => (calories += t.calories));

    return calories;
  }

  calculatePrice() {
    let price = this.size.price + this.stuffing.price;

    this.toppings.forEach((t) => (price += t.price));

    return price;
  }
}
