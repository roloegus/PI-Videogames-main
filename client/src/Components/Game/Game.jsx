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
    //dispatch(getAllGames());
    console.log("id: ", id);
    console.log("videoGames: ", videoGames);

    if (result && result[0]) {
      if (result[0].description) {
        const convertedPlatforms = result[0].platforms.map((platform) => {
          const platformObject = JSON.parse(platform);
          // console.log("platformObject: ", platformObject);
          platformObject.name = platformObject.platform.name;
          return {
            platform: platformObject,
          };
        });
        console.log("convertedPlatforms: ", convertedPlatforms);
        result[0].platforms = convertedPlatforms;
      }

      console.log("result: ", result);
      setData(result[0]);
    }
  }, [id, videoGames]);

  useEffect(() => {
    dispatch(getAllGames());
  }, []);

  // useEffect(() => {
  //   console.log("data: ", data);
  // }, [data]);

  return (
    <div className={styles.containerAll}>
      {data ? (
        <div className={styles.container}>
          <div className={styles.container_img}>
            <img
              src={data?.background_image}
              // alt="Aqui va la imagen"
              className={styles.img}
            />
          </div>
          <div className={styles.a}>
            <div className={styles.f}>
              <p className={styles.temlabel}>
                ID: <label className={styles.description}>{data.id}</label>
              </p>
              <p className={styles.temlabel}>
                Name: <label className={styles.description}>{data.name}</label>
              </p>
              {/* <div className={styles.TitleBreedE}>
                  <p className={styles.card_title}>{data.name}</p>
                </div> */}
              <div className={styles.date}>
                {data?.description ? (
                  <div>
                    {/* <p className={styles.temlabel}>Descripción</p>
                      <label className={styles.description}>
                        {data.description}
                      </label> */}

                    <p className={styles.temlabel}>
                      Description:{" "}
                      <label className={styles.description}>
                        {data.description}
                      </label>
                    </p>
                  </div>
                ) : (
                  <p className={styles.temlabel}>
                    Description:{" "}
                    <label className={styles.description}>
                      Doesn't have any description
                    </label>
                  </p>
                  // <h2>Doesn't have any description</h2>
                )}
              </div>
              <p className={styles.temlabel}>Platforms</p>
              <div className={styles.temp}>
                {data.platforms ? (
                  data.platforms.map((e) => (
                    <label className={styles.labelPlatform} key={e.id}>
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
              <p className={styles.temlabel}>
                Released:{" "}
                <label className={styles.description}>{data.released}</label>
              </p>
              <p className={styles.temlabel}>
                Rating:{" "}
                <label className={styles.description}>{data.rating}</label>
              </p>
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
      ) : (
        <h2>Loading</h2>
      )}
    </div>
  );
};
export default Game;
