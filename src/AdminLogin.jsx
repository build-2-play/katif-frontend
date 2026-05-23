import { useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function AdminLogin({ onLogin }) {
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "אימייל או סיסמה שגויים"); return; }
      sessionStorage.setItem("admin_token", data.token);
      sessionStorage.setItem("admin_data", JSON.stringify(data.admin));
      onLogin(data.admin, data.token);
    } catch { setError("שגיאת חיבור — נסה שוב"); }
    finally { setLoading(false); }
  }

  return (
    <div dir="rtl" className="min-h-screen bg-green-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🍎</div>
          <h1 className="text-white text-xl font-medium">פירות לכולם</h1>
          <p className="text-green-400 text-sm mt-1">כניסת מנהל / רכז</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">אימייל</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
                placeholder="admin@fruit4all.org.il" required dir="ltr"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 text-right"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">סיסמה</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)}
                placeholder="••••••••" required dir="ltr"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"/>
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2">{error}</div>
            )}
            <button type="submit" disabled={loading}
              className="w-full bg-green-700 text-white rounded-xl py-2.5 text-sm font-medium hover:bg-green-800 disabled:opacity-50 transition-colors">
              {loading ? "מתחבר..." : "כניסה →"}
            </button>
          </form>
          <p className="text-xs text-gray-400 text-center mt-4">גישה מורשית בלבד</p>
        </div>
      </div>
    </div>
  );
}
