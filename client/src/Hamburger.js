export default class Hamburger {
  static SIZES = {
    big: { price: 50 },
    small: { price: 0 },
  };
  static TOPPINGS = {
    sauce: { price: 15 },
    mayo: { price: 20 },
  };

  constructor(size, toppings) {
    this.toppings = toppings;
    this.size = size;
  }

  calculatePrice() {
    let price = Hamburger.SIZES[this.size].price;

    this.toppings.forEach((t) => {
      price += Hamburger.TOPPINGS[t].price;
    });

    return price;
  }
}
