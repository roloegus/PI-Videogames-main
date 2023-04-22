import React, { useState, useEffect } from "react";
import styles from "./SearchedGame.module.css";
import axios from "axios";
import GameCard from "../GameCard/GameCard";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchedGame } from "../../redux/actions";
const SearchedGames = () => {
  let { game } = useParams();
  console.log("game: ", game);
  const [isLoading, setIsLoading] = useState(true);
  const [gameSearch, setGameSearch] = useState();

  const dispatch = useDispatch();
  // const dogs = useSelector((state) => state.reducerDogs.dogs);
  // const filterDogs = dogs.filter((dog) =>
  //   dog.name
  //     .toLowerCase()
  //     .split(" ")
  //     .some((name) => name.startsWith(id))
  // );

  // useEffect(() => {
  // }, [dispatch]);
  useEffect(() => {
    // .get(`http://localhost:3001/videogames/searched?game=${game}`)
    const traeJuegos = axios
      .get(`http://localhost:3001/videogames/searched?game=${game}`)
      // .get(`http://192.168.0.29:3001/videogames/searched?game=${game}`)
      .then((response) => {
        console.log("searchedGame response: ", response.data);
        setGameSearch(response.data);
        return response.data;
      });
  }, []);
  console.log("gameSearch: ", gameSearch);
  // setTimeout(() => {
  //   setIsLoading(false); // ocultar spinner
  // }, 4000);
  // return <h2>HOLAAAAAAAAAAA</h2>;
  if (gameSearch) {
    return (
      <div className={styles.container}>
        {gameSearch.map((t) => (
          <GameCard
            key={t.id}
            id={t.id}
            name={t.name}
            image={t.background_image}
            genres={t.genres}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div className={styles.container2}>
        {/* {isLoading ? (
          <div className={styles.loader}></div>
        ) : ( */}
        <h1>Búsqueda no encontrada "{game}"</h1>
        {/* )} */}
      </div>
    );
  }
};
export default SearchedGames;
