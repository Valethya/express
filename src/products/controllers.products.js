import Router from "express";
import ProductManager from "../ProductManager.js";

const productos = new ProductManager();

let products = productos.getProducts();

const router = Router();

router.get("/", async (req, res) => {
  let product = await products;
  const { limit } = req.query;
  limit ? res.send(await product.slice(0, limit)) : res.send(await product);
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const prod = await productos.getProductsById(pid);
  res.send(prod);
});

router.post("/", (req, res) => {
  const { title, description, price, thumbnail, stock, status, category } =
    req.body;

  let newProducts = {
    title,
    description,
    price,
    thumbnail,
    stock,
    status,
    category,
  };

  productos.addProduct(newProducts);

  res.status(201).json({ message: "user create" });
});

router.put("/:pid", (req, res) => {
  const { pid } = req.params;
  const { title, description, price, thumbnail, stock, status, category } =
    req.body;
  const infoProduct = {
    title,
    description,
    price,
    thumbnail,
    stock,
    status,
    category,
  };
  productos.updateProduct(pid, infoProduct);
  res.status(201).json({ message: "user update" });
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  productos.deleteProduct(pid);
  res.status(201).json({ message: "user delete" });
});

export default router;
