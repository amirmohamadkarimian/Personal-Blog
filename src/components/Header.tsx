import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type NavLinkItem = { label: string; path: string; action?: true };
type NavScrollItem = { label: string; scrollTo: string };
type NavItem = NavLinkItem | NavScrollItem;

const navItems: NavItem[] = [
  { label: "خانه", path: "/" },
  { label: "دسته‌بندی‌ها", scrollTo: "categories" },
  { label: "درباره من", path: "/about" },
  { label: "ذخیره شده ها", path: "bookmark", action: true },
];

type HeaderProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

function Header({ search, onSearchChange }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookmarkOpen, setBookmarkOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const storedTheme = window.localStorage.getItem("codeNama-theme");
    return storedTheme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    setMenuOpen(false);
    setBookmarkOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("codeNama-theme", theme);
  }, [theme]);

  const handleScrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if (location.pathname !== "/") {
      navigate({ pathname: "/", hash: `#${id}` });
      return;
    }

    if (location.hash !== `#${id}`) {
      navigate({ hash: `#${id}` }, { replace: true });
    }
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand-row">
          <Link to="/" className="brand-logo">
            <span className="brand-mark">CN</span>
            <span className="brand-text">CodeNama</span>
          </Link>

          <button
            type="button"
            className="nav-toggle"
            aria-controls="site-navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="visually-hidden">
              {menuOpen ? "بستن منو" : "باز کردن منو"}
            </span>
            <span aria-hidden="true" className="nav-toggle-icon">
              {menuOpen ? "×" : "☰"}
            </span>
          </button>

          <nav
            id="site-navigation"
            className={`main-nav ${menuOpen ? "open" : ""}`}
            aria-label="ناوبری اصلی"
          >
            {navItems.map((item) => {
              if ("action" in item && item.action) {
                return (
                  <button
                    type="button"
                    key={`${item.label}-${item.path}`}
                    className="nav-link nav-action"
                    onClick={() => setBookmarkOpen((open) => !open)}
                  >
                    {item.label}
                  </button>
                );
              }

              if ("scrollTo" in item) {
                const isActive = location.hash === `#${item.scrollTo}`;
                return (
                  <button
                    type="button"
                    key={`${item.label}-${item.scrollTo}`}
                    className={isActive ? "nav-link active" : "nav-link"}
                    onClick={() => handleScrollTo(item.scrollTo)}
                  >
                    {item.label}
                  </button>
                );
              }

              const path = item.path;
              const [itemPath, itemHash] = path.split("#");
              const isHomeLink = path === "/";
              const isActive = isHomeLink
                ? location.pathname === "/"
                : itemHash
                  ? location.pathname === itemPath &&
                    location.hash === `#${itemHash}`
                  : location.pathname === path && location.hash === "";

              return (
                <Link
                  key={`${item.label}-${path}`}
                  to={path}
                  onClick={(event) => {
                    if (isHomeLink && location.pathname === "/") {
                      event.preventDefault();
                      navigate("/", { replace: true });
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className={isActive ? "nav-link active" : "nav-link"}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div
            className={`bookmark-panel ${bookmarkOpen ? "open" : ""}`}
            role="dialog"
            aria-label="بوکمارک‌ها"
          >
            <div className="bookmark-panel-header">
              <span>ذخیره شده ها</span>
              <button
                type="button"
                className="bookmark-close"
                aria-label="بستن بوکمارک‌ها"
                onClick={() => setBookmarkOpen(false)}
              >
                ×
              </button>
            </div>
            <p className="bookmark-panel-body">هیچ بوکمارکی ذخیره نشده است.</p>
          </div>
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="theme-toggle"
            aria-label={theme === "dark" ? "حالت روشن" : "حالت تاریک"}
            onClick={() =>
              setTheme((current) => (current === "dark" ? "light" : "dark"))
            }
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <div className="search-row">
            <form
              className="search-form"
              role="search"
              onSubmit={(event) => event.preventDefault()}
            >
              <label htmlFor="site-search" className="visually-hidden">
                جستجو در CodeNama
              </label>
              <div className="search-input-group">
                <input
                  id="site-search"
                  type="search"
                  value={search}
                  onChange={(event) => onSearchChange(event.target.value)}
                  placeholder="جستجو در مقالات"
                  className="search-input"
                />
                <button
                  type="submit"
                  className="search-button"
                  aria-label="اجرای جستجو"
                >
                  جستجو
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
