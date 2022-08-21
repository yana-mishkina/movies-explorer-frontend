import React from "react";
import { useLocation } from "react-router-dom";
import SaveMovieButton from "../SaveMovieButton/SaveMovieButton";
import DeleteMovieButton from "../DeleteMovieButton/DeleteMovieButton";

function MoviesCard(props) {

  const location = useLocation();

  function tansformDuration(min) {
    const hours = Math.trunc(min / 60);
        const minutes = min % 60;
        if (hours === 0) {
            return `${minutes}м`;
        } else {
            return `${hours}ч ${minutes}м`;
        }
  }

  function handleSaveClick() {
    props.onMovieSave(props.card);
  }

  return (
    <div className="movies-card">
      <a
        className="button movies-card__button"
        href={props.trailer}
        target="_blank"
      >
        <img
          className="movies-card__photo"
          alt={props.name}
          src={location.pathname === "/movies" ? `https://api.nomoreparties.co${props.image.url}` : props.image}
        />
      </a>
      <h2 className="movies-card__name">{props.name}</h2>
      <p className="movies-card__length">{tansformDuration(props.duration)}</p>
      {props.isOnSavedMovies ? (
        <DeleteMovieButton />
      ) : (
        <SaveMovieButton isSaved={props.isSaved} onClick={handleSaveClick} />
      )}
    </div>
  );
}

export default MoviesCard;
