import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { articles } from "../data/articles";
import ArticleCard from "../components/ArticleCard";
import FeaturedArticle from "../components/FeaturedArticle";

type HomeProps = {
  search: string;
};

const categories = ["همه", "توسعه وب", "عملکرد"];

function Home({ search }: HomeProps) {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("همه");

  const query = search.trim().toLowerCase();

  const filteredArticles = useMemo(
    () =>
      articles.filter((article) => {
        const matchesCategory =
          activeCategory === "همه" || article.category === activeCategory;
        const matchesSearch =
          !query ||
          [
            article.title,
            article.excerpt,
            article.content,
            article.category,
          ].some((field) => field.toLowerCase().includes(query));
        return matchesCategory && matchesSearch;
      }),
    [activeCategory, query],
  );

  const resultText = search
    ? `${filteredArticles.length} مقاله برای «${search}» یافت شد`
    : activeCategory === "همه"
      ? `${filteredArticles.length} مقاله آمادهٔ مطالعه است`
      : `${filteredArticles.length} مقاله در دستهٔ ${activeCategory} نمایش داده می‌شود`;

  const featuredArticle = useMemo(() => articles[0], []);

  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location.hash]);

  return (
    <div className="page-home">
      <section className="hero-section">
        <div className="hero-content">
          <h1>وبلاگ شخصی من برای توسعه وب و طراحی تجربه کاربری</h1>
          <p className="hero-text">
            اینجا نوشته‌هایی را می‌خوانید درباره ساخت رابط‌های ساده، عملکرد سریع
            و تجربه‌ای خوانا برای توسعه‌دهندگان فارسی‌زبان.
          </p>
          <div className="hero-actions">
            <Link
              to="/blog/design-systems-ama"
              className="button button-primary"
            >
              شروع با مقاله پیشنهادی
            </Link>
            <Link to="/about" className="button button-secondary">
              درباره من
            </Link>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-box">CodeNama</div>
        </div>
      </section>

      <FeaturedArticle article={featuredArticle} />

      <section className="latest-section" id="blog-section">
        <div className="latest-header" id="categories">
          <div>
            <p className="eyebrow">آخرین مقالات</p>
            <h2>مطالب جدید</h2>
          </div>
          <div
            className="category-filter"
            role="tablist"
            aria-label="فیلتر دسته‌بندی"
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={
                  category === activeCategory
                    ? "filter-button active"
                    : "filter-button"
                }
                onClick={() => setActiveCategory(category)}
                role="tab"
                aria-selected={category === activeCategory}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="results-bar">
          <p className="search-summary">{resultText}</p>
          <p className="search-help">
            {activeCategory === "همه"
              ? "نمایش تمام دسته‌ها"
              : `دسته‌بندی فعال: ${activeCategory}`}
          </p>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="empty-state">
            <p className="empty-title">هیچ مقاله‌ای پیدا نشد</p>
            <p className="empty-text">
              جستجوی شما برای «{search}» نتیجه‌ای نداشت. دسته‌بندی دیگری انتخاب
              کنید یا عبارت دیگری را جستجو کنید.
            </p>
            <div className="empty-actions">
              <button
                type="button"
                className="button button-secondary"
                onClick={() => setActiveCategory("همه")}
              >
                نمایش همه مقالات
              </button>
              <Link to="/about" className="button button-primary">
                درباره من
              </Link>
            </div>
          </div>
        ) : (
          <div className="article-grid">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </section>

      <section className="contact-section" id="contact"></section>
    </div>
  );
}

export default Home;
