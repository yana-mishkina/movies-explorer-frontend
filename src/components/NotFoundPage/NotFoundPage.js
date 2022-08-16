import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="not-found">
      <h2 className="not-found__header">404</h2>
      <p className="not-found__text">Станица не найдена</p>
      <Link className="button not-found__button" to="/">Назад</Link>
    </section>
  );
}

export default NotFoundPage;
