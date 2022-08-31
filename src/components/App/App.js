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

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleChangeProfile(name, email) {
    setIsLoading(true);
    const token = localStorage.getItem("jwt");
    mainApi
      .editProfile(name, email, token)
      .then((data) => {
        setIsRegistration(false);
        setIsSuccessAction(true);
        setIsInfoTooltipOpen(true);
        setCurrentUser(data);
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

  function showSearchResults(filterResults) {
    if (filterResults.length === 0) {
      setIsFindMovies(false);
    } else {
      setIsFindMovies(true);
      setMovies(filterResults);
      localStorage.setItem("filtered-movies", JSON.stringify(filterResults));
    }
  }

  let filterResults;
  let filterShortMovies;

  function handleMoviesSearch(searchedMovie) {
    setIsLoading(true);
    localStorage.setItem("searched-movie", JSON.stringify(searchedMovie));

    if (!localStorage.movies) {
      moviesApi
        .getMovies()
        .then((res) => {
          localStorage.setItem("movies", JSON.stringify(res));
          filterResults = SearchFilter(res, searchedMovie);
          filterShortMovies = SearchShortFilter(filterResults, isShortMovie);
          setIsLoading(false);
          showSearchResults(filterShortMovies);
        })
        .catch((err) => {
          console.log(err);
          setIsServerError(true);
        })
        .finally(() => {
          setIsServerError(false);
        });

    } else {
      filterResults = SearchFilter(JSON.parse(localStorage.getItem("movies")), searchedMovie);
      filterShortMovies = SearchShortFilter(filterResults, isShortMovie);
      setIsLoading(false); 
      showSearchResults(filterShortMovies);
      
    }
  }

  function handleShortFilter() {
    setIsShortMovie(!isShortMovie);
  }

  // React.useEffect(() => {
  //     if (isShortMovie) {
  //       setIsShortMovie(true);
  //       localStorage.setItem("is-short", "true");
  //       filterResults = SearchFilter(JSON.parse(localStorage.getItem("movies")), searchedMovie);
  //       filterShortMovies = SearchShortFilter(filterResults, isShortMovie);
  //       showSearchResults(filterShortMovies);
  //     } else {
  //       filterResults = SearchFilter(JSON.parse(localStorage.getItem("movies")), searchedMovie);
  //       filterShortMovies = SearchShortFilter(filterResults, isShortMovie);
  //       showSearchResults(JSON.parse(localStorage.getItem("movies")));
  //     }
  // }, [isShortMovie]);


  // function getMovies() {
  //   const token = localStorage.getItem("jwt");
  //   mainApi
  //     .getMovies(token)
  //     .then((res) => {
  //       console.log(res)
  //       const items = res.map((item) => {
  //         return {
  //             key: item._id,
  //             id: item.movieId,
  //             image: item.image,
  //             nameRU: item.nameRU,
  //             duration: item.duration,
  //             owner: item.owner,
  //             trailer: item.trailer
  //         };
  //     });
  //     setSavedMovies(items);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  function handleMovieSave(movie) {
    const token = localStorage.getItem("jwt");
    const movies = JSON.parse(localStorage.getItem("movies"));
    mainApi
      .saveMovie(movies, token)
      .then((data) => {
        const movies = [...savedMovies, data];
        setSavedMovies((prev) => [...prev, data]);
        // localStorage.setItem('savedMovies', JSON.stringify(movies))
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSignOut() {
    localStorage.clear();
    setIsLoggedIn(false);
    setCurrentUser({});
    setSearchedMovie([]);
    setIsFindMovies([]);
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
                  onSignOut={handleSignOut}
                  onSubmit={handleChangeProfile}
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
                  onSubmit={handleMoviesSearch}
                  isLoading={isLoading}
                  searchedMovie={searchedMovie}
                  isFindMovies={isFindMovies}
                  isServerError={isServerError}
                  isShortMovie={isShortMovie}
                  onFilter={handleShortFilter}
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
