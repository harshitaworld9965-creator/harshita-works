import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./Header.css";

gsap.registerPlugin(useGSAP);

export default function Header({ menuOpen, onMenuToggle }) {
  const logoRef = useRef(null);
  const navRef = useRef(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.from([logoRef.current, ...navRef.current.children], {
      y: -20,
      opacity: 0,
      duration: 0.8,
      delay: 1.1,
      ease: "power3.out",
      stagger: 0.08,
    });
  });

  return (
    <>
      <a href="/" className="logo" ref={logoRef}>
        Harshita.
      </a>

      <nav className="nav" ref={navRef}>
        <button
          className={`nav-menu ${menuOpen ? "is-open" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={onMenuToggle}
        >
          <span></span>
          <span></span>
        </button>
        <a href="#about" className="nav-pill">
          About
        </a>
      </nav>
    </>
  );
}