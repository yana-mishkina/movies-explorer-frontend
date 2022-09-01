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

  const [isSaved, setIsSaved] = React.useState(false);

  // React.useEffect(() => {
  //   // окрашиваем кнопку лайка, если он фильм нашелся в сохраненных
  //   if (props.savedMovies.some((movie) => movie.movieId === props.id)) {
  //     setIsSaved(true);
  //   }
  // }, [props.savedMovies, props.id]);

  function handleSaveClick(card) {
      // const movieData = {
      //   country: props.country,
      //   director: props.director,
      //   duration: props.duration,
      //   year: props.year,
      //   description: props.description,
      //   image: props.image.url,
      //   trailerLink: props.trailerLink,
      //   nameRU: props.nameRU,
      //   nameEN: props.nameEN,
      //   thumbnail: props.image.formats.thumbnail.url,
      //   movieId: props.id,
      // };
      props.onMovieSave(card, setIsSaved);
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
          src={
            location.pathname === "/movies"
              ? `https://api.nomoreparties.co${props.image.url}`
              : props.image
          }
        />
      </a>
      <h2 className="movies-card__name">{props.name}</h2>
      <p className="movies-card__length">{tansformDuration(props.duration)}</p>
      {props.isOnSavedMovies ? (
        <DeleteMovieButton />
      ) : (
        <SaveMovieButton isSaved={isSaved} onClick={handleSaveClick} />
      )}
    </div>
  );
}

export default MoviesCard;
