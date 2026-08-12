import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative mt-auto border-t border-slate-200/80 bg-white dark:border-white/8 dark:bg-slate-950">
      {/* Gradient top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-blue-500/60 to-transparent" />

      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 text-xs font-bold text-white shadow-md shadow-blue-500/25">
                CN
              </span>
              <span className="bg-gradient-to-l from-blue-600 to-blue-800 bg-clip-text font-bold text-transparent dark:from-blue-300 dark:to-blue-500">
                CodeNama
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              وبلاگی برای توسعه‌دهندگان فارسی‌زبان — نوشته‌هایی درباره وب،
              عملکرد و تجربه کاربری.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              صفحات
            </p>
            <nav className="flex flex-col gap-2" aria-label="لینک‌های فوتر">
              <Link
                to="/"
                className="text-sm text-slate-500 no-underline transition-colors duration-200 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
              >
                خانه
              </Link>
              <Link
                to="/about"
                className="text-sm text-slate-500 no-underline transition-colors duration-200 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
              >
                درباره من
              </Link>
              <a
                href="#"
                aria-label="لینک گیت‌هاب CodeNama"
                className="text-sm text-slate-500 no-underline transition-colors duration-200 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
              >
                گیت‌هاب
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center gap-2 border-t border-slate-100 pt-6 text-center dark:border-white/8 md:flex-row md:justify-between md:text-right">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © ۱۴۰۵ CodeNama · ساخته شده با ❤️ و React
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
