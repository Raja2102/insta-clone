import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { FaBookmark } from "react-icons/fa";

const allPosts = [
  { id: 1, img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80&auto=format&fit=crop" },
  { id: 2, img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80&auto=format&fit=crop" },
  { id: 3, img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80&auto=format&fit=crop" },
  { id: 4, img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80&auto=format&fit=crop" },
  { id: 5, img: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=80&auto=format&fit=crop" },
];

export default function Saved() {
  const savedIds = useSelector((s) => s.saved.savedPosts);
  const saved = allPosts.filter((p) => savedIds.includes(p.id));

  return (
    <div className="max-w-[935px] mx-auto px-4 pt-8 pb-20">
      <div className="flex items-center gap-3 mb-7">
        <FaBookmark className="text-xl" />
        <h1 className="text-2xl font-bold">Saved</h1>
        <span className="ml-auto text-zinc-600 text-sm">{saved.length} posts</span>
      </div>

      {saved.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-24"
        >
          <FaBookmark className="text-6xl mx-auto mb-5 text-zinc-800" />
          <h2 className="text-xl font-semibold mb-2">Save photos and videos</h2>
          <p className="text-zinc-600 text-sm max-w-[260px] mx-auto leading-relaxed">
            Tap the bookmark icon on any post to save it here for later.
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-3 gap-0.5">
          {saved.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              className="relative overflow-hidden cursor-pointer group"
              style={{ aspectRatio: "1/1" }}
            >
              <img
                src={p.img}
                alt=""
                className="w-full h-full object-cover group-hover:brightness-75 transition duration-300"
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
