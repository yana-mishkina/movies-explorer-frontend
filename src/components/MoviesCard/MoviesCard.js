import React from "react";

function MoviesCard(props) {
  return (
    <div className="movies-card">
      <a
        className="movies-card__link"
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
      {props.children}
    </div>
  );
}

export default MoviesCard;
