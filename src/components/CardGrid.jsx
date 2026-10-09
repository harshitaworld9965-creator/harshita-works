import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "../data/projects";
import Card from "./Card";
import "./CardGrid.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const COLUMN_COUNT = 3;

const COLUMN_SPEEDS = [120, 320, 200];

export default function CardGrid() {
  const gridRef = useRef(null);

  const columns = Array.from({ length: COLUMN_COUNT }, (_, col) =>
    projects.filter((_, i) => i % COLUMN_COUNT === col)
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 701px)",
          isMobile: "(max-width: 700px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions;
          const grid = gridRef.current;

          if (reduceMotion) return;

          // 1. Parallax drift (desktop only)
          if (isDesktop) {
            const columnEls = grid.querySelectorAll(".card-column");

            columnEls.forEach((column, i) => {
              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: grid,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              });

              tl.to(column, {
                y: -COLUMN_SPEEDS[i],
                ease: "none",
                duration: 3,
              }).to(column, { y: 0, ease: "power2.inOut", duration: 1 });
            });
          }

          // 2. Intro: the cards visible on load rise into place
          const cardEls = grid.querySelectorAll(".card");
          const visibleCards = Array.from(cardEls).filter(
            (card) => card.getBoundingClientRect().top < window.innerHeight
          );

          gsap.from(visibleCards, {
            yPercent: 40,
            opacity: 0,
            duration: 1,
            delay: 0.5,
            ease: "power3.out",
            stagger: 0.08,
            onComplete: () => ScrollTrigger.refresh(),
          });
        }
      );

      return () => mm.revert();
    },
    { scope: gridRef }
  );

  return (
    <section className="card-grid" id="work" ref={gridRef}>
      {columns.map((column, colIndex) => (
        <div className="card-column" key={colIndex}>
          {column.map((project) => (
            <Card project={project} key={project.id} />
          ))}
        </div>
      ))}
    </section>
  );
}