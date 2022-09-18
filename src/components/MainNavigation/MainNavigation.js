import { Link } from "react-router-dom";

function MainNavigation() {
  return (
    <nav className="navigation">
      <ul className="navigation__main-links">
        <Link
          to="/signup"
          className="button navigation__button navigation__button_font_medium"
        >
          Регистрация
        </Link>

        <Link
          to="/signin"
          className="button navigation__button navigation__button_font_regular"
        >
          <button className="button navigation__button-sign-in" type="button">Войти</button>
        </Link>
      </ul>
    </nav>
  );
}

export default MainNavigation;
