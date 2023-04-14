const { Videogame, Genre } = require("../../db");
const getGenres = require("../Genres/getGendres");

const addVideogame = async ({
  name,
  description,
  released,
  background_image,
  ratings,
  platforms,
  genres,
}) => {
  const newVideogame = await Videogame.create({
    name,
    description,
    released,
    background_image,
    ratings,
    platforms,
  });

  if (Array.isArray(genres) && genres.length > 0) {
    for (let name of genres) {
      let nameGenre = name.name;
      const genDB = await Genre.findOne({ where: { name: nameGenre } });
      await newVideogame.addGenre(genDB);
    }
  }

  const newVideogameFromDB = await Videogame.findOne({
    where: { id: newVideogame.id },
    include: [
      {
        model: Genre,
        as: "genres",
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  }).then((results) => results && results.toJSON());

  if (!newVideogameFromDB) {
    throw new Error("Videojuego no encontrado");
  }

  newVideogameFromDB.genres = newVideogameFromDB.genres.map((t) => t.name);

  return newVideogameFromDB;
};


module.exports = addVideogame;
