// import React, { useState, useEffect } from "react";
// import styles from "./SearchedDogs.module.css";
// import GameCard from "../GameCard/GameCard";
// import { useParams } from "react-router-dom";
// import { useSelector, useDispatch } from 'react-redux'
// // import { getDogs } from "../redux/actions/actionsDogs";
// const SearchedGames = () => {
//   let { id } = useParams();
//   const [isLoading, setIsLoading] = useState(true);

//   const dispatch = useDispatch();
//   const dogs = useSelector((state) => state.reducerDogs.dogs);
//   const filterDogs = dogs.filter(dog => dog.name.toLowerCase().split(' ').some(name => name.startsWith(id)))

//   useEffect(() => {
//     dispatch(getDogs());
//   }, [dispatch]);

//   setTimeout(() => {

//     setIsLoading(false); // ocultar spinner
//   }, 4000);

//   if (filterDogs.length > 0) {
//     return (
//       <div className={styles.container}>
//         {filterDogs.map((t) => (
//           <DogCard key={t.id} id={t.id} name={t.name} temperament={t.temperament} weight={t.weight} height={t.height} image={t.image} />
//         ))}
//       </div>
//     );
//   } else {

//     return (
//       <div className={styles.container2}>
//       {isLoading ?  <div className={styles.loader}></div> :  <h1>Búsqueda no encontrada "{id}"</h1> }

//       </div>
//     );
//   }
// };
// export default SearchedGames;
