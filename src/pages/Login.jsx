import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import { motion } from "framer-motion";

export default function Login() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    dispatch(login({ username: form.username }));
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-[380px]">

        {/* CARD */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-black border border-zinc-800 rounded-2xl p-10 mb-3"
        >
          {/* LOGO */}
          <h1 className="text-[36px] font-black text-center mb-8 gradient-text tracking-tight">
            Instagram
          </h1>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              name="username"
              type="text"
              placeholder="Username or email"
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-zinc-500 transition placeholder:text-zinc-600"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-zinc-500 transition placeholder:text-zinc-600"
            />

            {error && <p className="text-red-400 text-xs text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading || !form.username || !form.password}
              className="w-full py-3 rounded-xl font-bold text-sm transition mt-1 disabled:opacity-40"
              style={{ background: "linear-gradient(135deg,#f09433,#dc2743,#bc1888)" }}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center gap-4 my-5">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-zinc-600 text-xs font-semibold">OR</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          {/* DEMO LOGIN */}
          <button
            onClick={() => dispatch(login({ username: "demo_user" }))}
            className="w-full py-3 rounded-xl font-semibold text-sm bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition"
          >
            Continue as Demo User
          </button>

          <p className="text-center mt-5">
            <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
          </p>
        </motion.div>

        {/* REGISTER LINK */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-black border border-zinc-800 rounded-2xl p-5 text-center text-sm"
        >
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 font-bold hover:underline">Sign up</Link>
        </motion.div>

        {/* APP DOWNLOAD */}
        <div className="text-center mt-6">
          <p className="text-zinc-600 text-xs mb-3">Get the app.</p>
          <div className="flex justify-center gap-3">
            <button className="px-4 py-2 border border-zinc-700 rounded-lg text-xs text-zinc-400 hover:border-zinc-500 transition">App Store</button>
            <button className="px-4 py-2 border border-zinc-700 rounded-lg text-xs text-zinc-400 hover:border-zinc-500 transition">Google Play</button>
          </div>
        </div>

      </div>
    </div>
  );
}
