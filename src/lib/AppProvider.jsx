import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import ChatProvider from "@/context/ChatProvider";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const AppProvider = ({ children }) => {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <ToastContainer />
        <ChatProvider>{children}</ChatProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
};

export default AppProvider;
