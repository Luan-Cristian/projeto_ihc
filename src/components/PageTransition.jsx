import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

function PageTransition({ children }) {
  const pageRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const element = pageRef.current;

    if (!element) return;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 16,
        filter: "blur(6px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.55,
        ease: "power3.out",
      }
    );
  }, [location.pathname]);

  return (
    <div className="page-transition" ref={pageRef}>
      {children}
    </div>
  );
}

export default PageTransition;