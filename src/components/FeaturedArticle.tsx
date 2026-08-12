import { Link } from "react-router-dom";
import type { Article } from "../data/articleStore";
import CategoryBadge from "./CategoryBadge";

function FeaturedArticle({ article }: { article: Article }) {
  return (
    <section className="group grid gap-5 overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-lg shadow-slate-900/6 transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-900/10 dark:border-white/8 dark:bg-slate-900 dark:shadow-slate-950/60 md:grid-cols-[1.6fr_1fr]">
      {/* Visual Panel */}
      <div className="relative min-h-64 overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 md:min-h-80">
        {article.featuredImage ? (
          <img
            src={article.featuredImage}
            alt={article.title}
            className="h-full w-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
          />
        ) : null}
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/15 blur-3xl" />
          <div className="absolute -bottom-16 left-8 h-56 w-56 rounded-full bg-indigo-500/30 blur-3xl" />
        </div>
        {/* Badge */}
        <div className="absolute bottom-5 right-5">
          <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-blue-700 shadow-md backdrop-blur-sm dark:bg-slate-900/90 dark:text-blue-300">
            🕐 جدیدترین مقاله
          </span>
        </div>
        {/* Grid pattern overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-col justify-center gap-4 p-7">
        {/* Category */}
        <div>
          <CategoryBadge
            category={article.category}
            size="md"
            showIcon={true}
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-extrabold leading-snug text-slate-800 dark:text-slate-100 md:text-3xl">
          {article.title}
        </h2>

        {/* Excerpt */}
        <p className="line-clamp-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {article.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
          <span>{article.publishedDate}</span>
          <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
          <span>{article.readingTime}</span>
        </div>

        {/* CTA */}
        <Link
          to={`/blog/${article.slug}`}
          id="featured-readmore"
          className="group/btn mt-1 inline-flex w-max items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white no-underline shadow-md shadow-blue-500/30 transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/40 active:scale-95"
        >
          ادامه مطلب
          <span className="transition-transform duration-200 group-hover/btn:-translate-x-1">
            ←
          </span>
        </Link>
      </div>
    </section>
  );
}

export default FeaturedArticle;
