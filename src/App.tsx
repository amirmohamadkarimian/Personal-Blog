import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Article from "./pages/Article";
import About from "./pages/About";

function App() {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-shell">
      <Header search={search} onSearchChange={setSearch} />
      <main className="page-content" id="main-content">
        <Routes>
          <Route path="/" element={<Home search={search} />} />
          <Route path="/blog/:slug" element={<Article />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
      <button
        type="button"
        className={`scroll-top-button ${showScrollTop ? "visible" : ""}`}
        onClick={scrollToTop}
        aria-label="بازگشت به بالا"
      >
        ↑
      </button>
    </div>
  );
}

export default App;
