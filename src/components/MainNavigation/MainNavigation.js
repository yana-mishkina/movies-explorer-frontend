import { Link } from "react-router-dom";

function MainNavigation() {
  return (
    <nav className="navigation">
      <ul className="navigation__main-links">
        <Link
          to="/signup"
          className="navigation__link navigation__link_font_medium"
        >
          Регистрация
        </Link>

        <Link
          to="/signin"
          className="navigation__link navigation__link_font_regular"
        >
          <button className="button navigation__button" type="button">Войти</button>
        </Link>
      </ul>
    </nav>
  );
}

export default MainNavigation;
