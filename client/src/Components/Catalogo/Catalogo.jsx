import React, { useState, useEffect } from "react";
import "./Catalogo.css";
import GameCard from "../GameCard/GameCard";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllGames,
  getGenres,
  selectedOptionsRedux,
  filteredFromRedux,
} from "../../redux/actions";
// import imgOr from "../img/order.svg";
import Paginate from "../Paginate/Paginate";

const Catalogo = () => {
  // const [currentItems, setCurrentItems] = useState();
  // const [pageCount, setPageCount] = useState(0);
  // const [itemOffset, setItemOffset] = useState(0);
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const itemsPerPage = 15;
  const videoGames = useSelector((state) => state.reducer.games);
  const genres = useSelector((state) => state.reducer.genres);
  const gamesFilter = useSelector((state) => state.reducer.filteredGames);
  let filteredFromRedux2 = useSelector((state) => state.reducer.filteredFrom);
  const selectedGenresRedux = useSelector(
    (state) => state.reducer.selectedOptions
  );

  // console.log("FILTRADOGAMES: ", gamesFilter);
  //const gamesFilter = useSelector((state) => state.reducerDogs.sortedDogs);
  // const searchedDogs = useSelector((state) => state.reducerDogs.searchedDogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage, setCharactersPerPage] = useState(15);
  const [indexOfLastCharacter, setIndexOfLastCharacter] = useState(15);
  const [currentGames, setCurrentGames] = useState();
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("genres: ", genres);
    dispatch(getAllGames());
    dispatch(getGenres());
    dispatch(filteredFromRedux("Todos"));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [gamesFilter]);

  useEffect(() => {
    setCurrentGames(videoGames);
  }, [videoGames]);

  useEffect(() => {
    setIndexOfLastCharacter(currentPage * charactersPerPage);
  }, [currentPage]);

  useEffect(() => {
    filterVideoGames();
  }, [filteredFromRedux2]);

  useEffect(() => {
    filterVideoGames();
  }, [selectedGenresRedux]);

  function filterVideoGames() {
    let filteredVideoGames = videoGames;
    if (filteredFromRedux2 == "BD") {
      filteredVideoGames = videoGames.filter((juego) => juego.from_db);
    }
    if (filteredFromRedux2 == "API") {
      filteredVideoGames = videoGames.filter((juego) => juego.slug);
    }

    if (selectedGenresRedux && selectedGenresRedux.length > 0) {
      filteredVideoGames = filteredVideoGames.filter((juego) =>
        juego.genres.some((genero) => selectedGenresRedux.includes(genero.name))
      );
    }
    setCurrentGames(filteredVideoGames);
  }

  const handleSortZA = () => {
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;

    const dataCopy = [...currentGames];
    dataCopy.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase();
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }

      return 0;
    });
    setCurrentGames(dataCopy);
  };

  const handleSortAZ = () => {
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;

    const dataCopy = [...currentGames];

    dataCopy.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });
    setCurrentGames(dataCopy);
  };
  const sortWeightAsc = () => {
    // .reduce((a, b) => a + b, 0)

    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;

    const dataCopy = [...currentGames];

    dataCopy.sort((a, b) => {
      const nameA = a.rating; // ignore upper and lowercase
      const nameB = b.rating;
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });
    setCurrentGames(dataCopy);
  };
  const sortWeightDesc = () => {
    const dataCopy = [...currentGames];

    dataCopy.sort((b, a) => {
      const nameA = a.rating; // ignore upper and lowercase
      const nameB = b.rating;
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });
    setCurrentGames(dataCopy);
  };

  return (
    <div>
      <div className="btnDiv">
        {/* <img src={imgOr} alt="ima" /> */}
        <div className="btnDiv2">
          <h1 className="Orderby">Order By</h1>
        </div>
        <div className="btnDiv3">
          <input
            type="submit"
            className="btnSort"
            onClick={handleSortAZ}
            value="Name A-Z"
          />
          <input
            type="submit"
            className="btnSort"
            onClick={handleSortZA}
            value="Name Z-A"
          />
          <input
            type="submit"
            className="btnSort"
            onClick={sortWeightAsc}
            value="Rating Asc"
          />
          <input
            type="submit"
            className="btnSort"
            onClick={sortWeightDesc}
            value="Rating Desc"
          />
        </div>
      </div>
      <div className="DivPagi">
        <Paginate
          charactersPerPage={charactersPerPage}
          allCharacters={currentGames && currentGames.length}
          paginate={paginate}
        />
      </div>
      <div className="container">
        {currentGames ? (
          currentGames
            .slice(
              indexOfLastCharacter - charactersPerPage,
              indexOfLastCharacter
            )
            .map((t) => (
              <GameCard
                key={t.id}
                id={t.id}
                name={t.name}
                image={t.background_image}
                genres={t.genres}
              />
            ))
        ) : (
          <h3>loading</h3>
        )}
      </div>
    </div>
  );
};
export default Catalogo;
