const { API_KEY } = process.env;
const axios = require("axios");
const { Genre } = require("../../db");

var res = [];

const getGenres = async () => {
  const genDB = await Genre.findAll();

  if (genDB.length === 0) {
    const genAPI = await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)
      .then((r) => r.data.results)
      .then((games) => {
        
      //   console.log(games);
         let genres = games
        .filter((game) => game.name !== undefined)
      //     .map((dog) => dog.genres.split(", "))
      //     .flat();
        return [...new Set(genres)];
      });

    for (let name of genAPI) {
      let newName = await Genre.create( name );
      res.push(newName.name);
    }
  } else {
    res = [...genDB];
  }

  return res;
};

module.exports = getGenres;
