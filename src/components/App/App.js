import React from "react";
import { Route, Switch, Redirect, useHistory, Link } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";

function App() {
  const [isBurgerOpen, setIsBurgerOpen] = React.useState(true);

  function handeleBurgerOpen() {
    setIsBurgerOpen(false);
  }

  function closeAllPopups() {
    setIsBurgerOpen(true);
  }

  return (
    <>
      {/* <Route path="/signup">
        <Register />
      </Route>

      <Route path="/signin">
        <Login />
      </Route> */}

      <Main
        onBurgerOpen={handeleBurgerOpen}
        isBurgerOpen={isBurgerOpen}
        onBurgerClose={closeAllPopups}
      />
    </>
  );
}

export default App;
