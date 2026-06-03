import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import Landing from "./page/Landing.tsx";
import Unboxing from "./page/Unboxing.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/unboxing" element={<Unboxing/>} />
    </Routes>
  </BrowserRouter>
);
