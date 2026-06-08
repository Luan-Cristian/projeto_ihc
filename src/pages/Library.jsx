import { Link } from "react-router-dom";

function Library() {
  const books =
    JSON.parse(localStorage.getItem("library")) || [];

  return (
    <main className="page library-page">
      <section className="library-container">

        <h1>Minha Biblioteca</h1>

        <Link to="/reader" className="secondary-button">
          Voltar ao Leitor
        </Link>

        <div className="library-grid">

          {books.length === 0 ? (
            <p>Nenhum PDF salvo.</p>
          ) : (
            books.map((book) => (
              <div className="book-card" key={book.id}>

                <h3>{book.name}</h3>

                <div className="book-card-actions">
                  <Link
                    to={`/reader/${book.id}`}
                    className="primary-button"
                  >
                    Ler
                  </Link>
                </div>

              </div>
            ))
          )}

        </div>

      </section>
    </main>
  );
}

export default Library;