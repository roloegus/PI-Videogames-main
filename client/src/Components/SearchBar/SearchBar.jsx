import React, { useState, useEffect } from "react";
import styles from "./SearchBar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import { getDogs, searchDogsACT } from "../redux/actions/actionsDogs";

const SearchBar = () => {
  let history = useHistory();
  var route;
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState();
  route = "/searched/" + selectedOptions;

  const handleOptionChange = (changeEvent) => {
    setSelectedOptions(changeEvent.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectedOptions);
    // if (!route) return null;
    // history.push(`${route}`);
    // window.location.reload(true);
  };

  const redirect = () => {
    if (!route) return null;
    console.log("route: ", route);
    history.push(`${route}`);
    // window.location.reload(true);
  };

  // useEffect(() => {
  //   // dispatch(searchDogsACT(filterDogs));
  // }, [dispatch, filterDogs]);

  // let history = useHistory();
  // var route;
  // const handleChange = (e) => {
  //   route = "/dogs/search/" + e.target.value;
  // };

  return (
    <form className={styles.d_flex}>
      <input
        className={styles.searchBar}
        type="search"
        placeholder="Search..."
        aria-label="Search"
        onChange={handleOptionChange}
      />
      <button onClick={redirect} className={styles.button_search}></button>
    </form>
  );
};

export default SearchBar;
