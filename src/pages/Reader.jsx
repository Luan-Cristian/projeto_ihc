import { useState } from "react";
import { Link } from "react-router-dom";

function Reader() {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(18);

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

        <article className="reading-box" style={{ fontSize: `${fontSize}px` }}>
          <h2>Exemplo de conteúdo do PDF</h2>

          <p>
            Este espaço representa a área de leitura do documento. A proposta do
            BookAccess é tornar a leitura de arquivos PDF mais acessível para
            diferentes perfis de usuários.
          </p>

          <p>
            Com os recursos de alto contraste e alteração do tamanho da fonte, o
            usuário pode adaptar a interface de acordo com sua necessidade visual,
            melhorando a legibilidade e a experiência de uso.
          </p>

          <p>
            Essa funcionalidade contribui diretamente para os princípios de IHC,
            pois considera acessibilidade, usabilidade, conforto visual e controle
            do usuário sobre a interface.
          </p>
        </article>
      </section>
    </main>
  );
}

export default Reader;