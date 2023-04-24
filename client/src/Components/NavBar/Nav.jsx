import React from "react";
// import Logo from "../../img/logo.png";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
const Nav = () => {
  return (
    <nav className={styles.nav_container}>
      <div className="img-container">
        <div className="nolink">
          <Link to="/home">
            <div className={styles.logo}>
              {/* <img id="logo" src={Logo} alt="Logo" /> */}
              <h3>Videogames</h3>
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.search_bar}>
        <SearchBar handleChange={(e) => console.log(e.target.value)} />
        <Link to="/createGame">
          <div className={styles.divBtn}>
            <input type="submit" className={styles.button} value="Create" />
          </div>
        </Link>
      </div>
      <br />
    </nav>
  );
};

export default Nav;
