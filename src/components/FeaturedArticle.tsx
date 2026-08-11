import { Link } from "react-router-dom";
import type { Article } from "../data/articles";

function FeaturedArticle({ article }: { article: Article }) {
  return (
    <section className="featured-article">
      <div className="featured-image" role="img" aria-label={article.title}>
        <div className="featured-image-overlay" />
        <span className="featured-image-label">پیشنهاد ویژه</span>
      </div>
      <div className="featured-card">
        <span className="featured-category">{article.category}</span>
        <h2>{article.title}</h2>
        <p>{article.excerpt}</p>
        <div className="featured-meta">
          <span>{article.publishedDate}</span>
          <span>{article.readingTime}</span>
        </div>
        <Link to={`/blog/${article.slug}`} className="featured-readmore">
          ادامه مطلب
        </Link>
      </div>
    </section>
  );
}

export default FeaturedArticle;
