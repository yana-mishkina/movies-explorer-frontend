import React from "react";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function Register(props) {
  const { values, isValid, handleChange, errors } = useFormWithValidation({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      props.onSubmit({
        name: values.name,
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
      <h2 className="auth__header">Добро пожаловать!</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
      <h3 className="auth-form__input-name">Имя</h3>
        <input
          className="auth-form__input"
          required
          type="text"
          name="name"
          minLength="2"
          maxLength="40"
          onChange={handleChange}
          value={values.name || ""}
        />
        <span id="auth-form__input-error" className="auth-form__input-error">
          {errors.name}
        </span>
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
        {props.isLoadingData ? "Регистрация..." : "Зарегистрироваться"}
      </button>
    </form>
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
