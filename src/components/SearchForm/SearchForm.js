import React from "react";
import searchIcon from "../../images/icon__search.svg";

function SearchForm(props) {
  const [isError, setIsError] = React.useState(false);
  const [searchedMovie, setSearchedMovie] = React.useState(props.searchedMovie);
  const [keyword, setKeyword] = React.useState();

  function handleSearchedMovieChange(e) {
    setSearchedMovie(e.target.value);
    setIsError(false);
    setKeyword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!keyword) {
      setIsError(true);
    } else {
      props.onMoviesSearch(searchedMovie);
    }
  }

  return (
    <>
      <form className="search-form" onSubmit={handleSubmit} noValidate>
        <input
          className="search-form__input"
          placeholder="Фильм"
          required
          name="search-movie-input"
          type="text"
          onChange={handleSearchedMovieChange}
          value={searchedMovie || ""}
        />
        <button className="button search-form__button" type="submit">
          <img
            className="search-form__icon"
            alt="Иконка поиска"
            src={searchIcon}
          />
        </button>
      </form>
      <p className="search-error">{isError && "Нужно ввести ключевое слово"}</p>
    </>
  );
}

export default SearchForm;
