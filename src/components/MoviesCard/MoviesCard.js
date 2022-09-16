import React from "react";
import { useLocation } from "react-router-dom";
import SaveMovieButton from "../SaveMovieButton/SaveMovieButton";
import DeleteMovieButton from "../DeleteMovieButton/DeleteMovieButton";

function MoviesCard(props) {

  const [isSaved, setIsSaved] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    if (!props.isSavedMoviesPage) {
      const savedMovies = JSON.parse(localStorage.getItem("saved-movies"));
      if (savedMovies.some((movie) => movie.nameRU === props.movie.nameRU)) {
        setIsSaved(true);
      }
    }
  }, [props.movie.nameRU]);

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
    if (!isSaved) {
      props.onMovieSave(props.movie);
      setIsSaved(true);
    } else {
      handleDislikeMovie();
    }
  }

  function handleDeleteMovie() {
    setIsSaved(false);
    props.handleDeleteMovie(props.movie._id);
  }

  function handleDislikeMovie() {
    const savedMovies = JSON.parse(localStorage.getItem('saved-movies'));
    const card = savedMovies.find(movie => movie.nameRU === props.movie.nameRU);
    props.handleDeleteMovie(card._id);
    setIsSaved(false);
  }

  return (
    <div className="movies-card">
      <a
        className="button movies-card__button"
        href={props.trailer}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="movies-card__photo"
          alt={props.name}
          src={
            location.pathname === "/movies"
              ? `https://api.nomoreparties.co${props.image.url}`
              : props.image
          }
        />
      </a>
      <h2 className="movies-card__name">{props.name}</h2>
      <p className="movies-card__length">{tansformDuration(props.duration)}</p>
      {props.isSavedMoviesPage ? (
        <DeleteMovieButton  onClick={handleDeleteMovie}/>
      ) : (
        (<SaveMovieButton isSaved={isSaved} onClick={handleSaveClick} />)
      )}
    </div>
  );
}

export default MoviesCard;
