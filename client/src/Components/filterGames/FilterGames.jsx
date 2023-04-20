import React, { useEffect, useState } from "react";
// import img from "../../img/packman.jpg";
import styles from "./FilterGames.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getGenres, selectedOptionsRedux } from "../../redux/actions";
import { filteredFromRedux } from "../../redux/actions";

const FilterGames = () => {
  // console.log(
  //   "🚀 ~ file: Catalogo.jsx:20 ~ Catalogo ~ searchedDogs",
  //   searchGame
  // );
  const genres = useSelector((state) => state.reducer.genres);

  const dispatch = useDispatch();
  const [fromDB, setFromDB] = useState("Todos");

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (changeEvent) => {
    let options = selectedOptions.includes(changeEvent.target.value)
      ? selectedOptions.filter((so) => so !== changeEvent.target.value)
      : [...selectedOptions, changeEvent.target.value];

    setSelectedOptions(options);
    dispatch(selectedOptionsRedux(options));
  };

  const handleSubmit = (event) => {
    if (fromDB != event.target.value) {
      console.log(fromDB, event.target.value);
      setFromDB(event.target.value);
      dispatch(filteredFromRedux(event.target.value));
    }
  };

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
