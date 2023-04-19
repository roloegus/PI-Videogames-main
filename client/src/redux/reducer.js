const initialState = {
  games: [],
  filteredGames: [],
  genres: [],
  filteredFrom: "Todos",
  // initialGames: [],
  // currentPages: [],
  // filteredPages: [],
  // filters: {
  //     genre: "",
  //     platform: "",
  //     order: "",
  //     originData: ""
  // },
  // detailsGame: [],
  // page: 1, //current page
  // pages: 5, //total pages
};

const rootReducer = (state = initialState, { type, payload }) => {
  console.log("REDUCER payload: ", payload);

  switch (type) {
    case "GET_ALL_GAMES":
      return {
        ...state,
        games: payload,
      };

    case "GET_GENRES":
      return {
        ...state,
        genres: payload,
      };
    // case GET_INITIAL_GAMES: return {
    //     ...state,
    //     initialGames: payload,
    //     page: 1
    // }

    // case GET_CURRENT_PAGES: return { //
    //     ...state,
    //     currentPages: payload,
    //     pages: payload.length
    // }

    case "SEARCH_GAME":
      return {
        ...state,
        currentPages: payload,
        pages: payload.length,
        counterGames: payload.length,
        page: 1,
      };

    case "FILTERED_FROM":
      return {
        ...state,
        filteredFrom: payload,
      };

    case "RECEIVE_POST":
      return {
        ...state,
        filteredGames: payload,
      };

    case "POST_GAMES":
      return {
        games: [...state.games, payload],
      };

    // case RESTART_CURRENT_PAGE: return {
    //     ...state,
    //     currentPages: payload,
    //     pages: payload.length,
    //     page: 1,
    // }

    // case FILTER_GAMES:
    //     return {
    //         ...state,
    //         currentPages: payload,
    //         filteredPages: payload,
    //         page: 1,
    //         pages: payload.length
    //     }

    // case CLEAR_FILTERS: return {
    //     ...state,
    //     filters: {
    //         genre: "",
    //         platform: "",
    //         order: "",
    //         originData: ""
    //     }
    // }

    // case GET_GAME_BY_ID: return {
    //     ...state,
    //     detailsGame: {...payload}
    // }

    // case CLEAR_DETAILS: return {
    //     ...state,
    //     detailsGame: {}
    // }

    // case CREATE_GAME: return {
    //     ...state,
    //     allGames: [...state.allGames, payload]
    // }

    // case DELETE_GAME: return {
    //     ...state,
    //     allGames: state.allGames.filter(g=>g.id!==payload)
    // }

    default:
      return state;
  }
};

export default rootReducer;
