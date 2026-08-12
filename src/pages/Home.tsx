import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getArticles } from "../data/articleStore";
import ArticleCard from "../components/ArticleCard";
import FeaturedArticle from "../components/FeaturedArticle";
import { CATEGORIES, getCategoryInfo } from "../data/categories";

type HomeProps = {
  search: string;
};

function Home({ search }: HomeProps) {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("همه");
  const [articles, setArticles] = useState(() => getArticles());
  const query = search.trim().toLowerCase();

  useEffect(() => {
    const handleUpdate = (e?: Event) => {
      if (e instanceof StorageEvent && e.key && e.key !== "codenama-articles") return;
      setArticles(getArticles());
    };
    window.addEventListener("codenama-articles-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("codenama-articles-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const filteredArticles = useMemo(
    () =>
      articles.filter((article) => {
        const matchesCategory =
          activeCategory === "همه" || article.category === activeCategory;
        const matchesSearch =
          !query ||
          [article.title, article.excerpt, article.content, article.category].some(
            (field) => field.toLowerCase().includes(query),
          );
        return matchesCategory && matchesSearch;
      }),
    [activeCategory, query, articles],
  );

  // Article count map per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { همه: articles.length };
    articles.forEach((a) => {
      counts[a.category] = (counts[a.category] || 0) + 1;
    });
    return counts;
  }, [articles]);

  const resultText = search
    ? `${filteredArticles.length} مقاله برای «${search}» یافت شد`
    : activeCategory === "همه"
      ? `${filteredArticles.length} مقاله آماده مطالعه است`
      : `${filteredArticles.length} مقاله در دستهٔ ${activeCategory}`;

  const featuredArticle = useMemo(() => articles[0] ?? articles[0], [articles]);

  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location.hash]);

  return (
    <div className="flex flex-col gap-14 pb-16 pt-8">
      {/* ── Hero ── */}
      <section className="grid gap-8 md:grid-cols-2 md:items-center">
        {/* Left: Text */}
        <div className="flex flex-col gap-5">
          <p className="w-max rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
            وبلاگ شخصی امیرمحمد
          </p>
          <h1 className="text-4xl font-extrabold leading-tight text-slate-800 dark:text-slate-100 md:text-5xl">
            نوشته‌هایی درباره{" "}
            <span className="bg-gradient-to-l from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
              توسعه وب
            </span>{" "}
            و طراحی تجربه
          </h1>
          <p className="max-w-lg text-base leading-relaxed text-slate-500 dark:text-slate-400">
            اینجا نوشته‌هایی می‌خوانید درباره ساخت رابط‌های ساده، عملکرد سریع، هوش مصنوعی
            و تجربه‌ای خوانا برای توسعه‌دهندگان فارسی‌زبان.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to={`/blog/${featuredArticle?.slug || "js-async-event-loop"}`}
              id="hero-cta-primary"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white no-underline shadow-lg shadow-blue-500/30 transition-all duration-200 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95"
            >
              جدیدترین مقاله
              <span aria-hidden="true">←</span>
            </Link>
            <Link
              to="/about"
              id="hero-cta-secondary"
              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 no-underline shadow-sm transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-white/10 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-700/50 dark:hover:bg-slate-700 dark:hover:text-blue-400"
            >
              درباره من
            </Link>
          </div>
        </div>

        {/* Right: Visual */}
        <div
          className="relative hidden min-h-72 overflow-hidden rounded-3xl md:block"
          aria-hidden="true"
        >
          {/* Gradient bg */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-slate-200/30 dark:from-blue-700/20 dark:via-indigo-900/20 dark:to-slate-800/40" />
          {/* Floating card */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-2xl border border-white/60 bg-white/90 p-8 text-center shadow-2xl backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/90">
              <p className="bg-gradient-to-l from-blue-600 to-indigo-600 bg-clip-text text-3xl font-black text-transparent dark:from-blue-300 dark:to-indigo-400">
                CodeNama
              </p>
              <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
                نوشته‌هایی برای توسعه‌دهندگان
              </p>
            </div>
          </div>
          {/* Decorative blobs */}
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-blue-400/25 blur-3xl" />
          <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-indigo-400/25 blur-3xl" />
        </div>
      </section>

      {/* ── Recent Article ── */}
      {featuredArticle && <FeaturedArticle article={featuredArticle} />}

      {/* ── Category Cards Grid Showcase ── */}
      <section className="scroll-mt-24 flex flex-col gap-6" id="categories">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            موضوعات تخصصی
          </p>
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">
            دسته‌بندی‌های وبلاگ
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            موضوع مورد نظر خود را برای مشاهده مقالات مرتبط انتخاب کنید.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const count = categoryCounts[cat.name] || 0;
            const isSelected = activeCategory === cat.name;

            return (
              <button
                key={cat.name}
                type="button"
                id={`cat-card-${cat.slug}`}
                onClick={() => {
                  setActiveCategory(cat.name);
                  setTimeout(() => {
                    const blogSec = document.getElementById("blog-section");
                    if (blogSec) {
                      blogSec.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }, 50);
                }}
                className={`group flex flex-col gap-3 rounded-2xl border p-4 text-right transition-all duration-300 ${
                  isSelected
                    ? "border-blue-500 bg-blue-50/80 ring-2 ring-blue-500/30 dark:border-blue-500 dark:bg-blue-950/40"
                    : "border-slate-200/70 bg-white hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg dark:border-white/8 dark:bg-slate-900 dark:hover:border-blue-800/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${cat.color.gradientFrom} ${cat.color.gradientTo} text-white shadow-md ${cat.color.glow} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    {count} مقاله
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                    {cat.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {cat.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Articles List Section ── */}
      <section className="scroll-mt-24 flex flex-col gap-6" id="blog-section">
        {/* Results bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 dark:border-white/8 dark:bg-slate-800/50">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {resultText}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            {activeCategory === "همه"
              ? "نمایش تمام دسته‌ها"
              : `دسته‌بندی فعال: ${activeCategory}`}
          </p>
        </div>

        {/* Articles grid or empty state */}
        {filteredArticles.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200/70 bg-white px-6 py-14 text-center shadow-sm dark:border-white/8 dark:bg-slate-900">
            <span className="text-5xl">🔍</span>
            <p className="text-lg font-bold text-slate-700 dark:text-slate-200">
              هیچ مقاله‌ای پیدا نشد
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              برای دسته‌بندی «{activeCategory}» مقاله‌ای یافت نشد. می‌توانید از سایر
              دسته‌بندی‌ها دیدن کنید.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                id="show-all-btn"
                className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition-colors duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-white/10 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-700/50 dark:hover:text-blue-400"
                onClick={() => setActiveCategory("همه")}
              >
                نمایش همه مقالات
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;

