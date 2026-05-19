import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toggleTheme } from "../features/theme/themeSlice";
import { logout } from "../features/auth/authSlice";

function Toggle({ on, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${on ? "bg-blue-600" : "bg-zinc-700"}`}
    >
      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${on ? "left-6" : "left-0.5"}`} />
    </button>
  );
}

function Section({ title, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden mb-4"
    >
      <div className="px-6 py-4 border-b border-zinc-900">
        <h2 className="font-bold text-sm text-zinc-400 uppercase tracking-wider">{title}</h2>
      </div>
      <div className="divide-y divide-zinc-900">{children}</div>
    </motion.div>
  );
}

export default function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector((s) => s.theme.darkMode);
  const [notifs, setNotifs] = useState(true);
  const [privateAcc, setPrivateAcc] = useState(false);
  const [twoFA, setTwoFA] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const handleLogout = () => { dispatch(logout()); navigate("/login"); };

  return (
    <div className="max-w-[680px] mx-auto px-4 pt-8 pb-20">
      <h1 className="text-2xl font-bold mb-7">Settings</h1>

      {/* ACCOUNT */}
      <Section title="Account" delay={0}>
        {[
          { label: "Username",    val: "raja_premium" },
          { label: "Full Name",   val: "Raja" },
          { label: "Email",       val: "raja@example.com" },
          { label: "Website",     val: "linktr.ee/raja_premium" },
        ].map((f) => (
          <div key={f.label} className="px-6 py-4">
            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide block mb-1.5">{f.label}</label>
            <input
              defaultValue={f.val}
              className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-zinc-600 transition"
            />
          </div>
        ))}
        <div className="px-6 py-4">
          <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide block mb-1.5">Bio</label>
          <textarea
            rows={3}
            defaultValue="Frontend Developer 🚀 React • Redux • UI/UX"
            className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-sm outline-none resize-none focus:border-zinc-600 transition"
          />
        </div>
      </Section>

      {/* PREFERENCES */}
      <Section title="Preferences" delay={0.1}>
        {[
          { label: "Dark Mode",         sub: "Toggle dark/light theme",         val: darkMode,    fn: () => dispatch(toggleTheme()) },
          { label: "Push Notifications", sub: "Get notified about activity",     val: notifs,      fn: () => setNotifs(!notifs) },
          { label: "Private Account",   sub: "Only followers can see your posts", val: privateAcc, fn: () => setPrivateAcc(!privateAcc) },
          { label: "Two-Factor Auth",   sub: "Add extra security to your account", val: twoFA,     fn: () => setTwoFA(!twoFA) },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between px-6 py-4">
            <div>
              <p className="font-semibold text-sm">{item.label}</p>
              <p className="text-zinc-500 text-xs mt-0.5">{item.sub}</p>
            </div>
            <Toggle on={item.val} onChange={item.fn} />
          </div>
        ))}
      </Section>

      {/* DANGER */}
      <Section title="Account Actions" delay={0.2}>
        <div className="px-6 py-4">
          <button
            onClick={handleLogout}
            className="w-full py-3 border border-zinc-800 hover:bg-zinc-900 rounded-xl text-sm font-semibold transition text-left px-4"
          >
            Log Out
          </button>
        </div>
        <div className="px-6 pb-4">
          <button className="w-full py-3 border border-red-900/60 hover:bg-red-950/30 rounded-xl text-sm font-semibold text-red-400 transition text-left px-4">
            Delete Account
          </button>
        </div>
      </Section>

      {/* SAVE BTN */}
      <motion.button
        onClick={handleSave}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 rounded-2xl font-bold text-base transition relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#f09433,#dc2743,#bc1888)" }}
      >
        {saved ? "✓ Changes Saved!" : "Save Changes"}
      </motion.button>
    </div>
  );
}
