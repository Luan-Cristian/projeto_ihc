import { Link } from "react-router-dom";

function Home() {

  const books =
    JSON.parse(localStorage.getItem("library")) || [];

  const favorites =
    books.filter(book => book.favorite);

  const reading =
    books.filter(
      book =>
        book.currentPage + 1 <
        book.totalPages
    );

  const completed =
    books.filter(
      book =>
        book.currentPage + 1 >=
        book.totalPages
    );

  const achievements = [];

  if (books.length >= 1)
    achievements.push(
      "📚 Primeiro Livro"
    );

  if (completed.length >= 5)
    achievements.push(
      "🏆 Leitor Frequente"
    );

  if (completed.length >= 10)
    achievements.push(
      "🥇 Mestre da Leitura"
    );

  const totalPagesRead =
    books.reduce(
      (total, book) =>
        total +
        (book.currentPage + 1),
      0
    );

  if (totalPagesRead >= 100)
    achievements.push(
      "🚀 100 Páginas Lidas"
    );



  const monthlyGoal = 10;

  const goalProgress =
    Math.min(
      100,
      Math.round(
        (completed.length /
          monthlyGoal) *
        100
      )
    );

  const lastBook =
    books.length > 0
      ? [...books].sort((a, b) => {

        const dateA =
          a.lastRead
            ?.split("/")
            .reverse()
            .join("");

        const dateB =
          b.lastRead
            ?.split("/")
            .reverse()
            .join("");

        return dateB - dateA;
      })[0]
      : null;

  return (
    <main className="page home-page">

      <section className="hero-card">

        <p className="tag">
          Acessibilidade em leitura digital
        </p>

        <h1>BookAccess</h1>

        <p className="subtitle">
          Leitura acessível de documentos PDF
          com suporte a VLibras,
          alto contraste e personalização
          da experiência de leitura.
        </p>

        <div className="dashboard-grid">

          <div className="dashboard-card">
            <h3>📚 Livros</h3>
            <span>{books.length}</span>
          </div>

          <div className="dashboard-card">
            <h3>⭐ Favoritos</h3>
            <span>{favorites.length}</span>
          </div>

          <div className="dashboard-card">
            <h3>📖 Em Leitura</h3>
            <span>{reading.length}</span>
          </div>

          <div className="dashboard-card">
            <h3>✅ Concluídos</h3>
            <span>{completed.length}</span>
          </div>

        </div>

        {lastBook && (

          <div className="last-book-card">

            <h3>🔥 Último livro lido</h3>

            <p>
              <strong>
                {lastBook.name}
              </strong>
            </p>

            <p>
              Página atual:
              {" "}
              {lastBook.currentPage + 1}
              /
              {lastBook.totalPages}
            </p>

            <p>
              Última leitura:
              {" "}
              {lastBook.lastRead}
            </p>

          </div>

        )}

        <div className="goal-card">

          <h3>
            🎯 Meta de Leitura
          </h3>

          <p>
            {completed.length}
            /
            {monthlyGoal}
            {" "}
            livros concluídos
          </p>

          <div className="goal-bar">
            <div
              className="goal-fill"
              style={{
                width:
                  `${goalProgress}%`
              }}
            />
          </div>

        </div>

        <div className="achievement-card">

          <h3>
            🏅 Conquistas
          </h3>

          {
            achievements.length === 0
              ? (
                <p>
                  Nenhuma conquista.
                </p>
              )
              : (
                achievements.map(
                  achievement => (
                    <p
                      key={
                        achievement
                      }
                    >
                      {achievement}
                    </p>
                  )
                )
              )
          }

        </div>

        <div className="home-buttons">

          <Link
            to="/reader"
            className="primary-button"
          >
            Abrir PDF
          </Link>

          <Link
            to="/library"
            className="secondary-button"
          >
            Minha Biblioteca
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Home;