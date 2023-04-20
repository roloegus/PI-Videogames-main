import axios from "axios";

// const url = "http://192.168.0.29:3001";
const url = "http://localhost:3001";

export const getAllGames = () => (dispatch) => {
  // console.log("Entro");
  axios.get(`${url}/videogames`).then((response) => {
    // console.log("response: ", response.data);
    dispatch({
      type: "GET_ALL_GAMES",
      payload: response.data,
    });
  });
};

export const searchedGame = (payload) => {
  axios.get(`${url}/videogames/searched?game=`).then((response) => {
    // console.log("searchedGame response: ", response.data);
    return response.data;
  });
};

export const searchGame = (payload) => {
  return {
    type: "SEARCH_GAME",
    payload,
  };
};

export const filteredFromRedux = (payload) => {
  console.log("payload ACTION: ", payload);
  return {
    type: "FILTERED_FROM",
    payload,
  };
};

export const selectedOptionsRedux = (payload) => {
  console.log("SELECTED_OPTIONS ACTION: ", payload);
  return {
    type: "SELECTED_OPTIONS",
    payload,
  };
};

export const getGenres = () => (dispatch) => {
  axios.get(`${url}/genres`).then((data) => {
    dispatch({
      type: "GET_GENRES",
      payload: data.data,
    });
  });
};

export const receivePost = (payload) => {
  console.log("payloadDD: ", payload);
  return {
    type: "RECEIVE_POST",
    payload,
  };
};

export const postGames = (gameSeleccionado, imageGame) => (dispatch) => {
  // console.log("gameSeleccionado 111: ", gameSeleccionado);

  //Para los géneros
  const genres = gameSeleccionado.genres;
  const genresObj = genres.map((genre) => {
    console.log("genre: ", genre);
    return { name: genre };
  });
  // console.log("genresObj AAA: ", genresObj);
  gameSeleccionado.genres = genresObj;

  //Para los géneros
  const plats = gameSeleccionado.platforms;
  const platsObj = plats.map((pla) => {
    console.log("pla: ", pla);
    return { name: pla };
  });
  // console.log("platsObj BBB: ", platsObj);
  gameSeleccionado.platforms = platsObj;

  const formData = new FormData();
  formData.append("name", gameSeleccionado.name);
  formData.append("description", gameSeleccionado.description);
  formData.append("rating", gameSeleccionado.rating);
  formData.append("genres", JSON.stringify(gameSeleccionado.genres));
  formData.append("platforms", JSON.stringify(gameSeleccionado.platforms));
  formData.append("released", gameSeleccionado.released);
  formData.append("background_image", imageGame, imageGame.name);

  // console.log("gameSeleccionado 222: ", gameSeleccionado);
  axios
    .post(`${url}/videogames`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    // .post(`${url}/videogames`, {
    //   name: gameSeleccionado.name,
    //   description: gameSeleccionado.description,
    //   rating: gameSeleccionado.rating,
    //   genres: gameSeleccionado.genres,
    //   platforms: gameSeleccionado.platforms,
    //   background_image: gameSeleccionado.background_image,
    //   released: gameSeleccionado.released,
    // })
    .then((data) => {
      dispatch({
        type: "POST_GAMES",
        payload: data.data,
      });
    });
};

// export const getInitialGames = () => { //the first 20 games
//     return async function(dispatch){
//         try {
//             const response = await axios.get(`/videogames`)
//             return dispatch({
//                     type: GET_INITIAL_GAMES,
//                     payload: [[1, response.data]]
//                 }
//             )
//         }
//         catch(err){
//             throw new Error('Could not fetched the initial videogames')
//         }
//     }
// }

// export function getCurrentPages(currentGames){ //pages, getting the data for the pages
//     try{
//         if(currentGames){
//             let games= currentGames
//             let max = Math.ceil(games.length / 15) //7

//             let slicedGames = [[1, games.slice(0, 15)]]
//             let i = 2

//             while(max>1){ //7>1, 6>1, etc
//                 slicedGames.push([i, games.slice(15*(i-1), 15*i)])
//                 i++
//                 max--
//             }

//             return ({
//                 type: GET_CURRENT_PAGES,
//                 payload: slicedGames
//             })
//         }
//     }
//     catch(err){
//         throw new Error('Could not get the current pages')
//     }
// }

// export function restartCurrentPage(allGames){ //pages
//     return async function(dispatch){
//         try{
//             if(allGames){
//                 const games = await getCurrentPages(allGames).payload
//                 return dispatch({
//                     type: RESTART_CURRENT_PAGE,
//                     payload: games
//                 })
//             }
//         }
//         catch(err){
//             throw new Error('Could not restart the current pages')
//         }
//     }
// }

// export function getGameByID(id){
//     return async function(dispatch){
//         try{
//             if(id){
//                 const response = await axios.get(`/videogames/${id}`)
//                 return dispatch({
//                         type: GET_GAME_BY_ID,
//                         payload: response.data
//                     }
//                 )
//             }
//             else{
//                 return dispatch({
//                     type: GET_GAME_BY_ID,
//                     payload: {}
//                 }
//             )
//             }
//         }
//         catch(err){
//             throw new Error('Could not find the videogame')
//         }
//     }
// }

// export function clearDetails(){
//     return {
//         type: CLEAR_DETAILS
//     }
// }

// export function searchGame(search, filters){
//     return async function(dispatch){
//         try{
//             const searchArr = search.split(" ")
//             let response = await axios.get(`/videogames?name=${searchArr.join("&")}`)
//             response = response.data
//             if(filters){
//                 const isFiltersNull = Object.values(filters).every(f=>f!=="")
//                 if(!isFiltersNull){
//                     response = getFilteredGames(response, filters)
//                 }
//             }
//             const currentPages = await getCurrentPages(response) //formato paginas
//             if(currentPages){
//                 return dispatch({
//                     type: SEARCH_GAME,
//                     payload: currentPages.payload
//                     // payload: response.data
//                 })
//             }
//         }
//         catch(err){
//             throw new Error('Could not get the searched games')
//         }
//     }
// }

// export const filterGames = (allGames, {genre, platform, order, originData})=> {

//     const results = getFilteredGames(allGames, {genre, platform, order, originData})

//     const passToPages = getCurrentPages(results).payload //lo paso a formato
//     // console.log(passToPages);

//     return {
//         type: FILTER_GAMES,
//         payload: passToPages
//     }
// }

// export const filterChangeValue = (property, value)=>{
//     return {
//         type: FILTER_CHANGE_VALUE,
//         payload: {property, value}
//     }
// }

// export const clearFilters = ()=> {
//     return {
//         type: CLEAR_FILTERS
//     }
// }

// export function deleteGame(id){
//     return async function(dispatch){
//         try{
//             await axios.delete(`/videogames/${id}`)
//             return dispatch({
//                     type: DELETE_GAME,
//                     payload: id
//                 }
//             )
//         }
//         catch(err){
//             throw new Error('Could not delete the videogame')
//         }
//     }
// }
