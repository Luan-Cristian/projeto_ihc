import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="page home-page">
      <section className="hero-card">
        <p className="tag">Acessibilidade em leitura digital</p>

        <h1>BookAccess</h1>

        <p className="subtitle">
          Leitura acessível de documentos PDF com opções de alto contraste e
          ajuste do tamanho da fonte.
        </p>

        <Link to="/reader" className="primary-button">
          Abrir PDF
        </Link>
      </section>
    </main>
  );
}

export default Home;