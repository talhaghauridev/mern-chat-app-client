import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../utils/ChatLogic";
import { ChatState } from "../../context/ChatProvider";
import { Avatar, Tooltip } from "@chakra-ui/react";
import { memo } from "react";

const Message = ({ messages }) => {
  const { user } = ChatState();
  return (
    <>
      <div
        id="messageBox"
        className="flex gap-[8px] flex-col items-center justify-center py-[15px] px-[10px] w-[100%] max-w-[100%] pb-[68px]"
      >
        {messages &&
          messages?.map((m, i) => (
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                marginTop: isSameUser(messages, m, i) ? "3px" : "10px",
                justifyContent:
                  m?.sender?._id !== user?.user?._id ? "start" : "end",
              }}
              key={m?._id}
            >
              {(isSameSender(messages, m, i, user?.user?._id) ||
                isLastMessage(messages, i, user?.user?._id)) && (
                <Tooltip
                  label={m?.sender?.name}
                  placement="bottom-start"
                  hasArrow
                >
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
                style={{
                  background:
                    m?.sender?._id === user?.user?._id ? "#BEE3F8" : "#B9F5D0",

                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "300px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {m?.content}
              </span>
            </div>
          ))}
      </div>
    </>
  );
};

export default memo(Message);
