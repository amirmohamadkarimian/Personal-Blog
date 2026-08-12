import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticles } from "../data/articleStore";
import CategoryBadge from "../components/CategoryBadge";

function Article() {
  const { slug } = useParams<{ slug: string }>();
  const [articles, setArticles] = useState(() => getArticles());

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

  const article = articles.find((item) => item.slug === slug) ??
    articles[0] ?? {
      slug: "",
      title: "مقاله‌ای یافت نشد",
      excerpt: "مقاله‌ای برای نمایش وجود ندارد.",
      publishedDate: "",
      readingTime: "",
      category: "",
      author: "",
      featuredImage: "",
      content: "",
    };

  const relatedArticles = articles
    .filter((item) => item.slug !== article.slug)
    .slice(0, 2);

  return (
    <article className="flex flex-col gap-12 pb-16 pt-8">
      {/* ── Article Hero ── */}
      <header className="grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-start">
        {/* Meta + Title */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="text-sm text-slate-400 no-underline transition-colors hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400"
            >
              خانه
            </Link>
            <span className="text-slate-300 dark:text-slate-600" aria-hidden="true">/</span>
            <CategoryBadge category={article.category} size="sm" showIcon={true} />
          </div>

          <h1 className="text-3xl font-extrabold leading-snug text-slate-800 dark:text-slate-100 md:text-4xl">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400 dark:text-slate-500">
            <span className="flex items-center gap-1.5">
              <span aria-hidden="true">📅</span>
              {article.publishedDate}
            </span>
            <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" aria-hidden="true" />
            <span className="flex items-center gap-1.5">
              <span aria-hidden="true">⏱️</span>
              {article.readingTime}
            </span>
            <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" aria-hidden="true" />
            <span className="flex items-center gap-1.5">
              <span aria-hidden="true">✍️</span>
              {article.author}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative min-h-52 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-950/60 dark:to-indigo-950/40">
          {article.featuredImage ? (
            <img
              src={article.featuredImage}
              alt={`تصویر مقاله ${article.title}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full min-h-52 flex-col items-center justify-center gap-3">
              <span className="text-5xl opacity-30">📄</span>
              <span className="rounded-full bg-white/80 px-4 py-1.5 text-sm font-bold text-slate-600 backdrop-blur-sm dark:bg-slate-900/80 dark:text-slate-300">
                تصویر ویژه
              </span>
            </div>
          )}
        </div>
      </header>

      {/* ── Article Content ── */}
      <section
        className="rounded-2xl border border-slate-200/70 bg-white p-7 shadow-sm dark:border-white/8 dark:bg-slate-900 md:p-9"
        aria-labelledby="article-body-title"
      >
        <h2 id="article-body-title" className="sr-only">
          متن کامل مقاله
        </h2>
        <div className="prose-content text-slate-600 dark:text-slate-400">
          {(article.content || article.excerpt)
            .split(/\n\s*\n/)
            .filter((p) => p.trim().length > 0)
            .map((paragraph, index) => (
              <p key={index} className="mb-4 leading-loose text-slate-600 dark:text-slate-400">
                {paragraph.trim()}
              </p>
            ))}
        </div>
      </section>

      {/* ── Related Articles ── */}
      {relatedArticles.length > 0 && (
        <section
          className="flex flex-col gap-5"
          aria-labelledby="related-articles-title"
        >
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              مطالب مرتبط
            </p>
            <h2
              id="related-articles-title"
              className="text-xl font-bold text-slate-800 dark:text-slate-100"
            >
              مطالبی که ممکن است دوست داشته باشید
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {relatedArticles.map((item) => (
              <Link
                key={item.slug}
                to={`/blog/${item.slug}`}
                className="group flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white p-6 no-underline shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200/50 hover:shadow-md dark:border-white/8 dark:bg-slate-900 dark:hover:border-blue-700/40"
              >
                <span className="w-max rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                  {item.category}
                </span>
                <h3 className="text-base font-bold leading-snug text-slate-800 transition-colors group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400">
                  {item.title}
                </h3>
                <p className="line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {item.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

export default Article;
