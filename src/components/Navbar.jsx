import { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import gsap from "gsap";

function Navbar() {
  const navbarRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      navbarRef.current,
      {
        opacity: 0,
        y: -25,
        scale: 0.96,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.75,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      linksRef.current,
      {
        opacity: 0,
        y: -10,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.08,
        delay: 0.2,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <header className="navbar glass-navbar" ref={navbarRef}>
      <Link to="/" className="navbar-logo">
        <span className="logo-icon">B</span>
        <span>BookAccess</span>
      </Link>

      <nav className="navbar-links">
        {[
          { to: "/", label: "Início" },
          { to: "/reader", label: "Leitor" },
          { to: "/library", label: "Biblioteca" },
        ].map((item, index) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            ref={(el) => (linksRef.current[index] = el)}
            className={({ isActive }) =>
              isActive ? "nav-pill active" : "nav-pill"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;