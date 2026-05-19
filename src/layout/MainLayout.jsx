import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileNav from "./MobileNav";

export default function MainLayout() {
  const { pathname } = useLocation();
  const isMessages = pathname === "/messages";
  const isReels = pathname === "/reels";
  const noTopbar = isMessages || isReels;

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* ── SIDEBAR (desktop only) ── */}
      <Sidebar />

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col md:ml-[244px] min-w-0">
        {!noTopbar && <Topbar />}

        <main className={`flex-1 ${!noTopbar ? "pt-[64px]" : ""} pb-[60px] md:pb-0`}>
          <Outlet />
        </main>
      </div>

      {/* ── MOBILE BOTTOM NAV ── */}
      <MobileNav />
    </div>
  );
}
