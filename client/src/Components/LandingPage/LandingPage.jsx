import React from "react";
import styles from "./LandingPage.module.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div
      className={styles.container}
      style={{
        backgroundImage:
          "url('https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_91_1_1528x800/public/2019-12/shutterstock_278969585%20%281%29.jpg?itok=YNMkKVQ_')",
      }}
    >
      <div className={styles.logo}>
        <img
          src="https://camo.githubusercontent.com/35b81f213ddb0e019b3567f6982d740bb2d01ae5dd712a1537e09e826e940228/68747470733a2f2f643331757a386c77666d796e38672e636c6f756466726f6e742e6e65742f4173736574732f6c6f676f2d68656e72792d77686974652d6c672e706e67"
          alt="Henry logo"
        />
      </div>
      {/* <div className={styles.content}> */}
      <h1 className={styles.title}>Welcome!</h1>
      <p className={styles.text}>
        Individual Proyect design for Henry
        <br />
        by Rolando Egusquiza
      </p>
      <Link to={"/home"}>
        <button className={styles.button}>Explore More</button>
      </Link>
    </div>
    // </div>
  );
};
export default LandingPage;
