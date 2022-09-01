import React from "react";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import NavigationPopup from "../NavigationPopup/NavigationPopup";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isInputsChange, setIsInputChange] = React.useState(false);

  const name = React.useRef("");
  const email = React.useRef("");
  const { values, isValid, handleChange, errors } = useFormWithValidation({
    user: name.current.value,
    email: email.current.value,
  });

  React.useEffect(() => {
    name.current.value === currentUser.name &&
    email.current.value === currentUser.email
      ? setIsInputChange(false)
      : setIsInputChange(true);
  }, [values.name, values.email, currentUser.email, currentUser.name]);

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      props.onSubmit({
        name: name.current.value,
        email: email.current.value,
      });
    }
  };

  return (
    <>
      <NavigationPopup
        isBurgerOpen={props.isBurgerOpen}
        onBurgerClose={props.onBurgerClose}
      />

      <Header>
        <Navigation onBurgerOpen={props.onBurgerOpen} />
      </Header>
      <form className="profile" onSubmit={handleSubmit}>
        <h2 className="profile__header">Привет, {currentUser.name}!</h2>
        <div className="profile__line">
          <p className="profile__text profile__text_wight_medium">Имя</p>
          <input
            onChange={handleChange}
            type="text"
            className="profile__text profile__text_wight_regular"
            name="name"
            required
            defaultValue={currentUser.name}
            ref={name}
          />
        </div>
        <p className="profile__input-error">{errors.name}</p>
        <div className="profile__line">
          <p className="profile__text profile__text_wight_medium">Почта</p>
          <input
            className="profile__text profile__text_wight_regular"
            type="email"
            name="email"
            required
            defaultValue={currentUser.email}
            onChange={handleChange}
            ref={email}
          />
        </div>
        <p className="profile__input-error">{errors.name}</p>
        <button
          className="button profile__button profile__button_color_black"
          type="submit"
          disabled={!isValid || !isInputsChange}
        >
          {props.isLoadingData ? props.textLoading : props.textButton}
        </button>
        <button
          className="button profile__button profile__button_color_red"
          type="reset"
          onClick={props.onSignOut}
        >
          Выйти из аккаунта
        </button>
      </form>
    </>
  );
}

export default Profile;
