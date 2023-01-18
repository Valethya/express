import * as dotenv from "dotenv";
dotenv.config({ path: "src/.env" });

let port = process.env.PORT;

export default port;
