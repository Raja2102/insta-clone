import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const stories = [
  { id: 0, username: "Your Story", initials: "+", color: "#27272a", isYou: true },
  { id: 1, username: "john_doe",  initials: "JD", color: "#F59E0B" },
  { id: 2, username: "emma_w",    initials: "EW", color: "#8B5CF6" },
  { id: 3, username: "alex_c",    initials: "AC", color: "#3B82F6" },
  { id: 4, username: "sophia_l",  initials: "SL", color: "#EC4899" },
  { id: 5, username: "james_s",   initials: "JS", color: "#10B981" },
  { id: 6, username: "mike_t",    initials: "MT", color: "#EF4444" },
  { id: 7, username: "lisa_m",    initials: "LM", color: "#06B6D4" },
];

function StoryModal({ story, onClose }) {
  return (
    <AnimatePresence>
      {story && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-[360px] rounded-3xl overflow-hidden bg-zinc-900 flex flex-col items-center justify-center"
            style={{ height: "75vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* PROGRESS BAR */}
            <div className="absolute top-4 left-4 right-4">
              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  onAnimationComplete={onClose}
                  className="h-full bg-white rounded-full"
                />
              </div>
            </div>
            {/* USER INFO */}
            <div className="absolute top-9 left-4 flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs"
                style={{ backgroundColor: story.color }}
              >
                {story.initials}
              </div>
              <p className="text-sm font-semibold">{story.username}</p>
              <p className="text-xs text-zinc-400">2h</p>
            </div>
            {/* CLOSE */}
            <button onClick={onClose} className="absolute top-9 right-4 text-2xl text-zinc-400 hover:text-white">×</button>
            {/* BIG AVATAR */}
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center font-black text-4xl opacity-40"
              style={{ backgroundColor: story.color }}
            >
              {story.initials}
            </div>
            <p className="text-zinc-500 text-sm mt-4">Story content here</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Stories() {
  const [active, setActive] = useState(null);

  return (
    <>
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1 mb-5">
        {stories.map((s) => (
          <button
            key={s.id}
            onClick={() => !s.isYou && setActive(s)}
            className="flex flex-col items-center gap-2 shrink-0 group"
          >
            {s.isYou ? (
              <div
                className="w-[60px] h-[60px] rounded-full flex items-center justify-center font-bold text-2xl border-2 border-dashed border-zinc-700 hover:border-zinc-500 transition"
                style={{ backgroundColor: s.color }}
              >
                {s.initials}
              </div>
            ) : (
              <div className="story-ring group-hover:opacity-90 transition">
                <div className="story-ring-inner">
                  <div
                    className="w-[54px] h-[54px] rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ backgroundColor: s.color }}
                  >
                    {s.initials}
                  </div>
                </div>
              </div>
            )}
            <p className="text-[11px] text-zinc-500 w-[60px] text-center truncate">{s.username}</p>
          </button>
        ))}
      </div>
      <StoryModal story={active} onClose={() => setActive(null)} />
    </>
  );
}
