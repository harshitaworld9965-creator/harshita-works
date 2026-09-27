import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./Footer.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EMAIL = "harshitaworld9965@gmail.com";

const LINKS = [
  { label: "GitHub", href: "https://github.com/harshitaworld9965-creator" },
  { label: "LinkedIn", href: "https://linkedin.com/in/harshita-deswal-292b44198" },
];

export default function Footer() {
  const footerRef = useRef(null);
  const year = new Date().getFullYear();

  useGSAP(
    () => {
      gsap.from(".footer-reveal", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: footerRef }
  );

  return (
    <footer className="footer" id="contact" ref={footerRef}>
      <p className="footer-label footer-reveal">Contact</p>

      <a href={`mailto:${EMAIL}`} className="footer-cta footer-reveal">
        Let's <span className="footer-bold">build</span>{" "}
        <span className="footer-serif">something</span>
        <span className="footer-arrow" aria-hidden="true">↗</span>
      </a>

      <div className="footer-row footer-reveal">
        <a href={`mailto:${EMAIL}`} className="footer-email">
          {EMAIL}
        </a>

        <ul className="footer-links">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="footer-meta">© {year} Harshita. Built with React & GSAP.</p>
      </div>
    </footer>
  );
}