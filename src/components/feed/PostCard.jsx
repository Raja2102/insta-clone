import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeart, FaRegHeart, FaRegComment, FaBookmark, FaRegBookmark,
  FaPaperPlane, FaEllipsisH, FaMapMarkerAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike, addComment } from "../../features/posts/postSlice";
import { toggleSave } from "../../features/saved/savedSlice";

export default function PostCard({ post }) {
  const dispatch = useDispatch();
  const savedPosts = useSelector((s) => s.saved.savedPosts);
  const liked = post.likes.includes("you");
  const saved = savedPosts.includes(post.id);
  const [showHeart, setShowHeart] = useState(false);
  const [comment, setComment] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleDoubleClick = () => {
    if (!liked) dispatch(toggleLike(post.id));
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 900);
  };

  const handleComment = () => {
    if (!comment.trim()) return;
    dispatch(addComment({ postId: post.id, comment: { user: "you", text: comment } }));
    setComment("");
    setShowAll(true);
  };

  return (
    <article className="bg-black border-b border-zinc-900 md:border md:border-zinc-900 md:rounded-2xl overflow-hidden mb-1 md:mb-4">

      {/* ── HEADER ── */}
      <div className="flex items-center justify-between px-4 py-3.5">
        <div className="flex items-center gap-3">
          <div className="story-ring cursor-pointer">
            <div className="story-ring-inner">
              <div
                className="w-[34px] h-[34px] rounded-full flex items-center justify-center font-bold text-xs"
                style={{ backgroundColor: post.userColor }}
              >
                {post.userInitials}
              </div>
            </div>
          </div>
          <div>
            <p className="font-semibold text-sm leading-tight">{post.username}</p>
            {post.location && (
              <p className="text-zinc-500 text-[11px] flex items-center gap-1">
                <FaMapMarkerAlt className="text-[10px]" /> {post.location}
              </p>
            )}
          </div>
        </div>
        <button className="text-zinc-500 hover:text-white transition p-1">
          <FaEllipsisH />
        </button>
      </div>

      {/* ── IMAGE ── */}
      <div className="relative bg-zinc-950 cursor-pointer" onDoubleClick={handleDoubleClick}>
        {!imgLoaded && (
          <div className="w-full bg-zinc-900 animate-pulse" style={{ aspectRatio: "1/1" }} />
        )}
        <img
          src={post.image}
          alt={post.caption}
          onLoad={() => setImgLoaded(true)}
          className={`w-full object-cover transition-opacity duration-300 ${imgLoaded ? "opacity-100" : "opacity-0 absolute inset-0"}`}
          style={{ maxHeight: "585px" }}
        />
        <AnimatePresence>
          {showHeart && (
            <motion.div
              initial={{ scale: 0, opacity: 0.9 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <FaHeart style={{ fontSize: "88px", color: "white", filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.5))" }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── ACTIONS ── */}
      <div className="px-4 pt-3 pb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <motion.button whileTap={{ scale: 1.3 }} onClick={() => dispatch(toggleLike(post.id))}>
              {liked
                ? <FaHeart className="text-[24px] text-red-500" />
                : <FaRegHeart className="text-[24px] hover:text-zinc-300 transition" />
              }
            </motion.button>
            <button className="hover:text-zinc-300 transition">
              <FaRegComment className="text-[22px]" />
            </button>
            <button className="hover:text-zinc-300 transition">
              <FaPaperPlane className="text-[21px]" />
            </button>
          </div>
          <motion.button whileTap={{ scale: 1.2 }} onClick={() => dispatch(toggleSave(post.id))}>
            {saved
              ? <FaBookmark className="text-[22px]" />
              : <FaRegBookmark className="text-[22px] hover:text-zinc-300 transition" />
            }
          </motion.button>
        </div>

        {/* LIKES COUNT */}
        <p className="font-bold text-sm mb-2">
          {post.likes.length.toLocaleString()} {post.likes.length === 1 ? "like" : "likes"}
        </p>

        {/* CAPTION */}
        <p className="text-sm leading-snug mb-1">
          <span className="font-semibold mr-1.5">{post.username}</span>
          {post.caption}
        </p>

        {/* COMMENTS */}
        {post.comments.length > 0 && !showAll && (
          <button onClick={() => setShowAll(true)} className="text-zinc-500 text-sm mt-1">
            View all {post.comments.length} comments
          </button>
        )}
        <AnimatePresence>
          {showAll && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 space-y-1.5"
            >
              {post.comments.map((c, i) => (
                <p key={i} className="text-sm">
                  <span className="font-semibold mr-1.5">{c.user}</span>{c.text}
                </p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* TIME */}
        <p className="text-zinc-600 text-[11px] mt-2 uppercase tracking-wide">{post.time} ago</p>

        {/* ADD COMMENT */}
        <div className="flex items-center gap-3 border-t border-zinc-900 mt-3 pt-3">
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleComment()}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-700"
          />
          {comment.trim() && (
            <button onClick={handleComment} className="text-blue-500 font-semibold text-sm shrink-0">Post</button>
          )}
        </div>
      </div>
    </article>
  );
}
