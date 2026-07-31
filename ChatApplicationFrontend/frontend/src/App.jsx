import { Routes, Route } from "react-router-dom";

import Splash from "./pages/Splash/Splash";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Chat from "./pages/Chat/Chat";
import NotFound from "./pages/NotFound/NotFound";

import "./App.css";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Splash />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/chat" element={<Chat />} />

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;