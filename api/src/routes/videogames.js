const axios = require("axios");
const { Router } = require("express");

const getAllVideogames = require("../controllers/videogames/getVideogames");
const addVideogame = require("../controllers/videogames/addVideogame");
const getDetailVideogame = require("../controllers/videogames/detailVideogame");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allVideogames = await getAllVideogames();
    res.status(200).json(allVideogames);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/searched", async (req, res) => {
  const { game } = req.query;
  console.log("gameSearched: ", game);
  try {
    const Videogames = await getAllVideogames();
    const resultado = [];
    Videogames.forEach((g) => {
      if (g.name.toLowerCase().includes(game.toLowerCase())) resultado.push(g);
    });
    if (resultado.length > 0) res.status(200).json([...resultado]);
    else
      res.status(400).json({
        error: `Game with name ${game} does not exist in the database`,
      });
  } catch (error) {
    res.status(400).json(error.message);
  }

  // try {
  //   const Videogames = await getAllVideogames();

  //   const searchByName = (games, name) => {
  //     return games.filter((game) => game.name.includes(name));
  //   };
  //   const firstVideogames = searchByName(allVideogames, game);
  //   res.status(200).json(firstVideogames);
  // } catch (err) {
  //   res.status(400).json({ error: err.message });
  // }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  getDetailVideogame(id)
    .then((r) => res.json(r))
    .catch((e) => res.status(400).send({ error: e.message }));
});

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const videogameAdded = await addVideogame(req.body);
    res.status(200).json(videogameAdded);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
