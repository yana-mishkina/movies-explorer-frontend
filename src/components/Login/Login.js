import React from "react";
import AuthForm from "../AuthForm/AuthForm";
import logo from "../../images/logo.svg";
import { Link } from 'react-router-dom';

function Login() {

  return (
    <div className="auth">
      <img className="auth__logo" alt="Логотип проекта" src={logo} />
      <h2 className="auth__header">Рады видеть!</h2>
      <AuthForm textButton="Войти" />
      <Link to='/signup' className="auth__link-container">
        <p className="auth__link auth__link_color_grey">
          Еще не зарегистрированы? 
        </p>
        <p className="auth__link auth__link_color_black"> Регистрация</p>
      </Link>
    </div>
  );
}

export default Login;
