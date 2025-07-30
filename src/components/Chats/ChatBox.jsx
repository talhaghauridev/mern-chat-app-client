import { memo, useMemo } from "react";
import { useMedia } from "@/hook/hook";
import { ChatState } from "@/context/ChatProvider";
import SingleChat from "./SingleChat";

const ChatBox = () => {
  const isMobile = useMedia("(max-width: 768px)");
  const { selectedChat } = ChatState();

  const mobileResponsive = useMemo(
    () =>
      isMobile && !selectedChat ? "none" : selectedChat ? "block" : "block",
    [isMobile, selectedChat]
  );
  return (
    <section
      id="chatBox"
      className="  bg-[white] max-w-[100%] h-[86.5vh] rounded-[6px]"
      style={{
        display: mobileResponsive,
      }}
    >
      <div className="container relative overflow-hidden pt-[10px] py-[15px] px-[15px] flex flex-col gap-[10px] h-[100%] w-[100%] max-w-[100%]">
        <SingleChat />
      </div>
    </section>
  );
};

export default memo(ChatBox);
