import { useState } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaComment } from "react-icons/fa";

const tabs = ["For You", "Trending", "Following", "Art", "Travel", "Food", "Fashion"];

const grid = [
  { id: 1, img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80&auto=format&fit=crop", likes: "12.3K", comments: 234, tall: true },
  { id: 2, img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80&auto=format&fit=crop", likes: "8.7K",  comments: 145 },
  { id: 3, img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80&auto=format&fit=crop", likes: "5.1K",  comments: 89 },
  { id: 4, img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80&auto=format&fit=crop", likes: "3.4K",  comments: 67,  tall: true },
  { id: 5, img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80&auto=format&fit=crop", likes: "21.5K", comments: 412 },
  { id: 6, img: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=80&auto=format&fit=crop", likes: "9.2K",  comments: 178 },
  { id: 7, img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80&auto=format&fit=crop", likes: "14.6K", comments: 289, tall: true },
  { id: 8, img: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&q=80&auto=format&fit=crop", likes: "7.8K",  comments: 156 },
  { id: 9, img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80&auto=format&fit=crop", likes: "18.2K", comments: 334 },
  { id:10, img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80&auto=format&fit=crop", likes: "6.4K",  comments: 102, tall: true },
  { id:11, img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600&q=80&auto=format&fit=crop", likes: "11.1K", comments: 213 },
  { id:12, img: "https://images.unsplash.com/photo-1499678329028-101435549a4e?w=600&q=80&auto=format&fit=crop", likes: "4.3K",  comments: 78 },
];

export default function Explore() {
  const [activeTab, setActiveTab] = useState("For You");

  return (
    <div className="max-w-[1100px] mx-auto px-3 pt-5 pb-20">
      <h1 className="text-2xl font-bold mb-5 px-1">Explore</h1>

      {/* TABS */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 mb-5 px-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition shrink-0 ${
              activeTab === tab ? "bg-white text-black" : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* MASONRY */}
      <div className="columns-2 md:columns-3 gap-1 space-y-1">
        {grid.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
            className="relative overflow-hidden rounded-lg group cursor-pointer break-inside-avoid mb-1"
          >
            <img
              src={p.img}
              alt=""
              className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
              style={{ aspectRatio: p.tall ? "3/4" : "1/1" }}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-5">
              <div className="flex items-center gap-2 font-bold text-sm drop-shadow">
                <FaHeart /> {p.likes}
              </div>
              <div className="flex items-center gap-2 font-bold text-sm drop-shadow">
                <FaComment /> {p.comments}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
