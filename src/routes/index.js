import products from "../products/controllers.products.js";
import carts from "../carts/controllers.carts.js";
import views from "../realTime/controller.realTime.js";

const routes = (app) => {
  app.use("/api/products", products);
  app.use("/api/carts", carts);
  app.use("/realTime", views);
};

export default routes;
