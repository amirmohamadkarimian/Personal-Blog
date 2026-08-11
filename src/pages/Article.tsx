import { Link, useParams } from "react-router-dom";
import { articles } from "../data/articles";

function Article() {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((item) => item.slug === slug) ?? articles[0];

  const relatedArticles = articles
    .filter((item) => item.slug !== article.slug)
    .slice(0, 2);

  return (
    <article className="article-page">
      <header className="article-hero">
        <div className="article-hero-meta">
          <span className="article-category">{article.category}</span>
          <h1>{article.title}</h1>
          <div className="article-metadata">
            <span>{article.publishedDate}</span>
            <span>{article.readingTime}</span>
            <span>نویسنده: {article.author}</span>
          </div>
        </div>
        <div className="article-image" aria-hidden="true">
          <div className="article-image-label">تصویر ویژه</div>
        </div>
      </header>

      <section className="article-content" aria-labelledby="article-body-title">
        <h2 id="article-body-title" className="visually-hidden">
          متن کامل مقاله
        </h2>
        <div className="content-block">
          <p>
            این مقاله درباره اصول مهم در طراحی و توسعه وب است و تلاش می‌کند
            تجربه‌ای خوشایند و قابل خواندن برای مخاطب فراهم کند.
          </p>
          {article.content.split("\n\n").map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="related-section" aria-labelledby="related-articles-title">
        <div className="section-header">
          <p className="eyebrow">مطالب مرتبط</p>
          <h2 id="related-articles-title">
            مطالبی که ممکن است دوست داشته باشید
          </h2>
        </div>
        <div className="related-grid">
          {relatedArticles.map((item) => (
            <Link
              key={item.slug}
              to={`/blog/${item.slug}`}
              className="related-card"
            >
              <span className="related-category">{item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}

export default Article;
