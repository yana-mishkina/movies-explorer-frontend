import IconCloseBurger from "../../images/icon__close_burger.svg";

function NavigationPopup(props) {
  return (
    <div className={`burger ${props.isBurgerOpen ? 'burger_closed' : ''}`}>
      <button className="button burger__button" onClick={props.onBurgerClose}>
        <img
          className="burger__button-icon"
          src={IconCloseBurger}
          alt="Иконка закрытия"
        />
      </button>
      <nav className="navigation-popup">
        <ul className="navigation-popup__links">
          <li className="navigation-popup__link">
            <button className="button navigation-popup__button">Главная</button>
          </li>
          <li className="navigation-popup__link">
            <button className="button navigation-popup__button">Фильмы</button>
          </li>
          <li className="navigation-popup__link">
            <button className="button navigation-popup__button">
              Сохраненные фильмы
            </button>
          </li>
          <li className="navigation-popup__link">
            <button className="button navigation-popup__button">
              <p className="button__text navigation-popup__button-text">
                Аккаунт
              </p>
              <div className="button__icon navigation-popup__button-icon"></div>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavigationPopup;
