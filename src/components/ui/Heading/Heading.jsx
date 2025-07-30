import { memo } from "react";
import cn from "@/utils/cn";

const Heading = ({ label, className }) => {
  return (
    <div
      className={cn(
        " rounded-tr-[8px] rounded-tl-[8px] heading font-Work bg-white  py-[10px] text-center text-[34px] w-[100%]",
        className
      )}
    >
      <h1>{label}</h1>
    </div>
  );
};

export default memo(Heading);
