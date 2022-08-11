import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckBox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies(props) {
  return (
    <>

      <SearchForm />

      <FilterCheckBox />

      <MoviesCardList />

    </>
  );
}

export default Movies;