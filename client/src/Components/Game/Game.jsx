import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getAllGames, getGenres } from "../../redux/actions";
import { useParams } from "react-router-dom";
import styles from "./Game.module.css";

const Game = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const videoGames = useSelector((state) => state.reducer.games);
  const result = videoGames.filter((word) => word.id == id);

  useEffect(() => {
    dispatch(getAllGames());
    console.log("id: ", id);
    console.log("videoGames: ", videoGames);
    console.log("result: ", result);
    setData(result[0]);
  }, [id, result]);

  useEffect(() => {
    dispatch(getAllGames());
  }, []);

  // useEffect(() => {
  //   console.log("data: ", data);
  // }, [data]);

  return (
    <div>
      {data ? (
        <div className={styles.createDiv}>
          <div className={styles.containerE}>
            <div className={styles.divBreedE}>
              <div className={styles.container_img}>
                <img
                  src={data?.background_image}
                  alt="Aqui va la imagen"
                  className={styles.img}
                />
              </div>

              <div className={styles.container_data}>
                <div className={styles.TitleBreedE}>
                  <p className={styles.card_title}>{data.name}</p>
                </div>
                <div className={styles.date}>
                  {data?.description ? (
                    <div>
                      <p className={styles.temlabel}>Descripción</p>
                      <label className={styles.description}>
                        {data.description}
                      </label>
                    </div>
                  ) : (
                    <label className={styles.description}>
                      Doesn't have any description
                    </label>
                    // <h2>Doesn't have any description</h2>
                  )}
                </div>
                <p className={styles.temlabel}>Platforms</p>
                <div className={styles.temp}>
                  {data.platforms ? (
                    data.platforms.map((e) => (
                      <label className={styles.label} key={e.id}>
                        {e.platform.name}
                      </label>
                    ))
                  ) : (
                    // data.platforms.map((e) => (
                    //     <label className={styles.label}>
                    //       {JSON.parse(e.platform).name}
                    //     </label>
                    //   ))
                    <label className={styles.description}>
                      Doesn't have any platform
                    </label>
                  )}
                </div>
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
