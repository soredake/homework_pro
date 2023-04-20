export default class Hamburger {
  static SIZE_BIG = { price: 50 };

  static TOPPING_SAUCE = { price: 15 };
  static TOPPING_MAYO = { price: 20 };

  constructor(id, name, size, price) {
    this.toppings = [];
    this.size = size;
    this.id = id;
    this.name = name;
    this.price = price;
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
