import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import NavigationPopup from "../NavigationPopup/NavigationPopup";

function Main(props) {
  return (
    <>
      <NavigationPopup 
      isBurgerOpen={props.isBurgerOpen} 
      onBurgerClose={props.onBurgerClose} />

      <Header>
        <Navigation 
        onBurgerOpen={props.onBurgerOpen} />
      </Header>
    </>
  );
}

export default Main;
