import React from "react";
import {
  Route,
  Switch,
  Redirect,
  Link,
  Routes,
  useNavigate,
  Navigate
} from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { mainApi } from "../../utils/MainApi";
import { moviesApi } from "../../utils/MoviesApi";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [isBurgerOpen, setIsBurgerOpen] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isSuccessAction, setIsSuccessAction] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState(null);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [movies, setMovies] = React.useState([]);
  const navigate = useNavigate();

  // React.useEffect(() => {
  //   mainApi
  //     .getUserInfo()
  //     .then((userData) => {
  //       console.log('hi', 'hi');
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  // React.useEffect(() => {
  //   moviesApi
  //     .getMovies()
  //     .then((userData) => {
  //       console.log(userData);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  function handeleBurgerOpen() {
    setIsBurgerOpen(false);
  }

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setIsBurgerOpen(true);
    setIsInfoTooltipOpen(false);
  }

  function handleRegisterSubmit(data) {
    setIsLoading(true);
    mainApi
      .register(data.name, data.email, data.password)
      .then(() => {
        setIsSuccessAction(true);
        handleInfoTooltipOpen();
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessAction(false);
        handleInfoTooltipOpen();
      })
      .finally((err) => {
        setIsLoading(false);
      });
  }

  function handleLoginSubmit(data) {
    setIsLoading(true);
    mainApi
      .login(data.email, data.password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setEmail(email);
        setIsLoggedIn(true);
        navigate("/movies");
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessAction(false);
        setIsInfoTooltipOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    // mainApi
    //   .editProfile(data.name, data.email)
    //   .then((name, email) => {
    //     setCurrentUser(name, email);
    //     closeAllPopups();
    //   })
    //   .catch((err) => console.log(err))
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  }

  function handleSearchMovieSubmit() {
    setIsLoading(true);
    moviesApi
      .getMovies()
      .then((movies) => {
        console.log(movies);
        localStorage.setItem('movies', JSON.stringify(movies));
        setMovies(movies);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally((err) => {
        setIsLoading(false);
      });
  }


  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      mainApi
        .getToken(token)
        .then((data) => {
          setEmail(data.email);
          setIsLoggedIn(true);
          // navigate('/movies');
        })
        .catch((err) => {
          console.log(err);
          // navigate('/signin');
        });
    }
  }, [navigate]);

  function handleSignOut() {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/signin");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccessAction={isSuccessAction}
        />

        <Routes>
          <Route path="/" element={<Main />} />

          <Route
            path="/signup"
            element={
              <Register
                onSubmit={handleRegisterSubmit}
                isLoadingData={isLoading}
              />
            }
          />

          <Route
            path="/signin"
            element={
              <Login onSubmit={handleLoginSubmit} isLoadingData={isLoading} />
            }
          />
          
          <Route
            path="/profile"
            element={
              <Profile
                onBurgerOpen={handeleBurgerOpen}
                isBurgerOpen={isBurgerOpen}
                onBurgerClose={closeAllPopups}
                onSignOut={handleSignOut}
                onSubmit={handleUpdateUser}
              />
            }
          />


          <Route
            path="/movies"
            element={
              <Movies
                onBurgerOpen={handeleBurgerOpen}
                isBurgerOpen={isBurgerOpen}
                onBurgerClose={closeAllPopups}
                onSubmit={handleSearchMovieSubmit}
                movies={movies} 
                isLoadingData={isLoading}
              />
            }
          />

          <Route
            path="/saved-movies"
            element={
              <SavedMovies
                onBurgerOpen={handeleBurgerOpen}
                isBurgerOpen={isBurgerOpen}
                onBurgerClose={closeAllPopups}
              />
            }
          />

          <Route path="*" element={<NotFoundPage />} />

          {/* <Route>
             {isLoggedIn ? <Navigate to="/movies" /> : <Navigate to="/signin" />}
            </Route> */}
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
