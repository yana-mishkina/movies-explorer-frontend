import React from "react";

function AuthForm(props) {
  return (
    <form className="auth-form" onSubmit={props.onSubmit}>
      {props.children}
      <h3 className="auth-form__input-name">E-mail</h3>
      <input
        className="auth-form__input"
        required
        type="email"
        value={props.email}
        onChange={props.onChangeEmail}
      />
      <h3 className="auth-form__input-name">Пароль</h3>
      <input
        className="auth-form__input"
        required
        type="password"
        value={props.password}
        onChange={props.onChangePassword}
      />
      <button className="button auth-form__button" type="submit">
        {props.isLoadingData ? props.textLoading : props.textButton}
      </button>
    </form>
  );
}

export default AuthForm;
