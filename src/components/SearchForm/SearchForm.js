import React from "react";
import searchIcon from "../../images/icon__search.svg";

function SearchForm(props) {

  const [searchedMovie, setSearchedMovie] = React.useState('');

  function handleSearchedMovieChange(e) {
    setSearchedMovie(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit();
    setSearchedMovie('');
  }

  return(
    <form className="search-form" onSubmit={handleSubmit}>
      <input className="search-form__input" placeholder="Фильм" required
        type="text" onChange={handleSearchedMovieChange} value={searchedMovie} />
      <button className="button search-form__button" type="submit">
        <img className="search-form__icon" alt="Иконка поиска" src={searchIcon} />
      </button>
    </form>
  );
};

export default SearchForm;

