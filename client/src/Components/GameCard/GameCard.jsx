import React from "react";
import { Link } from "react-router-dom";
import styles from "./GameCard.module.css";

const GameCard = ({ id, name, image, genres }) => {
  return (
    <Link to={`/game/${id}`}>
      <div className={styles.card}>
        <img src={image} alt="Aqui va la imagen" className={styles.card_img} />
        <div className={styles.container_card}>
          <label className={styles.card_title}>{name}</label>
          <div className={styles.gen}>
            {genres ? (
              genres.map((genre) => (
                <label className={styles.label} key={genre.id}>
                  {genre.name}
                </label>
              ))
            ) : (
              <label className={styles.label}>Doesn't have any genres</label>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
export default GameCard;
