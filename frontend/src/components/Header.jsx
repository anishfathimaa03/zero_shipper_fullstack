export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="logo" href="#top">
          0 <span className="logo-arrow">→</span> Shipped
        </a>
        <nav className="nav">
          <a href="#how">How it works</a>
          <a href="#skills">Skills tracked</a>
        </nav>
      </div>
    </header>
  );
}
