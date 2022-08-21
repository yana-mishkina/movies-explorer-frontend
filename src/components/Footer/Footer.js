function Footer() {
  return(
    <footer className="footer">
      <p className="footer__project-name">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__project-info">
        <p className="footer__copyright">&copy; 2022</p>
        <ul className="footer__links">
          <li className="footer__link-item"><a className="button footer__button" href="https://practicum.yandex.ru/web/" target="_blank">Яндекс.Практикум</a></li>
          <li className="footer__link-item"><a className="button footer__button" href="https://github.com/yana-mishkina" target="_blank">Github</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;