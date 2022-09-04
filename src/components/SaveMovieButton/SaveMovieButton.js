import React from "react";
import savedMovieIcon from "../../images/saved_movie_icon.svg";

function SaveMovieButton(props) {
  return (
    <>
      {props.isSaved ? (
        <button className="button saved-movie-button" type="reset" onClick={props.onClick}>
          <img className="saved-movie-icon" src={savedMovieIcon} alt="Иконка сохранения фильма"/>
        </button>
      ) : (
        <button className="button save-movie-button" type="button" onClick={props.onClick}>
          Сохранить
        </button>
      )}
    </>
  );
}

export default SaveMovieButton;
