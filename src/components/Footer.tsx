import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div>
          <p className="footer-brand">CodeNama</p>
          <p className="footer-copy">وبلاگی برای توسعه‌دهندگان فارسی‌زبان</p>
        </div>
        <div className="footer-links">
          <Link to="/">خانه</Link>
          <Link to="/about">درباره من</Link>
          <a href="#" aria-label="لینک گیت‌هاب CodeNama">
            گیت‌هاب
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
