import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import Navbar from "../components/Navbar";

function Home() {
  const heroRef = useRef(null);
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline();

    timeline.fromTo(
      heroRef.current,
      {
        opacity: 0,
        y: 40,
        scale: 0.96,
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
      tagRef.current,
      {
        opacity: 0,
        y: -15,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.4"
    );

    timeline.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: -25,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      },
      "-=0.25"
    );

    timeline.fromTo(
      subtitleRef.current,
      {
        opacity: 0,
        y: 15,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.25"
    );

    timeline.fromTo(
      buttonsRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      },
      "-=0.2"
    );
  }, []);

  return (
    <main className="page home-page">
      <Navbar />

      <section className="hero-card animated-card" ref={heroRef}>
        <p className="tag" ref={tagRef}>
          Acessibilidade em leitura digital
        </p>

        <h1 ref={titleRef}>BookAccess</h1>

        <p className="subtitle" ref={subtitleRef}>
          Leitura acessível de documentos PDF com suporte a VLibras,
          alto contraste e personalização da experiência de leitura.
        </p>

        <div className="home-buttons" ref={buttonsRef}>
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