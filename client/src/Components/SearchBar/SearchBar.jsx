import React, { useState, useEffect } from "react";
import styles from "./SearchBar.module.css";
import { useSelector, useDispatch } from "react-redux";
// import { getDogs, searchDogsACT } from "../redux/actions/actionsDogs";
const SearchBar = () => {
  const dispatch = useDispatch();
  // const dogs = useSelector((state) => state.reducerDogs.dogs);
  const [selectedOptions, setSelectedOptions] = useState();
  console.log(
    "🚀 ~ file: SearchBar.jsx:10 ~ SearchBar ~ selectedOptions",
    selectedOptions
  );

  const handleOptionChange = (changeEvent) => {
    setSelectedOptions(changeEvent.target.value);
  };

  // const filterDogs = dogs.filter((dog) =>
  //   dog.name
  //     .toLowerCase()
  //     .split(" ")
  //     .some((name) => name.startsWith(selectedOptions))
  // );

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectedOptions);
  };

  useEffect(() => {
    // dispatch(getDogs());
  }, [dispatch]);

  // useEffect(() => {
  //   // dispatch(searchDogsACT(filterDogs));
  // }, [dispatch, filterDogs]);

  // let history = useHistory();
  // var route;
  // const handleChange = (e) => {
  //   route = "/dogs/search/" + e.target.value;
  // };

  // const redirect = () => {
  //   if (!route) return null;
  //   history.push(`${route}`);
  //   window.location.reload(true);
  // };

  return (
    <form onSubmit={handleSubmit} className={styles.d_flex}>
      <input type="submit" className={styles.button_search} value=" " />
      <input
        className={styles.searchBar}
        type="text"
        placeholder="Search..."
        aria-label="Search"
        onChange={handleOptionChange}
      />
    </form>
  );
};

export default SearchBar;
