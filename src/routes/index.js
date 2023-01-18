import products from "../products/controllers.products.js";
import carts from "../carts/controllers.carts.js";

const routes = (app) => {
  app.use("/api/products", products);
  app.use("/api/carts", carts);
};

export default routes;
