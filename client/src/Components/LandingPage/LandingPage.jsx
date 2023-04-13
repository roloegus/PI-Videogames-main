import React from "react";
import styles from "./LandingPage.module.css";
// import logo from "../img/logo.png";
// import Footer from "./Footer";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      {/* <div>
        <div className={styles.header}>
          <input type="image" src={logo} alt="" /> <Footer />
        </div>
      </div> */}
      <div>
        <h1>Welcome!</h1>
        <p>
          Individual Proyect design for Henry
          <br />
          by Federico Aldama
        </p>
        <Link to={"/home"}>
          <input
            type="button"
            value="Explore More"
            // className={styles.boton_inicio}
          />
        </Link>
      </div>
    </div>
  );
};
export default LandingPage;
