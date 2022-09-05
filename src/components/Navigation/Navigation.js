import IconBurger from "../../images/icon__burger.svg";
import { NavLink } from "react-router-dom";

function Navigation(props) {
  return (
    <nav className="navigation">
      <ul className="navigation__links">
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            isActive
              ? "button navigation__button navigation__button_font_medium navigation__button_active"
              : "button navigation__button navigation__button_font_medium"
          }
        >
          Фильмы
        </NavLink>

        <NavLink
          to="/saved-movies"
          className={({ isActive }) =>
            isActive
              ? "button navigation__button navigation__button_font_medium navigation__button_active"
              : "button navigation__button navigation__button_font_medium"
          }
        >
          Сохраненные фильмы
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? "button navigation__button navigation__button_font_medium navigation__button_active"
              : "button navigation__button navigation__button_font_medium"
          }
        >
          <p className="navigation__text">Аккаунт</p>
          <div className="navigation__icon"></div>
        </NavLink>
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
