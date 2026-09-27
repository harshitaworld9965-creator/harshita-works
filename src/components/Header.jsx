import "./Header.css";

export default function Header({ menuOpen, onMenuToggle }) {
  return (
    <>
      <a href="/" className="logo">Harshita.</a>

      <nav className="nav">
        <button
          className={`nav-menu ${menuOpen ? "is-open" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={onMenuToggle}
        >
          <span></span>
          <span></span>
        </button>
        <a href="#about" className="nav-pill">About</a>
      </nav>
    </>
  );
}