import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { useParams } from "react-router-dom";
import styles from "./Game.module.css";

const Game = () => {
  let { id } = useParams();

  const [data, setData] = useState([]);
  const videoGames = useSelector((state) => state.reducer.games);

  useEffect(() => {
    console.log("id: ", id);
    const result = videoGames.filter((word) => word.id == id);
    console.log("result: ", result);
    setData(result[0]);
  }, [id]);

  useEffect(() => {
    console.log("data: ", data);
  }, [data]);

  return (
    <div>
      {data? (
        <div className={styles.createDiv}>
          <div className={styles.containerE}>
            <div className={styles.divBreedE}>
              <div className={styles.container_img}>
                <img
                  src={data.background_image}
                  alt="Aqui va la imagen"
                  className={styles.img}
                />
              </div>

              <div className={styles.container_data}>
                <div className={styles.TitleBreedE}>
                  <p className={styles.card_title}>{data.name}</p>
                </div>
                {/* <div className={styles.date}>
              <p>Height: {data.height} cm.</p>
              <p>Weight: {data.weight} kg.</p>
              <p>
                life Span:{" "}
                {data.life_span ? data.life_span : `It doesn't have Life Span`}.
              </p>
            </div> */}
                <p className={styles.temlabel}>Genres</p>
                <div className={styles.temp}>
                  {data.genres ? (
                    data.genres.map((e) => (
                      <label className={styles.label} key={e.id}>
                        {e.name}
                      </label>
                    ))
                  ) : (
                    <h2>Doesn't have any genres</h2>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2>Loading</h2>
      )}
    </div>
  );
};
export default Game;
