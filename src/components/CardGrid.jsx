import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "../data/projects";
import "./CardGrid.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const COLUMN_COUNT = 5;

const COLUMN_MOTION = [
  { x: -240, y: 80, speed: 100 },
  { x: -120, y: 0, speed: 300 },
  { x: 0, y: 140, speed: 50 },
  { x: 120, y: 60, speed: 200 },
  { x: 240, y: 0, speed: 350 },
];

export default function CardGrid() {
  const gridRef = useRef(null);

  const columns = Array.from({ length: COLUMN_COUNT }, (_, col) =>
    projects.filter((_, i) => i % COLUMN_COUNT === col)
  );

  useGSAP(
    () => {
      const columnEls = gsap.utils.toArray(".card-column");

      columnEls.forEach((column, i) => {
        const { x, y, speed } = COLUMN_MOTION[i];

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });

        tl.fromTo(
          column,
          { x, y },
          { x: 0, y: 0, ease: "power2.out", duration: 1 }
        ).to(column, { y: -speed, ease: "none", duration: 3 })
        .to(column, {y:0, ease:"power2.inOut", duration:1});
      });
    },
    { scope: gridRef }
  );

  return (
    <section className="card-grid" ref={gridRef}>
      {columns.map((column, colIndex) => (
        <div className="card-column" key={colIndex}>
          {column.map((project) => (
            <article className="card" key={project.id}>
              <img src={project.image} alt={project.title} />
              {project.badge && (
                <span className="card-badge">✷ {project.badge}</span>
              )}
            </article>
          ))}
        </div>
      ))}
    </section>
  );
}