import React from "react";
import AuthForm from "../AuthForm/AuthForm";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";


function Login(props) {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit({
      email: email,
      password: password,
    });
  }

  return (
    <div className="auth">
      <Link className="button auth__button" to="/">
        <img className="auth__logo" alt="Логотип проекта" src={logo} />
      </Link>
      <h2 className="auth__header">Рады видеть!</h2>
      <AuthForm
        textButton="Войти"
        textLoading="Вход..."
        onSubmit={handleSubmit}
        email={email}
        password={password}
        onChangeEmail={handleEmailChange}
        onChangePassword={handlePasswordChange}
        isLoadingData={props.isLoadingData}
      />
      <Link to="/signup" className="button auth__button auth__button-back">
        <p className="auth__link auth__link_color_grey">
          Еще не зарегистрированы?
        </p>
        <p className="auth__link auth__link_color_black"> Регистрация</p>
      </Link>
    </div>
  );
}

export default Login;
