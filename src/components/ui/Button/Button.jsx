import { memo } from "react";
import { Link } from "react-router-dom";
import cn from "@/utils/cn";

const Button = ({
  type = "button",
  label,
  className = "",
  to,
  disabled = false,
  loading = false,
  onClick,
}) => {
  const buttonClasses = cn(
    "flex items-center justify-center w-full max-w-full bg-[#3b5998] rounded-lg text-base font-Work text-white p-3 py-2 transition-all duration-200",
    "hover:bg-[#2d4373] focus:outline-none focus:ring-2 focus:ring-[#3b5998] focus:ring-opacity-50",
    disabled && "opacity-70 cursor-not-allowed",
    loading && "opacity-80 cursor-wait",
    className
  );

  const content = (
    <>
      {loading ? (
        <div className="flex items-center justify-center gap-2 w-full">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
          <span>{label}</span>
        </div>
      ) : (
        <span className="w-full">{label}</span>
      )}
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={buttonClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={buttonClasses}>
      {content}
    </button>
  );
};

export default memo(Button);
