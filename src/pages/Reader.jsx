import { useState, useEffect } from "react";
import {
  Link,
  useParams,
  useNavigate
} from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

function Reader() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(18);

  const [pdfName, setPdfName] = useState("");
  const [pdfPages, setPdfPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {

    if (!id) return;

    const books =
      JSON.parse(
        localStorage.getItem("library")
      ) || [];

    const book =
      books.find(
        (b) => b.id === Number(id)
      );

    if (!book) return;

    setPdfName(book.name);

    setPdfPages(book.pages);

    setCurrentPage(
      book.currentPage || 0
    );

  }, [id]);

  useEffect(() => {

  if (!id) return;

  const books =
    JSON.parse(
      localStorage.getItem("library")
    ) || [];

  const updatedBooks =
    books.map((book) => {

      if (book.id === Number(id)) {

        return {
          ...book,
          currentPage,
          lastRead:
            new Date()
              .toLocaleDateString("pt-BR")
        };
      }

      return book;
    });

  localStorage.setItem(
    "library",
    JSON.stringify(updatedBooks)
  );

}, [currentPage, id]);

  function increaseFont() {
    if (fontSize < 28) {
      setFontSize(fontSize + 2);
    }
  }

  function decreaseFont() {
    if (fontSize > 14) {
      setFontSize(fontSize - 2);
    }
  }

  function resetFont() {
    setFontSize(18);
  }

  async function handlePdfUpload(event) {
    const file = event.target.files[0];

    if (!file) return;

    setPdfName(file.name);

    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
      data: arrayBuffer,
    }).promise;

    const pages = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);

      const textContent = await page.getTextContent();

      const pageText = textContent.items
        .map((item) => item.str)
        .join(" ");

      pages.push(pageText);
    }

    setPdfPages(pages);
    setCurrentPage(0);
  }

  function saveToLibrary() {
    if (pdfPages.length === 0) return;

    const bookName = prompt("Digite o nome do livro:");

    if (!bookName) return;

    const books =
      JSON.parse(localStorage.getItem("library")) || [];

    books.push({
      id: Date.now(),
      name: bookName,
      pages: pdfPages,
      currentPage,
      totalPages: pdfPages.length,
      lastRead: new Date().toLocaleDateString("pt-BR"),
      favorite: false,
    });

    localStorage.setItem(
      "library",
      JSON.stringify(books)
    );

    alert("Livro salvo com sucesso!");
  }

  function stopReading() {

    if (!id) {
      navigate("/library");
      return;
    }

    const books =
      JSON.parse(
        localStorage.getItem("library")
      ) || [];

    const updatedBooks =
      books.map((book) => {

        if (
          book.id === Number(id)
        ) {

          return {
            ...book,

            currentPage,

            lastRead:
              new Date()
                .toLocaleDateString(
                  "pt-BR"
                )
          };
        }

        return book;
      });

    localStorage.setItem(
      "library",
      JSON.stringify(updatedBooks)
    );

    navigate("/library");
  }

  return (
    <main
      className={
        highContrast
          ? "page reader-page high-contrast"
          : "page reader-page"
      }
    >
      <section className="reader-container">
        <div className="reader-header">
          <div>
            <p className="tag">Modo leitura</p>

            <h1>Leitor Acessível</h1>

            <p className="subtitle">
              Ajuste a visualização do conteúdo conforme sua necessidade.
            </p>
          </div>

          <Link
            to="/"
            className="secondary-button"
          >
            Voltar
          </Link>
        </div>

        <section
          className="accessibility-panel"
          aria-label="Controles de acessibilidade"
        >
          <button
            onClick={() =>
              setHighContrast(!highContrast)
            }
          >
            {highContrast
              ? "Desativar alto contraste"
              : "Ativar alto contraste"}
          </button>

          <button onClick={decreaseFont}>
            A-
          </button>

          <button onClick={increaseFont}>
            A+
          </button>

          <button onClick={resetFont}>
            Fonte padrão
          </button>
        </section>

        <section className="upload-section">
          <input
            type="file"
            accept=".pdf"
            onChange={handlePdfUpload}
          />

          <button onClick={saveToLibrary}>
            Salvar na Biblioteca
          </button>

          <Link to="/library">
            Biblioteca
          </Link>
        </section>

        <article
          className="reading-box"
          style={{
            fontSize: `${fontSize}px`,
          }}
        >
          {pdfPages.length > 0 ? (
            <>
              <h2>{pdfName}</h2>

              <p>
                Página {currentPage + 1} de{" "}
                {pdfPages.length}
              </p>

              <div
                style={{
                  whiteSpace: "pre-wrap",
                  lineHeight: "1.8",
                }}
              >
                {pdfPages[currentPage]}
              </div>

              <div
                className="book-navigation"
                style={{
                  marginTop: "20px",
                  display: "flex",
                  gap: "10px",
                }}
              >
                <button
                  disabled={currentPage === 0}
                  onClick={() =>
                    setCurrentPage(
                      currentPage - 1
                    )
                  }
                >
                  Página Anterior
                </button>

                <button
                  disabled={
                    currentPage ===
                    pdfPages.length - 1
                  }
                  onClick={() =>
                    setCurrentPage(
                      currentPage + 1
                    )
                  }
                >
                  Próxima Página
                </button>

                {id && (
                  <button
                    onClick={stopReading}
                    style={{
                      marginTop: "15px"
                    }}
                  >
                    Parar Leitura
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <h2>Nenhum PDF carregado</h2>

              <p>
                Faça upload de um arquivo PDF
                para iniciar a leitura.
              </p>
            </>
          )}
        </article>
      </section>
    </main>
  );
}

export default Reader;