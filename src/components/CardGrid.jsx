import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "../data/projects";
import Card from "./Card";
import "./CardGrid.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const COLUMN_COUNT = 5;

const COLUMN_MOTION = [
  { x: 320, y: 80, speed: 100 },
  { x: 160, y: 0, speed: 300 },
  { x: 0, y: 140, speed: 50 },
  { x: -160, y: 60, speed: 200 },
  { x: -320, y: 0, speed: 350 },
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
        )
          .to(column, { y: -speed, ease: "none", duration: 3 })
          .to(column, { y: 0, ease: "power2.inOut", duration: 1 });
      });

      const cardEls = gsap.utils.toArray(".card");

      cardEls.forEach((card) => {
        gsap.from(card, {
          rotation: gsap.utils.random(-14, 14),
          x: gsap.utils.random(-40, 40),
          y: gsap.utils.random(-30, 30),
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "top 55%",
            scrub: true,
          },
        });
      });
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