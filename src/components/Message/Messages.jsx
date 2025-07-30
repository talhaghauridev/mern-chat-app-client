import React from "react";
import { Avatar, Tooltip } from "@chakra-ui/react";
import { ChatState } from "@/context/ChatProvider";
import { isLastMessage, isSameSender, isSameUser } from "@/utils/ChatLogic";
import cn from "@/utils/cn";

const Message = ({ messages }) => {
  const { user } = ChatState();

  return (
    <div
      id="messageBox"
      className="flex gap-[8px] flex-col items-center justify-center py-[15px] px-[10px] w-[100%] max-w-[100%] pb-[35px]">
      {messages &&
        messages.map((m, i) => {
          return (
            <div
              key={m._id}
              className={cn(
                "flex w-full items-center",
                m.sender?._id !== user?.user?._id ? "justify-start" : "justify-end",
                isSameUser(messages, m, i) ? "mt-[3px]" : "mt-[10px]"
              )}>
              {(isSameSender(messages, m, i, user?.user._id) ||
                isLastMessage(messages, i, user?.user._id)) && (
                <Tooltip
                  label={m.sender?.name}
                  placement="bottom-start"
                  hasArrow>
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m?.sender?.name}
                    src={m?.sender?.avatar?.url}
                  />
                </Tooltip>
              )}
              <span
                className={cn(
                  "rounded-[20px] py-[5px] px-[15px] flex items-center max-w-[300px]",
                  m.sender?._id === user?.user?._id ? "bg-[#BEE3F8]" : "bg-[#B9F5D0]"
                )}>
                {m.content}
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default Message;
