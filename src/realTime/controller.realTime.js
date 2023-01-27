import { Router } from "express";
// import { io } from "socket.io-client";
import ProductManager from "../products/ProductManager.js";
import { io } from "../index.js";
import { uploader } from "../utils.js";

const productos = new ProductManager();

let products = productos.getProducts();

const router = Router();

router.get("/", async (req, res) => {
  let product = await products;
  const { limit } = req.query;
  product = limit ? await product.slice(0, limit) : await product;

  io.on("connection", (socket) => console.log("nos hemos conectado señores"));

  res.render("index.handlebars", {
    product: await product,
    title: "perros",
    style: "/style.css",
  });
});

router.post("/", uploader.single("file"), async (req, res) => {
  const { title, description, price, stock, status, category, file } = req.body;

  let newProducts = {
    title,
    description,
    price,
    stock,
    status,
    category,
    file,
  };
  newProducts.thumbnail = req.file.path;
  let product = await productos.addProduct(newProducts);
  res.status(201).json({ message: "user create" });
  io.emit("updateProduct", product);
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  let products = await productos.deleteProduct(pid);
  res.status(201).json({ message: "user delete" });
  io.emit("deleteProduct", products);
});

export default router;
