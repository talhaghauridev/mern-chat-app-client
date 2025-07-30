import { memo } from "react";
import { Skeleton } from "@chakra-ui/react";

const ChatLoading = () => {
  return Array(5)
    .fill(1)
    ?.map((item, key) => (
      <Skeleton
        height="69.5px"
        className="rounded-lg mb-[10px]"
        key={key}
        fadeDuration={1}
      />
    ));
};

export default memo(ChatLoading);
