import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import routes from "./routes/index.js";
import port from "./config/index.js";
import { Server } from "socket.io";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set(express.static);
app.use(express.static(__dirname + "/public"));

routes(app);

const httpServer = app.listen(port, () => {
  console.log("server running at port ", port);
});

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("nuevo cliente conectado");
  let product = {
    title: "pullover negro",
    description: "poleron de algodon",
    price: 6000,
    thumbnail: "asfrewge",
    stock: 40,
    id: 6,
    status: true,
    category: "algo",
  };
  socket.emit("mensaje", product);
});
