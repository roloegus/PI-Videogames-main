const axios = require("axios");
const { Videogame, Genre } = require("../../db.js");
// const getGenreFromAPI = require("../Functions/getGenreFromAPI");

const { API_KEY } = process.env;

const getApiVideogames = async () => {
  let arrVideogames = [];
  for (let i = 1; i <= 2; i++) {
    const gamesPage = await axios
      .get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`, {
        responseType: "json",
      })
      .then((response) => {
        arrVideogames = [...arrVideogames, ...response.data.results];
        return response.data.results;
      });
  }

  return arrVideogames;
};

const getDbVideogames = async () => {
  //getApiInfo
  //   return [];

  // server.get("/", (_req, res, next) => {
  return await Videogame.findAll({ include: [Genre] }) //Busco todos los vehiculos
    .then((games) => {
      // console.log("games: ", games);
      return games;
    });
};

const getAllVideogames = async () => {
  try {
    const apiGames = await getApiVideogames();
    const dbGames = await getDbVideogames();

    return [...apiGames, ...dbGames];
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = getAllVideogames;
