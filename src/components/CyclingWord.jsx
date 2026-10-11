import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./CyclingWord.css";

const WORDS = ["interfaces", "interactions", "experiments", "experiences"];
const START_DELAY = 2500;
const INTERVAL = 2500;

export default function CyclingWord() {
  const [index, setIndex] = useState(0);
  const wordRef = useRef(null);
  const hasCycled = useRef(false);

  useGSAP(
    () => {
      if (!hasCycled.current) return;

      gsap.from(".cycle-letter", {
        yPercent: 100,
        stagger: 0.03,
        duration: 0.5,
        ease: "power3.out",
      });
    },
    { scope: wordRef, dependencies: [index] }
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer;

    const cycle = () => {
      gsap.to(wordRef.current.querySelectorAll(".cycle-letter"), {
        yPercent: -100,
        stagger: 0.02,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          hasCycled.current = true;
          setIndex((i) => (i + 1) % WORDS.length);
        },
      });
    };

    const startTimer = setTimeout(() => {
      cycle();
      timer = setInterval(cycle, INTERVAL);
    }, START_DELAY);

    return () => {
      clearTimeout(startTimer);
      clearInterval(timer);
    };
  }, []);

  return (
    <span className="cycle-word" ref={wordRef}>
      <span className="sr-only">{WORDS[index]}</span>
      <span aria-hidden="true">
        {WORDS[index].split("").map((char, i) => (
          <span className="cycle-letter" key={`${index}-${i}`}>
            {char}
          </span>
        ))}
      </span>
    </span>
  );
}