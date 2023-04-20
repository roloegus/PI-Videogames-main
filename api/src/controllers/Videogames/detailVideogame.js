const { Videogame, Genre } = require("../../db");
const getVideogames = require("./getVideogames");

const getDetailVideogame = async (id) => {
  const regex =
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

  if (regex.test(id)) {
    const videogameFromDB = await Videogame.findByPk(id, {
      include: {
        model: Genre,
        as: "genres",
        attributes: ["name"],
      },
    }).then((result) => result.toJSON());

    videogameFromDB.genres = videogameFromDB.genres.map((t) => t.name);
    console.log(videogameFromDB);
    return videogameFromDB;
  } else {
    const videogameFromAPI = await getVideogames(true).then((games) =>
      games.find((game) => game.id == id)
    );
    if (videogameFromAPI) return videogameFromAPI;
  }

  throw new Error("no videogames where found with that id");
};

module.exports = getDetailVideogame;
