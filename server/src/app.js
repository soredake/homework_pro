import express from "express";
import cors from "cors";
import { categories, products } from "./data.js";

const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.listen(PORT, function () {
  console.log("we started server on " + PORT);
});

app.get("/api/categories", (request, response) => {
  const dataResponse = JSON.stringify(categories);
  response.send(dataResponse);
});

app.get("/api/categories/:id", (request, response) => {
  const categoryId = request.params.id;
  if (!products[categoryId]) {
    return response.sendStatus(404);
  }
  const dataResponse = JSON.stringify(products[categoryId]);
  response.send(dataResponse);
});

app.post("/api/order", (request, response) => {
  // TODO;
  //  TODO: log received orders
});
