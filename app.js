const express = require("express");
const app = express();
const cors = require("cors");
const cryptoRoute = require("./routes/cryptoRoute");

app.use(cors());
app.use(express.json());

app.use("/api/v1/crypto", cryptoRoute);
app.get("/", (__, res) => {
  return res.status(200).json({ message: "this is page for testing" });
});

module.exports = app;
