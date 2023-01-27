import { Router } from "express";
import { io } from "socket.io-client";
import ProductManager from "../products/ProductManager.js";

const router = Router();
const socket = io("http://localhost:8080");

const productos = new ProductManager();

let products = productos.getProducts();

// socket.emit("message", "hola");
// socket.on("mensaje", (data) => {
//   console.log(data, "desde el infierno");
// });
// socket.on("connect", () => {
//   console.log(socket.id);
// });

socket.on("mensaje", (data) => {
  console.log(data, "desde el infierno");
});

router.get("/", async (req, res) => {
  res.render("index.handlebars", {
    title: "perros",
    style: "/style.css",
  });
});

export default router;
