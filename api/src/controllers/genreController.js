const { Genre } = require("../db");

async function getGenres(req, res) {
    try {
      const genreList = await Genre.findAll();
      res.json(genreList);
    } catch (error) {
      res.json(error);
    }
};

async function postGenre (req, res) {
    var { name } = req.query;
    
    const check = await Genre.findOne({
      where: {
        name: name,
      },
    });
    if (check) {
      res.json("Ya existe este genero");
    } else {
      try {
        const newGenre = await Genre.create({
          name,
        });
        res.json(newGenre);
      } catch (error) {
        res.send(error);
      }
    }
}


module.exports={
    getGenres,
    postGenre
 }