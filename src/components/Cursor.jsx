import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./Cursor.css";

export default function Cursor() {
  const cursorRef = useRef(null);

  useGSAP(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const cursor = cursorRef.current;
    gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3.out" });

    let isVisible = false;

    const handleMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);

      const overCard = Boolean(e.target.closest(".card"));
      if (overCard !== isVisible) {
        isVisible = overCard;
        gsap.to(cursor, {
          scale: overCard ? 1 : 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  });

  return (
    <div className="cursor" ref={cursorRef} aria-hidden="true">
      View ↗
    </div>
  );
}