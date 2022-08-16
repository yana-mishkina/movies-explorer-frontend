import React from "react";
import SaveMovieButton from "../SaveMovieButton/SaveMovieButton";
import DeleteMovieButton from "../DeleteMovieButton/DeleteMovieButton";

function MoviesCard(props) {
  const [isLiked, setIsLiked] = React.useState(true);

  return (
    <div className="movies-card" isSaved={props.isSaved}>
      <a
        className="button movies-card__button"
        href="https://www.youtube.com/watch?v=dgSyC6me-jQ"
      >
        <img
          className="movies-card__photo"
          alt="movie"
          src=" https://scientificrussia.ru/images/b/teb-full.jpg"
        />
      </a>
      <h2 className="movies-card__name">test name</h2>
      <p className="movies-card__length">1h 17m</p>
      {props.isSaved ? <DeleteMovieButton /> : <SaveMovieButton isLiked={isLiked} /> }
    </div>
  );
}

export default MoviesCard;
