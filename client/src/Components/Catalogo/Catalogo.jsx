import React, { useState, useEffect } from "react";
import "./Catalogo.css";
import GameCard from "../GameCard/GameCard";
import { useSelector, useDispatch } from "react-redux";
import { getAllGames, getGenres } from "../../redux/actions";
// import imgOr from "../img/order.svg";
// import Paginate from "./Paginate";

const Catalogo = () => {
  // const [currentItems, setCurrentItems] = useState();
  // const [pageCount, setPageCount] = useState(0);
  // const [itemOffset, setItemOffset] = useState(0);
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const itemsPerPage = 8;
  const videoGames = useSelector((state) => state.reducer.games);
  const genres = useSelector((state) => state.reducer.genres);
  // console.log("genres: ", genres);
  // const dogsFilter = useSelector((state) => state.reducerDogs.sortedDogs);
  // const searchedDogs = useSelector((state) => state.reducerDogs.searchedDogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage, setCharactersPerPage] = useState(8);
  const [indexOfLastCharacter, setIndexOfLastCharacter] = useState(8);

  const [currentDogs, setCurrentDogs] = useState();

  // const paginate = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("genres: ", genres);
    dispatch(getAllGames());
    dispatch(getGenres());
  }, []);

  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [dogsFilter]);

  // useEffect(() => {
  //   const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  //   setIndexOfLastCharacter(currentPage * charactersPerPage);
  //   if (dogsFilter && dogsFilter.length > 0) {
  //     setCurrentDogs(
  //       data && data.slice(indexOfFirstCharacter, indexOfLastCharacter)
  //     );

  //     setData(dogsFilter);
  //     setData2(dogsFilter);
  //   } else {
  //     if (searchedDogs && searchedDogs.length > 0) {
  //       setCurrentDogs(
  //         data && data.slice(indexOfFirstCharacter, indexOfLastCharacter)
  //       );

  //       setData(searchedDogs);
  //       setData2(searchedDogs);
  //     } else {
  //       setCurrentDogs(
  //         data && data.slice(indexOfFirstCharacter, indexOfLastCharacter)
  //       );

  //       setData(dogs);
  //       setData2(dogs);
  //     }
  //   }
  // }, [
  //   itemsPerPage,
  //   dogs,
  //   dogsFilter,
  //   data,
  //   data2,
  //   searchedDogs,
  //   charactersPerPage,
  //   currentPage,
  //   indexOfLastCharacter,
  // ]);

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
    setCurrentDogs(dataCopy.slice(indexOfFirstCharacter, indexOfLastCharacter));
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
    setCurrentDogs(dataCopy.slice(indexOfFirstCharacter, indexOfLastCharacter));
  };
  const sortWeightAsc = () => {
    // .reduce((a, b) => a + b, 0)

    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;

    const dataCopy = [...data];
    dataCopy.sort((a, b) => {
      let weightA = a.weight.split(" - ").map((n) => Number(n));
      let weightB = b.weight.split(" - ").map((n) => Number(n));
      if (weightA[1] > weightB[1]) return 1;
      if (weightA[1] < weightB[1]) return -1;
      if (weightA[0] > weightB[0]) return 1;
      if (weightA[0] < weightB[0]) return -1;
      return 0;
    });
    setCurrentDogs(dataCopy.slice(indexOfFirstCharacter, indexOfLastCharacter));
  };
  const sortWeightDesc = () => {
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;

    const dataCopy = [...data];
    dataCopy.sort((a, b) => {
      let weightA = a.weight.split(" - ").map((n) => Number(n));
      let weightB = b.weight.split(" - ").map((n) => Number(n));
      if (weightA[0] < weightB[0]) return 1;
      if (weightA[0] > weightB[0]) return -1;
      if (weightA[1] < weightB[1]) return 1;
      if (weightA[1] > weightB[1]) return -1;
      return 0;
    });
    setCurrentDogs(dataCopy.slice(indexOfFirstCharacter, indexOfLastCharacter));
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
            value="Weight Asc"
          />
          <input
            type="submit"
            className="btnSort"
            onClick={sortWeightDesc}
            value="Weight Desc"
          />
        </div>
      </div>

      <div className="container">
        {videoGames[1] ? (
          videoGames.map((t) => (
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
      <div className="DivPagi"></div>
    </div>
  );
};
export default Catalogo;
