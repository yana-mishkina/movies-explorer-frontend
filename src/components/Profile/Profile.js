import React from "react";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import NavigationPopup from "../NavigationPopup/NavigationPopup";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(null);
  // const [email, setEmail] = React.useState(`${currentUser.email}`);

  // function handleEmailChange(e) {
  //   setEmail(e.target.value);
  // }

  // function handleNameChange(e) {
  //   setName(e.target.value);
  // }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit();
  }

  // React.useEffect(() => {
  //   setName(currentUser.name);
  //   setEmail(currentUser.email);
  // }, [currentUser]);

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
            className="profile__text profile__text_wight_regular"
            type="text"
            value={name}
            // onChange={handleNameChange}
          />
        </div>
        <div className="profile__line">
          <p className="profile__text profile__text_wight_medium">Почта</p>
          <input
            className="profile__text profile__text_wight_regular"
            type="email"
            // value={email}
            // onChange={handleEmailChange}
          />
        </div>
        <button
          className="button profile__button profile__button_color_black"
          type="submit"
        >
          Редактировать
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
