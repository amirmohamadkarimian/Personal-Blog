import {
  LayoutGrid,
  Code2,
  Layout,
  FileCode2,
  Atom,
  MessageSquareHeart,
  Sparkles,
  Globe,
  Zap,
  User,
  LucideIcon,
} from "lucide-react";

export interface CategoryInfo {
  name: string;
  slug: string;
  icon: LucideIcon;
  description: string;
  color: {
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    activeBg: string;
    activeText: string;
    gradientFrom: string;
    gradientTo: string;
    glow: string;
  };
}

export const CATEGORIES: CategoryInfo[] = [
  {
    name: "همه",
    slug: "all",
    icon: LayoutGrid,
    description: "نمایش تمامی مقالات و مطالب وبلاگ",
    color: {
      badgeBg:
        "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
      badgeText: "text-slate-700 dark:text-slate-300",
      badgeBorder: "border-slate-200 dark:border-white/10",
      activeBg: "bg-blue-600 text-white shadow-lg shadow-blue-500/30",
      activeText: "text-white",
      gradientFrom: "from-slate-500",
      gradientTo: "to-slate-700",
      glow: "shadow-slate-500/20",
    },
  },
  {
    name: "جاوااسکریپت",
    slug: "javascript",
    icon: Code2,
    description: "مفاهیم زبان جاوااسکریپت، ES6+، ایونت لوپ و الگوی‌های رایج",
    color: {
      badgeBg:
        "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
      badgeText: "text-amber-700 dark:text-amber-300",
      badgeBorder: "border-amber-200 dark:border-amber-800/40",
      activeBg:
        "bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/30",
      activeText: "text-slate-950",
      gradientFrom: "from-amber-400",
      gradientTo: "to-yellow-600",
      glow: "shadow-amber-500/25",
    },
  },
  {
    name: "فرانت اند",
    slug: "frontend",
    icon: Layout,
    description: "توسعه سمت کاربر، معماری وب، CSS و طراحی رابط‌های پیشرفته",
    color: {
      badgeBg:
        "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300",
      badgeText: "text-indigo-700 dark:text-indigo-300",
      badgeBorder: "border-indigo-200 dark:border-indigo-800/40",
      activeBg: "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30",
      activeText: "text-white",
      gradientFrom: "from-indigo-500",
      gradientTo: "to-blue-600",
      glow: "shadow-indigo-500/25",
    },
  },
  {
    name: "تایپ اسکریپت",
    slug: "typescript",
    icon: FileCode2,
    description: "تایپ‌گذاری امن، تایپ‌های پیشرفته، Generics و سیستم تایپ TS",
    color: {
      badgeBg: "bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300",
      badgeText: "text-sky-700 dark:text-sky-300",
      badgeBorder: "border-sky-200 dark:border-sky-800/40",
      activeBg: "bg-sky-600 text-white shadow-lg shadow-sky-500/30",
      activeText: "text-white",
      gradientFrom: "from-sky-500",
      gradientTo: "to-blue-700",
      glow: "shadow-sky-500/25",
    },
  },
  {
    name: "ریکت",
    slug: "react",
    icon: Atom,
    description: "هوک‌ها، مدیریت وضعیت، کامپوننت‌های بهینه و الگوهای React",
    color: {
      badgeBg:
        "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300",
      badgeText: "text-cyan-700 dark:text-cyan-300",
      badgeBorder: "border-cyan-200 dark:border-cyan-800/40",
      activeBg: "bg-cyan-600 text-white shadow-lg shadow-cyan-500/30",
      activeText: "text-white",
      gradientFrom: "from-cyan-400",
      gradientTo: "to-blue-600",
      glow: "shadow-cyan-500/25",
    },
  },
  {
    name: "مهارت های ارتباطی",
    slug: "soft-skills",
    icon: MessageSquareHeart,
    description:
      "تعامل در تیم‌های نرم‌افزاری، کد ریوو، تفکر محصولی و بازخورد موثر",
    color: {
      badgeBg:
        "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
      badgeText: "text-emerald-700 dark:text-emerald-300",
      badgeBorder: "border-emerald-200 dark:border-emerald-800/40",
      activeBg: "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30",
      activeText: "text-white",
      gradientFrom: "from-emerald-400",
      gradientTo: "to-teal-600",
      glow: "shadow-emerald-500/25",
    },
  },
  {
    name: "هوش مصنوعی",
    slug: "ai",
    icon: Sparkles,
    description:
      "ابزارهای AI، مدل‌های زبانی LLM، پرامپت نویسی و هوش مصنوعی در وب",
    color: {
      badgeBg:
        "bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300",
      badgeText: "text-purple-700 dark:text-purple-300",
      badgeBorder: "border-purple-200 dark:border-purple-800/40",
      activeBg: "bg-purple-600 text-white shadow-lg shadow-purple-500/30",
      activeText: "text-white",
      gradientFrom: "from-purple-500",
      gradientTo: "to-pink-600",
      glow: "shadow-purple-500/25",
    },
  },
  {
    name: "توسعه وب",
    slug: "web-dev",
    icon: Globe,
    description:
      "اصول و استانداردهای توسعه وب مدرن، طراحی پاسخگو و دسترسی‌پذیری",
    color: {
      badgeBg:
        "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
      badgeText: "text-blue-700 dark:text-blue-300",
      badgeBorder: "border-blue-200 dark:border-blue-800/40",
      activeBg: "bg-blue-600 text-white shadow-lg shadow-blue-500/30",
      activeText: "text-white",
      gradientFrom: "from-blue-500",
      gradientTo: "to-indigo-600",
      glow: "shadow-blue-500/25",
    },
  },
  {
    name: "عملکرد",
    slug: "performance",
    icon: Zap,
    description:
      "بهینه‌سازی سرعت، Core Web Vitals و افزایش کارایی اپلیکیشن‌های وب",
    color: {
      badgeBg:
        "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
      badgeText: "text-rose-700 dark:text-rose-300",
      badgeBorder: "border-rose-200 dark:border-rose-800/40",
      activeBg: "bg-rose-600 text-white shadow-lg shadow-rose-500/30",
      activeText: "text-white",
      gradientFrom: "from-rose-500",
      gradientTo: "to-orange-600",
      glow: "shadow-rose-500/25",
    },
  },
  {
    name: "درباره من",
    slug: "about",
    icon: User,
    description: "داستان شخصی، رویکرد کاری و تجربیات فردی در مسیر برنامه‌نویسی",
    color: {
      badgeBg:
        "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300",
      badgeText: "text-violet-700 dark:text-violet-300",
      badgeBorder: "border-violet-200 dark:border-violet-800/40",
      activeBg: "bg-violet-600 text-white shadow-lg shadow-violet-500/30",
      activeText: "text-white",
      gradientFrom: "from-violet-500",
      gradientTo: "to-purple-600",
      glow: "shadow-violet-500/25",
    },
  },
];

export function getCategoryInfo(name: string): CategoryInfo {
  const found = CATEGORIES.find(
    (c) => c.name.trim().toLowerCase() === name.trim().toLowerCase(),
  );
  if (found) return found;

  // Fallback category info
  return {
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    icon: Layout,
    description: `مقالات مربوط به ${name}`,
    color: {
      badgeBg:
        "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
      badgeText: "text-blue-700 dark:text-blue-300",
      badgeBorder: "border-blue-200 dark:border-blue-800/40",
      activeBg: "bg-blue-600 text-white shadow-lg shadow-blue-500/30",
      activeText: "text-white",
      gradientFrom: "from-blue-500",
      gradientTo: "to-indigo-600",
      glow: "shadow-blue-500/25",
    },
  };
}
