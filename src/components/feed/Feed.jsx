import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PostCard from "./PostCard";

function Skeleton() {
  return (
    <div className="border border-zinc-900 rounded-2xl overflow-hidden mb-4 animate-pulse">
      <div className="flex items-center gap-3 p-4">
        <div className="w-10 h-10 rounded-full bg-zinc-800" />
        <div className="flex-1">
          <div className="h-3 w-28 bg-zinc-800 rounded mb-2" />
          <div className="h-2 w-20 bg-zinc-800 rounded" />
        </div>
      </div>
      <div className="w-full bg-zinc-900" style={{ aspectRatio: "1/1" }} />
      <div className="p-4 space-y-3">
        <div className="h-3 w-24 bg-zinc-800 rounded" />
        <div className="h-3 w-full bg-zinc-800 rounded" />
        <div className="h-3 w-2/3 bg-zinc-800 rounded" />
      </div>
    </div>
  );
}

export default function Feed() {
  const posts = useSelector((s) => s.posts.posts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  if (loading) return (
    <div>
      <Skeleton />
      <Skeleton />
    </div>
  );

  return (
    <div>
      {posts.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  );
}
