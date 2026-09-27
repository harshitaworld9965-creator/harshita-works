import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";
import Cursor from "./components/Cursor";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Headline from "./components/Headline";
import CardGrid from "./components/CardGrid";
import About from "./components/About";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const update = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (!lenisRef.current) return;
    if (menuOpen) lenisRef.current.stop();
    else lenisRef.current.start();
  }, [menuOpen]);

  const handleNavigate = (href) => {
    setMenuOpen(false);
    lenisRef.current.start();
    lenisRef.current.scrollTo(href, { duration: 1.4 });
  };

  return (
    <main>
      <Cursor />
      <Header
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((open) => !open)}
      />
      <Menu
        isOpen={menuOpen}
        onNavigate={handleNavigate}
        onClose={() => setMenuOpen(false)}
      />
      <Headline />
      <CardGrid />
      <About />
      <Footer />
    </main>
  );
}