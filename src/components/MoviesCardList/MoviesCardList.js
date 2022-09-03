import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import ShowMoreButton from "../ShowMoreButton/ShowMoreButton";

function MoviesCardList(props) {
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const [cardsNumber, setCardsNumber] = React.useState(showedCardsNumber);
  const movies = props.movies.slice(0, cardsNumber);

  function showedCardsNumber() {
    if (screenWidth >= 991) {
      return 12;
    } else if (screenWidth <= 637) {
      return 5;
    } else {
      return 8;
    }
  }

  function addCardsNumber() {
    if (screenWidth >= 991) {
      return 3;
    } else {
      return 2;
    }
  }

  function showMoreCards() {
    setCardsNumber(cardsNumber + addCardsNumber());
  }

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      setTimeout(() => {
        setScreenWidth(window.innerWidth);
      }, 1000);
    });
  }, []);

  React.useEffect(() => {
    setCardsNumber(showedCardsNumber);
  }, [screenWidth]);

  return (
    <>
      {props.isLoading ? (
        <Preloader />
      ) : (
        <>
          {props.isFindMovies ? (
            <section className="movies-card-list">
              {movies.map((movie) => (
                <MoviesCard
                  key={movie.id}
                  name={movie.nameRU}
                  trailer={movie.trailerLink}
                  image={movie.image}
                  duration={movie.duration}
                  isSaved={props.isSaved}
                  isSavedMoviesPage={props.isSavedMoviesPage}
                  isOnSavedMovies={false}
                  onMovieSave={props.onMovieSave}
                  card={movie}

                />
              ))}
            </section>
          ) : (
            <>
              {props.isServerError ? (
                <p className="not-found-movies">
                  Во время запроса произошла ошибка. Возможно, проблема с
                  соединением или сервер недоступен. Подождите немного и
                  попробуйте ещё раз.
                </p>
              ) : (
                <p className="not-found-movies">Ничего не найдено</p>
              )}
            </>
          )}

          {props.movies.length === movies.length ? undefined : (
            <ShowMoreButton onClick={showMoreCards} />
          )}
        </>
      )}
    </>
  );
}

export default MoviesCardList;
