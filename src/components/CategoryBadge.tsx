import { getCategoryInfo } from "../data/categories";

interface CategoryBadgeProps {
  category: string;
  showIcon?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  isActive?: boolean;
}

export function CategoryBadge({
  category,
  showIcon = true,
  className = "",
  size = "md",
  onClick,
  isActive = false,
}: CategoryBadgeProps) {
  const info = getCategoryInfo(category);
  const Icon = info.icon;

  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs gap-1.5",
    md: "px-3.5 py-1.5 text-sm gap-2",
    lg: "px-4 py-2 text-base gap-2.5",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const activeStyles = isActive
    ? info.color.activeBg
    : `border ${info.color.badgeBorder} ${info.color.badgeBg} hover:opacity-90 transition-all`;

  const Tag = onClick ? "button" : "span";

  return (
    <Tag
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={`inline-flex items-center font-bold rounded-full transition-all duration-200 ${sizeClasses[size]} ${activeStyles} ${className}`}
    >
      {showIcon && <Icon className={`${iconSizes[size]} shrink-0`} aria-hidden="true" />}
      <span>{category}</span>
    </Tag>
  );
}

export default CategoryBadge;
