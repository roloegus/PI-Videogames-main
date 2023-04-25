import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAllGames, postGames, getGenres } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import styles from "./CreateGame.module.css";
import successImg from "../../img/success.svg";
import platformArray from "../arrayplatform";

const CreateVideogame = () => {
  const genres = useSelector((state) => state.reducer.genres);
  const videogames = useSelector((state) => state.reducer.games);
  const [imageGame, setImageGame] = useState(null);
  const [success, setSuccess] = useState(false);
  const [enableCreate, setEnableCreate] = useState(true);
  const [gamesSeleccionado, setGamesSeleccionado] = useState({
    name: "",
    description: "",
    released: "",
    background_image: "",
    rating: 0,
    platforms: [],
    genres: [],
  });

  const [errors, setErrors] = useState({});

  const gameIsNotSame = videogames.filter(
    (e) => e.name === gamesSeleccionado.name
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const formErrors = {};

    if (gameIsNotSame.length !== 0) {
      formErrors.name = "Name already exist";
    }
    if (!gamesSeleccionado.name) {
      formErrors.name = "Name is required";
    }
    if (gamesSeleccionado.rating > 5 || gamesSeleccionado.rating < 1) {
      formErrors.rating = "Rating should be between 1 and 5";
    }
    if (gamesSeleccionado.genres.length === 0) {
      formErrors.genres = "Genres is required";
    }
    if (gamesSeleccionado.platforms.length === 0) {
      formErrors.platforms = "Platform is required";
    }
    if (gamesSeleccionado.released.length === 0) {
      formErrors.released = "date released is required";
    } else if (
      gamesSeleccionado.released < "1900/01/01" ||
      gamesSeleccionado.released > "2025/01/01"
    ) {
      formErrors.released = "Year must be between 1900 and 2025";
    }
    if (gamesSeleccionado.background_image.length === 0) {
      formErrors.background_image = "Image is required";
    }

    if (Object.keys(formErrors).length === 0) {
      setEnableCreate(false);
    } else {
      setEnableCreate(true);
    }

    setErrors(formErrors);
  }, [gamesSeleccionado]);

  const handleChange = (e) => {
    var { name, value } = e.target;
    console.log("gamesSeleccionado: ", gamesSeleccionado);
    if (name === "background_image") {
      setImageGame(e.target.files[0]);
    } else if (name === "genres") {
      setGamesSeleccionado((prevState) => ({
        ...prevState,
        genres: prevState.genres.includes(value)
          ? prevState.genres.filter((so) => so !== value)
          : [...prevState.genres, value],
      }));
    } else if (name === "platforms") {
      setGamesSeleccionado((prevState) => ({
        ...prevState,
        platforms: prevState.platforms.includes(value)
          ? prevState.platforms.filter((so) => so !== value)
          : [...prevState.platforms, value],
      }));
    } else {
      setGamesSeleccionado((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setGamesSeleccionado((prevState) => ({
      ...prevState,
    }));
    imageUpload();
    console.log("game: ", gamesSeleccionado);
    dispatch(postGames(gamesSeleccionado, imageGame));
    setSuccess(true);
  };

  const imageUpload = () => {
    if (imageGame && imageGame.name) {
      if (
        imageGame.type === "image/jpeg" ||
        imageGame.type === "image/png" ||
        imageGame.type === "image/webp"
      ) {
        const formData = new FormData();
        formData.append("myFile", imageGame, imageGame.name);
        axios.post("http://181.127.189.247:3001/vehicles/image", formData);
      }
    }
  };

  useEffect(() => {
    if (imageGame && imageGame.name) {
      setGamesSeleccionado((prevState) => ({
        ...prevState,
        background_image: `http://181.127.189.247:8081/Vehiculos/${imageGame.name}`,
      }));
    }
  }, [imageGame]);

  // useEffect(() => {
  //   dispatch(getAllGames());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(getAllGames());
    dispatch(getGenres());
  }, [dispatch]);

  if (success) {
    return (
      <div className={styles.createDiv}>
        <div className={styles.containerE}>
          <div className={styles.divBreedE}>
            <div className={styles.TitleBreedE}>
              <div>
                <img src={successImg} alt="" />
                <p>Success</p>
                <div>
                  <p className={styles.pE}>
                    Thank you for your submit, reload the page for another
                    submit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.createDiv}>
        <div className={styles.Div}>
          {/* <form onSubmit={handleSubmit}> */}
          <form onSubmit={handleSubmit}>
            <div className={styles.container}>
              <div className={styles.divBreed}>
                <div className={styles.TitleBreed}>
                  <p>New Game</p>
                </div>

                <div>
                  <p className={styles.form_item}>Nombre</p>
                  <input
                    className={styles.form_name}
                    type="text"
                    name="name"
                    value={gamesSeleccionado ? gamesSeleccionado.name : ""}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <div className={styles.errorDivName}>
                      {" "}
                      <p className={styles.error}>{errors.name}</p>
                    </div>
                  )}
                  <br />

                  <p className={styles.form_item}>Descripción</p>
                  <div className={styles.divCamp}>
                    {/* <p className={styles.min}>Min</p> */}
                    <input
                      className={styles.form_name}
                      type="text"
                      name="description"
                      value={
                        gamesSeleccionado ? gamesSeleccionado.description : ""
                      }
                      onChange={handleChange}
                    />
                  </div>
                  <br />

                  <p className={styles.form_item}>Rating</p>
                  <div className={styles.divCamp}>
                    {/* <p className={styles.min}>Min</p> */}
                    <input
                      className={styles.form_name}
                      type="number"
                      name="rating"
                      value={gamesSeleccionado ? gamesSeleccionado.rating : ""}
                      onChange={handleChange}
                    />
                    {errors.rating && (
                      <div className={styles.errorDivRating}>
                        {" "}
                        <p className={styles.error}>{errors.rating}</p>
                      </div>
                    )}
                  </div>

                  <br />
                  <p className={styles.form_item}>Released</p>
                  <div className={styles.divCamp}>
                    <input
                      className={styles.form_name}
                      type="date"
                      name="released"
                      value={
                        gamesSeleccionado ? gamesSeleccionado.released : ""
                      }
                      onChange={handleChange}
                    />
                    {errors.released && (
                      <div className={styles.errorDivReleased}>
                        {" "}
                        <p className={styles.error}>{errors.released}</p>
                      </div>
                    )}
                  </div>

                  <br />
                </div>
              </div>

              <div className={styles.divTemp}>
                <div className={styles.divBreed}>
                  <div className={styles.TitleBreed}>
                    <p>Genres</p>
                  </div>
                  {errors.genres && (
                    <div className={styles.errorDivGenres}>
                      {" "}
                      <p className={styles.error}>{errors.genres}</p>
                    </div>
                  )}
                  <div className={styles.container_Check3}>
                    <div className={styles.container_Check2}>
                      <div className={styles.container_Check1}>
                        {genres
                          ? genres.map((option) => (
                              <li className={styles.li} key={option.id}>
                                <input
                                  type="checkbox"
                                  value={option.name}
                                  name="genres"
                                  checked={gamesSeleccionado.genres.includes(
                                    option.name
                                  )}
                                  onChange={handleChange}
                                  className={styles.check}
                                />
                                {option.name}
                              </li>
                            ))
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.divTemp}>
                <div className={styles.divBreed}>
                  <div className={styles.TitleBreed}>
                    <p>Platforms</p>
                  </div>
                  {errors.platforms && (
                    <div className={styles.errorDivPlatforms}>
                      {" "}
                      <p className={styles.error}>{errors.platforms}</p>
                    </div>
                  )}
                  <div className={styles.container_Check3}>
                    <div className={styles.container_Check2}>
                      <div className={styles.container_Check1}>
                        {platformArray
                          ? platformArray.map((option, index) => (
                              <li className={styles.li} key={index}>
                                <input
                                  type="checkbox"
                                  value={option}
                                  name="platforms"
                                  checked={gamesSeleccionado.platforms.includes(
                                    option
                                  )}
                                  onChange={handleChange}
                                  className={styles.check}
                                />
                                {option}
                              </li>
                            ))
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.divBreed}>
                <div className={styles.TitleBreed}>
                  <h3>Image</h3>
                </div>
                <div className={styles.img}></div>
                <input
                  name="background_image"
                  type="file"
                  onChange={handleChange}
                />
                {errors.background_image && (
                  <div className={styles.background_image}>
                    {" "}
                    <p className={styles.error}>{errors.background_image}</p>
                  </div>
                )}
                <br />
                <br></br>

                <br />
              </div>

              {enableCreate ? null : (
                <div>
                  <input
                    className={styles.button}
                    disabled={enableCreate}
                    type="submit"
                    value="Crear"
                  />
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
};
export default CreateVideogame;
