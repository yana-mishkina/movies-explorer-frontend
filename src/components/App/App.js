import React from "react";
import { Route, Routes, useNavigate, Navigate, useLocation } from "react-router-dom";
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
import { auth } from "../../utils/Auth";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {
  SearchFilter,
  SearchShortFilter,
  showSearchResults,
} from "../../utils/SearchFilter";
import {
  TEXT_INFO_REG_SUCCESS,
  TEXT_INFO_ERROR,
  TEXT_INFO_UPD_SUCCESS,
} from "../../utils/constants";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isBurgerOpen, setIsBurgerOpen] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isSuccessAction, setIsSuccessAction] = React.useState(false);
  const [infoTooltipText, setInfoTooltipText] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isShortMovie, setIsShortMovie] = React.useState(false);
  const [searchedMovie, setSearchedMovie] = React.useState("");
  const [isFindMovies, setIsFindMovies] = React.useState(true);
  const [isFindSavedMovies, setIsFindSavedMovies] = React.useState(true);
  const [isServerError, setIsServerError] = React.useState(false);
  const [isShortSavedMovie, setIsShortSavedMovie] = React.useState(false);
  const user = JSON.parse(localStorage.getItem("user-name"));
  const token = localStorage.getItem("jwt");
  const keyWord = JSON.parse(localStorage.getItem("searched-movie"));
  const keyWordForSavedMovies = JSON.parse(
    localStorage.getItem("searched-saved-movie")
  );
  const allMovies = JSON.parse(localStorage.getItem("movies"));
  const filtredMovies = JSON.parse(localStorage.getItem("filtered-movies"));
  const allSavedMovies = JSON.parse(localStorage.getItem("saved-movies"));
  const filteredSavedMovies = JSON.parse(
    localStorage.getItem("filtered-saved-movies")
  );

  function handeleBurgerOpen() {
    setIsBurgerOpen(false);
  }

  function closeAllPopups() {
    setIsBurgerOpen(true);
    setIsInfoTooltipOpen(false);
  }

  React.useEffect(() => {
    if (token) {
      auth
        .getToken(token)
        .then((data) => {
          setCurrentUser(data);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
          navigate("/");
        });
    }
  }, [isLoggedIn, user]);

  function handleRegisterSubmit(data) {
    setIsLoading(true);
    auth
      .register(data.name, data.email, data.password)
      .then(() => {
        setInfoTooltipText(TEXT_INFO_REG_SUCCESS);
        setIsSuccessAction(true);
        setIsInfoTooltipOpen(true);
        setTimeout(() => closeAllPopups(), 1000);
        handleLoginSubmit({
          email: data.email,
          password: data.password
        },);
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessAction(false);
        setInfoTooltipText(TEXT_INFO_ERROR);
        setIsInfoTooltipOpen(true);
        setTimeout(() => closeAllPopups(), 1000);
      })
      .finally((err) => {
        setIsLoading(false);
      });
  }

  function handleLoginSubmit(data) {
    setIsLoading(true);
    auth
      .login(data.email, data.password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        setCurrentUser(data);
        navigate("/movies");
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipText(TEXT_INFO_ERROR);
        setIsSuccessAction(false);
        setIsInfoTooltipOpen(true);
        setTimeout(() => closeAllPopups(), 1000);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSignOut() {
    localStorage.clear();
    setIsLoggedIn(false);
    setCurrentUser({});
    setSearchedMovie("");
    setIsFindMovies([]);
    setIsFindSavedMovies([]);
    setMovies([]);
    setSavedMovies([]);
    navigate("/");
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    mainApi
      .editProfile(data, token)
      .then((data) => {
        setCurrentUser(data);
        setIsLoading(false);
        setInfoTooltipText(TEXT_INFO_UPD_SUCCESS);
        setIsSuccessAction(true);
        setIsInfoTooltipOpen(true);
        setTimeout(() => closeAllPopups(), 1000);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsSuccessAction(false);
        setInfoTooltipText(TEXT_INFO_ERROR);
        setIsInfoTooltipOpen(true);
        setTimeout(() => closeAllPopups(), 1000);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function getAllMovies(searchedMovie) {
    localStorage.setItem("searched-movie", JSON.stringify(searchedMovie));
    moviesApi
      .getMovies()
      .then((res) => {
        localStorage.setItem("movies", JSON.stringify(res));
        const filterResults = SearchFilter(res, searchedMovie);
        const filterShortMovies = SearchShortFilter(
          filterResults,
          isShortMovie
        );
        setIsLoading(false);
        showSearchResults(filterShortMovies, setIsFindMovies, setMovies);
        localStorage.setItem("filtered-movies", JSON.stringify(filterResults));
      })
      .catch((err) => {
        console.log(err);
        setIsServerError(true);
      })
      .finally(() => {
        setIsServerError(false);
      });
  }

  function handleMoviesSearch(searchedMovie) {
    setIsLoading(true);
    setSearchedMovie(searchedMovie);
    localStorage.setItem("searched-movie", JSON.stringify(searchedMovie));

    if (!localStorage.movies) {
      getAllMovies(searchedMovie);
    } else {
      const filterResults = SearchFilter(allMovies, searchedMovie);
      const filterShortMovies = SearchShortFilter(filterResults, isShortMovie);
      setIsLoading(false);
      showSearchResults(filterShortMovies, setIsFindMovies, setMovies);
      localStorage.setItem("filtered-movies", JSON.stringify(filterResults));
    }
  }

  function handleShortFilter() {
    setIsShortMovie(!isShortMovie);
  }

  React.useEffect(() => {
    if (location.pathname === "/movies") {
      if (localStorage.isShort) {
        setIsShortMovie(true);
      } 
    }
  }, [location]);

  React.useEffect(() => {
    if (isShortMovie) {
      setIsShortMovie(true);
      localStorage.setItem("isShort", "true");
      if (!keyWord) {
        return undefined;
      } else {
        setSearchedMovie(keyWord);
        const filterResults = SearchFilter(filtredMovies, keyWord);
        const filterShortMovies = SearchShortFilter(
          filterResults,
          isShortMovie
        );
        showSearchResults(filterShortMovies, setIsFindMovies, setMovies);
      }
    } else {
      setIsShortMovie(false);
      localStorage.removeItem("isShort");
      if (!filtredMovies) {
        setSearchedMovie(keyWord);
        return undefined;
      } else {
        setSearchedMovie(keyWord);
        setIsFindMovies(true);
        setMovies(filtredMovies);
      }
    }
  }, [isShortMovie]);

  function handleMovieSave(movie) {
    mainApi
      .saveMovie(movie, token)
      .then((movie) => {
        setSavedMovies([...savedMovies, movie]);
        localStorage.setItem(
          "saved-movies",
          JSON.stringify([...savedMovies, movie])
        );
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessAction(false);
        setInfoTooltipText("Невозможно сохранить фильм. Попробуйте позже.");
        setIsInfoTooltipOpen(true);
        setTimeout(() => closeAllPopups(), 1000);
      })
      .finally(() => {
        setIsSuccessAction(true);
      })
  }

  function handleMovieUnsave(movieId) {
    mainApi
      .unsaveMovie(movieId, token)
      .then(() => {
        const filteredSavedMovies = savedMovies.filter((item) => {
          return item._id !== movieId;
        });
        setSavedMovies(filteredSavedMovies);
        localStorage.setItem(
          "saved-movies",
          JSON.stringify(filteredSavedMovies)
        );
      })
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getMovies(token)
        .then((savedMovies) => {
          setSavedMovies(savedMovies);
          localStorage.setItem("saved-movies", JSON.stringify(savedMovies));
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  function handleSavedMoviesSearch(searchedMovie) {
    localStorage.setItem("searched-saved-movie", JSON.stringify(searchedMovie));
    const filterResults = SearchFilter(allSavedMovies, searchedMovie);
    const filterShortMovies = SearchShortFilter(
      filterResults,
      isShortSavedMovie
    );
    localStorage.setItem(
      "filtered-saved-movies",
      JSON.stringify(filterResults)
    );
    showSearchResults(filterShortMovies, setIsFindSavedMovies, setSavedMovies);
  }

  function handleShortSavedFilter() {
    setIsShortSavedMovie(!isShortSavedMovie);
  }

  React.useEffect(() => {
    localStorage.removeItem("searched-saved-movie");
    setIsShortSavedMovie(false);

    if (location.pathname === "/saved-movies") {
      showSearchResults(allSavedMovies, setIsFindSavedMovies, setSavedMovies);

      if (isShortSavedMovie) {
        setIsShortSavedMovie(true);
        if (!keyWordForSavedMovies) {
          const filterShortMovies = SearchShortFilter(
            allSavedMovies,
            isShortSavedMovie
          );
          showSearchResults(
            filterShortMovies,
            setIsFindSavedMovies,
            setSavedMovies
          );
        } else {
          const filterResults = SearchFilter(
            filteredSavedMovies,
            keyWordForSavedMovies
          );
          const filterShortMovies = SearchShortFilter(
            filterResults,
            isShortSavedMovie
          );
          showSearchResults(
            filterShortMovies,
            setIsFindSavedMovies,
            setSavedMovies
          );
        }
      } else {
        setIsShortSavedMovie(false);
        if (!keyWordForSavedMovies) {
          showSearchResults(allSavedMovies, setIsFindSavedMovies, setSavedMovies);
        } else {
          const filterResults = SearchFilter(
            allSavedMovies,
            keyWordForSavedMovies
          );
          showSearchResults(filterResults, setIsFindSavedMovies, setSavedMovies);
        }
      }
    }
  }, [location, isShortSavedMovie]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccessAction={isSuccessAction}
          infoTooltipText={infoTooltipText}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Main
                isLoggedIn={isLoggedIn}
                onBurgerOpen={handeleBurgerOpen}
                isBurgerOpen={isBurgerOpen}
                onBurgerClose={closeAllPopups}
              />
            }
          />

          <Route
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/movies" />
              ) : (
                <Register
                  onSubmit={handleRegisterSubmit}
                  isLoading={isLoading}
                />
              )
            }
          />

          <Route
            path="/signin"
            element={
              isLoggedIn ? (
                <Navigate to="/movies" />
              ) : (
                <Login onSubmit={handleLoginSubmit} isLoading={isLoading} />
              )
            }
          />

          <Route
            path="/profile"
            element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    onBurgerOpen={handeleBurgerOpen}
                    isBurgerOpen={isBurgerOpen}
                    onBurgerClose={closeAllPopups}
                    isLoggedIn={isLoggedIn}
                    onUpdateUser={handleUpdateUser}
                    isLoading={isLoading}
                    onSignOut={handleSignOut}
                    textButton="Редактировать"
                    textLoading="Сохраняем..."
                  />
                </ProtectedRoute>
            }
          />

          <Route
            path="/movies"
            element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Movies
                    onBurgerOpen={handeleBurgerOpen}
                    isBurgerOpen={isBurgerOpen}
                    onBurgerClose={closeAllPopups}
                    movies={movies}
                    onMoviesSearch={handleMoviesSearch}
                    isLoading={isLoading}
                    searchedMovie={searchedMovie}
                    isFindMovies={isFindMovies}
                    isServerError={isServerError}
                    isShortMovie={isShortMovie}
                    onFilter={handleShortFilter}
                    onMovieSave={handleMovieSave}
                    onMovieUnsave={handleMovieUnsave}
                    isSuccessAction={isSuccessAction}
                  />
                </ProtectedRoute>
            }
          />

          <Route
            path="/saved-movies"
            element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <SavedMovies
                    onBurgerOpen={handeleBurgerOpen}
                    isBurgerOpen={isBurgerOpen}
                    onBurgerClose={closeAllPopups}
                    movies={savedMovies}
                    isFindMovies={isFindSavedMovies}
                    onMovieUnsave={handleMovieUnsave}
                    onMoviesSearch={handleSavedMoviesSearch}
                    isShortMovie={isShortSavedMovie}
                    onFilter={handleShortSavedFilter}
                  />
                </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
