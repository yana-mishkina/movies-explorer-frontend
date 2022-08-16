import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import ShowMoreButton from "../ShowMoreButton/ShowMoreButton";

function MoviesCardList(props) {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <section className="movies-card-list">
            <MoviesCard isSaved={props.isSaved} />
            <MoviesCard isSaved={props.isSaved} />
            <MoviesCard isSaved={props.isSaved} />
            <MoviesCard isSaved={props.isSaved} />
          </section>
          
          <ShowMoreButton />
        </>
      )}
    </>
  );
}

export default MoviesCardList;
