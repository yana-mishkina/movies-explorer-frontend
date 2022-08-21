import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import ShowMoreButton from "../ShowMoreButton/ShowMoreButton";
import NotFoundMovies from "../NotFoundMovies/NotFoundMovies";

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
          <section className="movies-card-list">
            {props.movies ? (
              movies
                .map((movie) => (
                  <MoviesCard
                    key={movie.id}
                    name={movie.nameRU}
                    trailer={movie.trailerLink}
                    image={movie.image}
                    duration={movie.duration}
                    isSaved={props.isSaved}
                    isOnSavedMovies={false}
                    onMovieSave={props.onMovieSave}
                  />
                ))
            ) : (
              <NotFoundMovies />
            )}
          </section>

          {(props.movies.length === movies.length) ? undefined : <ShowMoreButton onClick={showMoreCards} /> }

        </>
      )}
    </>
  );
}

export default MoviesCardList;
