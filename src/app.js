import express from "express";
import routes from "./routes/index.js";
import port from "./config/index.js";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//HANDLEBARS

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
console.log(__dirname + "/views", "esto me muestra el console.log");
app.set(express.static);
app.use(express.static(__dirname + "/public"));

routes(app);

app.listen(port, () => {
  console.log("server running at port ", port);
});
