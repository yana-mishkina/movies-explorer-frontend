import React from "react";

function AboutProject() {
  return(
    <section className="about-project" id="project">
      <h2 className="section-header">О проекте</h2>
      <article className="about-project__article">
        <p className="about-project__text about-project__text_font_big">Дипломный проект включал 5 этапов</p>
        <p className="about-project__text about-project__text_font_big">На выполнение диплома ушло 5 недель</p>
        <p className="about-project__text about-project__text_font_small">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        <p className="about-project__text about-project__text_font_small">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </article>
      <div className="about-project__timeline">
        <p className="about-project__period about-project__period_font_white">1 неделя</p>
        <p className="about-project__period about-project__period_font_black">4 недели</p>
        <p className="about-project__period about-project__period_font_grey">Back-end</p>
        <p className="about-project__period about-project__period_font_grey">Front-end</p>
      </div>
    </section>
  );
};

export default AboutProject;