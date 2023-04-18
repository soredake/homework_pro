export default class Cart {
  static addToCart({ id, ...rest }) {
    if (Cart.storage[id]) {
      Cart.storage[id].amount++;
    } else {
      Cart.storage[id] = { amount: 1, ...rest }
    }
  }
}

Cart.storage = {};