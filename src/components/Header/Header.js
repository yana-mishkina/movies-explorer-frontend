import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <Link className="header__link" to="/path">
        <img className="header__logo" alt="Логотип проекта" src={logo} />
      </Link>
      {props.children}
    </header>
  );
}

export default Header;
