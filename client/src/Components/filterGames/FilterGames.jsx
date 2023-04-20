import React, { useEffect, useState } from "react";
// import img from "../../img/packman.jpg";
import styles from "./FilterGames.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getGenres } from "../../redux/actions";
import {
  searchGame,
  receivePost,
  getAllGame,
  filteredFromRedux,
  selectedOptionsRedux,
} from "../../redux/actions";

const FilterGames = () => {
  const SearchedGames = useSelector((state) => state.reducer.searchGame);
  const filteredFrom = useSelector((state) => state.reducer.filteredFrom);
  // console.log(
  //   "🚀 ~ file: Catalogo.jsx:20 ~ Catalogo ~ searchedDogs",
  //   searchGame
  // );
  const genres = useSelector((state) => state.reducer.genres);
  let games = useSelector((state) => state.reducer.games);
  // console.log("GAMES", games);
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [fromDB, setFromDB] = useState("Todos");
  let filteredGames;
  // let fromDB;

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (changeEvent) => {
    setSelectedOptions(
      selectedOptions.includes(changeEvent.target.value)
        ? selectedOptions.filter((so) => so !== changeEvent.target.value)
        : [...selectedOptions, changeEvent.target.value]
    );
    dispatch(
      selectedOptionsRedux(
        selectedOptions.includes(changeEvent.target.value)
          ? selectedOptions.filter((so) => so !== changeEvent.target.value)
          : [...selectedOptions, changeEvent.target.value]
      )
    );
  };

  const filterFromDB = () => {
    const filteredGamesFromDB = games.filter((juego) => juego.from_db === true);
    console.log("BD", filteredGamesFromDB);
    setData(filteredGamesFromDB);
    return filteredGamesFromDB;
  };

  const filterFromAPI = () => {
    const filteredGamesFromDB = games.filter((juego) => juego.slug);
    console.log("API", filteredGamesFromDB);
    setData(filteredGamesFromDB);
    return filteredGamesFromDB;
  };

  const handleSubmit = (event) => {
    setFromDB(event.target.value);
    console.log("event.target.value: ", event.target.value);
    console.log("fromDB: ", fromDB);
    // if (event.target.value == "BD") {
    //   filterFromDB();
    // } else if (event.target.value == "API") {
    //   filterFromAPI();
    // } else {
    //   dispatch(getAllGames());
    // }

    if (event.target.value == "BD") {
      dispatch(filteredFromRedux("BD"));
      const filteredGamesFromDB = games.filter(
        (juego) => juego.from_db === true
      );
      console.log("filteredGamesFromDB 2222: ", filteredGamesFromDB);
      filteredGames = filteredGamesFromDB.filter((juego) =>
        juego.genres.some((genero) => selectedOptions.includes(genero.name))
      );
      console.log("BBDDDDDDDDDDDDDDD 2222: ", filteredGames);
      setData(filteredGames);
      // filterFromDB();
    } else if (event.target.value == "API") {
      dispatch(filteredFromRedux("API"));
      const filteredGamesFromAPI = games.filter((juego) => juego.slug);
      console.log("filteredGamesFromAPI 2222: ", filteredGamesFromAPI);
      filteredGames = filteredGamesFromAPI.filter((juego) =>
        juego.genres.some((genero) => selectedOptions.includes(genero.name))
      );
      console.log("APIIIIIIIIIIIII 22222: ", filteredGames);
      setData(filteredGames);
      // setData(filteredGames);
      // filterFromAPI();
    } else {
      dispatch(filteredFromRedux("Todos"));
      filteredGames = games.filter((juego) =>
        juego.genres.some((genero) => selectedOptions.includes(genero.name))
      );
      setData(filteredGames);
      console.log("TODOOOOOOOOSSSSSSSSSSSS 22222: ", filteredGames);
      // setData(filteredGames);
      // dispatch(getAllGames());
    }
  };

  // SearchedGames && SearchedGames.length > 0
  // ? SearchedGames.filter(
  //     (game) =>
  //       game.genre &&
  //       game.genre.some((gen) => selectedOptions.includes(gen))
  //   )
  // :
  // console.log("HOLA", selectedOptions);
  // const asd = games.map((game) =>
  //   game.genres.map((genre) => (game.genres = genre.name))
  // );
  // console.log("ASDASD", asd);

  if (fromDB == "BD") {
    const filteredGamesFromDB = games.filter((juego) => juego.from_db === true);
    filteredGames = filteredGamesFromDB.filter((juego) =>
      juego.genres
        // .filter((juego) => juego.from_db === true)
        .some((genero) => selectedOptions.includes(genero.name))
    );
    console.log("BBDDDDDDDDDDDDDDD: ", filteredGames);
    // setData(filteredGames);
    // filterFromDB();
  } else if (fromDB == "API") {
    const filteredGamesFromAPI = games.filter((juego) => juego.slug);
    filteredGames = filteredGamesFromAPI.filter((juego) =>
      juego.genres
        // .filter((juego) => juego.slug)
        .some((genero) => selectedOptions.includes(genero.name))
    );
    console.log("APIIIIIIIIIIIII: ", filteredGames);
    // setData(filteredGames);
    // filterFromAPI();
  } else {
    console.log("selectedOptions: ", selectedOptions);
    if (selectedOptions[0]) {
      filteredGames = games.filter((juego) =>
        juego.genres.some((genero) => selectedOptions.includes(genero.name))
      );
    } else {
      filteredGames = [];
      // dispatch(receivePost(filteredGames));
      // games = [];
    }
    console.log("TODOOOOOOOOSSSSSSSSSSSS: ", filteredGames);
    // setData(filteredGames);
    // dispatch(getAllGames());
  }

  // console.log("FILTRADO", filteredGames);
  // dispatch(getAllGames(filteredGames));

  useEffect(() => {
    dispatch(receivePost(filteredGames));
  }, [dispatch, filteredGames]);

  useEffect(() => {
    console.log("fromDB 222: ", fromDB);
    dispatch(receivePost(data));
  }, [data]);

  return (
    <div>
      <br></br>

      <form onSubmit={handleSubmit}>
        <div className={styles.container_Check}>
          <div className={styles.imgCont}>
            {/* <img src={img} alt="asd" /> */}
            <h1 className={styles.h1}>Filtrar por Género</h1>
          </div>
          <div className={styles.container_Check3}>
            <div className={styles.container_Check2}>
              <select value={fromDB} onChange={handleSubmit}>
                <option value="Todos">Todos</option>
                <option value="BD">Base de Datos</option>
                <option value="API">API</option>
              </select>
              {genres ? (
                genres.map((game) => (
                  <li className={styles.li} key={game.id}>
                    <input
                      type="checkbox"
                      value={game.name}
                      checked={selectedOptions.includes(game.name)}
                      onChange={handleOptionChange}
                      className={styles.check}
                    />
                    {game.name}
                  </li>
                ))
              ) : (
                <h4>No existe</h4>
              )}
            </div>
          </div>
        </div>
      </form>

      <br />
      <br />
    </div>
  );
};
export default FilterGames;
