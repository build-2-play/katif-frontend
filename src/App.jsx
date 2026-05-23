import { useState } from "react";
import RecipientPage  from "./RecipientPage";
import AdminLogin     from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import { useAdmin }   from "./useAdmin";

const API = import.meta.env.VITE_API_URL;

const TREES = [
  { id:1, fruit:"תפוז", emoji:"🍋", city:"נס ציונה", area:"שכונת נווה", qty:18, ripeness:92, status:"urgent", date:"17 אפריל" },
  { id:2, fruit:"שסק",     emoji:"🍑", city:"חיפה",     area:"הדר הכרמל",  qty:12, ripeness:78, status:"urgent", date:"20 אפריל" },
  { id:3, fruit:"מנגו",    emoji:"🥭", city:"תל אביב",  area:"פלורנטין",   qty:25, ripeness:65, status:"future", date:"25 אפריל" },
  { id:4, fruit:"אפרסק",   emoji:"🍑", city:"ירושלים",  area:"קריית יובל", qty:9,  ripeness:95, status:"urgent", date:"היום!" },
  { id:5, fruit:"ענבים",   emoji:"🍇", city:"ראשל\u05f4צ", area:"נחלת יהודה", qty:30, ripeness:70, status:"future", date:"22 אפריל" },
  { id:6, fruit:"תמר",     emoji:"🌴", city:"חיפה",     area:"קריית חיים",  qty:40, ripeness:60, status:"future", date:"1 מאי" },
];

const STATIONS = [
  { city:"חיפה",     addr:"מרכז קהילתי אדמה, רח' הנביאים 14", hours:"א'-ה' 08:00-13:00" },
  { city:"תל אביב",  addr:"שוק הנמל, דוכן 7",                  hours:"ו' 07:00-12:00" },
  { city:"ירושלים",  addr:"עמותת לב לאב, רח' אגריפס 52",       hours:"א'-ו' 09:00-17:00" },
  { city:"באר שבע",  addr:"בנק המזון הנגב, שד' רגר 77",         hours:"ב',ד' 10:00-14:00" },
];

export default function App() {
  const { admin, checked, login, logout, isSuperAdmin } = useAdmin();
  const [page, setPage] = useState(
    window.location.search.includes("admin=1") ? "admin" : "home"
  );

  if (!checked) return null;

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 font-sans">
      {page !== "admin" && <Navbar page={page} setPage={setPage} />}
      {page === "home"      && <HomePage      setPage={setPage} />}
      {page === "map"       && <MapPage       setPage={setPage} />}
      {page === "report"    && <ReportPage    setPage={setPage} />}
      {page === "register"  && <RegisterPage  setPage={setPage} />}
      {page === "recipient" && <RecipientPage setPage={setPage} />}
      {page === "profile"   && <ProfilePage />}
      {page === "admin"     && (
        admin
          ? <AdminDashboard
              admin={admin}
              isSuperAdmin={isSuperAdmin}
              onLogout={() => { logout(); setPage("home"); }}
            />
          : <AdminLogin onLogin={(a, t) => login(a, t)} />
      )}
    </div>
  );
}

function Navbar({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    ["home",      "בית"],
    ["map",       "מפת קטיפים"],
    ["report",    "דיווח עץ"],
    ["register",  "הרשמת מתנדב"],
    ["recipient", "קבלת פירות"],
  ];

  return (
    <nav className="bg-green-900 px-5 h-14 flex items-center justify-between sticky top-0 z-50">
      <div onClick={() => setPage("home")}
        className="flex items-center gap-2 text-green-300 font-medium text-base cursor-pointer">
        🍎 פירות לכולם
      </div>
      <div className="hidden md:flex gap-1">
        {links.map(([p,l]) => (
          <button key={p} onClick={() => setPage(p)}
            className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
              page === p ? "bg-green-700 text-green-100" : "text-green-400 hover:text-green-100"
            }`}>{l}</button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => setPage("profile")}
          className="bg-green-700 text-green-200 border border-green-600 rounded-lg px-3 py-1.5 text-sm">
          אזור אישי
        </button>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-green-300 p-1">☰</button>
      </div>
      {menuOpen && (
        <div className="absolute top-14 right-0 left-0 bg-green-900 border-t border-green-700 p-3 flex flex-col gap-1 md:hidden z-50">
          {links.map(([p,l]) => (
            <button key={p} onClick={() => { setPage(p); setMenuOpen(false); }}
              className={`text-sm px-3 py-2 rounded-lg text-right ${
                page === p ? "bg-green-700 text-green-100" : "text-green-400"
              }`}>{l}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

function HomePage({ setPage }) {
  return (
    <div>
      <div className="bg-green-50 border-b border-green-200 px-5 py-12 text-center">
        <h1 className="text-3xl font-medium text-green-900 mb-3 leading-snug">
          פירות שנותרים על העץ —<br/>יכולים להגיע לשולחן הנזקק
        </h1>
        <p className="text-sm text-green-700 max-w-md mx-auto mb-6 leading-relaxed">
          מחברים בין בעלי עצים לבין מתנדבים שקוטפים ומחלקים. יחד נפחית בזבוז ונחזק קהילה.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button onClick={() => setPage("report")}
            className="bg-green-700 text-green-50 rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-green-800">
            יש לי עץ לתרום
          </button>
          <button onClick={() => setPage("register")}
            className="border-2 border-green-700 text-green-700 rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-green-50">
            אני רוצה להתנדב
          </button>
          <button onClick={() => setPage("recipient")}
            className="bg-amber-50 border-2 border-amber-400 text-amber-700 rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-amber-100">
            אני צריך פירות 🍎
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 divide-x divide-green-200 border-b border-green-200 bg-white">
        {[["247","עצים פעילים"],["1,840",'ק"ג נקטפו'],["312","מתנדבים"],["18","ערים"]].map(([n,l]) => (
          <div key={l} className="py-3 text-center">
            <div className="text-xl font-medium text-green-700">{n}</div>
            <div className="text-xs text-gray-500 mt-0.5">{l}</div>
          </div>
        ))}
      </div>

      <div className="px-5 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-medium flex items-center gap-2">
            ⚠️ קטיפים דחופים
            <span className="text-xs bg-red-100 text-red-800 border border-red-200 px-2 py-0.5 rounded-full">
              {TREES.filter(t => t.status === "urgent").length} ממתינים
            </span>
          </h2>
          <button onClick={() => setPage("map")} className="text-sm text-green-700 hover:underline">ראה מפה →</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {TREES.filter(t => t.status === "urgent").map(tree => (
            <TreeCard key={tree.id} tree={tree} onRegister={() => setPage("register")} />
          ))}
        </div>
      </div>

      <div className="px-5 pb-8">
        <h2 className="text-base font-medium mb-3">🏠 עמדות ריכוז פעילות</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {STATIONS.map(s => (
            <div key={s.city} className="bg-white border border-gray-200 rounded-xl p-3">
              <div className="font-medium text-sm mb-1">{s.city}</div>
              <div className="text-xs text-gray-500 mb-2 leading-relaxed">{s.addr}</div>
              <div className="text-xs text-green-700 font-medium">● {s.hours}</div>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-green-900 text-green-300 text-center py-5 text-xs">
        פירות לכולם © 2025 — ביחד מפחיתים בזבוז ומחזקים קהילה
      </footer>
    </div>
  );
}

function TreeCard({ tree, onRegister }) {
  const ripeColor = tree.ripeness >= 85 ? "bg-red-500" : tree.ripeness >= 65 ? "bg-amber-400" : "bg-green-500";
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3 hover:border-green-300 transition-colors">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-xl">{tree.emoji}</div>
        <span className="text-xs bg-red-50 text-red-800 border border-red-200 px-2 py-0.5 rounded-full font-medium">דחוף</span>
      </div>
      <div>
        <div className="font-medium text-sm">{tree.fruit}</div>
        <div className="text-xs text-gray-500 mt-0.5">{tree.city}, {tree.area}</div>
      </div>
      <div>
        <div className="text-xs text-gray-400 mb-1">בשלות: {tree.ripeness}%</div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${ripeColor}`} style={{ width: `${tree.ripeness}%` }} />
        </div>
      </div>
      <div className="text-xs text-gray-400">קטיף: {tree.date}</div>
      <button onClick={onRegister}
        className="bg-green-50 text-green-800 border border-green-200 rounded-lg py-2 text-xs font-medium hover:bg-green-100">
        פרטים והרשמה →
      </button>
    </div>
  );
}

function MapPage() {
  const [selected, setSelected] = useState(null);
  return (
    <div className="p-5">
      <h1 className="text-lg font-medium mb-1">מפת קטיפים</h1>
      <p className="text-sm text-gray-500 mb-4">לחץ על עץ לפרטים</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {TREES.map(t => (
          <div key={t.id} onClick={() => setSelected(t.id)}
            className={`bg-white border rounded-xl p-4 cursor-pointer transition-all ${
              selected === t.id ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-green-300"
            }`}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{t.emoji}</span>
              <div className="flex-1">
                <div className="font-medium text-sm">{t.fruit} — {t.city}</div>
                <div className="text-xs text-gray-500">{t.date} · {t.qty} ק"ג</div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                t.status === "urgent" ? "bg-red-50 text-red-800 border-red-200" :
                "bg-amber-50 text-amber-800 border-amber-200"
              }`}>{t.status === "urgent" ? "דחוף" : "עתידי"}</span>
            </div>
            {selected === t.id && (
              <div className="mt-3 pt-3 border-t border-green-200 space-y-1">
                <div className="text-xs text-gray-600">כמות: {t.qty} ק"ג</div>
                <div className="text-xs text-gray-600">בשלות: {t.ripeness}%</div>
                <div className="text-xs text-gray-600">אזור: {t.area}</div>
                <button className="mt-2 w-full bg-green-700 text-white rounded-lg py-1.5 text-xs font-medium">
                  הירשם לקטיף
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportPage({ setPage }) {
  const [sent, setSent] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    try {
      await fetch(`${API}/api/trees/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fruitType: form.fruit.value,
          ownerName: form.name.value,
          ownerPhone: form.phone.value,
          city: form.city.value,
          address: form.address.value,
          quantity: parseInt(form.qty.value),
          ripeness: 70,
        }),
      });
    } catch {}
    setSent(true);
  };

  if (sent) return (
    <div className="max-w-md mx-auto p-8 text-center">
      <div className="text-5xl mb-4">🌿</div>
      <h2 className="text-xl font-medium text-green-800 mb-2">הדיווח התקבל!</h2>
      <p className="text-sm text-gray-500 mb-4">נחזור אליך בהקדם לתיאום הקטיף</p>
      <button onClick={() => setPage("home")} className="bg-green-700 text-white rounded-lg px-5 py-2 text-sm">חזרה לדף הבית</button>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto p-5">
      <h1 className="text-lg font-medium mb-4">דיווח על עץ פרי לתרומה</h1>
      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
        <Field label="סוג פרי *" name="fruit" placeholder="לימון, שסק, מנגו..." />
        <Field label="שם ליצירת קשר *" name="name" placeholder="ישראל ישראלי" />
        <Field label="טלפון *" name="phone" placeholder="050-0000000" type="tel" />
        <Field label="עיר *" name="city" placeholder="חיפה" />
        <Field label="כתובת *" name="address" placeholder="רח' הדקל 12" />
        <Field label='כמות משוערת (ק"ג)' name="qty" placeholder="15" type="number" />
        <button type="submit" className="w-full bg-green-700 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-green-800">שלח דיווח</button>
      </form>
    </div>
  );
}

function RegisterPage({ setPage }) {
  const [sent, setSent] = useState(false);
  const [age, setAge] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    try {
      await fetch(`${API}/api/volunteers/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.value,
          lastName: form.lastName.value,
          phone: form.phone.value,
          city: form.city.value,
          birthDate: `${form.year.value}-01-01`,
          idNumber: form.id.value,
          experience: "none",
        }),
      });
    } catch {}
    setSent(true);
  };

  if (sent) return (
    <div className="max-w-md mx-auto p-8 text-center">
      <div className="text-5xl mb-4">✅</div>
      <h2 className="text-xl font-medium text-green-800 mb-2">נרשמת בהצלחה!</h2>
      <p className="text-sm text-gray-500 mb-4">הבקשה ממתינה לאישור הרכז</p>
      <button onClick={() => setPage("profile")} className="bg-green-700 text-white rounded-lg px-5 py-2 text-sm">עבור לפרופיל שלי</button>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto p-5">
      <h1 className="text-lg font-medium mb-4">הרשמת מתנדב</h1>
      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="שם פרטי *" name="firstName" placeholder="ישראל" />
          <Field label="שם משפחה *" name="lastName" placeholder="ישראלי" />
        </div>
        <Field label="טלפון *" name="phone" placeholder="050-0000000" type="tel" />
        <Field label="עיר *" name="city" placeholder="חיפה" />
        <div>
          <label className="block text-sm font-medium mb-1">שנת לידה *</label>
          <select name="year" onChange={e => setAge(2025 - parseInt(e.target.value))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
            <option value="">בחר שנה...</option>
            {Array.from({length:70},(_,i)=>2007-i).map(y=>(
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          {age !== null && age < 16 && age >= 10 && (
            <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2 mt-1">גיל {age} — נדרש הורה מלווה</p>
          )}
          {age !== null && age < 10 && (
            <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg p-2 mt-1">גיל מינימום להשתתפות הוא 10</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">תעודת זהות *</label>
          <input name="id" maxLength={9} placeholder="000000000"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-left" dir="ltr" />
          <p className="text-xs text-gray-400 mt-1">נשמר מוצפן — לצורך ביטוח בלבד</p>
        </div>
        <label className="flex items-start gap-2 cursor-pointer">
          <input type="checkbox" required className="mt-1" />
          <span className="text-xs text-gray-500">קראתי ואני מסכים לתנאי ההתנדבות</span>
        </label>
        <button type="submit" className="w-full bg-green-700 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-green-800">שלח הרשמה</button>
      </form>
    </div>
  );
}

function ProfilePage() {
  const [tab, setTab] = useState("upcoming");
  const BADGES = [
    {icon:"🌱",name:"מתחיל",desc:"קטיף ראשון",earned:true,progress:100},
    {icon:"🍋",name:"קוטף מסור",desc:"5 קטיפים",earned:true,progress:100},
    {icon:"🌍",name:"מסייר",desc:"3 ערים",earned:true,progress:100},
    {icon:"⭐",name:"מומחה",desc:"10 קטיפים",earned:false,progress:50},
    {icon:"💪",name:"כוח קטיף",desc:'50 ק"ג',earned:false,progress:94},
    {icon:"👑",name:"אלוף",desc:"20 קטיפים",earned:false,progress:25},
  ];

  return (
    <div className="max-w-lg mx-auto p-5">
      <div className="flex items-center gap-4 mb-5">
        <div className="w-14 h-14 rounded-full bg-green-200 flex items-center justify-center text-lg font-medium text-green-800 flex-shrink-0">דכ</div>
        <div className="flex-1">
          <div className="text-lg font-medium">דנה כהן</div>
          <div className="text-sm text-gray-500">גיל 28 · חיפה</div>
          <div className="flex gap-2 mt-1 flex-wrap">
            <span className="text-xs bg-green-50 text-green-800 border border-green-200 px-2 py-0.5 rounded-full">מאושרת ✓</span>
            <span className="text-xs bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded-full">רמה 3</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-5">
        {[["5","קטיפים"],["47",'ק"ג'],["12","שעות"],["3","ערים"]].map(([n,l])=>(
          <div key={l} className="bg-gray-50 rounded-xl p-2.5 text-center">
            <div className="text-lg font-medium text-green-700">{n}</div>
            <div className="text-xs text-gray-500 mt-0.5">{l}</div>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>רמה 3 — קוטף מסור</span><span>70/100 XP</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-green-600 rounded-full" style={{width:"70%"}}/>
        </div>
      </div>

      <div className="flex border-b border-gray-200 mb-4 overflow-x-auto">
        {[["upcoming","קרובים"],["history","היסטוריה"],["badges","תגים"],["status","סטטוס"]].map(([k,l])=>(
          <button key={k} onClick={()=>setTab(k)}
            className={`px-3 py-2 text-xs whitespace-nowrap border-b-2 transition-colors ${
              tab===k?"border-green-600 text-green-700 font-medium":"border-transparent text-gray-500"}`}>{l}</button>
        ))}
      </div>

      {tab==="upcoming" && (
        <div className="space-y-2">
          {[
            {e:"🍋",n:"לימונים — נס ציונה",d:"17 אפריל · 08:00",s:"pending"},
            {e:"🍑",n:"שסק — חיפה",d:"25 אפריל · 09:00",s:"approved"},
            {e:"🥭",n:"מנגו — תל אביב",d:"1 מאי · 07:30",s:"waitlist"},
          ].map(p=>(
            <div key={p.n} className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl">
              <span className="text-2xl">{p.e}</span>
              <div className="flex-1"><div className="text-sm font-medium">{p.n}</div><div className="text-xs text-gray-500">{p.d}</div></div>
              <span className={`text-xs px-2 py-0.5 rounded-full border ${
                p.s==="approved"?"bg-green-50 text-green-800 border-green-200":
                p.s==="waitlist"?"bg-blue-50 text-blue-800 border-blue-200":
                "bg-amber-50 text-amber-800 border-amber-200"
              }`}>{p.s==="approved"?"מאושר":p.s==="waitlist"?"המתנה":"ממתין"}</span>
            </div>
          ))}
        </div>
      )}

      {tab==="history" && (
        <div className="space-y-2">
          {[
            {e:"🍊",n:"תפוזים — פ\"ת",d:"10 מרץ",kg:12},
            {e:"🍋",n:"לימונים — נס ציונה",d:"22 פבר",kg:8},
            {e:"🌴",n:"תמרים — חיפה",d:"5 ינואר",kg:18},
            {e:"🍇",n:"ענבים — ראשל\"צ",d:"18 דצמ",kg:6},
          ].map(h=>(
            <div key={h.n} className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl">
              <span className="text-2xl">{h.e}</span>
              <div className="flex-1"><div className="text-sm font-medium">{h.n}</div><div className="text-xs text-gray-500">{h.d}</div></div>
              <div className="text-right">
                <div className="text-sm font-medium text-green-700">{h.kg} ק"ג</div>
                <span className="text-xs bg-green-50 text-green-800 border border-green-200 px-2 py-0.5 rounded-full">הושלם</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab==="badges" && (
        <div className="grid grid-cols-3 gap-3">
          {BADGES.map(b=>(
            <div key={b.name} className={`border rounded-xl p-3 text-center relative ${b.earned?"bg-green-50 border-green-200":"border-gray-200 opacity-60"}`}>
              {!b.earned && <span className="absolute top-1.5 left-1.5 text-xs">🔒</span>}
              <div className="text-3xl mb-1">{b.icon}</div>
              <div className="text-xs font-medium">{b.name}</div>
              <div className="text-xs text-gray-500 mt-0.5">{b.desc}</div>
              {!b.earned && <div className="mt-2"><div className="h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-green-500 rounded-full" style={{width:`${b.progress}%`}}/></div><div className="text-xs text-gray-400 mt-0.5">{b.progress}%</div></div>}
              {b.earned && <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full mt-1 inline-block">הושג ✓</span>}
            </div>
          ))}
        </div>
      )}

      {tab==="status" && (
        <div className="space-y-4">
          {[
            {e:"🍋",n:"לימונים — נס ציונה",steps:[
              {t:"נרשמת לקטיף",s:"17 אפריל, 09:32",done:true},
              {t:"ממתין לאישור רכז",s:"בד\"כ תוך כמה שעות",done:false,active:true},
              {t:"קבלת פרטי כתובת",s:"לאחר אישור",done:false},
              {t:"יום הקטיף!",s:"17 אפריל · 08:00",done:false},
            ]},
          ].map(item=>(
            <div key={item.n} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="text-sm font-medium mb-3">{item.e} {item.n}</div>
              <div className="space-y-3">
                {item.steps.map((s,i)=>(
                  <div key={i} className="flex gap-3 items-start">
                    <div className={`w-3 h-3 rounded-full mt-0.5 flex-shrink-0 ${s.done?"bg-green-600":s.active?"bg-amber-400":"bg-gray-200"}`}/>
                    <div>
                      <div className={`text-xs font-medium ${s.active?"text-amber-700":s.done?"text-gray-800":"text-gray-400"}`}>{s.t}</div>
                      <div className="text-xs text-gray-400">{s.s}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({ label, name, placeholder, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input name={name} type={type} placeholder={placeholder} required
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100" />
    </div>
  );
}
