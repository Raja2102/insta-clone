import Feed from "../components/feed/Feed";
import Stories from "../components/stories/Stories";
import RightSidebar from "../layout/RightSidebar";

export default function Home() {
  return (
    <div className="flex justify-center min-h-full">
      {/* CENTER FEED */}
      <div className="flex-1 max-w-[630px] px-0 md:px-4 pt-5 pb-10">
        <Stories />
        <Feed />
      </div>
      {/* RIGHT PANEL */}
      <RightSidebar />
    </div>
  );
}
