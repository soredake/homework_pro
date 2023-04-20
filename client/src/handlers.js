import Cart from "./Cart.js";
import Hamburger from "./Hamburger.js";
import { showProducts } from "./domHelpers.js";
import { getProductsByCategoryId } from "./functions.js";

export async function menuClickHandler(event) {
  const element = event.target.parentNode;
  const categoryId = element.getAttribute("data-category-id");

  const { data: products } = await getProductsByCategoryId(categoryId);
  showProducts(products);
}

function findProductById(products, id) {
  return products.filter((obj) => obj.id === id)[0];
}

export async function customizeChickenHamburger(size, toppings, productId) {
  const { data: products } = await getProductsByCategoryId("2");
  const burgerObj = await findProductById(products, productId);
  const customizedBurger = new Hamburger(size, toppings);
  const additionalPrice = customizedBurger.calculatePrice();
  burgerObj.price += additionalPrice;
  buyProduct(burgerObj);
}

export function buyProduct(product) {
  Cart.addToCart(product);
}
