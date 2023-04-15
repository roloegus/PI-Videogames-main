import React from "react";
import { Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Catalogo from "./Components/Catalogo/Catalogo";
import Game from "./Components/Game/Game";
import SearchedGame from "./Components/Game/searchedGame";
import CreateGame from "./Components/Game/createGame";
import Nav from "./Components/NavBar/Nav";
// import CreateDog from "./componentes/CreateDog";
import "./App.css";

function App() {
  return (
    <div>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" render={() => <Nav onSearch="onSearch" />} />
      <Route exact path="/home" component={Catalogo} />
      <Route exact path="/game/:id" component={Game} />
      <Route exact path="/createGame" component={CreateGame} />
      <Route exact path="/searchedGame/:game" component={SearchedGame} />
    </div>
  );
}

export default App;
