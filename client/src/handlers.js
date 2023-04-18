import Cart from "./Cart.js";
import { showProducts } from "./domHelpers.js";
import { getProductsByCategoryId } from "./functions.js";

export async function menuClickHandler(event) {
  const element = event.target.parentNode;
  const categoryId = element.getAttribute('data-category-id');

  const { data: products } = await getProductsByCategoryId(categoryId);
  showProducts(products);
}

export function buyProduct(product) {
  Cart.addToCart(product);
  console.log(Cart.storage);
}