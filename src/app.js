import express from "express";
import routes from "./routes/index.js";
import port from "./config/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

app.listen(port, () => {
  console.log("server running at port ", port);
});
