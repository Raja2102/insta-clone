import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./layout/MainLayout";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Explore from "./pages/Explore";
import Reels from "./pages/Reels";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Saved from "./pages/Saved";
import Settings from "./pages/Settings";

function PrivateRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return !isLoggedIn ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

        {/* PRIVATE - wrapped in MainLayout */}
        <Route path="/" element={<PrivateRoute><MainLayout /></PrivateRoute>}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="explore" element={<Explore />} />
          <Route path="reels" element={<Reels />} />
          <Route path="messages" element={<Messages />} />
          <Route path="profile" element={<Profile />} />
          <Route path="saved" element={<Saved />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
