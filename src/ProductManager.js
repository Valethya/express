import fs from "fs";

export default class ProductManager {
  // Clase para administrar productos

  ///CONSTRUCTOR
  constructor() {
    this.path = "src/product.json";
  }

  ///METHODS

  getProducts = async () => {
    debugger;
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const productos = JSON.parse(data);
      return productos;
    } else {
      return [];
    }
  };

  addProduct = async (title, description, price, image, stock) => {
    const products = await this.getProducts();
    const product = {
      title: title,
      description: description,
      price: price,
      image: image,
      stock: stock,
    };
    let lastId = products.length != 0 ? products[products.length - 1].id : 1;
    product.id = ++lastId;

    products.push(product);
    await fs.promises.writeFile(this.path, JSON.stringify(products));
    return product;
  };

  getProductsById = async (id) => {
    let products = await this.getProducts();
    let product = products.find((item) => item.id == id);
    return product ? product : (product = { error: "el producto no existe" });
  };

  updateProduct = async (id, propiedad, value) => {
    let products = await this.getProducts();
    let product = products.find((item) => item.id === id);
    product[propiedad] = value;

    let index = products.indexOf(product);
    products[index] = product;
    await fs.promises.writeFile(this.path, JSON.stringify(products));
  };

  deleteProduct = async (id) => {
    const products = await this.getProducts();
    console.log(products, "mira estos productos");
    let newProducts = products.filter((item) => item.id != id);
    console.log(newProducts, "esto esta filtrado");
    await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
  };
}
