import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

let port = process.env.PORT || 8080;

export default port;
