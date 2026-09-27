import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./CyclingWord.css";

const WORDS = ["interfaces", "interactions", "experiments", "experiences"];

export default function CyclingWord() {
  const [index, setIndex] = useState(0);
  const wordRef = useRef(null);

  useGSAP(
    () => {
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
    const timer = setInterval(() => {
      gsap.to(wordRef.current.querySelectorAll(".cycle-letter"), {
        yPercent: -100,
        stagger: 0.02,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => setIndex((i) => (i + 1) % WORDS.length),
      });
    }, 2500);

    return () => clearInterval(timer);
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