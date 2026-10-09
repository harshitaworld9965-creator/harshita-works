import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CyclingWord from "./CyclingWord";
import "./Headline.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function scramble(text, revealed) {
  return text
    .split("")
    .map((char, i) =>
      i < revealed ? char : CHARS[Math.floor(Math.random() * CHARS.length)]
    )
    .join("");
}

function Mask({ children }) {
  return (
    <span className="word-mask">
      <span className="word">{children}</span>
    </span>
  );
}

function ScrambleName({ text, delay = 0.45, duration = 0.9 }) {
  const [display, setDisplay] = useState(() =>
    prefersReducedMotion() ? text : scramble(text, 0)
  );

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const state = { progress: 0 };

    gsap.to(state, {
      progress: 1,
      duration,
      delay,
      ease: "none",
      onUpdate: () => {
        const revealed = Math.floor(state.progress * text.length);
        setDisplay(scramble(text, revealed));
      },
      onComplete: () => setDisplay(text),
    });
  });

  return (
    <span className="scramble">
      <span className="sr-only">{text}</span>
      <span className="scramble-ghost" aria-hidden="true">{text}</span>
      <span className="scramble-live" aria-hidden="true">{display}</span>
    </span>
  );
}

export default function Headline() {
  const headlineRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        okMotion: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { reduceMotion } = context.conditions;
        const headline = headlineRef.current;

        if (!reduceMotion) {
          gsap.from(headline.querySelectorAll(".word"), {
            yPercent: 110,
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.035,
            delay: 0.1,
          });
        }

        gsap.to(headline, {
          opacity: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: headline,
            start: "top top",
            end: "+=60%",
            scrub: true,
            pin: true,
            pinSpacing: false,
          },
        });
      }
    );

    return () => mm.revert();
  });

  return (
    <h1 className="headline" ref={headlineRef}>
      <Mask>Hi,</Mask> <Mask>I'm</Mask>{" "}
      <Mask>
        <span className="headline-bold">
          <ScrambleName text="Harshita" />
        </span>
        ,
      </Mask>{" "}
      <Mask>a</Mask> <Mask>frontend</Mask> <Mask>developer</Mask>{" "}
      <Mask>turning</Mask> <Mask>designs</Mask> <Mask>into</Mask>{" "}
      <Mask>
        <span className="headline-bracket">⟨</span>
        <CyclingWord />
        <span className="headline-bracket">⟩</span>
      </Mask>{" "}
      <Mask>with</Mask> <Mask>motion</Mask> <Mask>and</Mask>{" "}
      <Mask>
        <span className="headline-serif">care.</span>
      </Mask>
    </h1>
  );
}