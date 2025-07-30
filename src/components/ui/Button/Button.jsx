import { memo } from "react";
import { Link } from "react-router-dom";
import cn from "@/utils/cn";

const Button = ({ type = "type", label, className = "", to, disabled = false, onClick }) => {
  return (
    <>
      {to ? (
        <Link>
          <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={cn(
              "cursor-pointer  w-[100%] max-w-[100%] bg-[#3b5998] rounded-[6px] text-[16px] font-Work  text-[white] p-[10px]",
              disabled && "opacity-[0.88] cursor-not-allowed",
              className
            )}>
            {label}
          </button>
        </Link>
      ) : (
        <button
          type={type}
          disabled={disabled}
          onClick={onClick}
          className={cn(
            "cursor-pointer  w-[100%] max-w-[100%] bg-[#3b5998] rounded-[6px] text-[16px] font-Work  text-[white] p-[10px] ",
            disabled && "opacity-[0.88] cursor-not-allowed",
            className
          )}>
          {label}
        </button>
      )}
    </>
  );
};

export default memo(Button);
