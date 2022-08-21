import IconLink from "../../images/icon__link.svg"

function Portfolio() {
  return(
    <section className="portfolio">
      <h2 className="portfolio__header">Портфолио</h2>
      <a className="button portfolio__button" href="https://github.com/yana-mishkina/how-to-learn" target="_blank">
        <p className="portfolio__text">Статичный сайт</p>
        <img className="portfolio__link-icon" alt="Икнока ссылки" src={IconLink} />
      </a>
      <a className="button portfolio__button" href="https://github.com/yana-mishkina/russian-travel" target="_blank">
        <p className="portfolio__text">Адаптивный сайт</p>
        <img className="portfolio__link-icon" alt="Икнока ссылки" src={IconLink} />
      </a>
      <a className="button portfolio__button" href="https://github.com/yana-mishkina/react-mesto-api-full" target="_blank">
        <p className="portfolio__text">Одностраничное приложение</p>
        <img className="portfolio__link-icon" alt="Икнока ссылки" src={IconLink}/>
      </a>
    </section>
  );
};

export default Portfolio;