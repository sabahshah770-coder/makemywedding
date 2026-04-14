import TopNav from "./components/TopNav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GeniePage from "./pages/GeniePage";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <TopNav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/genie" element={<GeniePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

