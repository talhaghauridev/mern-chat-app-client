import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/main.css";
import "nprogress/nprogress.css";
import NProgress from "nprogress";
import AppProvider from "@/lib/AppProvider.jsx";

NProgress.configure({ showSpinner: false, trickleSpeed: 200, minimum: 0.1 });

ReactDOM.createRoot(document.getElementById("root")).render(
    <AppProvider>
      <App />
    </AppProvider>
);
