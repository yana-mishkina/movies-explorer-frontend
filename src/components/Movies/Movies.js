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

      <SearchForm onSubmit={props.onSubmit} />

      <FilterCheckBox />

      <MoviesCardList isSaved={false} movies={props.movies} isLoadingData={props.isLoading} />

      <Footer />
    </>
  );
}

export default Movies;
