import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import NavigationPopup from "../NavigationPopup/NavigationPopup";

function Profile(props){
  return (
    <>
      <NavigationPopup 
      isBurgerOpen={props.isBurgerOpen} 
      onBurgerClose={props.onBurgerClose} />

      <Header>
        <Navigation 
        onBurgerOpen={props.onBurgerOpen} />
      </Header>
      <div className="profile">
      <h2 className="profile__header">Привет, Яна!</h2>
      <div className="profile__line">
        <p className="profile__text profile__text_wight_medium">Имя</p>
        <p className="profile__text profile__text_wight_regular">Яна</p>
      </div>
      <div className="profile__line">
        <p className="profile__text profile__text_wight_medium">Почта</p>
        <p className="profile__text profile__text_wight_regular">123@mail.ru</p>
      </div>
      <button className="button profile__button profile__button_color_black" type="button">Редактировать</button>
      <button className="button profile__button profile__button_color_red" type="button">Выйти из аккаунта</button>
    </div>
    </>
  );
}

export default Profile;