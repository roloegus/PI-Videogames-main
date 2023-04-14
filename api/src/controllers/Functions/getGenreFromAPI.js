const getGenreFromAPI = (array)=>{ 
    let DataFromApi = array.map(game=>{
        let {id, name, rating, released, background_image, genres} = game
        
        let arrGenres = []
        genres.forEach(genre=>{ //getting only platforms name
            arrGenres.push(genre.name)
        })
        return {
            id, name, description: "",  
            image: background_image, genres: arrGenres,
            released, rating
        }
    })
    return DataFromApi
}

module.exports = getGenreFromAPI