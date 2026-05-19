import { useState } from "react";
import { motion } from "framer-motion";
import { FaTh, FaVideo, FaUserTag, FaBookmark, FaLink } from "react-icons/fa";
import { useSelector } from "react-redux";

const myPosts = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80&auto=format&fit=crop",
];

const highlights = [
  { label: "Travel", emoji: "✈️" },
  { label: "Food",   emoji: "🍜" },
  { label: "UI",     emoji: "🎨" },
  { label: "Cars",   emoji: "🏎️" },
  { label: "Life",   emoji: "✨" },
];

const tabs = [
  { key: "posts",  icon: FaTh },
  { key: "reels",  icon: FaVideo },
  { key: "tagged", icon: FaUserTag },
  { key: "saved",  icon: FaBookmark },
];

export default function Profile() {
  const following = useSelector((s) => s.follow.following);
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="max-w-[935px] mx-auto px-4 pt-8 pb-20">

      {/* PROFILE INFO ROW */}
      <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start mb-8">
        {/* AVATAR */}
        <div className="story-ring shrink-0">
          <div className="story-ring-inner">
            <div
              className="rounded-full flex items-center justify-center font-black text-4xl"
              style={{ width: "138px", height: "138px", background: "linear-gradient(135deg,#f09433,#dc2743,#bc1888)" }}
            >
              RP
            </div>
          </div>
        </div>

        {/* INFO */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
            <h1 className="text-xl font-semibold">raja_premium</h1>
            <div className="flex justify-center sm:justify-start gap-2">
              <button className="px-5 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm font-semibold transition">
                Edit Profile
              </button>
              <button className="px-5 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm font-semibold transition">
                Share Profile
              </button>
            </div>
          </div>

          {/* STATS */}
          <div className="flex justify-center sm:justify-start gap-8 mb-5">
            {[
              { label: "posts",     val: myPosts.length },
              { label: "followers", val: `${(24 + following.length)}K` },
              { label: "following", val: following.length },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-bold text-lg leading-tight">{s.val}</p>
                <p className="text-zinc-400 text-sm">{s.label}</p>
              </div>
            ))}
          </div>

          {/* BIO */}
          <div className="text-sm leading-relaxed">
            <p className="font-semibold">Raja ✨</p>
            <p className="text-zinc-300 mt-1">Frontend Developer 🚀<br />React • Redux • UI/UX Design</p>
            <a href="#" className="text-blue-400 flex items-center gap-1.5 mt-1.5 hover:underline w-fit mx-auto sm:mx-0">
              <FaLink className="text-xs" /> linktr.ee/raja_premium
            </a>
          </div>
        </div>
      </div>

      {/* HIGHLIGHTS */}
      <div className="flex gap-6 overflow-x-auto no-scrollbar pb-2 mb-6">
        {highlights.map((h) => (
          <button key={h.label} className="flex flex-col items-center gap-2 shrink-0 group">
            <div className="w-16 h-16 rounded-full border-2 border-zinc-800 group-hover:border-zinc-600 bg-zinc-900 flex items-center justify-center text-2xl transition">
              {h.emoji}
            </div>
            <p className="text-xs text-zinc-400">{h.label}</p>
          </button>
        ))}
      </div>

      {/* TABS */}
      <div className="border-t border-zinc-800">
        <div className="flex justify-center gap-12">
          {tabs.map(({ key, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 py-3 text-sm border-t-2 transition -mt-[2px] ${
                activeTab === key ? "border-white text-white" : "border-transparent text-zinc-600 hover:text-zinc-400"
              }`}
            >
              <Icon />
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      {activeTab === "posts" && (
        <div className="grid grid-cols-3 gap-0.5 mt-0.5">
          {myPosts.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              className="relative overflow-hidden cursor-pointer group"
              style={{ aspectRatio: "1/1" }}
            >
              <img
                src={p}
                alt=""
                className="w-full h-full object-cover group-hover:brightness-75 transition duration-300"
              />
            </motion.div>
          ))}
        </div>
      )}

      {activeTab !== "posts" && (
        <div className="text-center py-20 text-zinc-700">
          <p className="text-5xl mb-3">📷</p>
          <p className="font-semibold">No content yet</p>
        </div>
      )}
    </div>
  );
}
