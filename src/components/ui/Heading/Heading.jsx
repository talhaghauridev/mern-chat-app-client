import { memo } from "react";

const Heading = ({ label, className }) => {
  return (
    <div
      className={`${className} rounded-tr-[8px] rounded-tl-[8px] heading font-Work bg-white  py-[10px] text-center text-[34px] w-[100%] `}
    >
      <h1>{label}</h1>
    </div>
  );
};

export default memo(Heading);
