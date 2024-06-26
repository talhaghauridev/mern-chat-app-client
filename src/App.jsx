import "react-toastify/dist/ReactToastify.css";
import React, { Suspense } from "react";
import Routes from "./Routes";

const Loading = () => {
  return (
    <section
      id="loading"
      className="font-Work text-[16px] md:text-[18px] h-[100vh] w-[100%] bg-white flex items-center justify-center"
    >
      Loading....
    </section>
  );
};

function App() {
  return (
    <div id="App" className="bg-cover h-screen w-full">
      <Suspense fallback={<Loading />}>
        <Routes />
      </Suspense>
    </div>
  );
}

export default App;
