// Configuración del server
require("dotenv").config({ path: "./.env" });
const volleyball = require("volleyball");
const express = require("express");
const cors = require("cors");

const cookieParser = require("cookie-parser");

const db = require("./db");

const routes = require("./routes");

const app = express();

app.use(volleyball);
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use("/api", routes);

const PORT = process.env.PORT || 3002;

db.sync({ force: false }).then(() => {
  console.log("Db connected");
  app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
  });
});
