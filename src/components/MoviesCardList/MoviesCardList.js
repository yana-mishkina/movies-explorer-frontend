import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  return (
    <section className="movies-card-list">
      <MoviesCard>{props.children}</MoviesCard>
      <MoviesCard>{props.children}</MoviesCard>
      <MoviesCard>{props.children}</MoviesCard>
      <MoviesCard>{props.children}</MoviesCard>
    </section>
  );
}

export default MoviesCardList;
