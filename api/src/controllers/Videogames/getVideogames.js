const axios = require("axios");
const {Videogame} = require("../../db.js");

const { API_KEY } = process.env;

const getApiVideogames = async () => {
    const games = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`, {
        responseType: "json",
      })
      .then(function (response) {
        return response.data.results;
      });

      console.log("games ",games)
        return games;
}

const getDbVideogames = async ()=>{ //getApiInfo
    return [];
    // try{
    //     return await Videogame.findAll(
    //         {
    //             attributes: ['id', 'name', //include this attributes
    //             'description', 
    //             'image', 
    //             'platforms', 
    //             'genres', 
    //             'released',  
    //             'rating', 
    //             'createdByUser']
    //         },
    //         { //todo UN OBJETO POR MODELOOO
    //             model: Genre,
    //             attributes: ['name'],
    //             through : {
    //                 attributes : [],
    //             }
    //         },
    //         {
    //             model: Platform,
    //             attributes: ['name'],
    //             through : {
    //                 attributes : [],
    //             }
    //         }
    //     )
    // }
    // catch(err){
    //     throw new Error(err)
    // }
}

const getAllVideogames = async ()=>{
    try {
        // const allVideogames = await getApiVideogames();
        // await Videogame.bulkCreate(allVideogames); //passing all the game objects to the db
        // return allVideogames
        const apiGames = await getApiVideogames()
        const dbGames  = await getDbVideogames()
        return [...apiGames, ...dbGames]
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = { getAllVideogames }