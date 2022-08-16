import IconBurger from "../../images/icon__burger.svg";
import { Link } from "react-router-dom";

function Navigation(props) {
  return (
    <nav className="navigation">
      <ul className="navigation__links">
        <Link
          to="/movies"
          className="button navigation__button navigation__button_font_medium"
        >
          Фильмы
        </Link>

        <Link
          to="/saved-movies"
          className="button navigation__button navigation__button_font_regular"
        >
          Сохраненные фильмы
        </Link>

        <Link
          to="/profile"
          className="navigation__button navigation__button_font_medium"
        >
          <p className="navigation__text">Аккаунт</p>
          <div className="navigation__icon"></div>
        </Link>
      </ul>
      <button
        className="button navigation__button-burger"
        onClick={props.onBurgerOpen}
      >
        <img
          className="navigation__icon-burger"
          src={IconBurger}
          alt="Иконка меню"
        />
      </button>
    </nav>
  );
}

export default Navigation;
