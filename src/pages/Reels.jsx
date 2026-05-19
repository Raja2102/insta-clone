import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaHeart, FaRegHeart, FaComment, FaPaperPlane,
  FaVolumeUp, FaVolumeMute, FaEllipsisV, FaBookmark,
} from "react-icons/fa";

const reels = [
  { id: 1, username: "emma_w",   initials: "EW", color: "#8B5CF6", caption: "Morning routine ☀️✨ #lifestyle #morning",     likes: 24500, comments: 312, bg: "from-purple-950 via-zinc-900 to-black" },
  { id: 2, username: "alex_c",   initials: "AC", color: "#3B82F6", caption: "Mountain hike 🏔️ Worth every single step!",    likes: 18200, comments: 245, bg: "from-blue-950 via-zinc-900 to-black" },
  { id: 3, username: "sophia_l", initials: "SL", color: "#EC4899", caption: "NYC at night 🌃 The city that never sleeps",   likes: 51000, comments: 678, bg: "from-pink-950 via-zinc-900 to-black" },
  { id: 4, username: "mike_t",   initials: "MT", color: "#EF4444", caption: "Track day 🏎️🔥 Nothing beats this feeling!",   likes: 32100, comments: 401, bg: "from-red-950 via-zinc-900 to-black" },
];

export default function Reels() {
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});
  const [muted, setMuted] = useState(true);

  return (
    <div className="h-[calc(100dvh-64px)] overflow-y-scroll snap-y snap-mandatory no-scrollbar">
      {reels.map((reel) => (
        <div
          key={reel.id}
          className={`relative h-[calc(100dvh-64px)] w-full snap-start flex-shrink-0 flex items-center justify-center bg-gradient-to-b ${reel.bg} overflow-hidden`}
        >
          {/* FAKE VIDEO BG */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-64 h-64 rounded-full opacity-10 blur-3xl"
              style={{ backgroundColor: reel.color }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center font-black text-6xl"
              style={{ backgroundColor: reel.color }}
            >
              {reel.initials}
            </div>
          </div>

          {/* GRADIENT OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

          {/* MUTE */}
          <button
            onClick={() => setMuted((p) => !p)}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/40 flex items-center justify-center z-10"
          >
            {muted ? <FaVolumeMute className="text-sm" /> : <FaVolumeUp className="text-sm" />}
          </button>

          {/* BOTTOM INFO */}
          <div className="absolute bottom-6 left-4 right-16 z-10">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="rounded-full flex items-center justify-center font-bold text-xs border-2 border-white shrink-0"
                style={{ width: "34px", height: "34px", minWidth: "34px", backgroundColor: reel.color }}
              >
                {reel.initials}
              </div>
              <p className="font-semibold text-sm">{reel.username}</p>
              <button className="px-3 py-0.5 border border-white rounded-lg text-xs font-semibold">Follow</button>
            </div>
            <p className="text-sm leading-relaxed">{reel.caption}</p>
            <div className="flex items-center gap-2 mt-2">
              {["#reels","#viral","#explore"].map((t) => (
                <span key={t} className="text-xs text-blue-400">{t}</span>
              ))}
            </div>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="absolute bottom-10 right-4 flex flex-col items-center gap-5 z-10">
            <button
              className="flex flex-col items-center gap-1"
              onClick={() => setLiked((p) => ({ ...p, [reel.id]: !p[reel.id] }))}
            >
              <motion.div whileTap={{ scale: 1.3 }}>
                {liked[reel.id]
                  ? <FaHeart className="text-[28px] text-red-500" />
                  : <FaRegHeart className="text-[28px]" />}
              </motion.div>
              <span className="text-xs">
                {(reel.likes + (liked[reel.id] ? 1 : 0)).toLocaleString()}
              </span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <FaComment className="text-[26px]" />
              <span className="text-xs">{reel.comments}</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <FaPaperPlane className="text-[24px]" />
              <span className="text-xs">Share</span>
            </button>
            <button
              className="flex flex-col items-center gap-1"
              onClick={() => setSaved((p) => ({ ...p, [reel.id]: !p[reel.id] }))}
            >
              <FaBookmark className={`text-[24px] ${saved[reel.id] ? "text-white" : "text-zinc-300"}`} />
            </button>
            <button><FaEllipsisV className="text-[22px]" /></button>
          </div>
        </div>
      ))}
    </div>
  );
}
