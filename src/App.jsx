import { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import gsap from "gsap";

import Home from "./pages/Home";
import Reader from "./pages/Reader";
import Library from "./pages/Library";

function AnimatedRoutes() {
  const location = useLocation();
  const pageRef = useRef(null);

  useEffect(() => {
    if (!pageRef.current) return;

    gsap.fromTo(
      pageRef.current,
      {
        opacity: 0,
        y: 28,
        filter: "blur(6px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power2.out",
      }
    );
  }, [location.pathname]);

  return (
    <div className="page-transition" ref={pageRef}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/reader" element={<Reader />} />
        <Route path="/library" element={<Library />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;