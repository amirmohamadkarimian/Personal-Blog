import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Article from "./pages/Article";
import About from "./pages/About";
import Admin from "./pages/Admin";

function App() {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

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
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <Header search={search} onSearchChange={setSearch} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-5" id="main-content">
        <Routes>
          <Route path="/" element={<Home search={search} />} />
          <Route path="/blog/:slug" element={<Article />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />

      {/* Scroll to top button */}
      <button
        type="button"
        id="scroll-top-btn"
        className={`group fixed bottom-10 right-6 md:right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_0_18px_rgba(37,99,235,0.45)] transition-all duration-300 hover:bg-blue-600 hover:shadow-[0_0_28px_rgba(37,99,235,0.8)] hover:scale-110 active:scale-95 ${
          showScrollTop
            ? "translate-y-0 opacity-100 scale-100"
            : "pointer-events-none translate-y-4 opacity-0 scale-90"
        }`}
        onClick={scrollToTop}
        aria-label="بازگشت به بالا"
      >
        <ArrowUp className="h-5 w-5 stroke-[2.5] transition-transform duration-200 group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
}

export default App;
