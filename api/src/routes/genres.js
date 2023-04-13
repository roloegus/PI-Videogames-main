const { Router } = require("express");
const getGenres = require("../controllers/Genres/getGendres");
const router = Router();
router.get("/", async (req, res) => {
  getGenres()
    .then((r) => res.json(r))
    .catch((e) => res.status(401).send(e.message));
});

module.exports = router;
