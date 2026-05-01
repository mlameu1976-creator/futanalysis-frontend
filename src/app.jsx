import { BrowserRouter, Routes, Route } from "react-router-dom";
import Rankings from "./pages/Rankings";
import Prediction from "./pages/Prediction";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Rankings />} />
        <Route path="/prediction" element={<Prediction />} />
      </Routes>
    </BrowserRouter>
  );
}
