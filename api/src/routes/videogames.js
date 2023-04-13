const axios = require("axios");
const { Router } = require("express");
const {getAllVideogames} = require("../controllers/videogames/getVideogames");

const router = Router();

router.get("/", async (req, res) => {
    try {
        const allVideogames = await getAllVideogames();
        res.status(200).json(allVideogames)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});


module.exports = router;