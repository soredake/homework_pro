const SERVER_URL = "http://localhost:3000/api";

export function getCategoriesList() {
  return axios.get(`${SERVER_URL}/categories`);
}

export function getProductsByCategoryId(categoryId) {
  return axios.get(`${SERVER_URL}/categories/${categoryId}`);
}

export function orderProducts(orders) {
  axios.post(`${SERVER_URL}/order`, orders);
}
