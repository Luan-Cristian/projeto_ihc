import { useState } from "react";
import { Link } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

function Reader() {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfName, setPdfName] = useState("");
  const [pdfText, setPdfText] = useState("");

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

    let extractedText = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);

      const textContent = await page.getTextContent();

      const pageText = textContent.items
        .map(item => item.str)
        .join(" ");

      extractedText += pageText + "\n\n";
    }

    setPdfText(extractedText);
  }

  function saveToLibrary() {
    if (!pdfText) return;

    const books =
      JSON.parse(localStorage.getItem("library")) || [];

    books.push({
      id: Date.now(),
      name: pdfName,
      pdfUrl: pdfText,
    });

    localStorage.setItem(
      "library",
      JSON.stringify(books)
    );

    alert("PDF salvo!");
  }

  return (
    <main className={highContrast ? "page reader-page high-contrast" : "page reader-page"}>
      <section className="reader-container">
        <div className="reader-header">
          <div>
            <p className="tag">Modo leitura</p>
            <h1>Leitor Acessível</h1>
            <p className="subtitle">
              Ajuste a visualização do conteúdo conforme sua necessidade.
            </p>
          </div>

          <Link to="/" className="secondary-button">
            Voltar
          </Link>
        </div>

        <section className="accessibility-panel" aria-label="Controles de acessibilidade">
          <button onClick={() => setHighContrast(!highContrast)}>
            {highContrast ? "Desativar alto contraste" : "Ativar alto contraste"}
          </button>

          <button onClick={decreaseFont}>A-</button>
          <button onClick={increaseFont}>A+</button>
          <button onClick={resetFont}>Fonte padrão</button>
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
          style={{ fontSize: `${fontSize}px` }}
        >

          {pdfText ? (
            <>
              <h2>{pdfName}</h2>

              <div
                style={{
                  whiteSpace: "pre-wrap",
                  lineHeight: "1.8"
                }}
              >
                {pdfText}
              </div>
            </>
          ) : (
            <>
              <h2>Nenhum PDF carregado</h2>
              <p>
                Faça upload de um arquivo PDF para iniciar a leitura.
              </p>
            </>
          )}

        </article>
      </section>
    </main>
  );
}

export default Reader;