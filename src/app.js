import express from "express";
import ProductManager from "./ProductManager.js";

const productos = new ProductManager();

const app = express();

let products = productos.getProducts();

app.get("/bienvenida", (req, res) => {
  res.send(`<h1 style="color:blue;">!Welcome to the course my friends!</h1>`);
});

app.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  const prod = await productos.getProductsById(pid);
  res.send(prod);
});

app.get("/products", async (req, res) => {
  let product = await products;
  const { limit } = req.query;
  limit ? res.send(await product.slice(0, limit)) : res.send(await product);
});

app.listen(8080, () => {
  console.log("running from express");
});
