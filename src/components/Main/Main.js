import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import NavigationPopup from "../NavigationPopup/NavigationPopup";
import Footer from "../Footer/Footer";

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

      <Footer />
    </>
  );
}

export default Main;
