import { useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function RecipientPage({ setPage }) {
  const [tab, setTab] = useState("reg");
  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 py-6">
        <div className="flex border-b border-gray-200 mb-5">
          {[["reg","רישום"],["profile","אזור אישי"],["request","בקשת פירות"]].map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)}
              className={`px-4 py-2.5 text-sm border-b-2 transition-colors ${
                tab===k?"border-green-600 text-green-700 font-medium":"border-transparent text-gray-500"}`}>
              {l}
            </button>
          ))}
        </div>
        {tab==="reg"     && <RegForm setTab={setTab}/>}
        {tab==="profile" && <RecipientProfile/>}
        {tab==="request" && <FruitRequest/>}
      </div>
    </div>
  );
}

function RegForm({ setTab }) {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [qty, setQty] = useState(2);
  const [delivery, setDelivery] = useState("delivery");
<<<<<<< HEAD
  const [data, setData] = useState({
    firstName:"", lastName:"", phone:"",
    city:"", address:"", floor:""
  });

=======
  const [data, setData] = useState({ firstName:"", lastName:"", phone:"", city:"", address:"" });
>>>>>>> 8e1b79ce46b2d68187baee2bc0621ec513d11455
  const update = f => setData(p=>({...p,...f}));
  const step1ok = data.firstName.length>1 && data.lastName.length>1 && data.phone.length>7;
  const step2ok = data.city && data.address.length>2;

  const handleSubmit = async () => {
    try {
      await fetch(`${API}/api/recipients/register`, {
<<<<<<< HEAD
        method:"POST",
        headers:{"Content-Type":"application/json"},
=======
        method:"POST", headers:{"Content-Type":"application/json"},
>>>>>>> 8e1b79ce46b2d68187baee2bc0621ec513d11455
        body: JSON.stringify({...data, familySize: qty, deliveryType: delivery})
      });
    } catch {}
    setDone(true);
  };

  if (done) return (
    <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
      <div className="text-5xl mb-3">🍎</div>
      <h2 className="text-xl font-medium text-green-800 mb-2">נרשמת בהצלחה!</h2>
<<<<<<< HEAD
      <p className="text-sm text-green-700 mb-4 leading-relaxed">
        בקשתך התקבלה ותיבדק על ידי הרכז.<br/>
        נחזור אליך עם פרטים על חלוקה קרובה.
      </p>
=======
      <p className="text-sm text-green-700 mb-4 leading-relaxed">בקשתך התקבלה ותיבדק על ידי הרכז.</p>
>>>>>>> 8e1b79ce46b2d68187baee2bc0621ec513d11455
      <div className="bg-white rounded-xl p-3 text-right mb-4 space-y-1">
        <div className="text-xs text-gray-500">שם: <span className="font-medium text-gray-800">{data.firstName} {data.lastName}</span></div>
        <div className="text-xs text-gray-500">נפשות: <span className="font-medium text-gray-800">{qty}</span></div>
        <div className="text-xs text-gray-500">עיר: <span className="font-medium text-gray-800">{data.city}</span></div>
      </div>
<<<<<<< HEAD
      <button onClick={()=>setTab("profile")}
        className="bg-green-700 text-white rounded-lg px-5 py-2 text-sm font-medium">
=======
      <button onClick={()=>setTab("profile")} className="bg-green-700 text-white rounded-lg px-5 py-2 text-sm font-medium">
>>>>>>> 8e1b79ce46b2d68187baee2bc0621ec513d11455
        עבור לאזור האישי →
      </button>
    </div>
  );

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <div className="bg-green-50 border-b border-green-100 px-5 py-4">
        <h2 className="text-base font-medium text-green-800">🍎 רישום לקבלת פירות</h2>
        <p className="text-xs text-green-600 mt-1">שירות חינמי — פירות טריים ישירות אליך</p>
      </div>
<<<<<<< HEAD

      <div className="flex justify-center gap-2 py-3">
        {[1,2,3].map(i=>(
          <div key={i} className={`h-2 rounded-full transition-all ${
            i===step?"w-6 bg-green-600":"w-2 bg-gray-200"}`}/>
        ))}
      </div>

=======
      <div className="flex justify-center gap-2 py-3">
        {[1,2,3].map(i=>(
          <div key={i} className={`h-2 rounded-full transition-all ${i===step?"w-6 bg-green-600":"w-2 bg-gray-200"}`}/>
        ))}
      </div>
>>>>>>> 8e1b79ce46b2d68187baee2bc0621ec513d11455
      <div className="px-5 pb-5 space-y-3">
        {step===1 && <>
          <div className="grid grid-cols-2 gap-3">
            <Field label="שם פרטי *" value={data.firstName} onChange={v=>update({firstName:v})} placeholder="ישראל"/>
            <Field label="שם משפחה *" value={data.lastName} onChange={v=>update({lastName:v})} placeholder="ישראלי"/>
          </div>
          <Field label="טלפון *" value={data.phone} onChange={v=>update({phone:v})} placeholder="050-0000000" type="tel" ltr/>
          <div>
            <label className="block text-sm font-medium mb-1">מספר נפשות במשפחה *</label>
            <div className="flex items-center gap-3">
<<<<<<< HEAD
              <button onClick={()=>setQty(q=>Math.max(1,q-1))}
                className="w-8 h-8 border border-gray-200 rounded-lg text-lg hover:bg-gray-50">−</button>
              <span className="text-base font-medium w-8 text-center">{qty}</span>
              <button onClick={()=>setQty(q=>Math.min(20,q+1))}
                className="w-8 h-8 border border-gray-200 rounded-lg text-lg hover:bg-gray-50">+</button>
=======
              <button onClick={()=>setQty(q=>Math.max(1,q-1))} className="w-8 h-8 border border-gray-200 rounded-lg text-lg hover:bg-gray-50">−</button>
              <span className="text-base font-medium w-8 text-center">{qty}</span>
              <button onClick={()=>setQty(q=>Math.min(20,q+1))} className="w-8 h-8 border border-gray-200 rounded-lg text-lg hover:bg-gray-50">+</button>
>>>>>>> 8e1b79ce46b2d68187baee2bc0621ec513d11455
              <span className="text-sm text-gray-500">נפשות</span>
            </div>
          </div>
          <button onClick={()=>setStep(2)} disabled={!step1ok}
<<<<<<< HEAD
            className="w-full bg-green-700 text-white rounded-lg py-2.5 text-sm font-medium disabled:opacity-40">
            המשך ←
          </button>
        </>}

=======
            className="w-full bg-green-700 text-white rounded-lg py-2.5 text-sm font-medium disabled:opacity-40">המשך ←</button>
        </>}
>>>>>>> 8e1b79ce46b2d68187baee2bc0621ec513d11455
        {step===2 && <>
          <div>
            <label className="block text-sm font-medium mb-1">עיר *</label>
            <select value={data.city} onChange={e=>update({city:e.target.value})}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
              <option value="">בחר עיר...</option>
              {["חיפה","תל אביב","ירושלים","באר שבע","נס ציונה","ראשון לציון","פתח תקווה","נתניה","אחר"].map(c=>(
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <Field label="רחוב ומספר *" value={data.address} onChange={v=>update({address:v})} placeholder="רח' הדקל 12"/>
<<<<<<< HEAD
          <Field label="קומה / דירה" value={data.floor} onChange={v=>update({floor:v})} placeholder="קומה 3, דירה 12"/>
          <div className="flex gap-2">
            <button onClick={()=>setStep(1)}
              className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm text-gray-500">
              → חזור
            </button>
            <button onClick={()=>setStep(3)} disabled={!step2ok}
              className="flex-1 bg-green-700 text-white rounded-lg py-2.5 text-sm font-medium disabled:opacity-40">
              המשך ←
            </button>
          </div>
        </>}

        {step===3 && <>
          <label className="block text-sm font-medium mb-2">אופן קבלת הפירות *</label>
          {[
            {k:"delivery", icon:"🚗", title:"משלוח עד הבית", sub:"המתנדבים מגיעים אליך בתיאום"},
            {k:"pickup",   icon:"🏠", title:"איסוף עצמי",    sub:"מגיע לעמדת הריכוז הקרובה"},
            {k:"both",     icon:"🔄", title:"גמיש — שניהם", sub:"לפי הזדמנות"},
          ].map(opt=>(
            <div key={opt.k} onClick={()=>setDelivery(opt.k)}
              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all mb-2 ${
                delivery===opt.k?"bg-green-50 border-green-400":"border-gray-200 hover:bg-gray-50"}`}>
              <span className="text-2xl">{opt.icon}</span>
              <div>
                <div className="text-sm font-medium">{opt.title}</div>
                <div className="text-xs text-gray-500">{opt.sub}</div>
              </div>
=======
          <div className="flex gap-2">
            <button onClick={()=>setStep(1)} className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm text-gray-500">→ חזור</button>
            <button onClick={()=>setStep(3)} disabled={!step2ok}
              className="flex-1 bg-green-700 text-white rounded-lg py-2.5 text-sm font-medium disabled:opacity-40">המשך ←</button>
          </div>
        </>}
        {step===3 && <>
          <label className="block text-sm font-medium mb-2">אופן קבלת הפירות *</label>
          {[
            {k:"delivery",icon:"🚗",title:"משלוח עד הבית",sub:"המתנדבים מגיעים אליך"},
            {k:"pickup",  icon:"🏠",title:"איסוף עצמי",   sub:"מגיע לעמדת הריכוז"},
            {k:"both",    icon:"🔄",title:"גמיש — שניהם", sub:"לפי הזדמנות"},
          ].map(opt=>(
            <div key={opt.k} onClick={()=>setDelivery(opt.k)}
              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer mb-2 ${
                delivery===opt.k?"bg-green-50 border-green-400":"border-gray-200 hover:bg-gray-50"}`}>
              <span className="text-2xl">{opt.icon}</span>
              <div><div className="text-sm font-medium">{opt.title}</div><div className="text-xs text-gray-500">{opt.sub}</div></div>
>>>>>>> 8e1b79ce46b2d68187baee2bc0621ec513d11455
            </div>
          ))}
          <label className="flex items-start gap-2 cursor-pointer mt-2">
            <input type="checkbox" id="terms-r" onChange={e=>{
<<<<<<< HEAD
              document.getElementById('btn-submit-r').disabled=!e.target.checked;
              document.getElementById('btn-submit-r').style.opacity=e.target.checked?'1':'0.4';
            }} className="mt-1"/>
            <span className="text-xs text-gray-500">
              אני מאשר/ת שהמידע נכון והשירות מיועד לצרכים אמיתיים
            </span>
          </label>
          <div className="flex gap-2 mt-3">
            <button onClick={()=>setStep(2)}
              className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm text-gray-500">
              → חזור
            </button>
            <button id="btn-submit-r" onClick={handleSubmit} disabled
              style={{opacity:0.4}}
              className="flex-1 bg-green-700 text-white rounded-lg py-2.5 text-sm font-medium">
              שלח בקשת רישום
            </button>
=======
              const btn=document.getElementById('btn-submit-r');
              if(btn){btn.disabled=!e.target.checked;btn.style.opacity=e.target.checked?'1':'0.4';}
            }} className="mt-1"/>
            <span className="text-xs text-gray-500">אני מאשר/ת שהמידע נכון והשירות מיועד לצרכים אמיתיים</span>
          </label>
          <div className="flex gap-2 mt-3">
            <button onClick={()=>setStep(2)} className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm text-gray-500">→ חזור</button>
            <button id="btn-submit-r" onClick={handleSubmit} disabled style={{opacity:0.4}}
              className="flex-1 bg-green-700 text-white rounded-lg py-2.5 text-sm font-medium">שלח בקשת רישום</button>
>>>>>>> 8e1b79ce46b2d68187baee2bc0621ec513d11455
          </div>
        </>}
      </div>
    </div>
  );
}

function RecipientProfile() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-lg font-medium text-green-800">של</div>
        <div>
          <div className="text-base font-medium">שלמה לוי</div>
          <div className="text-xs text-gray-500">משפחה · 4 נפשות · ירושלים</div>
          <div className="flex gap-2 mt-1">
            <span className="text-xs bg-green-50 text-green-800 border border-green-200 px-2 py-0.5 rounded-full">מאושר ✓</span>
            <span className="text-xs bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded-full">3 חלוקות</span>
          </div>
        </div>
      </div>
<<<<<<< HEAD

=======
>>>>>>> 8e1b79ce46b2d68187baee2bc0621ec513d11455
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="text-xs font-medium text-green-700 mb-3">📦 חלוקה קרובה</div>
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-3">
          <span className="text-2xl">🍋</span>
          <div className="flex-1">
            <div className="text-sm font-medium text-green-800">לימונים + שסק</div>
<<<<<<< HEAD
            <div className="text-xs text-green-600 mt-0.5">20 אפריל · 10:00–14:00 · משלוח עד הבית</div>
=======
            <div className="text-xs text-green-600 mt-0.5">20 אפריל · משלוח עד הבית</div>
>>>>>>> 8e1b79ce46b2d68187baee2bc0621ec513d11455
          </div>
          <span className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full">בקרוב</span>
        </div>
      </div>
<<<<<<< HEAD

      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="text-xs font-medium text-green-700 mb-3">📋 היסטוריה</div>
        {[
          {e:"🍊",n:"תפוזים — 5 ק\"ג",d:"10 מרץ"},
          {e:"🌴",n:"תמרים — 3 ק\"ג",d:"15 ינואר"},
          {e:"🍇",n:"ענבים — 4 ק\"ג",d:"3 נובמבר"},
        ].map(h=>(
=======
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="text-xs font-medium text-green-700 mb-3">📋 היסטוריה</div>
        {[{e:"🍊",n:'תפוזים — 5 ק"ג',d:"10 מרץ"},{e:"🌴",n:'תמרים — 3 ק"ג',d:"15 ינואר"},{e:"🍇",n:'ענבים — 4 ק"ג',d:"3 נובמבר"}].map(h=>(
>>>>>>> 8e1b79ce46b2d68187baee2bc0621ec513d11455
          <div key={h.n} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
            <span className="text-xl">{h.e}</span>
            <div className="flex-1"><div className="text-sm font-medium">{h.n}</div><div className="text-xs text-gray-400">{h.d}</div></div>
            <span className="text-xs bg-green-50 text-green-800 border border-green-200 px-2 py-0.5 rounded-full">התקבל</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FruitRequest() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">סוג פרי מבוקש</label>
        <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
          <option>לא משנה — כל פרי</option>
          {["לימונים","תפוזים","מנגו","שסק","תמרים","ענבים","אחר"].map(f=><option key={f}>{f}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">כמות מבוקשת</label>
        <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
<<<<<<< HEAD
          {["עד 3 ק\"ג","3–6 ק\"ג","6–10 ק\"ג","מעל 10 ק\"ג"].map(q=><option key={q}>{q}</option>)}
=======
          {['עד 3 ק"ג','3–6 ק"ג','6–10 ק"ג','מעל 10 ק"ג'].map(q=><option key={q}>{q}</option>)}
>>>>>>> 8e1b79ce46b2d68187baee2bc0621ec513d11455
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">תאריך נוח</label>
        <input type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" dir="ltr"/>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">הערות</label>
<<<<<<< HEAD
        <textarea className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none h-20"
          placeholder="אלרגיות, העדפות..."/>
      </div>
      <button className="w-full bg-green-700 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-green-800">
        שלח בקשה
      </button>
=======
        <textarea className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none h-20" placeholder="אלרגיות, העדפות..."/>
      </div>
      <button className="w-full bg-green-700 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-green-800">שלח בקשה</button>
>>>>>>> 8e1b79ce46b2d68187baee2bc0621ec513d11455
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type="text", ltr=false }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input type={type} value={value} onChange={e=>onChange(e.target.value)}
        placeholder={placeholder} dir={ltr?"ltr":"rtl"}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"/>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 8e1b79ce46b2d68187baee2bc0621ec513d11455
