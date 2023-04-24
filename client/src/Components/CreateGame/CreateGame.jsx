import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAllGames, postGames, getGenres } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import styles from "./CreateGame.module.css";
import successImg from "../../img/success.svg";

const CreateVideogame = () => {
  const genres = useSelector((state) => state.reducer.genres);
  const videogames = useSelector((state) => state.reducer.games);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState([]);
  const [imageGame, setImageGame] = useState(null);
  const [success, setSuccess] = useState(false);
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

  const handleChange = (e) => {
    var { name, value } = e.target;
    // console.log("name: ", name);
    // console.log("value: ", value);
    if (name === "background_image") {
      setImageGame(e.target.files[0]);
    }
    setGamesSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
      genres: selectedOptions,
      platforms: selectedPlatform,
    }));
  };

  const handleOptionChange = (changeEvent) => {
    setSelectedOptions(
      selectedOptions.includes(changeEvent.target.value)
        ? selectedOptions.filter((so) => so !== changeEvent.target.value)
        : [...selectedOptions, changeEvent.target.value]
    );
    setGamesSeleccionado((prevState) => ({
      ...prevState,
      genres: selectedOptions,
      platforms: selectedPlatform,
    }));
    // console.log("selectedOptions 11: ", selectedOptions);
    // console.log("selectedPlatform 11: ", selectedPlatform);
  };

  const handleOptionChangePlatform = (changeEvent) => {
    setSelectedPlatform(
      selectedPlatform.includes(changeEvent.target.value)
        ? selectedPlatform.filter((so) => so !== changeEvent.target.value)
        : [...selectedPlatform, changeEvent.target.value]
    );
    setGamesSeleccionado((prevState) => ({
      ...prevState,
      genres: selectedOptions,
      platforms: selectedPlatform,
    }));
    // console.log("selectedPlatform 11: ", selectedPlatform);
  };

  const gameIsNotSame = videogames.filter(
    (e) => e.name === gamesSeleccionado.name
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(selectedOptions);

    // console.log("selectedPlatform: ", selectedPlatform);
    // const pattern = /^[a-zA-Z\s]+$/;
    let formErrors = {};
    if (gameIsNotSame.length !== 0) {
      console.log("gameIsNotSame: ", gameIsNotSame);
      formErrors.name = "Name already exist";
    }
    // if (!pattern.test(gamesSeleccionado.name)) {
    //   formErrors.name = "Name should only have letters";
    // }
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

    setErrors(formErrors);
    console.log(errors);
    if (Object.keys(formErrors).length === 0) {
      setGamesSeleccionado((prevState) => ({
        ...prevState,
        genres: selectedOptions,
        platforms: selectedPlatform,
      }));
      imageUpload();
      console.log("game: ", gamesSeleccionado);
      // dispatch(postGames(gamesSeleccionado));
      dispatch(postGames(gamesSeleccionado, imageGame));
      setSuccess(true);
    }
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
  const dispatch = useDispatch();

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
                      {genres
                        ? genres.map((option) => (
                            <li className={styles.li} key={option.id}>
                              <input
                                type="checkbox"
                                value={option.name}
                                checked={selectedOptions.includes(option.name)}
                                onChange={handleOptionChange}
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
                      {/* {genres
                      ? genres.map((option) => ( */}

                      <li className={styles.li} key={1}>
                        <input
                          type="checkbox"
                          value="PlayStation 3"
                          checked={selectedPlatform.includes("PlayStation 3")}
                          onChange={handleOptionChangePlatform}
                          className={styles.check}
                        />
                        PlayStation 3
                      </li>
                      <li className={styles.li} key={2}>
                        <input
                          type="checkbox"
                          value="PlayStation 4"
                          checked={selectedPlatform.includes("PlayStation 4")}
                          onChange={handleOptionChangePlatform}
                          className={styles.check}
                        />
                        PlayStation 4
                      </li>
                      <li className={styles.li} key={3}>
                        <input
                          type="checkbox"
                          value="PlayStation 5"
                          checked={selectedPlatform.includes("PlayStation 5")}
                          onChange={handleOptionChangePlatform}
                          className={styles.check}
                        />
                        PlayStation 5
                      </li>
                      <li className={styles.li} key={4}>
                        <input
                          type="checkbox"
                          value="PC"
                          checked={selectedPlatform.includes("PC")}
                          onChange={handleOptionChangePlatform}
                          className={styles.check}
                        />
                        PC
                      </li>
                      <li className={styles.li} key={5}>
                        <input
                          type="checkbox"
                          value="Xbox One"
                          checked={selectedPlatform.includes("Xbox One")}
                          onChange={handleOptionChangePlatform}
                          className={styles.check}
                        />
                        Xbox One
                      </li>
                      <li className={styles.li} key={6}>
                        <input
                          type="checkbox"
                          value="Xbox 360"
                          checked={selectedPlatform.includes("Xbox 360")}
                          onChange={handleOptionChangePlatform}
                          className={styles.check}
                        />
                        Xbox 360
                      </li>
                      <li className={styles.li} key={7}>
                        <input
                          type="checkbox"
                          value="Xbox Series S/X"
                          checked={selectedPlatform.includes("Xbox Series S/X")}
                          onChange={handleOptionChangePlatform}
                          className={styles.check}
                        />
                        Xbox Series S/X
                      </li>
                      <li className={styles.li} key={8}>
                        <input
                          type="checkbox"
                          value="Linux"
                          checked={selectedPlatform.includes("Linux")}
                          onChange={handleOptionChangePlatform}
                          className={styles.check}
                        />
                        Linux
                      </li>
                      <li className={styles.li} key={9}>
                        <input
                          type="checkbox"
                          value="iOS"
                          checked={selectedPlatform.includes("iOS")}
                          onChange={handleOptionChangePlatform}
                          className={styles.check}
                        />
                        iOS
                      </li>
                      <li className={styles.li} key={10}>
                        <input
                          type="checkbox"
                          value="Android"
                          checked={selectedPlatform.includes("Android")}
                          onChange={handleOptionChangePlatform}
                          className={styles.check}
                        />
                        Android
                      </li>
                      <li className={styles.li} key={11}>
                        <input
                          type="checkbox"
                          value="macOS"
                          checked={selectedPlatform.includes("macOS")}
                          onChange={handleOptionChangePlatform}
                          className={styles.check}
                        />
                        macOS
                      </li>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.divBreed}>
                <div className={styles.TitleBreed}>
                  <h3>Image</h3>
                </div>

                {/* {errors.image && <p className={styles.error}>{errors.image}</p>} */}
                <div className={styles.img}></div>
                <input
                  name="background_image"
                  type="file"
                  onChange={handleChange}
                />
                <br />
                <br></br>

                <br />
              </div>

              <div>
                <input className={styles.button} type="submit" value="Crear" />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
};
export default CreateVideogame;
