import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Article } from "../data/articleStore";
import CategoryBadge from "./CategoryBadge";

function ArticleCard({
  article,
  onEdit,
  onDelete,
}: {
  article: Article;
  onEdit?: (slug: string) => void;
  onDelete?: (slug: string) => void;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200/50 hover:shadow-xl hover:shadow-slate-900/8 dark:border-white/8 dark:bg-slate-900 dark:hover:border-blue-700/40 dark:hover:shadow-slate-950/50">
      {/* Image */}
      <Link to={`/blog/${article.slug}`} className="block overflow-hidden" tabIndex={-1} aria-hidden="true">
        <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-blue-100 to-slate-100 dark:from-blue-950/50 dark:to-slate-800">
          {article.featuredImage ? (
            <img
              src={article.featuredImage}
              alt={`تصویر مقاله ${article.title}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-4xl opacity-30">📝</span>
            </div>
          )}
          {/* Category pill overlay */}
          <div className="absolute right-3 top-3 z-10">
            <CategoryBadge category={article.category} size="sm" showIcon={true} />
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
          <span>{article.publishedDate}</span>
          <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" aria-hidden="true" />
          <span>{article.readingTime}</span>
        </div>

        {/* Title */}
        <Link to={`/blog/${article.slug}`} className="no-underline">
          <h3 className="text-base font-bold leading-snug text-slate-800 transition-colors duration-200 group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400">
            {article.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {article.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-white/8">
          <Link
            to={`/blog/${article.slug}`}
            className="group/link flex items-center gap-1.5 text-sm font-bold text-blue-600 no-underline transition-colors duration-200 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            بخوانید
            <span className="transition-transform duration-200 group-hover/link:-translate-x-1">→</span>
          </Link>

          {/* Admin actions */}
          {(onEdit || onDelete) && (
            <div className="flex gap-2">
              {onEdit && (
                <button
                  type="button"
                  id={`edit-${article.slug}`}
                  className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 transition-colors duration-200 hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:hover:bg-blue-900/40"
                  onClick={() => onEdit(article.slug)}
                >
                  ویرایش
                </button>
              )}
              {onDelete && (
                <button
                  type="button"
                  id={`delete-${article.slug}`}
                  className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors duration-200 hover:bg-red-100 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-900/30"
                  onClick={() => onDelete(article.slug)}
                >
                  حذف
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

// Suppress unused import warning — useEffect was only used for bookmark sync
export { useEffect };
export default ArticleCard;
