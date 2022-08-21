import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import ShowMoreButton from "../ShowMoreButton/ShowMoreButton";
import NotFoundMovies from "../NotFoundMovies/NotFoundMovies";

function MoviesCardList(props) {

  return (
    <>
      {props.isLoading ? (
        <Preloader />
      ) : (
        <>
          <section className="movies-card-list">
            {props.movies ? 
              props.movies.map((movie) => (
              <MoviesCard key={movie.id} name={movie.nameRU} trailer={movie.trailerLink} image={movie.image} duration={movie.duration} />
            )) : <NotFoundMovies />
          }
              
          </section>

          <ShowMoreButton />
        </>
      )}
    </>
  );
}

export default MoviesCardList;
