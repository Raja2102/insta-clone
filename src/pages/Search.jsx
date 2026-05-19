import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toggleFollow } from "../features/follow/followSlice";
import { FaSearch, FaTimes } from "react-icons/fa";

const users = [
  { id: 1, username: "john_doe",  name: "John Doe",     initials: "JD", color: "#F59E0B", posts: 48,  followers: "12.3K" },
  { id: 2, username: "emma_w",    name: "Emma Watson",  initials: "EW", color: "#8B5CF6", posts: 142, followers: "24.5K" },
  { id: 3, username: "alex_c",    name: "Alex Carter",  initials: "AC", color: "#3B82F6", posts: 89,  followers: "12.1K" },
  { id: 4, username: "sophia_l",  name: "Sophia Lee",   initials: "SL", color: "#EC4899", posts: 203, followers: "51.2K" },
  { id: 5, username: "james_s",   name: "James Smith",  initials: "JS", color: "#10B981", posts: 67,  followers: "8.9K"  },
  { id: 6, username: "raja_p",    name: "Raja Premium", initials: "RP", color: "#F59E0B", posts: 312, followers: "103K"  },
  { id: 7, username: "mike_t",    name: "Mike Torres",  initials: "MT", color: "#EF4444", posts: 45,  followers: "5.2K"  },
];

export default function Search() {
  const dispatch = useDispatch();
  const following = useSelector((s) => s.follow.following);
  const [query, setQuery] = useState("");

  const filtered = users.filter(
    (u) =>
      u.username.toLowerCase().includes(query.toLowerCase()) ||
      u.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-[700px] mx-auto px-4 pt-6 pb-20">
      <h1 className="text-2xl font-bold mb-5">Search</h1>

      {/* SEARCH INPUT */}
      <div className="relative mb-8">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm" />
        <input
          type="text"
          placeholder="Search users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-10 pr-10 py-3.5 text-sm outline-none focus:border-zinc-600 transition placeholder:text-zinc-600"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {/* RESULTS */}
      <div className="space-y-2">
        <AnimatePresence>
          {filtered.map((user, i) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center justify-between bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-900 rounded-2xl px-4 py-4 transition cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div
                  className="rounded-full flex items-center justify-center text-white font-bold text-base shrink-0"
                  style={{ width: "52px", height: "52px", minWidth: "52px", backgroundColor: user.color }}
                >
                  {user.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm">{user.username}</p>
                  <p className="text-zinc-500 text-xs mt-0.5">{user.name}</p>
                  <p className="text-zinc-700 text-xs mt-0.5">{user.posts} posts · {user.followers} followers</p>
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); dispatch(toggleFollow(user.username)); }}
                className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition shrink-0 ${
                  following.includes(user.username)
                    ? "bg-zinc-700 hover:bg-zinc-600 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {following.includes(user.username) ? "Following" : "Follow"}
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-zinc-600">
            <FaSearch className="text-4xl mx-auto mb-3 opacity-20" />
            <p className="text-sm">No results for "{query}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
