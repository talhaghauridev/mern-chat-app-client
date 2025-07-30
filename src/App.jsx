import AppRoutes from "@/routes/routes";
import { Suspense } from "react";

function App() {
   return (
      <div
         id="App"
         className=" h-screen w-full">
         <Suspense fallback={null}>
            <AppRoutes />
         </Suspense>
      </div>
   );
}

export default App;
