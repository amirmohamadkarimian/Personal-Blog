import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticles } from "../data/articleStore";

type NavLinkItem = { label: string; path: string };
type NavScrollItem = { label: string; scrollTo: string };
type NavItem = NavLinkItem | NavScrollItem;

const navItems: NavItem[] = [
  { label: "خانه", path: "/" },
  { label: "دسته‌بندی‌ها", scrollTo: "categories" },
  { label: "درباره من", path: "/about" },
];

type HeaderProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

function Header({ search, onSearchChange }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const storedTheme = window.localStorage.getItem("codeNama-theme");
    return storedTheme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("codeNama-theme", theme);
  }, [theme]);

  // Keep articles in sync (needed if other parts of header ever read it)
  const [, setArticles] = useState(() => getArticles());

  useEffect(() => {
    const handleArticleUpdate = (e?: Event) => {
      if (e instanceof StorageEvent && e.key && e.key !== "codenama-articles") return;
      setArticles(getArticles());
    };
    window.addEventListener("codenama-articles-updated", handleArticleUpdate);
    window.addEventListener("storage", handleArticleUpdate);
    return () => {
      window.removeEventListener("codenama-articles-updated", handleArticleUpdate);
      window.removeEventListener("storage", handleArticleUpdate);
    };
  }, []);

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
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2.5 px-5 py-2.5 md:flex-row md:items-center md:justify-between md:gap-4 md:py-3.5">
        {/* Brand Row (Logo + Mobile Controls) */}
        <div className="flex items-center justify-between md:shrink-0">
          <Link
            to="/"
            className="group flex items-center gap-2.5 no-underline"
            onClick={(e) => {
              if (location.pathname === "/") {
                e.preventDefault();
                navigate("/", { replace: true });
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            {/* Logo mark */}
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 font-bold text-white shadow-lg shadow-blue-500/30 transition-transform duration-200 group-hover:scale-105 text-sm md:h-10 md:w-10 md:text-base">
              CN
            </span>
            <span className="bg-gradient-to-l from-blue-600 to-blue-800 bg-clip-text text-lg font-extrabold text-transparent dark:from-blue-300 dark:to-blue-500 md:text-xl">
              CodeNama
            </span>
          </Link>

          {/* Mobile Right Controls: Theme toggle & Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-700"
              aria-label={theme === "dark" ? "حالت روشن" : "حالت تاریک"}
              onClick={() => setTheme((c) => (c === "dark" ? "light" : "dark"))}
            >
              {theme === "dark" ? (
                <svg className="h-4.5 w-4.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-4.5 w-4.5 text-slate-700 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button
              type="button"
              id="nav-toggle"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-600 transition-colors duration-200 hover:bg-blue-100 dark:border-blue-800/50 dark:bg-blue-950/40 dark:text-blue-400 dark:hover:bg-blue-900/40"
              aria-controls="site-navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="sr-only">
                {menuOpen ? "بستن منو" : "باز کردن منو"}
              </span>
              <span aria-hidden="true" className="text-lg leading-none">
                {menuOpen ? "×" : "☰"}
              </span>
            </button>
          </div>
        </div>

        {/* Collapsible Mobile Dropdown & Desktop Layout */}
        <div
          id="site-navigation"
          className={`${menuOpen ? "flex" : "hidden"} flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-3 dark:border-white/10 dark:bg-slate-900 md:flex md:flex-1 md:flex-row md:items-center md:justify-between md:gap-4 md:rounded-none md:border-0 md:bg-transparent md:p-0 dark:md:bg-transparent`}
        >
          {/* Centered Navigation links */}
          <nav
            aria-label="ناوبری اصلی"
            className="flex flex-col gap-1 md:flex-1 md:flex-row md:items-center md:justify-center md:gap-1.5"
          >
            {navItems.map((item) => {
              const baseNavClass =
                "inline-flex h-9 md:h-10 items-center justify-center rounded-xl px-3.5 md:px-4 text-sm font-bold transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-950/40";

              if ("scrollTo" in item) {
                const isActive =
                  location.pathname === "/" &&
                  location.hash === `#${item.scrollTo}`;
                return (
                  <button
                    type="button"
                    key={`${item.label}-${item.scrollTo}`}
                    id={`nav-${item.scrollTo}`}
                    className={`${baseNavClass} ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                    }`}
                    onClick={() => {
                      handleScrollTo(item.scrollTo);
                      setMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </button>
                );
              }

              const path = item.path;
              const [itemPath, itemHash] = path.split("#");
              const isHomeLink = path === "/";
              const isActive = isHomeLink
                ? location.pathname === "/" &&
                  (!location.hash || location.hash === "#")
                : itemHash
                  ? location.pathname === itemPath &&
                    location.hash === `#${itemHash}`
                  : location.pathname === path;

              return (
                <Link
                  key={`${item.label}-${path}`}
                  to={path}
                  id={`nav-${path.replace("/", "home")}`}
                  onClick={(event) => {
                    if (isHomeLink && location.pathname === "/") {
                      event.preventDefault();
                      navigate("/", { replace: true });
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                    setMenuOpen(false);
                  }}
                  className={`${baseNavClass} no-underline ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions (Desktop theme toggle + Search) */}
          <div className="flex flex-col gap-2 border-t border-slate-100 pt-3 dark:border-white/10 md:flex-row md:items-center md:gap-3 md:border-0 md:pt-0 md:shrink-0 md:justify-end">
            {/* Desktop Theme Toggle */}
            <button
              type="button"
              id="theme-toggle-desktop"
              className="hidden md:inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-700 dark:hover:bg-slate-700"
              aria-label={theme === "dark" ? "حالت روشن" : "حالت تاریک"}
              onClick={() => setTheme((c) => (c === "dark" ? "light" : "dark"))}
            >
              {theme === "dark" ? (
                <svg className="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-slate-700 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Search */}
            <form
              role="search"
              className="relative w-full md:w-auto"
              onSubmit={(e) => {
                e.preventDefault();
                // Navigate to home and scroll to blog section
                if (location.pathname !== "/") {
                  navigate("/#blog-section");
                } else {
                  const blogSec = document.getElementById("blog-section");
                  if (blogSec) blogSec.scrollIntoView({ behavior: "smooth", block: "start" });
                }
                setMenuOpen(false);
              }}
            >
              <label htmlFor="site-search" className="sr-only">
                جستجو در CodeNama
              </label>
              <div className="flex items-center gap-2 w-full">
                <input
                  id="site-search"
                  type="search"
                  value={search}
                  onChange={(e) => {
                    onSearchChange(e.target.value);
                    // Auto-navigate to home when user starts typing from another page
                    if (e.target.value && location.pathname !== "/") {
                      navigate("/");
                    }
                  }}
                  placeholder="جستجو در مقالات..."
                  className="h-9 md:h-10 w-full rounded-full border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-slate-50 focus:border-slate-200 active:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200 dark:placeholder-slate-500 dark:focus:bg-slate-800/60 dark:focus:border-slate-700 dark:active:bg-slate-800/60 md:w-56"
                />
                <button
                  type="submit"
                  id="search-submit"
                  className="inline-flex h-9 md:h-10 items-center justify-center shrink-0 rounded-full bg-blue-600 px-4 md:px-5 text-sm font-bold text-white shadow-sm shadow-blue-500/30 transition-all duration-200 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-500/40 active:scale-95"
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
