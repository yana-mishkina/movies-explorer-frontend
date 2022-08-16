import React from "react";

function AuthForm(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <form className="auth-form">
      {props.children}
      <h3 className="auth-form__input-name">E-mail</h3>
      <input
        className="auth-form__input"
        required
        type="email"
        value={email}
        onChange={handleEmailChange}
      />
      <h3 className="auth-form__input-name">Пароль</h3>
      <input
        className="auth-form__input"
        required
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button className="button auth-form__button" type="submit">
        {props.textButton}
      </button>
    </form>
  );
}

export default AuthForm;
