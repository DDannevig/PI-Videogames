const { Router } = require('express');
const router = Router();
const { getAPIcall, getDB, getVideogame, postVideogame, getVideogameByID } = require('../controllers/videogameController.js')

router.post("/", postVideogame);
router.get("/", getVideogame);
router.get("/id", getVideogameByID);

module.exports = router;