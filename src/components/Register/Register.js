import React from "react";
import AuthForm from "../AuthForm/AuthForm";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit({
      name: name,
      email: email,
      password: password,
    });
  }

  return (
    <div className="auth">
      <Link className="button auth__button" to="/">
        <img className="auth__logo" alt="Логотип проекта" src={logo} />
      </Link>
      <h2 className="auth__header">Добро пожаловать!</h2>
      <AuthForm
        textButton="Зарегистрироваться"
        textLoading="Регистрация..."
        onSubmit={handleSubmit}
        email={email}
        password={password}
        onChangeEmail={handleEmailChange}
        onChangePassword={handlePasswordChange}
        isLoadingData={props.isLoadingData}
      >
        <h3 className="auth-form__input-name">Имя</h3>
        <input
          className="auth-form__input"
          required
          type="text"
          value={name}
          onChange={handleNameChange}
        />
      </AuthForm>
      <Link to="/signin" className="button auth__button-back">
        <p className="auth__link auth__link_color_grey">
          Уже зарегистрированы?
        </p>
        <p className="auth__link auth__link_color_black"> Войти</p>
      </Link>
    </div>
  );
}

export default Register;
