import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="page home-page">
      <section className="hero-card">
        <p className="tag">Acessibilidade em leitura digital</p>

        <h1>BookAccess</h1>

        <p className="subtitle">
          Leitura acessível de documentos PDF com suporte a VLibras,
          alto contraste e personalização da experiência de leitura.
        </p>

        <div className="home-buttons">
          <Link to="/reader" className="primary-button">
            Abrir PDF
          </Link>

          <Link to="/library" className="secondary-button">
            Minha Biblioteca
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;