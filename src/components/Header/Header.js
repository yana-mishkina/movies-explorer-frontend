import logo from "../../images/logo.svg";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" alt="Логотип проекта" src={logo} />
      {props.children}
    </header>
  );
}

export default Header;
