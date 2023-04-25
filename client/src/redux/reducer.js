const initialState = {
  games: [],
  filteredGames: [],
  genres: [],
  filteredFrom: "Todos",
  selectedOptions: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
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

    case "SELECTED_OPTIONS":
      return {
        ...state,
        selectedOptions: payload,
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

    default:
      return state;
  }
};

export default rootReducer;
