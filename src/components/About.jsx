import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./About.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PATH = [
  {
    year: "2019",
    title: "B.Tech, Mathematics & Computing",
    place: "Delhi Technological University",
  },
  {
    year: "2025",
    title: "LL.B.",
    place: "Maharshi Dayanand University",
  },
  {
    year: "2026",
    title: "Frontend Developer",
    place: "OpenRipples",
  },
];

const STACK = [
  "React",
  "JavaScript",
  "GSAP",
  "Framer Motion",
  "Tailwind",
  "HTML & CSS",
  "Vite",
  "Node.js",
  "PostgreSQL",
  "Figma",
];

export default function About() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          okMotion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduceMotion } = context.conditions;
          const section = sectionRef.current;
          const steps = section.querySelectorAll(".about-step");
          const fill = section.querySelector(".about-line-fill");

          if (reduceMotion) {
            gsap.set(fill, { scaleY: 1 });
            steps.forEach((step) => step.classList.add("is-active"));
            return;
          }

          gsap.from(section.querySelectorAll(".about-reveal"), {
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
            },
          });

          gsap.to(fill, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section.querySelector(".about-path-wrap"),
              start: "top 60%",
              end: "bottom 60%",
              scrub: true,
            },
          });

          steps.forEach((step) => {
            ScrollTrigger.create({
              trigger: step,
              start: "center 60%",
              onEnter: () => step.classList.add("is-active"),
              onLeaveBack: () => step.classList.remove("is-active"),
            });
          });
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section className="about" id="about" ref={sectionRef}>
      <p className="about-label about-reveal">About</p>

      <h2 className="about-lead about-reveal">
        I started with <span className="about-serif">maths</span>, took a
        detour through <span className="about-serif">law</span>, and found my
        way to the <span className="about-bold">web.</span>
      </h2>

      <div className="about-body">
        <div className="about-text">
          <p className="about-reveal">
            I studied Mathematics and Computing at Delhi Technological
            University, then spent the next few years in a very different
            world, earning a law degree. Law taught me to read closely and
            explain things clearly. The maths never left: it lives in every
            easing curve, grid and scroll timeline I build.
          </p>
          <p className="about-reveal">
            Now I'm a frontend developer at OpenRipples, growing into design
            engineering, the space where frontend code, interaction design and
            motion meet. I like taking art-directed interfaces from an idea to
            production React, and caring about the small details that make
            them feel alive.
          </p>
        </div>

        <div className="about-side">
          <div className="about-path-wrap">
            <span className="about-line" aria-hidden="true">
              <span className="about-line-fill"></span>
            </span>

            <ol className="about-path">
              {PATH.map((step) => (
                <li className="about-step" key={step.year}>
                  <span className="about-dot" aria-hidden="true"></span>
                  <span className="about-year">{step.year}</span>
                  <span>
                    {step.title}
                    <span className="about-place">{step.place}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <ul className="about-stack about-reveal">
            {STACK.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}