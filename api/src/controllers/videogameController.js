require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Videogame } = require("../db");
const { Sequelize } = require("sequelize");
const rawg_api = "https://api.rawg.io/api/games";

async function getVideogame(req, res) {
  const { search, exactSearch } = req.query;
  let videogameArray = [];

  //Defino search params para BD
  let dbName = {};
  if (exactSearch === "true") {
    dbName = {
      name: search,
    };
  } else {
    dbName = {
      name: {
        [Sequelize.Op.iLike]: "%" + search + "%",
      },
    };
  }

  //Defino search params para RAWG
  let next = "null";
  let paramsAPI = {
    key: API_KEY,
    page_size: 40,
    search: search,
    search_exact: exactSearch,
    search_precise: true,
  };

  const apiTranslator = function (array) {
    let vidarray = [];
    array.forEach((element) => {
      let platforms = [];
      if (element.platforms)
        element.platforms.forEach((el) => platforms.push(el.platform.name));

      vidarray.push({
        id: element.id,
        name: element.name,
        launchdate: element.released,
        platforms: platforms,
        rating: element.rating,
        genres: element.genres,
        description: "",
        image: element.background_image,
        metacritic: element.metacritic
      });
    });
    return vidarray;
  };

  //DB Call

  if (search) {
    try {
      let res = await Videogame.findAll({
        where: dbName,
        include: "genres",
      });
      if (res)
        res.forEach((element) => videogameArray.push(element.dataValues));
    } catch (error) {
      console.log("Error: ", error);
      res.json(error);
    }
  } else {
    try {
      let res = await Videogame.findAll({
        include: "genres",
      });
      if (res)
        res.forEach((element) => videogameArray.push(element.dataValues));
    } catch (error) {
      res.json(error);
    }
  }

  // RAWG API Call

  try {
    await axios
      .get(rawg_api, {
        params: paramsAPI,
      })
      .then((res) => {
        if (res.data.results) {
          next = res.data.next;
          videogameArray = videogameArray.concat(
            apiTranslator(res.data.results)
          );
        }
      });
    if (next !== null) {
      await axios.get(next).then((res) => {
        next = res.data.next;
        videogameArray = videogameArray.concat(apiTranslator(res.data.results));
      });
    }
    if (next !== null) {
      await axios.get(next).then((res) => {
        next = res.data.next;
        videogameArray = videogameArray.concat(apiTranslator(res.data.results));
      });
    }
    res.json(videogameArray);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}

async function getVideogameByID(req, res) {
  const { ID } = req.query;
  if (!isNaN(ID)) {
    try {
      axios
        .get(rawg_api + "/" + ID + "?key=" + API_KEY)
        .then((response) => {
          res.json([response.data])
        }).catch(() => {
          res.json("Error");
        })
    } catch (error) {
      res.json("Error")
    }
  } else {
    try {
      const game = await Videogame.findOne({
        where: {
          id: ID,
        },
        include: "genres",
      });
      if (game) res.json(game);
      else res.json("Error");
    } catch (error) {
      res.json("Error");
    }
  }
}

async function postVideogame(req, res) {
  const { name, description, launchdate, rating, platforms, genres, image } =
    req.body;
  const videogame = {
    name,
    description,
    launchdate,
    rating,
    platforms,
    genres,
    image,
  };

  const check = await Videogame.findOne({
    where: {
      name: name,
    },
  });
  if (check) {
    res.json("Ya existe este juego");
  } else {
    try {
      const newVideogame = await Videogame.create(videogame).then(
        (videogame) => {
          videogame.addGenre(genres);
        }
      );
      res.json(newVideogame);
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = {
  getVideogame,
  getVideogameByID,
  postVideogame,
};
