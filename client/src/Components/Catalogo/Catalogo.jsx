import React, { useState, useEffect } from "react";
import "./Catalogo.css";
import GameCard from "../GameCard/GameCard";
import { useSelector, useDispatch } from "react-redux";
import { getAllGames, getGenres } from "../../redux/actions";
// import imgOr from "../img/order.svg";
import Paginate from "../paginate/paginate";

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
  const filteredFromRedux = useSelector((state) => state.reducer.filteredFrom);
  const selectedOptionsRedux = useSelector(
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
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [gamesFilter]);

  useEffect(() => {
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
    setIndexOfLastCharacter(currentPage * charactersPerPage);
    setCurrentGames(
      data && data.slice(indexOfFirstCharacter, indexOfLastCharacter)
    );
    if (gamesFilter && gamesFilter.length > 0) {
      setData(gamesFilter);
      setData2(gamesFilter);
    }
    // else {
    //   if (searchedDogs && searchedDogs.length > 0) {
    //     setCurrentDogs(
    //       data && data.slice(indexOfFirstCharacter, indexOfLastCharacter)
    //     );

    //     setData(searchedDogs);
    //     setData2(searchedDogs);
    //   }
    else {
      let filteredGamesFromDB;
      if (
        selectedOptionsRedux &&
        selectedOptionsRedux.length > 0 &&
        gamesFilter &&
        gamesFilter.length == 0
      ) {
        filteredGamesFromDB = [];
      } else {
        if (filteredFromRedux == "BD") {
          filteredGamesFromDB = videoGames.filter(
            (juego) => juego.from_db === true
          );
          // setCurrentGames(
          //   data && data.slice(indexOfFirstCharacter, indexOfLastCharacter)
          // );
          // setData(filteredGamesFromDB);
          // setData2(filteredGamesFromDB);
        } else if (filteredFromRedux == "API") {
          filteredGamesFromDB = videoGames.filter((juego) => juego.slug);
          // setCurrentGames(
          //   data && data.slice(indexOfFirstCharacter, indexOfLastCharacter)
          // );
          // setData(filteredGamesFromDB);
          // setData2(filteredGamesFromDB);
        } else {
          filteredGamesFromDB = videoGames;
        }
      }
      // setCurrentGames(
      //   data && data.slice(indexOfFirstCharacter, indexOfLastCharacter)
      // );
      setData(filteredGamesFromDB);
      setData2(filteredGamesFromDB);
      // setCurrentGames(
      //   data && data.slice(indexOfFirstCharacter, indexOfLastCharacter)
      // );
      // setData(videoGames);
      // setData2(videoGames);
    }
    // }
  }, [
    itemsPerPage,
    videoGames,
    gamesFilter,
    data,
    data2,
    // searchedDogs,
    charactersPerPage,
    currentPage,
    indexOfLastCharacter,
  ]);

  const handleSortZA = () => {
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;

    const dataCopy = [...data];
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
    setCurrentGames(
      dataCopy.slice(indexOfFirstCharacter, indexOfLastCharacter)
    );
  };

  const handleSortAZ = () => {
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;

    const dataCopy = [...data];

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
    setCurrentGames(
      dataCopy.slice(indexOfFirstCharacter, indexOfLastCharacter)
    );
  };
  const sortWeightAsc = () => {
    // .reduce((a, b) => a + b, 0)

    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;

    const dataCopy = [...data];

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
    setCurrentGames(
      dataCopy.slice(indexOfFirstCharacter, indexOfLastCharacter)
    );
  };
  const sortWeightDesc = () => {
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;

    const dataCopy = [...data];

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
    setCurrentGames(
      dataCopy.slice(indexOfFirstCharacter, indexOfLastCharacter)
    );
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
          allCharacters={data && data.length}
          paginate={paginate}
        />
      </div>
      <div className="container">
        {videoGames[1] ? (
          currentGames.map((t) => (
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
