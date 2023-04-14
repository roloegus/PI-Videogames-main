const axios = require("axios");
const { Router } = require("express");
const getAllVideogames = require("../controllers/videogames/getVideogames");
const addVideogame = require("../controllers/videogames/addVideogame");

const router = Router();

router.get("/", async (req, res) => {
    try {
        const allVideogames = await getAllVideogames();
        res.status(200).json(allVideogames)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

router.post("/", async (req, res) => {
    // console.log(req);
    try {
        const videogameAdded = await addVideogame(req.body);
        res.status(200).json(videogameAdded)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});


module.exports = router;