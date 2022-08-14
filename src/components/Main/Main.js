import Header from "../Header/Header";
import MainNavigation from "../MainNavigation/MainNavigation";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";

function Main() {
  return (
    <>
      <Header>
        <MainNavigation />
      </Header>
      <Promo />
      <AboutProject />
      <Techs />
    </>
  );
}

export default Main;
