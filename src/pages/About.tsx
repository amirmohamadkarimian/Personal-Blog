import { Link } from "react-router-dom";

function About() {
  return (
    <section className="about-page">
      <div className="about-hero">
        <div>
          <p className="eyebrow">درباره CodeNama</p>
          <h1>من امیرمحمد هستم و اینجا تجربه‌های توسعه وب را می‌نویسم.</h1>
          <p>
            CodeNama فضایی است برای ثبت راه‌حل‌های ساده، مطالعه بهینه‌سازی
            عملکرد، و بررسی طراحی‌های مینیمال که خواندنشان برای توسعه‌دهندگان
            فارسی‌زبان راحت باشد.
          </p>
        </div>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <h2>چه چیزی اینجا می‌یابید</h2>
          <p>
            مقالاتی با تمرکز بر تایپوگرافی، خوانایی و ساختار. هر نوشته با هدف
            انتقال تجربه واقعی و پیشنهاد روش‌های عملی برای پروژه‌های کوچک و بزرگ
            تهیه می‌شود.
          </p>
        </div>
        <div className="about-card">
          <h2>روش کار</h2>
          <p>
            من تلاش می‌کنم هر موضوع را با رویکردی ساده و ساختاریافته بررسی کنم.
            اولویت همیشه روی محتوا، فاصله‌بندی مناسب و تجربه کاربری است.
          </p>
        </div>
      </div>

      <div className="about-actions">
        <Link to="/" className="button button-primary">
          بازگشت به خانه
        </Link>
      </div>
    </section>
  );
}

export default About;
