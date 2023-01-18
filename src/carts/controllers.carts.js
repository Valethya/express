import Router from "express";
import CartsManager from "../CartsManager.js";
import ProductManager from "../ProductManager.js";

const router = Router();

//PRODUCTS
const productos = new ProductManager();

//CARTS
const carts = new CartsManager();
let cart = carts.getCarts();

router.get("/", async (req, res) => {
  let carts = await cart;
  const { limit } = req.query;
  limit ? res.send(await carts.slice(0, limit)) : res.send(await carts);
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await carts.getCartById(cid);
  res.send(cart.products);
});

router.post("/", (req, res) => {
  const { products } = req.body;
  let cart = { products };
  carts.addCart(cart);

  res.status(201).json({ message: "cart create" });
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const product = await productos.getProductsById(pid);
  const prod = await carts.addProductToCart(cid, product);
  res.send(prod);
});

export default router;
