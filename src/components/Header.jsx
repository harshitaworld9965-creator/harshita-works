import "./Header.css";

export default function Header() {
  return (
    <>
      <a href="/" className="logo">Harshita.</a>

      <nav className="nav">
        <button className="nav-menu" aria-label="Open menu">
          <span></span>
          <span></span>
        </button>
        <a href="#about" className="nav-pill">About</a>
      </nav>
    </>
  );
}