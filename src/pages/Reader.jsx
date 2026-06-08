import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";
import gsap from "gsap";
import Navbar from "../components/Navbar";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

function Reader() {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [pdfName, setPdfName] = useState("");
  const [pdfText, setPdfText] = useState("");

  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const panelRef = useRef(null);
  const uploadRef = useRef(null);
  const readingRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline();

    timeline.fromTo(
      containerRef.current,
      {
        opacity: 0,
        y: 35,
        scale: 0.97,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      }
    );

    timeline.fromTo(
      headerRef.current,
      {
        opacity: 0,
        y: -20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.35"
    );

    timeline.fromTo(
      panelRef.current,
      {
        opacity: 0,
        x: -25,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.25"
    );

    timeline.fromTo(
      uploadRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.2"
    );

    timeline.fromTo(
      readingRef.current,
      {
        opacity: 0,
        y: 25,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      },
      "-=0.15"
    );
  }, []);

  useEffect(() => {
    if (readingRef.current) {
      gsap.fromTo(
        readingRef.current,
        {
          opacity: 0.6,
          scale: 0.99,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          ease: "power2.out",
        }
      );
    }
  }, [pdfText, fontSize, highContrast]);

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
  try {
    const file = event.target.files[0];

    if (!file) {
      alert("Nenhum arquivo selecionado.");
      return;
    }

    if (file.type !== "application/pdf") {
      alert("Selecione um arquivo PDF válido.");
      return;
    }

    setPdfName(file.name);
    setPdfText("Carregando PDF...");

    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
      data: arrayBuffer,
    }).promise;

    let extractedText = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();

      const pageText = textContent.items
        .map((item) => item.str)
        .join(" ");

      extractedText += `Página ${pageNum}\n${pageText}\n\n`;
    }

    if (!extractedText.trim()) {
      setPdfText(
        "Não foi possível extrair texto deste PDF. Ele pode ser uma imagem escaneada."
      );
      return;
    }

    setPdfText(extractedText);
  } catch (error) {
    console.error("Erro ao carregar PDF:", error);
    alert("Erro ao carregar o PDF. Veja o console para mais detalhes.");
    setPdfText("");
  }
}

  function saveToLibrary() {
    if (!pdfText) {
      alert("Carregue um PDF antes de salvar.");
      return;
    }

    const books = JSON.parse(localStorage.getItem("library")) || [];

    books.push({
      id: Date.now(),
      name: pdfName,
      pdfUrl: pdfText,
    });

    localStorage.setItem("library", JSON.stringify(books));

    alert("PDF salvo na biblioteca!");
  }

  return (
    <main
      className={
        highContrast ? "page reader-page high-contrast" : "page reader-page"
      }
    >
      <Navbar />

      <section className="reader-container animated-card" ref={containerRef}>
        <div className="reader-header" ref={headerRef}>
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

        <section
          className="accessibility-panel"
          aria-label="Controles de acessibilidade"
          ref={panelRef}
        >
          <button onClick={() => setHighContrast(!highContrast)}>
            {highContrast ? "Desativar alto contraste" : "Ativar alto contraste"}
          </button>

          <button onClick={decreaseFont}>A-</button>
          <button onClick={increaseFont}>A+</button>
          <button onClick={resetFont}>Fonte padrão</button>
        </section>

        <section className="upload-section" ref={uploadRef}>
          <label className="file-label">
            Selecionar PDF
            <input
              type="file"
              accept="application/pdf,.pdf"
              onChange={handlePdfUpload}
            />
          </label>

          <button onClick={saveToLibrary}>Salvar na Biblioteca</button>

          <Link to="/library" className="library-link">
            Biblioteca
          </Link>
        </section>

        <article
          className="reading-box"
          style={{ fontSize: `${fontSize}px` }}
          ref={readingRef}
        >
          {pdfText ? (
            <>
              <h2>{pdfName}</h2>

              <div
                style={{
                  whiteSpace: "pre-wrap",
                  lineHeight: "1.8",
                }}
              >
                {pdfText}
              </div>
            </>
          ) : (
            <>
              <h2>Nenhum PDF carregado</h2>
              <p>Faça upload de um arquivo PDF para iniciar a leitura.</p>
            </>
          )}
        </article>
      </section>
    </main>
  );
}

export default Reader;