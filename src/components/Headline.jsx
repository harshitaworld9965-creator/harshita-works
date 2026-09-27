import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./Headline.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Headline() {
    const headlineRef = useRef(null);

    useGSAP(() => {
        gsap.to(headlineRef.current, {
            opacity: 0.05,
            ease: "none",
            scrollTrigger: {
                trigger: headlineRef.current,
                start: "top top",
                end: "+=60%",
                scrub: true,
                pin: true,
                pinSpacing: false,
                
            },
        });
    });

    return (
        <h1 className="headline" ref={headlineRef}>
            Hi, I'm <span className="headline-bold">Harshita</span>, a frontend
            developer turning designs into{" "}
            <span className="headline-bracket">⟨</span>interfaces
            <span className="headline-bracket">⟩</span> with motion and{" "}
            <span className="headline-serif">care.</span>
        </h1>
    );
}