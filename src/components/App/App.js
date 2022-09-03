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
import { SearchFilter, SearchShortFilter } from "../../utils/SearchFilter";

function App() {
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
  const [isServerError, setIsServerError] = React.useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user-name"));

  function handeleBurgerOpen() {
    setIsBurgerOpen(false);
  }

  function closeAllPopups() {
    setIsBurgerOpen(true);
    setIsInfoTooltipOpen(false);
  }

  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
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

  function handleUpdateUser(data) {
    setIsLoading(true);
    mainApi
      .editProfile(data)
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
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function showSearchResults(filterResults) {
    if (filterResults.length === 0) {
      setIsFindMovies(false);
    } else {
      setIsFindMovies(true);
      setMovies(filterResults);
    }
  }

  function handleMoviesSearch(searchedMovie) {
    setIsLoading(true);
    localStorage.setItem("searched-movie", JSON.stringify(searchedMovie));

    if (!localStorage.movies) {
      moviesApi
        .getMovies()
        .then((res) => {
          setSearchedMovie(JSON.parse(localStorage.getItem("searched-movie")));
          localStorage.setItem("movies", JSON.stringify(res));
          const filterResults = SearchFilter(res, searchedMovie);
          const filterShortMovies = SearchShortFilter(
            filterResults,
            isShortMovie
          );
          setIsLoading(false);
          showSearchResults(filterShortMovies);
          localStorage.setItem(
            "filtered-movies",
            JSON.stringify(filterResults)
          );
        })
        .catch((err) => {
          console.log(err);
          setIsServerError(true);
        })
        .finally(() => {
          setIsServerError(false);
        });
    } else {
      setSearchedMovie(JSON.parse(localStorage.getItem("searched-movie")));
      const filterResults = SearchFilter(
        JSON.parse(localStorage.getItem("movies")),
        searchedMovie
      );
      const filterShortMovies = SearchShortFilter(filterResults, isShortMovie);
      setIsLoading(false);
      showSearchResults(filterShortMovies);
      localStorage.setItem("filtered-movies", JSON.stringify(filterResults));
    }
  }

  function handleShortFilter() {
    setIsShortMovie(!isShortMovie);
  }

  // React.useEffect(() => {
  //     if (isShortMovie) {
  //       setIsShortMovie(true);
  //       localStorage.setItem("is-short", "true");
  //       const filterResults = SearchFilter(JSON.parse(localStorage.getItem("filtered-movies")), searchedMovie);
  //       const filterShortMovies = SearchShortFilter(filterResults, isShortMovie);
  //       showSearchResults(filterShortMovies);
  //     } else {
  //       const filterResults = JSON.parse(localStorage.getItem("filtered-movies"));
  //       setIsFindMovies(true);
  //       setMovies(filterResults);
  //     }
  // }, [isShortMovie]);

  function handleMovieSave(movie) {
    mainApi
      .saveMovie(movie)
      .then((savedCard) => {
        console.log("сохранено");
      })
      .catch((err) => console.log(err));
  }


  // const [copySavedMoives, setCopySavedMoives] = React.useState([]);
  // const url = "https://api.nomoreparties.co";

  // function handleMovieSave(movie) {
  //   const token = localStorage.getItem("jwt");
  //   mainApi.saveMovie(
  //     movie.country,
  //     movie.director,
  //     movie.duration,
  //     movie.year,
  //     movie.description,
  //     url + movie.image.url,
  //     movie.trailerLink,
  //     movie.nameRU,
  //     movie.nameEN,
  //     url + movie.image.url,
  //     movie.id,
  //     token
  //   )
  //     .then((newMovie) => {
  //       setCopySavedMoives([newMovie, ...copySavedMoives]);
  //     })
  //     .catch((err) => console.log(`Ошибка удаления фильма: ${err}`));
  // }

  function handleSignOut() {
    localStorage.clear();
    setIsLoggedIn(false);
    setCurrentUser({});
    setSearchedMovie([]);
    setIsFindMovies([]);
    setMovies([]);
    navigate("/signin");
  }

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
