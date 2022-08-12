function NavTab() {
  return (
    <nav className="navigation-tab">
      <ul className="navigation-tab__links">
        <li className="navigation-tab__link-block">
          <a className="navigation-tab__link" href="#project">
            О проекте
          </a>
        </li>
        <li className="navigation-tab__link-block">
          <a className="navigation-tab__link" href="#technologies">
            Технологии
          </a>
        </li>
        <li className="navigation-tab__link-block">
          <a className="navigation-tab__link" href="#student">
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
