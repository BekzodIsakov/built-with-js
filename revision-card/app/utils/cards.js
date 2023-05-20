const fs = require("fs");
const FILE_PATH = "./cards.json";

function loadCards() {
  try {
    const cards = JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));
    return cards;
  } catch (error) {
    return [];
  }
}

function saveCards(cards) {
  fs.writeFileSync("./cards.json", JSON.stringify(cards));
}

function findCard(id) {
  const cards = loadCards();
  const card = cards.find((card) => card.id === id);
  return card;
}

// Card structure
// {
//   id: 123,
//   title: 'Data types in Javascript',
//   text: 'There are eight data types in Javascript.',
//   link: {
//     title: 'javascript.info',
//     url: 'https://javascript.info/data-types',
//   },
//   tags: ['Javascript'],
// }
function createCard({ id, title, text, link, tags }) {
  const cards = loadCards();
  cards.push({ id, title, text, link, tags });
  saveCards(cards);
  return JSON.stringify(cards);
}

function deleteCard(id) {
  const cards = loadCards();
  const filteredCards = cards.filter((card) => card.id !== id);
  saveCards(filteredCards);
  return filteredCards;
}

module.exports = {
  loadCards,
  findCard,
  createCard,
  deleteCard,
};
