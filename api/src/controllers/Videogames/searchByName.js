// const getRevelantDataFromAPI = require('../../functions/getRevelantData.js');
const { getAllVideogames } = require("./getVideogames");

//todo search by name
const searchByName = async (req, res, name) => {
  const games = await getAllVideogames();

  const results = [];

  games.forEach((g) => {
    if (g.name.toLowerCase().includes(name.toLowerCase())) results.push(g);
    console.log("gamesSearched: ", games);
  });

  if (results.length > 0) res.status(200).json([...results]);
  else
    res
      .status(400)
      .json({ error: `Game with name ${name} does not exist in the database` });
};

module.exports = searchByName;
