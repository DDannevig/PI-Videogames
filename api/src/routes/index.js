const { Router } = require("express");
const videogame = require('./videogame')
const genre = require('./genre')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/genre", genre);
router.use("/game", videogame)

module.exports = router;
