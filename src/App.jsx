import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Reader from "./pages/Reader";
import "./App.css";
import Library from "./pages/Library";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reader" element={<Reader />} />
        <Route path="/library" element={<Library />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;