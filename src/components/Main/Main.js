import React from "react";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import NavigationPopup from "../NavigationPopup/NavigationPopup";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";

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

      <Movies />

      <Footer />
    </>
  );
}

export default Main;
