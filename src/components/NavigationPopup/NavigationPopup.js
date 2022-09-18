import IconCloseBurger from "../../images/icon__close_burger.svg";
import { Link } from "react-router-dom";

function NavigationPopup(props) {
  return (
    <div className={`burger ${props.isBurgerOpen ? "burger_closed" : ""}`}>
      <div className="burger__background"></div>
      <div className="burger__popup">
        <button className="button burger__button" onClick={props.onBurgerClose}>
          <img
            className="burger__button-icon"
            src={IconCloseBurger}
            alt="Иконка закрытия"
          />
        </button>
        <nav className="navigation-popup">
          <ul className="navigation-popup__links">
            <Link className="button navigation-popup__button" to="/" onClick={props.onBurgerClose}>
                Главная
            </Link>
            <Link className="button navigation-popup__button" to="/movies" onClick={props.onBurgerClose}>
                Фильмы
            </Link>
            <Link className="button navigation-popup__button" to="/saved-movies" onClick={props.onBurgerClose}>
                Сохраненные фильмы
            </Link>
            <Link className="button navigation-popup__button" to="/profile" onClick={props.onBurgerClose}>
                <p className="navigation-popup__text">
                  Аккаунт
                </p>
                <div className="navigation-popup__icon"></div>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default NavigationPopup;
