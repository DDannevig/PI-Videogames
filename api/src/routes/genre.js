const { Router } = require('express');
const router = Router();
const { getGenres, postGenre } = require('../controllers/genreController.js')

router.post("/", postGenre);
router.get("/", getGenres);

module.exports = router;