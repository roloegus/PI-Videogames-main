import React from "react";
import styles from "./LandingPage.module.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div
      className={styles.container}
      // style={{
      //   backgroundImage:
      //     "url('https://c4.wallpaperflare.com/wallpaper/855/51/782/video-game-collage-wallpaper-preview.jpg')",
      // }}
    >
      <div className={styles.logo}>
        <img
          src="https://www.soyhenry.com/_next/image?url=https%3A%2F%2Fassets.soyhenry.com%2Fhenry-landing%2Fassets%2FHenry%2Flogo.png&w=256&q=75"
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
