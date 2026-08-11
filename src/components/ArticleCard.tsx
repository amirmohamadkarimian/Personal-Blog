import { Link } from "react-router-dom";
import type { Article } from "../data/articles";

function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="article-card">
      <Link to={`/blog/${article.slug}`} className="article-card-media-link">
        <div className="article-card-media">
          <img
            src={article.featuredImage}
            alt={`تصویر مقاله ${article.title}`}
            loading="lazy"
          />
        </div>
      </Link>
      <div className="article-card-content">
        <div className="article-card-meta">
          <span className="article-category">{article.category}</span>
          <span className="article-reading">{article.readingTime}</span>
        </div>
        <Link to={`/blog/${article.slug}`} className="article-card-title-link">
          <h3 className="article-card-title">{article.title}</h3>
        </Link>
        <p className="article-card-excerpt">{article.excerpt}</p>
        <div className="article-card-footer">
          <span>{article.publishedDate}</span>
          <Link to={`/blog/${article.slug}`} className="article-card-link">
            بخوانید →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ArticleCard;
