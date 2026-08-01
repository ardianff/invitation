import React from "react";

interface SectionDividerProps {
  className?: string;
  variant?: "light" | "dark";
}

const SectionDivider: React.FC<SectionDividerProps> = ({
  className = "",
  variant = "light",
}) => {
  const isDark = variant === "dark";

  return (
    <div className={`w-full flex items-center justify-center py-6 px-8 ${className}`}>
      {/* Left Gradient Hairline */}
      <div
        className={`h-[1px] flex-1 bg-gradient-to-r ${isDark
            ? "from-transparent via-white/40 to-white/20"
            : "from-transparent via-gray-300 to-gray-200"
          }`}
      />

      {/* Center Ornament Motif */}
      <div
        className={`px-3 flex items-center gap-2 ${isDark ? "text-white/80" : "text-gray-400"
          }`}
      >
        <span
          className={`w-1 h-1 rounded-full ${isDark ? "bg-white/50" : "bg-gray-300"
            }`}
        />
        <svg
          className="w-3.5 h-3.5 fill-current drop-shadow-xs"
          viewBox="0 0 24 24"
        >
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
        <span
          className={`w-1 h-1 rounded-full ${isDark ? "bg-white/50" : "bg-gray-300"
            }`}
        />
      </div>

      {/* Right Gradient Hairline */}
      <div
        className={`h-[1px] flex-1 bg-gradient-to-r ${isDark
            ? "from-white/20 via-white/40 to-transparent"
            : "from-gray-200 via-gray-300 to-transparent"
          }`}
      />
    </div>
  );
};

export default SectionDivider;
