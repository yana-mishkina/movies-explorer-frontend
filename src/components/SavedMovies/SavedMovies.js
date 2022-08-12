import React from "react";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import NavigationPopup from "../NavigationPopup/NavigationPopup";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckBox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import DeleteMovieButton from "../DeleteMovieButton/DeleteMovieButton";

function SavedMovies(props) {
  return (
    <>
    <NavigationPopup
      isBurgerOpen={props.isBurgerOpen}
      onBurgerClose={props.onBurgerClose}
    />

    <Header>
      <Navigation onBurgerOpen={props.onBurgerOpen} />
    </Header>

    <SearchForm />

    <FilterCheckBox />

    <MoviesCardList>
      <DeleteMovieButton />
    </MoviesCardList>

    <div className="saved-movies-space"></div>

    <Footer />
  </>
  );
}

export default SavedMovies;
