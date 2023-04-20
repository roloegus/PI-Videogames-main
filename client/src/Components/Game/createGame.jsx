import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAllGames, postGames, getGenres } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import styles from "./createGame.module.css";
// import successImg from "../img/success.svg";
// import dogsImg from "../img/dogs.png";

const CreateVideogame = () => {
  const genres = useSelector((state) => state.reducer.genres);
  const videogames = useSelector((state) => state.reducer.games);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState([]);
  const [imageGame, setImageGame] = useState(null);
  // const [rating, setRating] = useState(0);
  // const [released, setReleased] = useState(0);
  // const [hmin, setHmin] = useState(0);
  // const [hmax, setHmax] = useState(0);
  // const [wmin, setWmin] = useState(0);
  // const [wmax, setWmax] = useState(0);
  // const [smin, setSmin] = useState(0);
  // const [smax, setSmax] = useState(0);
  const [success, setSuccess] = useState(false);
  // const [DogsSeleccionado, setDogsSeleccionado] = useState({
  //   name: "",
  //   height: `${hmin} - ${hmax}`,
  //   weight: `${wmin} - ${wmax}`,
  //   life_span: `${smin} - ${smax}`,
  //   temperament: [],
  //   image: "",
  // });
  const [gamesSeleccionado, setGamesSeleccionado] = useState({
    name: "",
    description: "",
    released: "", //"2020/02/02",
    background_image: "",
    rating: 0,
    platforms: [],
    genres: [],
  });
  // console.log(
  //   "🚀 ~ file: CreateDog.jsx:36 ~ CreateDog ~ DogsSeleccionado",
  //   DogsSeleccionado
  // );
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    var { name, value } = e.target;
    console.log("name: ", name);
    console.log("value: ", value);
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
    console.log("selectedOptions 11: ", selectedOptions);
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
    console.log("selectedPlatform 11: ", selectedPlatform);
  };

  const gameIsNotSame = videogames.filter(
    (e) => e.name === gamesSeleccionado.name
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectedOptions);

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
    // if (wmin === 0 || wmax === 0) {
    //   formErrors.weight = "weight is required";
    // } else if (isNaN(wmin && wmax)) {
    //   formErrors.weight = "weight is invalid";
    // } else if (wmin > wmax) {
    //   formErrors.weight = "max should be greater";
    // } else if (wmin > 99 || wmax > 99 || wmin < 0 || wmax < 0) {
    //   formErrors.weight = "Number should be between 0 and 99";
    // }
    // if (smin === 0 || smax === 0) {
    //   formErrors.life_span = "life span is required";
    // } else if (isNaN(smin && smax)) {
    //   formErrors.life_span = "life span is invalid";
    // } else if (smin > smax) {
    //   formErrors.life_span = "max should be greater";
    // } else if (smin > 99 || smax > 99 || smin < 0 || smax < 0) {
    //   formErrors.life_span = "Number should be between 0 and 99";
    // }
    // if (!DogsSeleccionado.image) {
    //   formErrors.image = "Image is required";
    // }
    setErrors(formErrors);
    console.log(errors);
    if (Object.keys(formErrors).length === 0) {
      setGamesSeleccionado((prevState) => ({
        ...prevState,
        genres: selectedOptions,
        platforms: selectedPlatform,
        // height: `${hmin} - ${hmax}`,
        // weight: `${wmin} - ${wmax}`,
        // life_span: `${smin} - ${smax}`,
      }));
      // imageUpload();
      // console.log("game: ", gamesSeleccionado);
      // dispatch(postGames(gamesSeleccionado));
      dispatch(postGames(gamesSeleccionado, imageGame));
      setSuccess(true);
    }
  };

  // const imageUpload = () => {
  //   if (imageGame && imageGame.name) {
  //     if (imageGame.type === "image/jpeg" || imageGame.type === "image/png") {
  //       const formData = new FormData();
  //       formData.append("myFile", imageGame, imageGame.name);
  //       axios.post("http://181.127.189.247:3001/vehicles/image", formData);
  //     }
  //   }
  // };
  const dispatch = useDispatch();

  useEffect(() => {
    if (imageGame && imageGame.name) {
      setGamesSeleccionado((prevState) => ({
        ...prevState,
        background_image: `http://181.127.189.247:8081/Vehiculos/${imageGame.name}`,
      }));
    }
  }, [imageGame]);

  useEffect(() => {
    dispatch(getAllGames());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  //   return <h2>Holaaaaa</h2>;
  // if (success) {
  //   return (
  //     <div className={styles.createDiv}>
  //       <div className={styles.containerE}>
  //         <div className={styles.divBreedE}>
  //           <div className={styles.TitleBreedE}>
  //             <div>
  //               <img src={successImg} alt="" />
  //               <p>Success</p>
  //               <div>
  //                 <p className={styles.pE}>
  //                   Thank you for your submit, reload the page for another
  //                   submit.
  //                 </p>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // } else {
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
                    type="text"
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
                  {/* <p className={styles.max}>Max</p> */}
                  {/* <input
                    className={styles.form_input}
                    type="text"
                    name="height"
                      value={hmax ? hmax : ""}
                      onChange={(e) => {
                        setHmax(e.target.value);
                      }}
                  /> */}
                </div>

                <br />
                <p className={styles.form_item}>Released</p>
                <div className={styles.divCamp}>
                  {/* <p className={styles.min}>Min</p> */}
                  <input
                    className={styles.form_name}
                    type="date"
                    name="released"
                    value={gamesSeleccionado ? gamesSeleccionado.released : ""}
                    onChange={handleChange}
                  />
                  {/* {errors.weight && (
                      <div className={styles.errorDiv}>
                        {" "}
                        <p className={styles.error}>{errors.weight}</p>{" "}
                      </div>
                    )} */}
                  {/* <p className={styles.max}>Max</p>
                  <input
                    className={styles.form_input}
                    type="text"
                    name="weight"
                      value={wmax ? wmax : ""}
                      onChange={(e) => {
                        setWmax(e.target.value);
                      }}
                  /> */}
                </div>

                <br />

                {/* <p className={styles.form_item}>Life Span</p> */}
                {/* <div className={styles.divCamp}> */}
                {/* <p className={styles.min}>Min</p>
                  <input
                    className={styles.form_input}
                    type="text"
                    name="life_span"
                      value={smin ? smin : ""}
                      onChange={(e) => {
                        setSmin(e.target.value);
                      }}
                  /> */}
                {/* {errors.life_span && (
                      <div className={styles.errorDiv}>
                        {" "}
                        <p className={styles.error}>{errors.life_span}</p>{" "}
                      </div>
                    )} */}
                {/* <p className={styles.max}>Max</p> */}
                {/* <input
                    className={styles.form_input}
                    type="text"
                    name="life_span"
                      value={smax ? smax : ""}
                      onChange={(e) => {
                        setSmax(e.target.value);
                      }}
                  /> */}
                {/* </div> */}
              </div>
            </div>
            <div className={styles.divImg}>
              <div className={styles.TitleBreed}>
                <h3>Image</h3>
              </div>

              {/* {errors.image && <p className={styles.error}>{errors.image}</p>} */}
              <div className={styles.img}>
                {/* <img src={DogsSeleccionado.image} alt="" /> */}
              </div>
              <input
                name="background_image"
                type="file"
                onChange={handleChange}
              />
              <br />
              <br></br>
              {/* <img src={dogsImg} alt="" /> */}
              <br />
            </div>
            <div className={styles.divTemp}>
              <div className={styles.container_Check}>
                <div className={styles.TitleBreed}>
                  <p>Genres</p>
                </div>
                {errors.genres && (
                  <div className={styles.errorDivTemp}>
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
              <div className={styles.container_Check}>
                <div className={styles.TitleBreed}>
                  <p>Platforms</p>
                </div>
                {/* {errors.temperament && (
                    <div className={styles.errorDivTemp}>
                      {" "}
                      <p className={styles.error}>{errors.temperament}</p>
                    </div>
                  )} */}
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
                        value="Play 5"
                        checked={selectedPlatform.includes("Play 5")}
                        onChange={handleOptionChangePlatform}
                        className={styles.check}
                      />
                      Play 5
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
                    {/* ))
                      : ""} */}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <input className={styles.button} type="submit" value="Crear" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
  // }
};
export default CreateVideogame;
