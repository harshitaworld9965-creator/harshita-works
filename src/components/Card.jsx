import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./Card.css";

export default function Card({ project }) {
  const cardRef = useRef(null);
  const { contextSafe } = useGSAP({ scope: cardRef });

  const handleMove = contextSafe((e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(cardRef.current, {
      rotationY: px * 12,
      rotationX: -py * 12,
      scale: 1.03,
      transformPerspective: 800,
      duration: 0.4,
      ease: "power2.out",
    });
  });

  const handleLeave = contextSafe(() => {
    gsap.to(cardRef.current, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });
  });

  return (
    
      href={project.link}
      className="card"
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <img src={project.image} alt={project.title} />

      {project.badge && <span className="card-badge">✷ {project.badge}</span>}

      <div className="card-info">
        <h3 className="card-title">{project.title}</h3>
        <ul className="card-stack">
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
    </a>
  );
}