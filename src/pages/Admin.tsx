import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Article,
  authenticateAdmin,
  defaultArticles,
  getArticles,
  isAdminAuthenticated,
  saveArticles,
  signOutAdmin,
  generateSlug,
  addArticle,
  updateArticleBySlug,
  deleteArticle,
} from "../data/articleStore";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 transition-all duration-200 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-white/10 dark:bg-slate-800/60 dark:text-slate-200 dark:placeholder-slate-500 dark:focus:border-blue-500 dark:focus:bg-slate-800 dark:focus:ring-blue-900/50 resize-none";

const labelClass =
  "block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5";

function Admin() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [articles, setArticles] = useState<Article[]>(() => getArticles());
  const [activeSlug, setActiveSlug] = useState<string>(articles[0]?.slug ?? "");
  const [draft, setDraft] = useState<Article | null>(() => articles[0] ? { ...articles[0] } : null);
  const [isNewArticle, setIsNewArticle] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error" | "info";
  }>({
    text: "",
    type: "info",
  });

  useEffect(() => {
    setAuthenticated(isAdminAuthenticated());
  }, []);

  useEffect(() => {
    const handleUpdate = (e?: Event) => {
      if (e instanceof StorageEvent && e.key && e.key !== "codenama-articles") return;
      const updatedArticles = getArticles();
      setArticles(updatedArticles);
    };
    window.addEventListener("codenama-articles-updated", handleUpdate);
    window.addEventListener("codenama-admin-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("codenama-articles-updated", handleUpdate);
      window.removeEventListener("codenama-admin-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  useEffect(() => {
    if (!isNewArticle) {
      const selectedArticle = articles.find((a) => a.slug === activeSlug);
      setDraft(selectedArticle ? { ...selectedArticle } : null);
    }
  }, [activeSlug, articles, isNewArticle]);

  const articleOptions = useMemo(
    () => articles.map((a) => ({ slug: a.slug, title: a.title })),
    [articles],
  );

  const setMsg = (text: string, type: "success" | "error" | "info" = "info") =>
    setMessage({ text, type });

  const handleLogin = () => {
    if (authenticateAdmin(password)) {
      setAuthenticated(true);
      setPassword("");
      setMsg("");
    } else {
      setMsg("رمز عبور نادرست است. دوباره تلاش کنید.", "error");
    }
  };

  const handleLogout = () => {
    signOutAdmin();
    setAuthenticated(false);
    navigate("/");
  };

  const handleSelectArticle = (slug: string) => {
    setIsNewArticle(false);
    setActiveSlug(slug);
    const selected = articles.find((a) => a.slug === slug);
    setDraft(selected ? { ...selected } : null);
    setMsg("");
  };

  const handleSave = () => {
    if (!draft) return;
    if (!draft.title.trim()) {
      setMsg("لطفاً عنوان مقاله را وارد کنید.", "error");
      return;
    }

    const currentArticles = getArticles();
    const exists = currentArticles.some((a) => a.slug === activeSlug);

    if (exists && !isNewArticle) {
      const updated = updateArticleBySlug(activeSlug, draft);
      if (updated) {
        const fresh = getArticles();
        setArticles(fresh);
        setIsNewArticle(false);
        setActiveSlug(updated.slug);
        setDraft({ ...updated });
        setMsg("مقاله با موفقیت به‌روزرسانی شد.", "success");
      } else {
        setMsg("خطا در به‌روزرسانی مقاله.", "error");
      }
    } else {
      const created = addArticle(draft);
      const fresh = getArticles();
      setArticles(fresh);
      setIsNewArticle(false);
      setActiveSlug(created.slug);
      setDraft({ ...created });
      setMsg("مقاله جدید با موفقیت ساخته شد.", "success");
    }
  };

  const handleNew = () => {
    const slug = generateSlug("Untitled");
    const newDraft: Article = {
      slug,
      title: "",
      excerpt: "",
      publishedDate: new Date().toLocaleDateString("fa-IR"),
      readingTime: "1 دقیقه",
      category: "عمومی",
      author: "امیرمحمد",
      featuredImage: "",
      content: "",
    };
    setIsNewArticle(true);
    setDraft(newDraft);
    setActiveSlug(newDraft.slug);
    setMsg("");
  };

  const handleDelete = () => {
    if (!draft) return;
    const ok = confirm("آیا از حذف این مقاله مطمئن هستید؟");
    if (!ok) return;
    const deleted = deleteArticle(activeSlug);
    if (deleted) {
      const updated = getArticles();
      setArticles(updated);
      setIsNewArticle(false);
      const nextSlug = updated[0]?.slug ?? "";
      setActiveSlug(nextSlug);
      const nextArticle = updated.find((a) => a.slug === nextSlug);
      setDraft(nextArticle ? { ...nextArticle } : null);
      setMsg("مقاله حذف شد.", "info");
    } else {
      setMsg("حذف ناموفق بود.", "error");
    }
  };

  const handleReset = () => {
    saveArticles(defaultArticles);
    setArticles(defaultArticles);
    setIsNewArticle(false);
    setActiveSlug(defaultArticles[0]?.slug ?? "");
    setDraft({ ...defaultArticles[0] });
    setMsg("مقالات به حالت پیش‌فرض بازگشتند.", "info");
  };

  if (!authenticated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center py-12">
        <div className="w-full max-w-md rounded-3xl border border-slate-200/70 bg-white p-8 shadow-xl shadow-slate-900/8 dark:border-white/8 dark:bg-slate-900">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-2xl shadow-lg shadow-blue-500/30">
              🔒
            </div>
            <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">
              ورود مدیر
            </h1>
            <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
              برای دسترسی به پنل مدیر، رمز عبور را وارد کنید.
            </p>
          </div>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div>
              <label htmlFor="admin-password" className={labelClass}>
                رمز عبور
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="رمز عبور مدیر"
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              id="admin-login-btn"
              className="w-full rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-md shadow-blue-500/25 transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/35 active:scale-95"
            >
              ورود به پنل مدیر
            </button>
          </form>
          {message.text && (
            <p className="mt-4 rounded-xl bg-red-50 p-3 text-center text-sm font-semibold text-red-600 dark:bg-red-950/30 dark:text-red-400">
              {message.text}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 py-8">
      {/* ── Admin Header ── */}
      <div className="flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm dark:border-white/8 dark:bg-slate-900">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            پنل مدیر
          </p>
          <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">
            ویرایش مقالات
          </h1>
          <p className="mt-1.5 max-w-xl text-sm text-slate-500 dark:text-slate-400">
            فقط شما می‌توانید مقالات را ویرایش و ذخیره کنید. تغییرات شما در
            مرورگر ذخیره می‌شوند.
          </p>
        </div>
        <button
          type="button"
          id="admin-logout-btn"
          className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-white/10 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-red-800/50 dark:hover:bg-red-950/20 dark:hover:text-red-400"
          onClick={handleLogout}
        >
          خروج
        </button>
      </div>

      {/* ── Main Grid ── */}
      <div className="grid gap-5 md:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <aside className="flex flex-col gap-4">
          <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm dark:border-white/8 dark:bg-slate-900">
            <h2 className="mb-3 text-sm font-bold text-slate-700 dark:text-slate-300">
              مقالات موجود
            </h2>
            <select
              id="article-select"
              value={activeSlug}
              onChange={(e) => handleSelectArticle(e.target.value)}
              className={inputClass}
            >
              {isNewArticle && (
                <option value={activeSlug}>
                  ➕ (مقاله جدید در حال ساخت...)
                </option>
              )}
              {articleOptions.map((option) => (
                <option key={option.slug} value={option.slug}>
                  {option.title || "(بدون عنوان)"}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm dark:border-white/8 dark:bg-slate-900">
            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                id="new-article-btn"
                className="w-full rounded-xl bg-blue-600 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-500/25 transition-all duration-200 hover:bg-blue-700 active:scale-95"
                onClick={handleNew}
              >
                + مقاله جدید
              </button>
              <button
                type="button"
                id="reset-articles-btn"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                onClick={handleReset}
              >
                بازنشانی به مقالات اولیه
              </button>
            </div>
            <p className="mt-3.5 text-xs leading-relaxed text-slate-400 dark:text-slate-500">
              تغییراتی که ذخیره می‌کنید فقط در مرورگر شما نگهداری می‌شوند.
            </p>
          </div>
        </aside>

        {/* Editor */}
        <div className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm dark:border-white/8 dark:bg-slate-900">
          {draft ? (
            <div className="flex flex-col gap-5">
              {/* Title */}
              <div>
                <label htmlFor="article-title" className={labelClass}>
                  عنوان
                </label>
                <input
                  id="article-title"
                  type="text"
                  value={draft.title}
                  onChange={(e) =>
                    setDraft({ ...draft, title: e.target.value })
                  }
                  placeholder="عنوان مقاله را وارد کنید"
                  className={inputClass}
                />
              </div>

              {/* Excerpt */}
              <div>
                <label htmlFor="article-excerpt" className={labelClass}>
                  چکیده
                </label>
                <textarea
                  id="article-excerpt"
                  rows={3}
                  value={draft.excerpt}
                  onChange={(e) =>
                    setDraft({ ...draft, excerpt: e.target.value })
                  }
                  placeholder="چکیده کوتاه مقاله"
                  className={inputClass}
                />
              </div>

              {/* Content */}
              <div>
                <label htmlFor="article-content" className={labelClass}>
                  متن کامل
                </label>
                <textarea
                  id="article-content"
                  rows={12}
                  value={draft.content}
                  onChange={(e) =>
                    setDraft({ ...draft, content: e.target.value })
                  }
                  placeholder="متن کامل مقاله را اینجا بنویسید..."
                  className={inputClass}
                />
              </div>

              {/* Two column fields */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="article-category" className={labelClass}>
                    دسته‌بندی
                  </label>
                  <select
                    id="article-category"
                    value={draft.category}
                    onChange={(e) =>
                      setDraft({ ...draft, category: e.target.value })
                    }
                    className={inputClass}
                  >
                    <option value="جاوااسکریپت">⚡ جاوااسکریپت</option>
                    <option value="فرانت اند">💻 فرانت اند</option>
                    <option value="تایپ اسکریپت">🟦 تایپ اسکریپت</option>
                    <option value="ریکت">⚛️ ریکت</option>
                    <option value="مهارت های ارتباطی">
                      💬 مهارت های ارتباطی
                    </option>
                    <option value="هوش مصنوعی">✨ هوش مصنوعی</option>
                    <option value="توسعه وب">🌐 توسعه وب</option>
                    <option value="عملکرد">🚀 عملکرد</option>
                    <option value="درباره من">👤 درباره من</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="article-published" className={labelClass}>
                    تاریخ انتشار
                  </label>
                  <input
                    id="article-published"
                    type="text"
                    value={draft.publishedDate}
                    onChange={(e) =>
                      setDraft({ ...draft, publishedDate: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="article-reading" className={labelClass}>
                    زمان خواندن
                  </label>
                  <input
                    id="article-reading"
                    type="text"
                    value={draft.readingTime}
                    onChange={(e) =>
                      setDraft({ ...draft, readingTime: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="article-author" className={labelClass}>
                    نویسنده
                  </label>
                  <input
                    id="article-author"
                    type="text"
                    value={draft.author}
                    onChange={(e) =>
                      setDraft({ ...draft, author: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label htmlFor="article-image" className={labelClass}>
                  آدرس تصویر ویژه
                </label>
                <input
                  id="article-image"
                  type="text"
                  value={draft.featuredImage}
                  onChange={(e) =>
                    setDraft({ ...draft, featuredImage: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                  className={inputClass}
                />
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-4 dark:border-white/8">
                <button
                  type="button"
                  id="save-article-btn"
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-500/25 transition-all duration-200 hover:bg-blue-700 active:scale-95"
                  onClick={handleSave}
                >
                  ذخیره مقاله
                </button>
                <button
                  type="button"
                  id="revert-article-btn"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                  onClick={() =>
                    setDraft(
                      articles.find((a) => a.slug === activeSlug) ?? null,
                    )
                  }
                >
                  بازگردانی تغییرات
                </button>
                <button
                  type="button"
                  id="delete-article-btn"
                  className="rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition-all duration-200 hover:bg-red-100 dark:border-red-800/50 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-900/30"
                  onClick={handleDelete}
                >
                  حذف مقاله
                </button>
              </div>

              {/* Message */}
              {message.text && (
                <p
                  className={`rounded-xl p-3 text-sm font-semibold ${
                    message.type === "success"
                      ? "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400"
                      : message.type === "error"
                        ? "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400"
                        : "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400"
                  }`}
                >
                  {message.text}
                </p>
              )}
            </div>
          ) : (
            <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-center">
              <span className="text-4xl opacity-30">📝</span>
              <p className="text-sm text-slate-400 dark:text-slate-500">
                مقاله‌ای برای ویرایش پیدا نشد.
              </p>
              <button
                type="button"
                onClick={handleNew}
                className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-bold text-white transition-all duration-200 hover:bg-blue-700"
              >
                + مقاله جدید
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
