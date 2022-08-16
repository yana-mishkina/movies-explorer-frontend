import React from "react";
import searchIcon from "../../images/icon__search.svg";

function SearchForm() {
  return(
    <form className="search-form">
      <input className="search-form__input" placeholder="Фильм" required
        type="text"></input>
      <button className="button search-form__button" type="submit">
        <img className="search-form__icon" alt="Иконка поиска" src={searchIcon} />
      </button>
    </form>
  );
};

export default SearchForm;

