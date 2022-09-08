import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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

function App() {
  const navigate = useNavigate();
  const [isBurgerOpen, setIsBurgerOpen] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isSuccessAction, setIsSuccessAction] = React.useState(false);
  const [isRegistration, setIsRegistration] = React.useState(false);
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
  const [isSaved, setIsSaved] = React.useState(false);
  const [searchedSavedMovie, setSearchedSavedMovie] = React.useState("");
  const [isShortSavedMovie, setIsShortSavedMovie] = React.useState(false);
  const user = JSON.parse(localStorage.getItem("user-name"));
  const token = localStorage.getItem("jwt");
  const keyWord = JSON.parse(localStorage.getItem("searched-movie"));
  const keyWordForSavedMovies = JSON.parse(localStorage.getItem("searched-saved-movie"));
  const allMovies = JSON.parse(localStorage.getItem("movies"));
  const filtredMovies = JSON.parse(localStorage.getItem("filtered-movies"));
  const allSavedMovies = JSON.parse(localStorage.getItem("saved-movies"));
  const filteredSavedMovies = JSON.parse(localStorage.getItem("filtered-saved-movies"));

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
          navigate("/movies");
        })
        .catch((err) => {
          console.log(err);
          navigate("/signin");
        });
    }
  }, [isLoggedIn, user]);

  function handleRegisterSubmit(data) {
    setIsLoading(true);
    auth
      .register(data.name, data.email, data.password)
      .then(() => {
        setIsRegistration(true);
        setIsSuccessAction(true);
        setIsInfoTooltipOpen(true);
        setTimeout(() => closeAllPopups(), 1000);
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessAction(false);
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
    setSearchedMovie([]);
    setSearchedSavedMovie([]);
    setIsFindMovies([]);
    setIsFindSavedMovies([]);
    setMovies([]);
    setSavedMovies([]);
    navigate("/signin");
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    mainApi
      .editProfile(data, token)
      .then((data) => {
        setCurrentUser(data);
        setIsLoading(false);
        setIsSuccessAction(true);
        setIsInfoTooltipOpen(true);
        setTimeout(() => closeAllPopups(), 1000);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsSuccessAction(false);
        setIsInfoTooltipOpen(true);
        setTimeout(() => closeAllPopups(), 1000);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function getAllMovies(searchedMovie) {
    moviesApi
      .getMovies()
      .then((res) => {
        setSearchedMovie(keyWord);
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
    localStorage.setItem("searched-movie", JSON.stringify(searchedMovie));

    if (!localStorage.movies) {
      getAllMovies(searchedMovie);
    } else {
      setSearchedMovie(keyWord);
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
    if (isShortMovie) {
      setIsShortMovie(true);
      localStorage.setItem("is-short", "true");
      if (!keyWord) {
        return undefined;
      } else {
        const filterResults = SearchFilter(filtredMovies, keyWord);
        const filterShortMovies = SearchShortFilter(
          filterResults,
          isShortMovie
        );
        showSearchResults(filterShortMovies, setIsFindMovies, setMovies);
      }
    } else {
      if (!filtredMovies) {
        return undefined;
      } else {
        setIsFindMovies(true);
        setMovies(filtredMovies);
        setIsShortMovie(false);
      }
    }
    setSearchedMovie(keyWord);
  }, [isShortMovie]);

  function handleMovieSave(movie) {
    mainApi
      .saveMovie(movie, token)
      .then((movie) => {
        setSavedMovies([...savedMovies, movie]);
        localStorage.setItem("saved-movies", JSON.stringify([...savedMovies, movie]));
      })
      .catch((err) => console.log(err));
  }


  function handleMovieUnsave(movieId) {
    mainApi
      .unsaveMovie(movieId, token)
      .then(() => {
        const filteredSavedMovies = savedMovies.filter((item) => {
          return item._id !== movieId
        });
        setSavedMovies(filteredSavedMovies);
        localStorage.setItem('saved-movies', JSON.stringify(filteredSavedMovies));
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
    setSearchedSavedMovie(keyWordForSavedMovies);
  }

  function handleShortSavedFilter() {
    setIsShortSavedMovie(!isShortSavedMovie);
  }

  React.useEffect(() => {
    if (isShortSavedMovie) {
      setIsShortSavedMovie(true);
      localStorage.setItem("is-short-saved-movie", "true");
      if (!keyWordForSavedMovies) {
        const filterShortMovies = SearchShortFilter(
          allSavedMovies,
          isShortSavedMovie
        );
        showSearchResults(filterShortMovies, setIsFindSavedMovies, setSavedMovies);
      } else {
        const filterResults = SearchFilter(
          filteredSavedMovies,
          keyWordForSavedMovies
        );
        const filterShortMovies = SearchShortFilter(
          filterResults,
          isShortSavedMovie
        );
        showSearchResults(filterShortMovies, setIsFindSavedMovies, setSavedMovies);
      }
    } else {
      if (!keyWordForSavedMovies) {
        showSearchResults(allSavedMovies, setIsFindSavedMovies, setSavedMovies);
      } else {
        const filterResults = SearchFilter(allSavedMovies, keyWordForSavedMovies);
        setIsShortSavedMovie(false);
        showSearchResults(filterResults, setIsFindSavedMovies, setSavedMovies);
      }
    }
    setSearchedSavedMovie(keyWordForSavedMovies);
  }, [isShortSavedMovie]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccessAction={isSuccessAction}
          isRegistration={isRegistration}
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
                  isLoadingData={isLoading}
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
                  isSaved={isSaved}
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
                  isSaved={isSaved}
                  onMoviesSearch={handleSavedMoviesSearch}
                  searchedSavedMovie={searchedSavedMovie}
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
