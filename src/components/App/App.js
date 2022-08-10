import React from "react";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  Link,
  Routes,
} from "react-router-dom";
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
    <div className="App">
      <Routes>
        <Route path="/signup" element={<Register />} />

        <Route path="/signin" element={<Login />} />

        <Route
          path="/"
          element={
            <Main
              onBurgerOpen={handeleBurgerOpen}
              isBurgerOpen={isBurgerOpen}
              onBurgerClose={closeAllPopups}
            />
          }
        />

        {/* <Route>
             {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route> */}
      </Routes>
    </div>
  );
}

export default App;
