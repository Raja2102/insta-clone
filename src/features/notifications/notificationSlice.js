import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [
      { id: 1, user: "emma_w", initials: "EW", color: "#8B5CF6", text: "liked your photo ❤️", read: false, time: "2m" },
      { id: 2, user: "alex_c", initials: "AC", color: "#3B82F6", text: "started following you", read: false, time: "15m" },
      { id: 3, user: "sophia_l", initials: "SL", color: "#EC4899", text: "commented: 'Amazing! 🔥'", read: false, time: "1h" },
      { id: 4, user: "james_s", initials: "JS", color: "#10B981", text: "liked your story ⚡", read: true, time: "3h" },
      { id: 5, user: "mike_t", initials: "MT", color: "#EF4444", text: "mentioned you in a comment", read: true, time: "5h" },
    ],
  },
  reducers: {
    markAllRead: (state) => { state.notifications.forEach((n) => { n.read = true; }); },
  },
});

export const { markAllRead } = notificationSlice.actions;
export default notificationSlice.reducer;
