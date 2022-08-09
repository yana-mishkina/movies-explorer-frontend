import IconBurger from "../../images/icon__burger.svg";

function Navigation(props) {
  return (
    <nav className="navigation">
      <ul className="navigation__links">
        <li className="navigation__link navigation__link_font_medium">
          <button className="button navigation__button">Фильмы</button>
        </li>
        <li className="navigation__link navigation__link_font_regular">
          <button className="button navigation__button">
            Сохраненные фильмы
          </button>
        </li>
        <li className="navigation__link navigation__link_font_medium">
          <button className="button navigation__button">
            <p className="button__text navigation__button-text">Аккаунт</p>
            <div className="button__icon navigation__button-icon"></div>
          </button>
        </li>
      </ul>
      <button className="button navigation__button-burger" onClick={props.onBurgerOpen}>
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
