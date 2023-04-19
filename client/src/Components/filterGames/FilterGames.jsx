import React, { useEffect, useState } from "react";
// import img from "../../img/packman.jpg";
import styles from "./FilterGames.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getGenres } from "../../redux/actions";
import { searchGame, receivePost, getAllGames } from "../../redux/actions";

const FilterGames = () => {
  const SearchedGames = useSelector((state) => state.reducer.searchGame);
  const filteredFrom = useSelector((state) => state.reducer.filteredFrom);
  // console.log(
  //   "🚀 ~ file: Catalogo.jsx:20 ~ Catalogo ~ searchedDogs",
  //   searchGame
  // );
  const genres = useSelector((state) => state.reducer.genres);
  const games = useSelector((state) => state.reducer.games);
  // console.log("GAMES", games);
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [fromDB, setFromDB] = useState("Todos");

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
    if (event.target.value == "BD") {
      filterFromDB();
    } else if (event.target.value == "API") {
      filterFromAPI();
    } else {
      dispatch(getAllGames());
    }
    // event.preventDefault();

    // setData(filterFromDB());
    // dispatch(receivePost(fromDB));
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
  const filteredGames = games.filter((juego) =>
    juego.genres.some((genero) => selectedOptions.includes(genero.name))
  );
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
