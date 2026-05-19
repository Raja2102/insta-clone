import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import {
  FaHome, FaSearch, FaCompass, FaVideo,
  FaFacebookMessenger, FaUser, FaBookmark, FaCog, FaSignOutAlt,
} from "react-icons/fa";

const links = [
  { name: "Home",     path: "/",         icon: FaHome },
  { name: "Search",   path: "/search",   icon: FaSearch },
  { name: "Explore",  path: "/explore",  icon: FaCompass },
  { name: "Reels",    path: "/reels",    icon: FaVideo },
  { name: "Messages", path: "/messages", icon: FaFacebookMessenger },
  { name: "Profile",  path: "/profile",  icon: FaUser },
  { name: "Saved",    path: "/saved",    icon: FaBookmark },
  { name: "Settings", path: "/settings", icon: FaCog },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <aside
      className="hidden md:flex sticky left-0 top-0 w-[244px] bg-black border-r border-zinc-900 flex-col z-50"
      style={{ height: "100dvh" }}
    >
      {/* LOGO */}
      <div className="px-6 py-7 shrink-0">
        <span className="text-[26px] font-black tracking-tight gradient-text">Instagram</span>
      </div>

      {/* NAV LINKS */}
      <nav className="flex-1 px-3 overflow-y-auto no-scrollbar">
        <div className="flex flex-col gap-0.5">
          {links.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-zinc-900 text-white font-semibold"
                    : "text-zinc-400 hover:bg-zinc-900/60 hover:text-white"
                }`
              }
            >
              <Icon className="text-[18px] shrink-0" />
              {name}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* BOTTOM USER CARD */}
      <div className="px-4 py-5 border-t border-zinc-900 shrink-0">
        <div className="flex items-center gap-3">
          <div
            className="rounded-full flex items-center justify-center font-bold text-sm shrink-0"
            style={{ width: "38px", height: "38px", minWidth: "38px", background: "linear-gradient(135deg,#f09433,#dc2743,#bc1888)" }}
          >
            RP
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">raja_premium</p>
            <p className="text-xs text-zinc-500 truncate">Raja</p>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            className="text-zinc-500 hover:text-white transition p-1 shrink-0"
          >
            <FaSignOutAlt className="text-base" />
          </button>
        </div>
      </div>
    </aside>
  );
}
