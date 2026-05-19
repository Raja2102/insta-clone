import { createSlice } from "@reduxjs/toolkit";

const posts = [
  {
    id: 1, username: "john_doe", userInitials: "JD", userColor: "#F59E0B",
    caption: "Golden hour never hits different 🌅✨ #nature #travel #photography",
    likes: ["u1","u2","u3","u4","u5"],
    comments: [
      { user: "emma_w", text: "Absolutely stunning! 😍" },
      { user: "alex_c", text: "Where is this? 🔥" },
    ],
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    time: "2h", location: "Yosemite, CA",
  },
  {
    id: 2, username: "emma_w", userInitials: "EW", userColor: "#8B5CF6",
    caption: "Coffee & aesthetic mornings ☕🤍 Starting the day right",
    likes: ["u1","u2"],
    comments: [{ user: "james_s", text: "Vibes only ✨" }],
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop",
    time: "4h", location: "New York",
  },
  {
    id: 3, username: "alex_c", userInitials: "AC", userColor: "#3B82F6",
    caption: "Mountain therapy 🏔️ Nothing like fresh alpine air to reset your mind",
    likes: ["u1","u2","u3"],
    comments: [],
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
    time: "6h", location: "Swiss Alps",
  },
  {
    id: 4, username: "sophia_l", userInitials: "SL", userColor: "#EC4899",
    caption: "City lights & big dreams 🌃💫 #nyc #nightphotography",
    likes: ["u1","u2","u3","u4","u5","u6"],
    comments: [
      { user: "raja_p", text: "This city 🖤" },
      { user: "mike_t", text: "NYC always delivering 🙌" },
    ],
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1200&auto=format&fit=crop",
    time: "8h", location: "New York City",
  },
  {
    id: 5, username: "raja_p", userInitials: "RP", userColor: "#10B981",
    caption: "Ocean therapy 🌊 Peace is a place, not just a feeling",
    likes: [],
    comments: [],
    image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=1200&auto=format&fit=crop",
    time: "12h", location: "Maldives",
  },
  {
    id: 6, username: "mike_t", userInitials: "MT", userColor: "#EF4444",
    caption: "Speed is life 🏎️🔥 Nothing beats a track day",
    likes: ["u1","u2","u3"],
    comments: [{ user: "john_doe", text: "What a beast 🔥" }],
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
    time: "1d", location: "Dubai",
  },
];

const postSlice = createSlice({
  name: "posts",
  initialState: { posts },
  reducers: {
    toggleLike: (state, action) => {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) {
        const idx = post.likes.indexOf("you");
        if (idx > -1) post.likes.splice(idx, 1);
        else post.likes.push("you");
      }
    },
    addComment: (state, action) => {
      const { postId, comment } = action.payload;
      const post = state.posts.find((p) => p.id === postId);
      if (post) post.comments.push(comment);
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
  },
});

export const { toggleLike, addComment, addPost } = postSlice.actions;
export default postSlice.reducer;
