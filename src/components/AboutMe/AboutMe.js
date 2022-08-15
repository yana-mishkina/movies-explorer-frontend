import React from "react";
import photo from "../../images/копия.jpg"

function AboutMe() {
  return(
    <section className="about-me" id="student">
      <h2 className="section-header">Студент</h2>
      <div className="about-me__container">
        <article className="about-me__info">
          <p className="about-me__text about-me__text_font_large">Яна</p>
          <p className="about-me__text about-me__text_font_big">Фронтенд-разработчица, 28 лет</p>
          <p className="about-me__text about-me__text_font_small">Я живу в Москве, закончила факультет права НИУ ВШЭ. Работаю три года юристом в IT и закончила курс по фронтенд разработке.</p>
          <a className="about-me__link" href="https://github.com/yana-mishkina">Github</a>
        </article>
        <img className="about-me__photo" alt="Фото студента" src={photo} />
      </div>
    </section>
  );
};

export default AboutMe;