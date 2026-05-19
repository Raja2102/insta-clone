import { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaArrowLeft, FaVideo, FaPhone, FaInfo } from "react-icons/fa";

const contacts = [
  { id: 1, username: "emma_w",   name: "Emma Watson",  initials: "EW", color: "#8B5CF6", online: true,  lastMsg: "Hey! 👋 How are you?", time: "2m",  unread: 2 },
  { id: 2, username: "alex_c",   name: "Alex Carter",  initials: "AC", color: "#3B82F6", online: false, lastMsg: "That looks amazing!", time: "15m", unread: 0 },
  { id: 3, username: "sophia_l", name: "Sophia Lee",   initials: "SL", color: "#EC4899", online: true,  lastMsg: "See you tomorrow 😊",  time: "1h",  unread: 1 },
  { id: 4, username: "james_s",  name: "James Smith",  initials: "JS", color: "#10B981", online: false, lastMsg: "Thanks a lot! 🙏",      time: "3h",  unread: 0 },
  { id: 5, username: "mike_t",   name: "Mike Torres",  initials: "MT", color: "#EF4444", online: false, lastMsg: "🔥🔥🔥",                time: "5h",  unread: 0 },
];

const initMessages = {
  1: [
    { from: "emma_w", text: "Hey! 👋 How are you?" },
    { from: "me",     text: "I'm great! How about you?" },
    { from: "emma_w", text: "Doing amazing! Loved your last post ❤️" },
    { from: "me",     text: "Aww thanks! 😊" },
  ],
  2: [{ from: "alex_c", text: "That looks amazing!" }],
  3: [{ from: "sophia_l", text: "See you tomorrow 😊" }],
  4: [{ from: "james_s",  text: "Thanks a lot! 🙏" }],
  5: [{ from: "mike_t",   text: "🔥🔥🔥" }],
};

export default function Messages() {
  const [selected, setSelected] = useState(contacts[0]);
  const [messages, setMessages] = useState(initMessages);
  const [input, setInput] = useState("");
  const [showChat, setShowChat] = useState(false);

  const send = () => {
    if (!input.trim()) return;
    setMessages((p) => ({ ...p, [selected.id]: [...(p[selected.id] || []), { from: "me", text: input }] }));
    setInput("");
  };

  const selectContact = (c) => { setSelected(c); setShowChat(true); };

  return (
    <div className="flex h-[calc(100dvh-64px)] bg-black">
      {/* CONTACTS */}
      <div className={`${showChat ? "hidden md:flex" : "flex"} flex-col w-full md:w-[360px] border-r border-zinc-900 shrink-0`}>
        <div className="p-5 border-b border-zinc-900">
          <h2 className="text-xl font-bold">Messages</h2>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {contacts.map((c) => (
            <button
              key={c.id}
              onClick={() => selectContact(c)}
              className={`w-full flex items-center gap-3 px-4 py-4 hover:bg-zinc-900/60 transition text-left ${selected.id === c.id ? "bg-zinc-900/40" : ""}`}
            >
              <div className="relative shrink-0">
                <div
                  className="rounded-full flex items-center justify-center font-bold text-sm"
                  style={{ width: "52px", height: "52px", backgroundColor: c.color }}
                >
                  {c.initials}
                </div>
                {c.online && <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 border-2 border-black rounded-full" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm">{c.username}</p>
                  <p className="text-zinc-600 text-xs">{c.time}</p>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <p className="text-zinc-500 text-xs truncate flex-1">{c.lastMsg}</p>
                  {c.unread > 0 && (
                    <span className="ml-2 w-5 h-5 bg-blue-500 rounded-full text-[10px] flex items-center justify-center font-bold shrink-0">{c.unread}</span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CHAT */}
      <div className={`${showChat ? "flex" : "hidden md:flex"} flex-1 flex-col`}>
        {/* HEADER */}
        <div className="h-[64px] border-b border-zinc-900 flex items-center gap-3 px-4 shrink-0">
          <button className="md:hidden text-zinc-400 hover:text-white p-1" onClick={() => setShowChat(false)}>
            <FaArrowLeft />
          </button>
          <div className="relative">
            <div
              className="rounded-full flex items-center justify-center font-bold text-sm shrink-0"
              style={{ width: "40px", height: "40px", backgroundColor: selected.color }}
            >
              {selected.initials}
            </div>
            {selected.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm">{selected.username}</p>
            <p className="text-xs text-zinc-500">{selected.online ? "Active now" : "Offline"}</p>
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <button className="hover:text-white transition"><FaPhone /></button>
            <button className="hover:text-white transition"><FaVideo /></button>
            <button className="hover:text-white transition"><FaInfo /></button>
          </div>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-3">
          {(messages[selected.id] || []).map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"} gap-2 items-end`}
            >
              {msg.from !== "me" && (
                <div
                  className="rounded-full flex items-center justify-center font-bold text-[10px] shrink-0"
                  style={{ width: "28px", height: "28px", minWidth: "28px", backgroundColor: selected.color }}
                >
                  {selected.initials}
                </div>
              )}
              <div
                className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.from === "me"
                    ? "bg-blue-600 text-white rounded-br-sm"
                    : "bg-zinc-800 text-white rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </div>

        {/* INPUT */}
        <div className="p-4 border-t border-zinc-900 flex items-center gap-3">
          <input
            type="text"
            placeholder={`Message ${selected.username}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 text-sm outline-none focus:border-zinc-700 transition placeholder:text-zinc-600"
          />
          <button
            onClick={send}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 flex items-center justify-center transition shrink-0"
          >
            <FaPaperPlane className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
}
