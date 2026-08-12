export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  publishedDate: string;
  readingTime: string;
  category: string;
  author: string;
  featuredImage: string;
  content: string;
};

const STORAGE_KEY = "codenama-articles";
const AUTH_KEY = "codenama-admin-auth";
const ADMIN_PASSWORD = "amir";

export const defaultArticles: Article[] = [
  {
    slug: "js-async-event-loop",
    title: "درک عمیق Asynchronous و Event Loop در جاوااسکریپت",
    excerpt:
      "بررسی نحوه مدیریت Call Stack، Task Queue و Microtask Queue در موتور مرورگر و اجرای کد غیرهمزمان.",
    publishedDate: "۲۱ مرداد ۱۴۰۵",
    readingTime: "۸ دقیقه",
    category: "جاوااسکریپت",
    author: "امیرمحمد",
    featuredImage:
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=800&q=80",
    content: `
### چرا درک Event Loop اهمیت دارد؟

جاوااسکریپت زبانی تک‌نخی (Single-threaded) است، اما چگونه می‌تواند هزاران درخواست غیرهمزمان را بدون قفل کردن مرورگر مدیریت کند؟ پاسخ در **Event Loop** نهفته است.

### اجزای اصلی مدل اجرای JS

- **Call Stack**: محلی که توابع فراخوانی‌شده و دستورات اجرایی نگه داشته می‌شوند.
- **Web APIs**: امکانات ارائه شده توسط مرورگر مانند \`fetch\`، \`setTimeout\` و DOM Events.
- **Task Queue (Macrotasks)**: صف کارهای زمان‌بندی شده مثل \`setTimeout\` و \`setInterval\`.
- **Microtask Queue**: صف با اولویت بالا برای \`Promise.then\` و \`queueMicrotask\`.

کلید اصلی این است که Microtaskها همواره قبل از Macrotask بعدی اجرا می‌شوند.
    `,
  },
  {
    slug: "modern-frontend-architecture",
    title: "معماری نوین فرانت‌اند: بهینه‌سازی ساختار کامپوننت‌ها",
    excerpt:
      "چگونه کامپوننت‌های فرانت‌اند را تمیز، توسعه‌پذیر و تست‌پذیر طراحی کنیم؟ اصول ساختار فایل و جداسازی Logic از UI.",
    publishedDate: "۱۹ مرداد ۱۴۰۵",
    readingTime: "۶ دقیقه",
    category: "فرانت اند",
    author: "امیرمحمد",
    featuredImage:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    content: `
### اصول معماری مدرن فرانت‌اند

توسعه برنامه‌های وب بزرگ نیاز به نظم و معماری مدون دارد. لایه‌بندی درست برنامه‌های فرانت‌اند مانع از سردرگمی در کدهای پیچیده می‌شود.

### نکات کلیدی معماری

- **جداسازی UI از Business Logic**: استفاده از Custom Hookها برای مدیریت وضعیت و رفتارهای پیچیده.
- **Atomic Design یا Feature-based Structure**: سازمان‌دهی فایل‌ها بر اساس ویژگی‌ها (Features) به جای نوع فایل‌ها.
- **Design Tokens**: تعریف متغیرهای رنگ، فاصله‌گذاری و فونت در یک لایه مرکزی سیستم طراحی.
    `,
  },
  {
    slug: "typescript-advanced-generics",
    title: "راهنمای جامع TypeScript: قدرت تایپ‌های پیشرفته و Generics",
    excerpt:
      "آموزش تکنیک‌های Advanced Types، Conditional Types و Utility Types برای نوشتن کدهای ایمن‌تر و خودکار.",
    publishedDate: "۱۷ مرداد ۱۴۰۵",
    readingTime: "۹ دقیقه",
    category: "تایپ اسکریپت",
    author: "امیرمحمد",
    featuredImage:
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80",
    content: `
### چرا تایپ‌اسکریپت برای پروژه‌های مقیاس‌پذیر ضروری است؟

تایپ‌اسکریپت با اضافه کردن سیستم تایپ استاتیک به جاوااسکریپت، از خطاهای زمان اجرا جلوگیری کرده و قابلیت Autocomplete فوق‌العاده‌ای فراهم می‌کند.

### تکنیک‌های پیشرفته

- **Generics**: امکان ساخت توابع و اینترفیس‌های انعطاف‌پذیر بدون از دست دادن تایپ‌بندی.
- **Conditional Types**: شرطی‌سازی تایپ‌ها بر اساس ورودی (مثل \`T extends U ? X : Y\`).
- **Mapped Types & Utility Types**: استفاده از \`Pick\`، \`Omit\`، \`Partial\` و \`Record\`.
    `,
  },
  {
    slug: "react-state-management-2026",
    title: "مدیریت وضعیت مدرن در ریکت: هوک‌ها و Zustand",
    excerpt:
      "مقایسه رویکردهای مدیریت استیت در React از Redux Toolkit تا Zustand و React Query برای State سرویس‌ها.",
    publishedDate: "۱۵ مرداد ۱۴۰۵",
    readingTime: "۷ دقیقه",
    category: "ریکت",
    author: "امیرمحمد",
    featuredImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    content: `
### تحول در مدیریت استیت React

با معرفی React Hooks و کتابخانه‌های سبک‌وزن جدید، الگوی مدیریت وضعیت در برنامه‌های ریکتی دستخوش تغییرات مثبتی شده است.

### انتخاب ابزار مناسب

- **Local State**: برای کامپوننت‌های فرم و UI با \`useState\` و \`useReducer\`.
- **Server State**: مدیریت دیتای دریافت شده از API با \`TanStack Query / React Query\`.
- **Global State**: مدیریت وضعیت عمومی کاربر یا تنظیمات با \`Zustand\` یا \`Jotai\`.
    `,
  },
  {
    slug: "effective-team-communication",
    title: "هنر ارتباط مؤثر در تیم‌های فنی و ریووی کد",
    excerpt:
      "تکنیک‌های کلیدی برای Code Review محترمانه، انتقال بازخورد سازنده و هم‌راستایی در تیم‌های نرم‌افزاری.",
    publishedDate: "۱۲ مرداد ۱۴۰۵",
    readingTime: "۶ دقیقه",
    category: "مهارت های ارتباطی",
    author: "امیرمحمد",
    featuredImage:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    content: `
### مهارت‌های نرم، کلید موفقیت مهندسان برتر

برنامه‌نویسی فوق‌العاده بدون مهارت‌های ارتباطی نمی‌تواند یک محصول موفق بسازد. تعامل مثبت در تیم باعث افزایش سرعت و کیفیت پروژه می‌شود.

### اصول ارتباط شفاف در تیم

- **Code Review سازنده**: نقد روی کد است، نه شخص نویسنده! پیشنهاد حل مسئله دهید.
- **مستندسازی فعال**: نوشتن شفاف مسائل، PR descriptionها و تصمیمات معماری.
- **همدلی و گوش دادن فعال**: درک چالش‌های همکاران و حل تعارضات منطقی.
    `,
  },
  {
    slug: "ai-in-web-development",
    title: "ادغام هوش مصنوعی و LLMها در برنامه‌های وب مدرن",
    excerpt:
      "چگونه مدل‌های زبانی مانند GPT-4 و Gemini را از طریق API به پروژه‌های React و Web اضافه کنیم؟",
    publishedDate: "۱۱ مرداد ۱۴۰۵",
    readingTime: "۱۰ دقیقه",
    category: "هوش مصنوعی",
    author: "امیرمحمد",
    featuredImage:
      "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
    content: `
### عصر جدید برنامه‌های مبتنی بر AI

امروزه هوش مصنوعی تنها یک موضوع آکادمیک نیست، بلکه ابزاری قدرتمند برای شخصی‌سازی تجربه کاربری و اتوماسیون است.

### کاربردهای واقعی AI در Web

- **چت‌بات‌ها و دستیارهای هوشمند**: پاسخگویی به سوالات کاربران با داده‌های اختصاصی (RAG).
- **تولید خودکار محتوا و خلاصه ساختن**: تولید متون و تحلیل احساسات کاربران.
- **رابط‌های هوشمند و پیش‌بینی‌کننده**: پیشنهاد اقدامات بر اساس رفتار کاربر.
    `,
  },
  {
    slug: "design-systems-ama",
    title: "سیستم طراحی شخصی: ساخت تجربه‌ای ثابت و خوانا",
    excerpt:
      "رویکردی ساده و پایدار برای طراحی رابط‌های وب، با تمرکز روی تایپوگرافی و هماهنگی محتوا.",
    publishedDate: "۱۴ مرداد ۱۴۰۵",
    readingTime: "۷ دقیقه",
    category: "توسعه وب",
    author: "امیرمحمد",
    featuredImage:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80",
    content: `
### چرا سیستم طراحی مهم است؟

سیستم طراحی به شما اجازه می‌دهد تا تجربه‌ای یکپارچه بسازید که در هر صفحه‌وب به خوبی کار کند. با تعریف رنگ‌ها، فاصله‌ها و تایپوگرافی، تیم یا فرد می‌تواند سریع‌تر و با دقت بیشتر تولید محتوا کند.

### اصول اصلی

- تایپوگرافی محور: استفاده از وزن‌ها و فاصله‌های مناسب برای خوانایی.
- حداقل‌گرایی: حذف المان‌های غیرضروری و حفظ تمرکز روی محتوا.
- ساختار قابل تکرار: کارت‌ها، بخش‌ها و بلوک‌های محتوا باید قابل استفاده مجدد باشند.

این مقاله نمونه‌هایی از اجرای این اصول را در صفحه‌وب شخصی CodeNama نشان می‌دهد.
    `,
  },
  {
    slug: "performance-roads",
    title: "بهینه‌سازی عملکرد برای تجربه کاربری بهتر",
    excerpt:
      "شناسایی گلوگاه‌های رایج در وب‌سایت و روش‌هایی برای کاهش زمان بارگذاری و افزایش پاسخ‌دهی.",
    publishedDate: "۱۰ مرداد ۱۴۰۵",
    readingTime: "۵ دقیقه",
    category: "عملکرد",
    author: "امیرمحمد",
    featuredImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    content: `
### اولویت تجربه سریع

کاربران امروز انتظار دارند سایت‌ها در کسری از ثانیه بارگذاری شوند. به همین دلیل، اولویت دادن به محتوای اصلی و بهینه‌سازی تصاویر اهمیت زیادی دارد.

### نکات عملی

- تصاویر را با فرمت‌های مدرن بارگذاری کنید.
- از CSS ساده و بارگزاری تنبل برای محتوای پایین صفحه استفاده کنید.
- حداقل یک نمای اولیه معنی‌دار برای کاربر نمایش دهید.

با این رویکردها می‌توانید تجربه‌ای آرام‌تر و حرفه‌ای‌تر برای مخاطبان خود بسازید.
    `,
  },
  {
    slug: "story-of-codenama",
    title: "داستان CodeNama: مسیر من در توسعه وب",
    excerpt:
      "نگاهی به مسیر ایجاد CodeNama، درس‌های یادگرفته‌شده و انگیزه‌های پشت این بلاگ.",
    publishedDate: "۵ مرداد ۱۴۰۵",
    readingTime: "۶ دقیقه",
    category: "درباره من",
    author: "امیرمحمد",
    featuredImage:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
    content: `
### شروع مسیر

CodeNama با هدف ثبت تجربه‌ها و راه‌حل‌های ساده برای توسعه‌دهندگان شروع شد. اینجا جایی است برای نوشتن درباره ابزارها، سبک طراحی و چالش‌های واقعی پروژه.

### چه چیزی در اینجا می‌یابید؟

- مقالاتی با تمرکز بر خوانایی و ساختار.
- راهنمایی برای بهینه‌سازی فرایند توسعه.
- نکات تجربه‌محور برای تیم‌های کوچک و فردی.

هدف این بلاگ ایجاد منبعی کاربردی و انسانی برای توسعه‌دهندگان فارسی‌زبان است.
    `,
  },
];

export function getArticles(): Article[] {
  if (typeof window === "undefined") {
    return defaultArticles;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return defaultArticles;
  }

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch {
    // Ignore parse errors and fall back to default articles.
  }

  return defaultArticles;
}

export function saveArticles(articles: Article[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  window.dispatchEvent(new Event("codenama-articles-updated"));
}

export function isAdminAuthenticated() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(AUTH_KEY) === "true";
}

export function authenticateAdmin(password: string) {
  if (password === ADMIN_PASSWORD) {
    window.localStorage.setItem(AUTH_KEY, "true");
    window.dispatchEvent(new Event("codenama-admin-updated"));
    return true;
  }

  return false;
}

export function signOutAdmin() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_KEY);
  window.dispatchEvent(new Event("codenama-admin-updated"));
}

// Utility: generate a URL-safe slug from a title and make it unique among existing articles
export function generateSlug(title: string, excludeSlug?: string) {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-\u0600-\u06FF]/g, "") // allow basic latin numbers and Persian chars
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  let slug = base || `post-${Date.now()}`;
  const articles = getArticles();
  const existing = new Set(
    articles.filter((a) => a.slug !== excludeSlug).map((a) => a.slug)
  );
  let i = 1;
  while (existing.has(slug)) {
    slug = `${base}-${i}`;
    i += 1;
  }

  return slug;
}

// Add a new article. Accepts a partial article and fills missing fields.
export function addArticle(payload: Partial<Article>) {
  const articles = getArticles();

  const title = payload.title?.trim() || "Untitled";
  const content = payload.content || "";

  const slug = payload.slug?.trim() || generateSlug(title);

  const newArticle: Article = {
    slug,
    title,
    excerpt: payload.excerpt || "",
    publishedDate:
      payload.publishedDate || new Date().toLocaleDateString("fa-IR"),
    readingTime: payload.readingTime || "1 دقیقه",
    category: payload.category || "عمومی",
    author: payload.author || "نویسنده",
    featuredImage: payload.featuredImage || "",
    content,
  };

  articles.unshift(newArticle);
  saveArticles(articles);
  return newArticle;
}

// Update an existing article by slug. Returns the updated article or null if not found.
export function updateArticleBySlug(slug: string, updates: Partial<Article>) {
  const articles = getArticles();
  const index = articles.findIndex((a) => a.slug === slug);
  if (index === -1) return null;

  const updated: Article = { ...articles[index], ...updates };

  // If slug changed, ensure uniqueness
  if (updates.slug && updates.slug !== slug) {
    const unique = generateSlug(updates.slug, slug);
    updated.slug = unique;
  }

  articles[index] = updated;
  saveArticles(articles);
  return updated;
}

// Delete an article by slug. Returns true if deleted.
export function deleteArticle(slug: string) {
  const articles = getArticles();
  const filtered = articles.filter((a) => a.slug !== slug);
  if (filtered.length === articles.length) return false;
  saveArticles(filtered);
  return true;
}

