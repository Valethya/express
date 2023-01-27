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

export const io = new Server(httpServer);
