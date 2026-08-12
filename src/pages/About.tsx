import { Link } from "react-router-dom";

const skills = [
  "React",
  "TypeScript",
  "Vite",
  "Tailwind CSS",
  "Node.js",
  "UX Design",
  "Performance",
  "Accessibility",
];

function About() {
  return (
    <section className="flex flex-col gap-12 pb-16 pt-8">
      {/* ── Hero ── */}
      <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
        <div className="flex flex-col gap-5">
          <p className="w-max rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
            درباره CodeNama
          </p>
          <h1 className="text-4xl font-extrabold leading-tight text-slate-800 dark:text-slate-100 md:text-5xl">
            من{" "}
            <span className="bg-gradient-to-l from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
              امیرمحمد
            </span>{" "}
            هستم
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-slate-500 dark:text-slate-400">
            اینجا تجربه‌های توسعه وب را می‌نویسم. CodeNama فضایی است برای ثبت
            راه‌حل‌های ساده، مطالعه بهینه‌سازی عملکرد، و بررسی طراحی‌های مینیمال
            که خواندنشان برای توسعه‌دهندگان فارسی‌زبان راحت باشد.
          </p>
          <Link
            to="/"
            id="about-back-home"
            className="w-max rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white no-underline shadow-lg shadow-blue-500/30 transition-all duration-200 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95"
          >
            بازگشت به خانه
          </Link>
        </div>

        {/* Avatar placeholder */}
        <div
          className="hidden h-44 w-44 shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-2xl shadow-blue-500/30 md:flex"
          aria-hidden="true"
        >
          <span className="text-6xl">👨‍💻</span>
        </div>
      </div>

      {/* ── Info Cards ── */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/70 bg-white p-7 shadow-sm dark:border-white/8 dark:bg-slate-900">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-2xl dark:bg-blue-950/50">
            📚
          </div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            چه چیزی اینجا می‌یابید
          </h2>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            مقالاتی با تمرکز بر تایپوگرافی، خوانایی و ساختار. هر نوشته با هدف
            انتقال تجربه واقعی و پیشنهاد روش‌های عملی برای پروژه‌های کوچک و
            بزرگ تهیه می‌شود.
          </p>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/70 bg-white p-7 shadow-sm dark:border-white/8 dark:bg-slate-900">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-2xl dark:bg-indigo-950/50">
            🛠️
          </div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            روش کار
          </h2>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            من تلاش می‌کنم هر موضوع را با رویکردی ساده و ساختاریافته بررسی کنم.
            اولویت همیشه روی محتوا، فاصله‌بندی مناسب و تجربه کاربری است.
          </p>
        </div>
      </div>

      {/* ── Skills ── */}
      <div className="flex flex-col gap-5 rounded-2xl border border-slate-200/70 bg-white p-7 shadow-sm dark:border-white/8 dark:bg-slate-900">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            ابزارها و تخصص‌ها
          </p>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            Stack فنی
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
