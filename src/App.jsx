import { useState } from "react";

const API = import.meta.env.VITE_API_URL;

const TREES = [
  { id:1, fruit:"לימונים", emoji:"🍋", city:"נס ציונה", area:"שכונת נווה", qty:18, ripeness:92, status:"urgent", date:"17 אפריל" },
  { id:2, fruit:"שסק",     emoji:"🍑", city:"חיפה",     area:"הדר הכרמל",  qty:12, ripeness:78, status:"urgent", date:"20 אפריל" },
  { id:3, fruit:"מנגו",    emoji:"🥭", city:"תל אביב",  area:"פלורנטין",   qty:25, ripeness:65, status:"future", date:"25 אפריל" },
  { id:4, fruit:"אפרסק",   emoji:"🍑", city:"ירושלים",  area:"קריית יובל", qty:9,  ripeness:95, status:"urgent", date:"היום!" },
  { id:5, fruit:"ענבים",   emoji:"🍇", city:"ראשל״צ",   area:"נחלת יהודה", qty:30, ripeness:70, status:"future", date:"22 אפריל" },
  { id:6, fruit:"תמר",     emoji:"🌴", city:"חיפה",     area:"קריית חיים",  qty:40, ripeness:60, status:"future", date:"1 מאי" },
];

const STATIONS = [
  { city:"חיפה",       addr:"מרכז קהילתי אדמה, רח' הנביאים 14", hours:"א'-ה' 08:00-13:00" },
  { city:"תל אביב",    addr:"שוק הנמל, דוכן 7",                  hours:"ו' 07:00-12:00" },
  { city:"ירושלים",    addr:"עמותת לב לאב, רח' אגריפס 52",       hours:"א'-ו' 09:00-17:00" },
  { city:"באר שבע",    addr:"בנק המזון הנגב, שד' רגר 77",         hours:"ב',ד' 10:00-14:00" },
];

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 font-sans">
      <Navbar page={page} setPage={setPage} />
      {page === "home"     && <HomePage     setPage={setPage} />}
      {page === "map"      && <MapPage      setPage={setPage} />}
      {page === "report"   && <ReportPage   setPage={setPage} />}
      {page === "register" && <RegisterPage setPage={setPage} />}
      {page === "admin"    && <AdminPage    />}
      {page === "profile"  && <ProfilePage  />}
    </div>
  );
}

function Navbar({ page, setPage }) {
  return (
    <nav className="bg-green-900 px-5 h-14 flex items-center justify-between sticky top-0 z-50">
      <div onClick={() => setPage("home")}
        className="flex items-center gap-2 text-green-300 font-medium text-base cursor-pointer">
🍎 פירות לכולם
      </div>
      <div className="flex gap-1">
        {[["home","בית"],["map","מפת קטיפים"],["report","דיווח עץ"],["register","הרשמה"]].map(([p,l]) => (
          <button key={p} onClick={() => setPage(p)}
            className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
              page === p ? "bg-green-700 text-green-100" : "text-green-400 hover:text-green-100"
            }`}>{l}</button>
        ))}
      </div>
      <button onClick={() => setPage("profile")}
        className="bg-green-700 text-green-200 border border-green-600 rounded-lg px-3 py-1.5 text-sm">
        אזור אישי
      </button>
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
          <button onClick={() => setPage("map")} className="text-sm text-green-700 hover:underline">
            ראה מפה →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {TREES.filter(t => t.status === "urgent").map(tree => (
            <TreeCard key={tree.id} tree={tree} onRegister={() => setPage("register")} />
          ))}
        </div>
      </div>

      <div className="px-5 pb-8">
        <h2 className="text-base font-medium mb-3 flex items-center gap-2">🏠 עמדות ריכוז פעילות</h2>
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
        קטיף קהילתי © 2025 — ביחד מפחיתים בזבוז ומחזקים קהילה
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
  const tree = TREES.find(t => t.id === selected);
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
      <button onClick={() => setPage("home")} className="bg-green-700 text-white rounded-lg px-5 py-2 text-sm">
        חזרה לדף הבית
      </button>
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
        <button type="submit"
          className="w-full bg-green-700 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-green-800">
          שלח דיווח
        </button>
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
    const birthDate = `${form.year.value}-01-01`;
    try {
      await fetch(`${API}/api/volunteers/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.value,
          lastName: form.lastName.value,
          phone: form.phone.value,
          city: form.city.value,
          birthDate,
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
      <p className="text-sm text-gray-500 mb-4">הבקשה ממתינה לאישור הרכז — תקבל SMS בקרוב</p>
      <button onClick={() => setPage("profile")} className="bg-green-700 text-white rounded-lg px-5 py-2 text-sm">
        עבור לפרופיל שלי
      </button>
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
          {age !== null && age < 16 && (
            <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2 mt-1">
              גיל {age} — נדרש הורה מלווה שגם הוא נרשם
            </p>
          )}
          {age !== null && age < 10 && (
            <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg p-2 mt-1">
              גיל מינימום להשתתפות הוא 10
            </p>
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
          <span className="text-xs text-gray-500">קראתי ואני מסכים לתנאי ההתנדבות. ת.ז תישמר מוצפנת.</span>
        </label>
        <button type="submit"
          className="w-full bg-green-700 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-green-800">
          שלח הרשמה
        </button>
      </form>
    </div>
  );
}

function AdminPage() {
  return (
    <div className="p-5">
      <h1 className="text-lg font-medium mb-4">לוח ניהול</h1>
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[["12","מתנדבים"],["3","ממתינים"],["9","קטיפים"],["324",'ק"ג']].map(([n,l])=>(
          <div key={l} className="bg-gray-50 rounded-xl p-3 text-center">
            <div className="text-2xl font-medium text-green-700">{n}</div>
            <div className="text-xs text-gray-500 mt-1">{l}</div>
          </div>
        ))}
      </div>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500">
            <tr>{["מתנדב","עיר","גיל","ת.ז","סטטוס","פעולות"].map(h=>(
              <th key={h} className="text-right px-4 py-3 font-medium">{h}</th>
            ))}</tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              {name:"דנה כהן",city:"חיפה",age:28,id:"XXX-6734",status:"approved"},
              {name:"יוסי ברגר",city:"תל אביב",age:34,id:"XXX-2210",status:"approved"},
              {name:"אבי שמיר",city:"נס ציונה",age:39,id:"XXX-4455",status:"pending"},
            ].map(v=>(
              <tr key={v.name} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{v.name}</td>
                <td className="px-4 py-3 text-gray-500">{v.city}</td>
                <td className="px-4 py-3 text-gray-500">{v.age}</td>
                <td className="px-4 py-3 text-xs text-amber-700">{v.id}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                    v.status==="approved" ? "bg-green-50 text-green-800 border-green-200" :
                    "bg-amber-50 text-amber-800 border-amber-200"
                  }`}>{v.status==="approved"?"מאושר":"ממתין"}</span>
                </td>
                <td className="px-4 py-3">
                  {v.status==="pending" && (
                    <button className="text-xs bg-green-50 text-green-800 border border-green-200 rounded px-2 py-1 hover:bg-green-100">
                      אשר
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProfilePage() {
  return (
    <div className="max-w-md mx-auto p-5">
      <div className="flex items-center gap-4 mb-5">
        <div className="w-14 h-14 rounded-full bg-green-200 flex items-center justify-center text-lg font-medium text-green-800">
          דכ
        </div>
        <div>
          <div className="text-lg font-medium">דנה כהן</div>
          <div className="text-sm text-gray-500">גיל 28 · חיפה</div>
          <span className="text-xs bg-green-50 text-green-800 border border-green-200 px-2 py-0.5 rounded-full">
            מאושרת ✓
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[["3","קטיפים"],["47",'ק"ג'],["9","שעות"]].map(([n,l])=>(
          <div key={l} className="bg-gray-50 rounded-xl p-3 text-center">
            <div className="text-xl font-medium text-green-700">{n}</div>
            <div className="text-xs text-gray-500 mt-1">{l}</div>
          </div>
        ))}
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h3 className="text-sm font-medium mb-3">קטיפים קרובים</h3>
        <div className="space-y-2">
          {[
            {emoji:"🍋",name:"לימונים — נס ציונה",date:"17 אפריל",status:"pending"},
            {emoji:"🍑",name:"שסק — חיפה",date:"25 אפריל",status:"approved"},
          ].map(p=>(
            <div key={p.name} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
              <span className="text-xl">{p.emoji}</span>
              <div className="flex-1">
                <div className="text-sm font-medium">{p.name}</div>
                <div className="text-xs text-gray-500">{p.date}</div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full border ${
                p.status==="approved"?"bg-green-50 text-green-800 border-green-200":
                "bg-amber-50 text-amber-800 border-amber-200"
              }`}>{p.status==="approved"?"מאושר":"ממתין"}</span>
            </div>
          ))}
        </div>
      </div>
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