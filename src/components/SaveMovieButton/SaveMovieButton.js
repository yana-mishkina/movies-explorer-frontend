import React from "react";
import savedMovieIcon from "../../images/saved_movie_icon.svg";

function SaveMovieButton(props) {
  return (
    <>
      {props.isLiked ? (
        <button className="button saved-movie-button" type="button">
          <img className="saved-movie-icon" src={savedMovieIcon} alt="Иконка сохранения фильма"/>
        </button>
      ) : (
        <button className="button save-movie-button" type="button">
          Сохранить
        </button>
      )}
    </>
  );
}

export default SaveMovieButton;
