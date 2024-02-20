import ChatBox from "../../components/Chats/ChatBox";
import MyChats from "../../components/Chats/MyChats";
import Header from "../../components/Header/Header";
import { useMedia } from "../../hook/hook";
import {MetaData} from "../../components/ui"
const Chat = () => {
  const isMobile = useMedia("(max-width: 768px)");

  return (
    <>
      <MetaData title={"Home -- Chat App"} />

      <section id="chat" className="w-[100%] h-[100%]">
        <Header />

        <div
          className="h-[89vh] px-[10px] py-[10px] gap-[10px]"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.3fr 3fr ",
          }}
        >
          <MyChats />
          <ChatBox />
        </div>
      </section>
    </>
  );
};

export default Chat;
