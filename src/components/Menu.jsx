import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./Menu.css";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Menu({ isOpen, onNavigate, onClose }) {
  const menuRef = useRef(null);
  const tlRef = useRef(null);

  useGSAP(
    () => {
      tlRef.current = gsap
        .timeline({ paused: true })
        .to(menuRef.current, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.7,
          ease: "power4.inOut",
        })
        .from(
          ".menu-link-text",
          { yPercent: 110, duration: 0.6, stagger: 0.07, ease: "power3.out" },
          "-=0.25"
        );
    },
    { scope: menuRef }
  );

  useGSAP(
    () => {
      if (isOpen) tlRef.current.play();
      else tlRef.current.reverse();
    },
    { dependencies: [isOpen] }
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <div className="menu" id="site-menu" ref={menuRef} inert={!isOpen}>
      <nav aria-label="Main">
        <ul className="menu-links">
          {LINKS.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="menu-link"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(link.href);
                }}
              >
                <span className="menu-link-text">
                  <span className="menu-index">0{i + 1}</span>
                  <span className="menu-label">{link.label}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}