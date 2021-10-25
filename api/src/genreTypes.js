const { Genre } = require("./db.js");

const genreTypes = [
  "Action",
  "Indie",
  "Adventure",
  "RPG",
  "Strategy",
  "Shooter",
  "Casual",
  "Simulation",
  "Puzzle",
  "Arcade",
  "Platformer",
  "Racing",
  "Massively Multiplayer",
  "Sports",
  "Fighting",
  "Family",
  "Board Games",
  "Educational",
  "Card",
];

async function loadGenres(array) {
  for (el of array) {
    try {
      var genre = await Genre.findOne({
        where: {
          name: el,
        },
      });
    } catch {
      console.log(genre);
    }
    if (!genre) {
      await Genre.create({
        name: el,
      });
    } else continue;
  }
}

module.exports = {
  genreTypes: genreTypes,
  loadGenres: loadGenres,
};
