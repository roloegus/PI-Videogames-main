import axios from "axios";

const url = "http://192.168.0.29:3001";

export const getAllGames = () => (dispatch) => {
  console.log("Entro");
  axios.get(`${url}/videogames`).then((response) => {
    console.log("response: ",response);
    dispatch({
      type: "GET_ALL_GAMES",
      payload: response.data,
    });
  });
};

export const searchGame = (payload) => {
  return {
    type: "SEARCH_GAME",
    payload,
  };
};

export const getGenres = () => (dispatch) => {
  axios.get("http://localhost:3001/genres").then((data) => {
    dispatch({
      type: "GET_GENRES",
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

// export function createGame(data){
//     return async function(dispatch){
//         try{
//             await axios.post(`/videogames`, data)
//             return dispatch({
//                 type: CREATE_GAME,
//                 payload: {...data, createdByUser: true}
//             }
//         )
//         }
//         catch(err){
//             throw new Error('Could not create the game')
//         }
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
