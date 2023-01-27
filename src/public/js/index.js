const socket = io();
const products = document.querySelector("#products");

socket.on("updateProduct", (data) => {
  products.innerHTML = "";

  createHtml(data);
});
socket.on("deleteProduct", (data) => {
  products.innerHTML = "";

  createHtml(data);
});
const createHtml = (data) => {
  return data.length
    ? data.map((product) => {
        products.innerHTML += `
            <div class="container-product-card">
                <div class="product-card">
                    <img src="${product.thumbnails}" alt="${product.title}" />
                    <span>${product.id}</span>
                    <h2>${product.title}</h2>
                    <p >${product.description}</p>
                    <div class="detalle">
                        <span>PRICE: $${product.price}</span>
                        <span>STOCK: ${product.stock}</span>
                        <span>STATUS: ${product.status}</span>
                    </div>
                </div> 
            </div>
        `;
      })
    : (products.innerHTML += `
            <div class="product-card">
                <img src="${data.thumbnails}" alt="${data.title}" />
                <span>${data.id}</span>
                <h2>${data.title}</h2>
                <p >${data.description}</p>
                <div class="detalle">
                    <span>PRICE: $${data.price}</span>
                    <span>STOCK: ${data.stock}</span>
                    <span>STATUS: ${data.status}</span>
                </div>
            </div>
        `);
};
