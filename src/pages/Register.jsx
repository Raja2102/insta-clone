import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import { motion } from "framer-motion";

export default function Register() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: "", fullname: "", username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    dispatch(login({ username: form.username || form.email }));
    setLoading(false);
  };

  const filled = Object.values(form).every(Boolean);

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[380px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black border border-zinc-800 rounded-2xl p-10 mb-3"
        >
          <h1 className="text-[36px] font-black text-center mb-2 gradient-text tracking-tight">Instagram</h1>
          <p className="text-center text-zinc-400 text-sm font-semibold mb-6 leading-snug px-4">
            Sign up to see photos and videos from your friends.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {[
              { name: "email", placeholder: "Email address", type: "email" },
              { name: "fullname", placeholder: "Full Name", type: "text" },
              { name: "username", placeholder: "Username", type: "text" },
              { name: "password", placeholder: "Password", type: "password" },
            ].map((f) => (
              <input
                key={f.name}
                name={f.name}
                type={f.type}
                placeholder={f.placeholder}
                value={form[f.name]}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-zinc-500 transition placeholder:text-zinc-600"
              />
            ))}

            <p className="text-zinc-600 text-xs text-center leading-relaxed px-2">
              By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.
            </p>

            <button
              type="submit"
              disabled={loading || !filled}
              className="w-full py-3 rounded-xl font-bold text-sm transition disabled:opacity-40"
              style={{ background: "linear-gradient(135deg,#f09433,#dc2743,#bc1888)" }}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-black border border-zinc-800 rounded-2xl p-5 text-center text-sm"
        >
          Have an account?{" "}
          <Link to="/login" className="text-blue-500 font-bold hover:underline">Log in</Link>
        </motion.div>
      </div>
    </div>
  );
}
