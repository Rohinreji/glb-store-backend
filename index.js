const express = require("express");
const app = express();

const bodyparser = require("body-parser");
app.use(bodyparser.json());
const cors = require("cors");
app.use(cors());

const db = require("./db-connection");
const routes = require("./routes");

app.use(express.static(`${__dirname}/upload`));
app.use("/", routes);

const PORT = process.env.PORT||3010;
app.listen(`${PORT}, 0.0.0.0`, () => {
  console.log("server is running successfull");
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
