const express = require("express");

const app = express();

app.use(express.json());

app.get("/menu", function (req, res) {
  return res.json({
    items: ["thali", "biriyani"],
  });
});

app.post("/order", (req, res) => {
  res.status(200).json({
    status: "received",
    order: req.body,
  });
});
