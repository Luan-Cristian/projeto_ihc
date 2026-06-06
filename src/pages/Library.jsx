import { useState } from "react";
import { Link } from "react-router-dom";

function Library() {
    const [search, setSearch] =
        useState("");

    const [books, setBooks] = useState(
        JSON.parse(localStorage.getItem("library")) || []
    );

    function toggleFavorite(id) {

        const updatedBooks =
            books.map(book => {

                if (book.id === id) {
                    return {
                        ...book,
                        favorite: !book.favorite
                    };
                }

                return book;
            });

        localStorage.setItem(
            "library",
            JSON.stringify(updatedBooks)
        );

        setBooks(updatedBooks);
    }

    function deleteBook(id) {
        const confirmDelete = confirm(
            "Deseja realmente excluir este livro?"
        );

        if (!confirmDelete) return;

        const updatedBooks = books.filter(
            (book) => book.id !== id
        );

        localStorage.setItem(
            "library",
            JSON.stringify(updatedBooks)
        );

        setBooks(updatedBooks);
    }

    return (
        <main className="page library-page">
            <section className="library-container">

                <h1>Minha Biblioteca</h1>

                <Link
                    to="/reader"
                    className="secondary-button"
                >
                    Voltar ao Leitor
                </Link>

                <input
                    type="text"
                    placeholder="Pesquisar livro..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <div className="library-grid">

                    {books.length === 0 ? (
                        <p>Nenhum livro salvo.</p>
                    ) : (
                        [...books]
                            .sort(
                                (a, b) =>
                                    Number(b.favorite) -
                                    Number(a.favorite)
                            )
                            .filter((book) =>
                                book.name
                                    .toLowerCase()
                                    .includes(
                                        search.toLowerCase()
                                    )
                            )
                            .map((book) => {

                                const progress =
                                    Math.round(
                                        ((book.currentPage + 1)
                                            / book.totalPages) * 100
                                    );

                                return (
                                    <div
                                        className="book-card"
                                        key={book.id}
                                    >
                                        <div className="book-cover">
                                            📘
                                        </div>

                                        <h3>{book.name}</h3>

                                        <p>
                                            Página atual:
                                            {book.currentPage + 1}
                                            /
                                            {book.totalPages}
                                        </p>

                                        <p>
                                            Última leitura:
                                            {book.lastRead}
                                        </p>

                                        <p>
                                            Progresso: {progress}%
                                        </p>

                                        <div className="progress-bar">
                                            <div
                                                className="progress-fill"
                                                style={{
                                                    width: `${progress}%`
                                                }}
                                            />
                                        </div>

                                        <div className="book-card-actions">

                                            <Link
                                                to={`/reader/${book.id}`}
                                                className="primary-button"
                                            >
                                                Ler
                                            </Link>

                                            <button
                                                onClick={() =>
                                                    deleteBook(book.id)
                                                }
                                            >
                                                Excluir
                                            </button>

                                            <button
                                                onClick={() =>
                                                    toggleFavorite(book.id)
                                                }
                                            >
                                                {book.favorite === true ? "⭐" : "☆"}
                                            </button>

                                        </div>

                                    </div>
                                );
                            })
                    )}

                </div>

            </section>
        </main>
    );
}

export default Library;