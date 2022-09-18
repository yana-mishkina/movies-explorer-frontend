import React from "react";

function DeleteMovieButton(props) {
  return( 
      <button className="button delete-movie-button" type="reset" onClick={props.onClick}></button>
  );
}

export default DeleteMovieButton;