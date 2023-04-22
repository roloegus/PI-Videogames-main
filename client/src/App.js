import React from "react";
import { Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Catalogo from "./Components/Catalogo/Catalogo";
import Game from "./Components/Game/Game";
import Searched from "./Components/SearchedGame/SearchedGame";
import CreateGame from "./Components/CreateGame/CreateGame";
import Nav from "./Components/NavBar/Nav";
// import CreateDog from "./componentes/CreateDog";
import FilterGames from "./Components/FilterGames/FilterGames";
import NavCreate from "./Components/NavCreate/NavCreate";
import "./App.css";

function App() {
  return (
    <div>
      <Route exact path="/" component={LandingPage} />
      <Route path="/searched" render={() => <Nav onSearch="onSearch" />} />
      <Route exact path="/home" render={() => <Nav onSearch="onSearch" />} />
      {/* <Route exact path="/home" component={FilterDogs} />
      <Route exact path="/home" component={Catalogo} /> */}
      <Route exact path="/game/:id" component={NavCreate} />
      <Route exact path="/game/:id" component={Game} />
      <Route exact path="/createGame" component={NavCreate} />
      <Route exact path="/createGame" component={CreateGame} />
      <Route exact path="/searched/:game" component={Searched} />
      <div className="home">
        <div className="home">
          <Route exact path="/home" component={FilterGames} />
        </div>
        <Route exact path="/home" component={Catalogo} />
      </div>
    </div>
  );
}

export default App;
