import React from "react";
import AuthForm from "../AuthForm/AuthForm";
import logo from "../../images/logo.svg";
import { Link } from 'react-router-dom';

function Register() {
  const [name, setName] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  return (
    <div className="auth">
      <img className="auth__logo" alt="Логотип проекта" src={logo} />
      <h2 className="auth__header">Добро пожаловать!</h2>
      <AuthForm textButton="Зарегистрироваться">
        <h3 className="auth-form__input-name">Имя</h3>
        <input
          className="auth-form__input"
          required
          type="text"
          value={name}
          onChange={handleNameChange}
        />
      </AuthForm>
      <Link to='/signin' className="auth__link-container">
        <p className="auth__link auth__link_color_grey">
          Уже зарегистрированы? 
        </p>
        <p className="auth__link auth__link_color_black"> Войти</p>
      </Link>
    </div>
  );
}

export default Register;
