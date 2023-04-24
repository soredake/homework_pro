export default class Cart {
  static addToCart({ id, size, toppings, ...rest }) {
    if (Cart.storage[id] && !size && !toppings) {
      Cart.storage[id].amount++;
    } else {
      Cart.storage[id] = { amount: 1, size, toppings, ...rest };
    }
  }
}

Cart.storage = {};
