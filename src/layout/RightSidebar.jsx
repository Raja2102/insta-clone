import { useDispatch, useSelector } from "react-redux";
import { toggleFollow } from "../features/follow/followSlice";

const suggested = [
  { id: 1, username: "emma_w",   name: "Emma Watson",  initials: "EW", color: "#8B5CF6", label: "Suggested for you" },
  { id: 2, username: "alex_c",   name: "Alex Carter",  initials: "AC", color: "#3B82F6", label: "Follows you" },
  { id: 3, username: "sophia_l", name: "Sophia Lee",   initials: "SL", color: "#EC4899", label: "Popular creator" },
  { id: 4, username: "james_s",  name: "James Smith",  initials: "JS", color: "#10B981", label: "Suggested for you" },
  { id: 5, username: "mike_t",   name: "Mike Torres",  initials: "MT", color: "#EF4444", label: "New to Instagram" },
];

export default function RightSidebar() {
  const dispatch = useDispatch();
  const following = useSelector((s) => s.follow.following);

  return (
    <aside className="hidden sticky md:flex flex-col w-[320px] shrink-0 pt-8 pl-8 pr-2"
              
            style={{ height: "100dvh" }}
    >
      {/* CURRENT USER */}
      <div className="flex items-center gap-3 mb-7">
        <div
          className="rounded-full flex items-center justify-center font-bold text-sm shrink-0"
          style={{ width: "46px", height: "46px", minWidth: "46px", background: "linear-gradient(135deg,#f09433,#dc2743,#bc1888)" }}
        >
          RP
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm">raja_premium</p>
          <p className="text-xs text-zinc-500">Raja</p>
        </div>
        <button className="text-xs font-bold text-blue-500 hover:text-blue-400 transition shrink-0">Switch</button>
      </div>

      {/* SUGGESTIONS HEADER */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-zinc-500">Suggested for you</p>
        <button className="text-xs font-bold text-white hover:text-zinc-300 transition">See All</button>
      </div>

      {/* SUGGESTION LIST */}
      <div className="flex flex-col gap-4">
        {suggested.map((u) => (
          <div key={u.id} className="flex items-center gap-3">
            <div
              className="rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0"
              style={{ width: "38px", height: "38px", minWidth: "38px", backgroundColor: u.color }}
            >
              {u.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{u.username}</p>
              <p className="text-xs text-zinc-500 truncate">{u.label}</p>
            </div>
            <button
              onClick={() => dispatch(toggleFollow(u.username))}
              className={`text-xs font-bold shrink-0 transition ${
                following.includes(u.username) ? "text-zinc-500 hover:text-zinc-300" : "text-blue-500 hover:text-blue-400"
              }`}
            >
              {following.includes(u.username) ? "Following" : "Follow"}
            </button>
          </div>
        ))}
      </div>

      {/* FOOTER LINKS */}
      <p className="text-zinc-700 text-[11px] mt-8 leading-relaxed">
        About · Help · Press · API · Jobs · Privacy · Terms
        <br /><br />
        © 2026 Instagram Clone by Raja
      </p>
    </aside>
  );
}
