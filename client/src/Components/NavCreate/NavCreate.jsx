import React from "react";
// import Logo from "../img/logo.png";
// import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import styles from "./NavCreate.module.css";
const NavCreate = () => {
  return (
    <nav className={styles.nav_container}>
      <div className="nolink">
        <Link to="/home">
          <div className={styles.logo}>
            <h3>Videogames</h3>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default NavCreate;
