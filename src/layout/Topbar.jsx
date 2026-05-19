import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaBell } from "react-icons/fa";
import { markAllRead } from "../features/notifications/notificationSlice";

export default function Topbar() {
  const dispatch = useDispatch();
  const notifications = useSelector((s) => s.notifications.notifications);
  const unread = notifications.filter((n) => !n.read).length;
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleBell = () => {
    setOpen((p) => !p);
    if (unread) dispatch(markAllRead());
  };

  return (
    <header className=" top-0 left-0 right-0 sticky md:left-[244px] h-[64px] glass border-b border-zinc-900 flex items-center justify-between px-5 md:px-8 z-40">

      {/* LEFT */}
      <div className="md:hidden">
        <span className="text-xl font-black gradient-text">Instagram</span>
      </div>
      <div className="hidden md:block">
        <h2 className="text-base font-semibold text-zinc-200">Home</h2>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3" ref={ref}>
        {/* BELL */}
        <button
          onClick={handleBell}
          className="relative w-10 h-10 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition flex items-center justify-center"
        >
          <FaBell className="text-base" />
          {unread > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-red-500 rounded-full text-[10px] flex items-center justify-center font-bold">
              {unread}
            </span>
          )}
        </button>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute top-14 right-4 w-[340px] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-50">
            <div className="px-5 py-4 border-b border-zinc-800">
              <h3 className="font-bold text-sm">Notifications</h3>
            </div>
            <div className="max-h-[400px] overflow-y-auto no-scrollbar">
              {notifications.map((n) => (
                <div key={n.id} className={`flex items-center gap-3 px-5 py-3.5 hover:bg-zinc-900/60 transition ${!n.read ? "bg-zinc-900/30" : ""}`}>
                  <div
                    className="rounded-full flex items-center justify-center font-bold text-xs shrink-0"
                    style={{ width: "38px", height: "38px", minWidth: "38px", backgroundColor: n.color }}
                  >
                    {n.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm leading-snug">
                      <span className="font-semibold">{n.user}</span>{" "}
                      <span className="text-zinc-300">{n.text}</span>
                    </p>
                    <p className="text-xs text-zinc-600 mt-0.5">{n.time} ago</p>
                  </div>
                  {!n.read && <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AVATAR */}
        <div
          className="rounded-full flex items-center justify-center font-bold text-sm shrink-0 cursor-pointer"
          style={{ width: "36px", height: "36px", minWidth: "36px", background: "linear-gradient(135deg,#f09433,#dc2743,#bc1888)" }}
        >
          RP
        </div>
      </div>
    </header>
  );
}
