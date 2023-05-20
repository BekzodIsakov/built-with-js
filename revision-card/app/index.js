const express = require("express");
const cors = require("cors");

const { loadCards, findCard } = require("./utils/cards");

const app = express();
app.use(cors());

const PORT = 8080;

app.get("/cards", (req, res) => {
  const { id } = req.query;
  if (id) {
    const card = findCard(id);
    res.json([card]);
  } else {
    const cards = loadCards();
    res.json(cards);
  }
});

app.listen(PORT, () => {
  console.log("Server is live on port " + PORT);
});
