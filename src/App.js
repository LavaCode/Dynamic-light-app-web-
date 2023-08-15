import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Launcher from "./pages/Launcher.js";
import SmallGym from "./pages/SmallGym.js";
import LargeGym from "./pages/LargeGym.js";
import Help from "./pages/Help.js";
import Home from "./pages/Home.js";
import Settings from "./pages/Settings.js";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Launcher />}/>
            <Route path="/home" element={<Home />} />
            <Route path="/smallgym" element={<SmallGym />} />
            <Route path="/largegym" element={<LargeGym />} />
            <Route path="/help" element={<Help />} />
            <Route path="/settings" element={<Settings />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
