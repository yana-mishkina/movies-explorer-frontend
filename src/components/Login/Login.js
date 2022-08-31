import React from "react";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function Login(props) {

  const { values, isValid, handleChange, errors } = useFormWithValidation({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      props.onSubmit({
        email: values.email,
        password: values.password,
      });
    }
  };

  return (
    <div className="auth">
      <Link className="button auth__button" to="/">
        <img className="auth__logo" alt="Логотип проекта" src={logo} />
      </Link>
      <h2 className="auth__header">Рады видеть!</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
      <h3 className="auth-form__input-name">E-mail</h3>
      <input
        className="auth-form__input"
        required
        type="email"
        name="email"
        pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
        email={values.email || ''}
        onChange={handleChange}
      />
      <span id="auth-form__input-error" className="auth-form__input-error">{errors.email}</span>
      <h3 className="auth-form__input-name">Пароль</h3>
      <input
        className="auth-form__input"
        required
        type="password"
        name="password"
        minLength="2"
        maxLength="40"
        value={values.password || ''}
        onChange={handleChange}
      />
      <span id="auth-form__input-error" className="auth-form__input-error">{errors.password}</span>
      <button type="submit" className={`button auth-form__button ${!isValid && 'auth-form__button_disabled'}`} disabled={!isValid}>
        {props.isLoadingData ? "Вход..." : "Войти"}
      </button>
    </form>
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
