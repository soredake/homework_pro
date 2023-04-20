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
  console.log(burgerObj);
  console.log(size);
  console.log(toppings);
  const customizedBurger = new Hamburger(
    productId,
    burgerObj.name,
    size,
    burgerObj.price
  );

  toppings.forEach((topping) => {
    customizedBurger.addTopping(topping);
  });

  console.log(customizedBurger);
  // Cart.addToCart(product);
  // console.log(Cart.storage);
}

export function buyProduct(product) {
  Cart.addToCart(product);
  console.log(Cart.storage);
}
