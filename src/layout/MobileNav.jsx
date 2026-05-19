import { NavLink } from "react-router-dom";
import { FaHome, FaSearch, FaCompass, FaVideo, FaUser } from "react-icons/fa";

const links = [
  { icon: FaHome, path: "/" },
  { icon: FaSearch, path: "/search" },
  { icon: FaCompass, path: "/explore" },
  { icon: FaVideo, path: "/reels" },
  { icon: FaUser, path: "/profile" },
];

export default function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[60px] bg-black border-t border-zinc-900 flex items-center justify-around z-50">
      {links.map(({ icon: Icon, path }) => (
        <NavLink
          key={path}
          to={path}
          end={path === "/"}
          className={({ isActive }) =>
            `flex items-center justify-center w-12 h-12 rounded-xl transition ${isActive ? "text-white" : "text-zinc-600"}`
          }
        >
          <Icon className="text-[22px]" />
        </NavLink>
      ))}
    </nav>
  );
}
