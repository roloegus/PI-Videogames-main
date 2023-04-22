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

export const postGames = (gameSeleccionado) => (dispatch) => {
  // console.log("gameSeleccionado 111: ", gameSeleccionado);

  //Para los géneros
  const genres = gameSeleccionado.genres;
  const genresObj = genres.map((genre) => {
    console.log("genre: ", genre);
    return { name: genre };
  });
  // console.log("genresObj AAA: ", genresObj);
  gameSeleccionado.genres = genresObj;

  //Para las plataformas
  const plats = gameSeleccionado.platforms;
  const platsObj = plats.map((pla) => {
    console.log("pla: ", pla);
    return {
      platform: {
        name: pla,
      },
    };
    // return { name: pla };
  });
  // console.log("platsObj BBB: ", platsObj);
  gameSeleccionado.platforms = platsObj;

  console.log("gameSeleccionado 222: ", gameSeleccionado);
  axios
    .post(`${url}/videogames`, {
      name: gameSeleccionado.name,
      description: gameSeleccionado.description,
      rating: gameSeleccionado.rating,
      genres: gameSeleccionado.genres,
      platforms: gameSeleccionado.platforms,
      background_image: gameSeleccionado.background_image,
      released: gameSeleccionado.released,
    })
    .then((data) => {
      dispatch({
        type: "POST_GAMES",
        payload: data.data,
      });
    });
};
