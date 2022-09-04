import React from "react";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import NavigationPopup from "../NavigationPopup/NavigationPopup";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckBox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies(props) {

  return (
    <>
      <NavigationPopup
        isBurgerOpen={props.isBurgerOpen}
        onBurgerClose={props.onBurgerClose}
      />

      <Header>
        <Navigation onBurgerOpen={props.onBurgerOpen} />
      </Header>

      <SearchForm 
        onMoviesSearch={props.onMoviesSearch}
        searchedMovie={props.searchedMovie}
        />

      <FilterCheckBox checked={props.isShortMovie} onFilter={props.onFilter} />

      <MoviesCardList
        isSavedMoviesPage={false}
        movies={props.movies}
        isLoading={props.isLoading}
        onMovieSave={props.onMovieSave}
        onMovieUnsave={props.onMovieUnsave}
        isFindMovies={props.isFindMovies}
        isServerError={props.isServerError}
        isSaved={props.isSaved}
      />

      <Footer />
    </>
  );
}

export default Movies;
