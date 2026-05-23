import { useState } from "react";

const MOCK_VOLS = [
  { id:1, first:'דנה',  last:'כהן',   city:'חיפה',      age:28, id4:'6734', status:'approved', minor:false, pickups:3, phone:'054-1234567', date:'10/3' },
  { id:2, first:'יוסי', last:'ברגר',  city:'תל אביב',  age:34, id4:'2210', status:'approved', minor:false, pickups:5, phone:'052-9876543', date:'8/3'  },
  { id:3, first:'מיכל', last:'זהבי',  city:'ירושלים',  age:14, id4:'8821', status:'approved', minor:true,  pickups:1, phone:'050-5551234', date:'5/3'  },
  { id:4, first:'אבי',  last:'שמיר',  city:'נס ציונה', age:39, id4:'4455', status:'pending',  minor:false, pickups:0, phone:'053-7778899', date:'היום' },
  { id:5, first:'נועה', last:'פרץ',   city:'חיפה',      age:15, id4:'3312', status:'pending',  minor:true,  pickups:0, phone:'054-1112233', date:'היום' },
  { id:6, first:'שירה', last:'כץ',    city:'באר שבע',  age:25, id4:'7723', status:'pending',  minor:false, pickups:0, phone:'052-3334455', date:'היום' },
  { id:7, first:'רחל',  last:'לוי',   city:'תל אביב',  age:46, id4:'9901', status:'approved', minor:false, pickups:7, phone:'058-1112233', date:'1/3'  },
  { id:8, first:'אלון', last:'דוד',   city:'ירושלים',  age:36, id4:'1190', status:'approved', minor:false, pickups:4, phone:'054-9998877', date:'28/2' },
];

const MOCK_TREES = [
  { id:1, emoji:'🍋', fruit:'לימונים', owner:'משפחת כהן',  city:'נס ציונה', qty:18, ripeness:92, vols:2, needed:2, status:'urgent' },
  { id:2, emoji:'🍑', fruit:'שסק',     owner:"ד\"ר לוי",   city:'חיפה',     qty:12, ripeness:78, vols:1, needed:2, status:'urgent' },
  { id:3, emoji:'🥭', fruit:'מנגו',    owner:'משפחת גרין', city:'תל אביב', qty:25, ripeness:65, vols:0, needed:2, status:'pending_review' },
  { id:4, emoji:'🍇', fruit:'ענבים',   owner:'משפחת אבו',  city:"ראשל\"צ",  qty:30, ripeness:70, vols:3, needed:3, status:'future' },
  { id:5, emoji:'🌴', fruit:'תמרים',   owner:'משפחת נסים', city:'חיפה',     qty:40, ripeness:60, vols:0, needed:3, status:'future' },
];

const AV_COLORS = [
  {bg:'#EAF3DE',t:'#27500A'},{bg:'#E6F1FB',t:'#0C447C'},
  {bg:'#FAEEDA',t:'#633806'},{bg:'#FBEAF0',t:'#72243E'},
];

export default function AdminDashboard({ admin, onLogout, isSuperAdmin }) {
  const [view, setView]         = useState("dashboard");
  const [vols, setVols]         = useState(MOCK_VOLS);
  const [trees, setTrees]       = useState(MOCK_TREES);
  const [selected, setSelected] = useState(new Set());
  const [search, setSearch]     = useState("");
  const [statusF, setStatusF]   = useState("all");
  const [toast, setToast]       = useState("");
  const [notifOpen, setNotifOpen] = useState(false);

  const pending  = vols.filter(v => v.status === "pending");
  const approved = vols.filter(v => v.status === "approved");

  function showToast(msg) { setToast(msg); setTimeout(()=>setToast(""), 2800); }
  function approveVol(id)  { setVols(p=>p.map(v=>v.id===id?{...v,status:"approved"}:v)); showToast("אושר ✓"); }
  function rejectVol(id)   { setVols(p=>p.map(v=>v.id===id?{...v,status:"rejected"}:v)); showToast("עודכן"); }
  function approveAll()    { setVols(p=>p.map(v=>v.status==="pending"?{...v,status:"approved"}:v)); showToast(`${pending.length} אושרו ✓`); }
  function approveTree(id) { setTrees(p=>p.map(t=>t.id===id?{...t,status:"future"}:t)); showToast("עץ אושר ופורסם ✓"); }
  function bulkApprove()   { setVols(p=>p.map(v=>selected.has(v.id)?{...v,status:"approved"}:v)); showToast(`${selected.size} אושרו ✓`); setSelected(new Set()); }

  function toggleSelect(id) {
    setSelected(prev => { const n=new Set(prev); n.has(id)?n.delete(id):n.add(id); return n; });
  }

  const filteredVols = vols.filter(v => {
    const mq = !search || (v.first+v.last+v.city+v.phone).includes(search);
    const ms = statusF==="all" || v.status===statusF;
    return mq && ms;
  });

  const NAV = [
    {key:"dashboard", label:"דשבורד",      icon:"⊞", badge:pending.length},
    {key:"volunteers",label:"מתנדבים",      icon:"👥"},
    {key:"trees",     label:"עצים",          icon:"🌳", badge:trees.filter(t=>t.status==="pending_review").length},
    {key:"recipients",label:"לקוחות קצה",   icon:"🏠"},
    {key:"pickups",   label:"קטיפים",        icon:"📅"},
    {key:"export",    label:"ייצוא",         icon:"📥"},
  ];

  return (
    <div dir="rtl" className="flex min-h-screen bg-gray-100 font-sans">

      {toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-green-900 text-green-100 rounded-xl px-5 py-2.5 text-sm z-50 shadow-lg">
          ✓ {toast}
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-48 bg-green-950 flex flex-col fixed top-0 bottom-0 right-0 z-10">
        <div className="px-4 py-4 border-b border-green-800">
          <div className="text-green-300 font-medium text-sm">🍎 פירות לכולם</div>
          <div className="text-green-500 text-xs mt-1">{admin?.name || "מנהל"}</div>
        </div>
        {NAV.map(({key,label,icon,badge}) => (
          <button key={key} onClick={()=>setView(key)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm border-r-2 transition-all ${
              view===key?"bg-white/10 text-white border-green-400":"text-green-400 border-transparent hover:text-white hover:bg-white/5"
            }`}>
            <span>{icon}</span>
            <span className="flex-1 text-right">{label}</span>
            {badge>0 && <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{badge}</span>}
          </button>
        ))}
        <div className="mt-auto px-4 py-3 border-t border-green-800">
          <button onClick={onLogout} className="text-xs text-green-500 hover:text-green-300">התנתק</button>
        </div>
      </aside>

      {/* Main */}
      <main className="mr-48 flex-1 p-5">

        {/* כפתור התראות */}
        <button onClick={()=>setNotifOpen(!notifOpen)}
          className="fixed top-3 left-4 z-20 bg-green-950 border border-green-800 text-green-300 text-xs px-3 py-1.5 rounded-lg flex items-center gap-2">
          🔔 <span className="bg-red-500 text-white text-xs px-1.5 rounded-full">4</span>
        </button>

        {notifOpen && (
          <div className="fixed top-0 left-0 bottom-0 w-72 bg-white border-r border-gray-200 z-30 flex flex-col shadow-xl">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="font-medium text-sm">התראות</div>
              <button onClick={()=>setNotifOpen(false)} className="text-gray-400">✕</button>
            </div>
            <div className="overflow-y-auto flex-1">
              {[
                {t:"מתנדב חדש נרשם",s:"אבי שמיר · ממתין לאישור",time:"לפני שעה",unread:true},
                {t:"עץ חדש דווח",s:'מנגו בתל אביב · 25 ק"ג',time:"לפני שעתיים",unread:true},
                {t:"קטיף דחוף",s:"לימונים · בשלות 92%",time:"לפני 3 שעות",unread:true},
                {t:"עלייה מרשימת המתנה",s:"רחל לוי אושרה אוטומטית",time:"לפני 5 שעות",unread:false},
              ].map((n,i)=>(
                <div key={i} className={`px-4 py-3 border-b cursor-pointer hover:bg-gray-50 ${n.unread?"bg-green-50":""}`}>
                  <div className="flex items-center gap-2">
                    {n.unread && <div className="w-2 h-2 rounded-full bg-red-500"/>}
                    <div className="text-sm font-medium">{n.t}</div>
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{n.s}</div>
                  <div className="text-xs text-gray-400 mt-1">{n.time}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* דשבורד */}
        {view==="dashboard" && (
          <div>
            <h1 className="text-lg font-medium mb-4">דשבורד</h1>
            <div className="grid grid-cols-5 gap-3 mb-5">
              {[
                {n:vols.length,    l:"מתנדבים",     c:"text-green-700"},
                {n:pending.length, l:"ממתינים",      c:"text-amber-600"},
                {n:trees.length,   l:"עצים",          c:"text-green-700"},
                {n:47,             l:"לקוחות קצה",  c:"text-green-700"},
                {n:324,            l:'ק"ג נקטפו',   c:"text-green-700"},
              ].map(s=>(
                <div key={s.l} className="bg-white border border-gray-200 rounded-xl p-3">
                  <div className={`text-2xl font-medium ${s.c}`}>{s.n}</div>
                  <div className="text-xs text-gray-500 mt-1">{s.l}</div>
                </div>
              ))}
            </div>

            {pending.length>0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium">מתנדבים ממתינים לאישור
                    <span className="mr-2 text-xs bg-amber-100 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full">{pending.length}</span>
                  </div>
                  <button onClick={approveAll} className="bg-green-700 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-green-800">✓ אשר את כולם</button>
                </div>
                <div className="space-y-2">
                  {pending.map(v=>(
                    <div key={v.id} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-xs font-medium text-green-800 flex-shrink-0">
                        {v.first[0]}{v.last[0]}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{v.first} {v.last}</div>
                        <div className="text-xs text-gray-500">{v.city} · גיל {v.age}{v.minor?" · קטין":""}</div>
                      </div>
                      {v.minor && <span className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full">קטין</span>}
                      <button onClick={()=>approveVol(v.id)} className="text-xs bg-green-50 text-green-800 border border-green-200 rounded-lg px-2.5 py-1 hover:bg-green-100">אשר</button>
                      <button onClick={()=>rejectVol(v.id)} className="text-xs bg-red-50 text-red-800 border border-red-200 rounded-lg px-2.5 py-1 hover:bg-red-100">דחה</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {trees.filter(t=>t.status==="pending_review").length>0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="text-sm font-medium mb-3">עצים ממתינים לאישור</div>
                <div className="space-y-2">
                  {trees.filter(t=>t.status==="pending_review").map(t=>(
                    <div key={t.id} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-lg">
                      <span className="text-2xl">{t.emoji}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{t.fruit} — {t.city}</div>
                        <div className="text-xs text-gray-500">{t.qty} ק"ג · {t.owner}</div>
                      </div>
                      <button onClick={()=>approveTree(t.id)} className="text-xs bg-green-50 text-green-800 border border-green-200 rounded-lg px-2.5 py-1 hover:bg-green-100">אשר ופרסם</button>
                      <button className="text-xs bg-red-50 text-red-800 border border-red-200 rounded-lg px-2.5 py-1 hover:bg-red-100">דחה</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* מתנדבים */}
        {view==="volunteers" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div><h1 className="text-lg font-medium">מתנדבים</h1><p className="text-xs text-gray-500">{vols.length} רשומים · {pending.length} ממתינים</p></div>
              <button onClick={()=>showToast("מוריד Excel...")} className="text-xs bg-white text-green-700 border border-green-300 rounded-lg px-3 py-1.5">📥 Excel</button>
            </div>
            {selected.size>0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 mb-3 flex items-center gap-3 text-sm text-green-800">
                {selected.size} נבחרו
                <button onClick={bulkApprove} className="bg-green-700 text-white text-xs px-3 py-1 rounded-lg">✓ אשר</button>
                <button onClick={()=>setSelected(new Set())} className="text-gray-500 text-xs">ביטול</button>
              </div>
            )}
            <div className="flex gap-2 mb-3">
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="חיפוש..." dir="rtl"
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-green-500"/>
              <select value={statusF} onChange={e=>setStatusF(e.target.value)}
                className="border border-gray-200 rounded-lg px-2 py-2 text-sm bg-white" dir="rtl">
                <option value="all">הכל</option>
                <option value="pending">ממתין</option>
                <option value="approved">מאושר</option>
                <option value="rejected">נדחה</option>
              </select>
              <button onClick={approveAll} className="bg-green-700 text-white text-xs px-3 py-2 rounded-lg">✓ אשר ממתינים ({pending.length})</button>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs text-gray-500">
                  <tr>
                    <th className="px-3 py-2.5"><input type="checkbox" onChange={e=>{
                      if(e.target.checked) setSelected(new Set(filteredVols.map(v=>v.id)));
                      else setSelected(new Set());
                    }}/></th>
                    {["מתנדב","עיר","גיל","ת.ז","קטין","קטיפים","נרשם","סטטוס","פעולות"].map(h=>(
                      <th key={h} className="text-right px-3 py-2.5 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredVols.map((v,i)=>{
                    const ac=AV_COLORS[i%AV_COLORS.length];
                    return (
                      <tr key={v.id} className={`hover:bg-gray-50 ${selected.has(v.id)?"bg-green-50":""}`}>
                        <td className="px-3 py-2"><input type="checkbox" checked={selected.has(v.id)} onChange={()=>toggleSelect(v.id)}/></td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0" style={{background:ac.bg,color:ac.t}}>{v.first[0]}{v.last[0]}</div>
                            <div><div className="font-medium">{v.first} {v.last}</div><div className="text-xs text-gray-400">{v.phone}</div></div>
                          </div>
                        </td>
                        <td className="px-3 py-2 text-gray-500">{v.city}</td>
                        <td className="px-3 py-2">{v.age}{v.minor&&<span className="mr-1 text-xs bg-red-50 text-red-700 border border-red-200 px-1.5 rounded-full">קטין</span>}</td>
                        <td className="px-3 py-2 text-xs text-amber-700">XXX-{v.id4}</td>
                        <td className="px-3 py-2 text-center">{v.minor?"✓":"—"}</td>
                        <td className="px-3 py-2 text-center font-medium text-green-700">{v.pickups}</td>
                        <td className="px-3 py-2 text-xs text-gray-400">{v.date}</td>
                        <td className="px-3 py-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                            v.status==="approved"?"bg-green-50 text-green-800 border-green-200":
                            v.status==="pending"?"bg-amber-50 text-amber-800 border-amber-200":
                            "bg-red-50 text-red-800 border-red-200"
                          }`}>{v.status==="approved"?"מאושר":v.status==="pending"?"ממתין":"נדחה"}</span>
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex gap-1">
                            {v.status==="pending"&&<><button onClick={()=>approveVol(v.id)} className="text-xs bg-green-50 text-green-800 border border-green-200 rounded px-2 py-0.5 hover:bg-green-100">אשר</button><button onClick={()=>rejectVol(v.id)} className="text-xs bg-red-50 text-red-800 border border-red-200 rounded px-2 py-0.5">דחה</button></>}
                            {v.status==="approved"&&<button onClick={()=>rejectVol(v.id)} className="text-xs bg-red-50 text-red-800 border border-red-200 rounded px-2 py-0.5">בטל</button>}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="px-3 py-2 text-xs text-gray-400 bg-gray-50 border-t">מציג {filteredVols.length} מתוך {vols.length}</div>
            </div>
          </div>
        )}

        {/* עצים */}
        {view==="trees" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-lg font-medium">עצים</h1>
              <button onClick={()=>showToast("מוריד Excel...")} className="text-xs bg-white text-green-700 border border-green-300 rounded-lg px-3 py-1.5">📥 Excel</button>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs text-gray-500">
                  <tr>{["פרי","בעל עץ","עיר","כמות","בשלות","מתנדבים","סטטוס","פעולות"].map(h=>(
                    <th key={h} className="text-right px-3 py-2.5 font-medium">{h}</th>
                  ))}</tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {trees.map(t=>{
                    const rc=t.ripeness>=85?"bg-red-500":t.ripeness>=65?"bg-amber-400":"bg-green-500";
                    return (
                      <tr key={t.id} className="hover:bg-gray-50">
                        <td className="px-3 py-2"><span className="text-xl">{t.emoji}</span> {t.fruit}</td>
                        <td className="px-3 py-2 text-gray-500">{t.owner}</td>
                        <td className="px-3 py-2">{t.city}</td>
                        <td className="px-3 py-2">{t.qty} ק"ג</td>
                        <td className="px-3 py-2"><div className="flex items-center gap-2"><div className="h-1.5 bg-gray-100 rounded-full overflow-hidden w-16"><div className={`h-full rounded-full ${rc}`} style={{width:`${t.ripeness}%`}}/></div><span className="text-xs">{t.ripeness}%</span></div></td>
                        <td className="px-3 py-2 text-center"><span className={`font-medium ${t.vols>=t.needed?"text-green-700":"text-amber-600"}`}>{t.vols}/{t.needed}</span></td>
                        <td className="px-3 py-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                            t.status==="urgent"?"bg-red-50 text-red-800 border-red-200":
                            t.status==="pending_review"?"bg-amber-50 text-amber-800 border-amber-200":
                            t.status==="future"?"bg-blue-50 text-blue-800 border-blue-200":
                            "bg-green-50 text-green-800 border-green-200"
                          }`}>{t.status==="urgent"?"דחוף":t.status==="pending_review"?"ממתין אישור":t.status==="future"?"עתידי":"אושר"}</span>
                        </td>
                        <td className="px-3 py-2">
                          {t.status==="pending_review"&&<button onClick={()=>approveTree(t.id)} className="text-xs bg-green-50 text-green-800 border border-green-200 rounded px-2 py-0.5 hover:bg-green-100">אשר ופרסם</button>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* לקוחות קצה */}
        {view==="recipients" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-lg font-medium">לקוחות קצה</h1>
              <button onClick={()=>showToast("מוריד Excel...")} className="text-xs bg-white text-green-700 border border-green-300 rounded-lg px-3 py-1.5">📥 Excel</button>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs text-gray-500">
                  <tr>{["שם","טלפון","עיר","כתובת","נפשות","קבלה","חלוקות","סטטוס"].map(h=>(
                    <th key={h} className="text-right px-3 py-2.5 font-medium">{h}</th>
                  ))}</tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    {n:"שלמה לוי",p:"052-111",c:"ירושלים",a:"הדקל 12",s:4,d:"משלוח",cnt:3,ok:true},
                    {n:"רחל אבו",p:"054-222",c:"חיפה",a:"הנביאים 8",s:2,d:"איסוף",cnt:1,ok:true},
                    {n:"יוסי גרין",p:"050-333",c:"תל אביב",a:"רוטשילד 22",s:5,d:"גמיש",cnt:0,ok:false},
                  ].map(r=>(
                    <tr key={r.n} className="hover:bg-gray-50">
                      <td className="px-3 py-2 font-medium">{r.n}</td>
                      <td className="px-3 py-2 text-gray-500 text-xs" dir="ltr">{r.p}</td>
                      <td className="px-3 py-2">{r.c}</td>
                      <td className="px-3 py-2 text-xs text-gray-500">{r.a}</td>
                      <td className="px-3 py-2 text-center">{r.s}</td>
                      <td className="px-3 py-2">{r.d}</td>
                      <td className="px-3 py-2 text-center">{r.cnt}</td>
                      <td className="px-3 py-2"><span className={`text-xs px-2 py-0.5 rounded-full border ${r.ok?"bg-green-50 text-green-800 border-green-200":"bg-amber-50 text-amber-800 border-amber-200"}`}>{r.ok?"מאושר":"ממתין"}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* קטיפים */}
        {view==="pickups" && (
          <div>
            <h1 className="text-lg font-medium mb-4">קטיפים מתוכננים</h1>
            <div className="space-y-3">
              {[
                {e:"🍋",f:"לימונים",c:"נס ציונה",d:"17 אפריל · 08:00",vols:2,needed:2},
                {e:"🍑",f:"שסק",c:"חיפה",d:"20 אפריל · 09:00",vols:1,needed:2},
                {e:"🥭",f:"מנגו",c:"תל אביב",d:"25 אפריל · 07:30",vols:0,needed:2},
              ].map(p=>(
                <div key={p.f} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
                  <span className="text-3xl">{p.e}</span>
                  <div className="flex-1"><div className="font-medium">{p.f} — {p.c}</div><div className="text-xs text-gray-500">{p.d}</div></div>
                  <div className="text-center"><div className={`text-sm font-medium ${p.vols>=p.needed?"text-green-700":"text-amber-600"}`}>{p.vols}/{p.needed}</div><div className="text-xs text-gray-400">מתנדבים</div></div>
                  <span className={`text-xs px-2 py-1 rounded-full border ${p.vols>=p.needed?"bg-green-50 text-green-800 border-green-200":"bg-amber-50 text-amber-800 border-amber-200"}`}>{p.vols>=p.needed?"מלא":"פתוח"}</span>
                  <button onClick={()=>showToast("פרטים נשלחו ✓")} className="text-xs bg-green-50 text-green-800 border border-green-200 rounded-lg px-3 py-1.5 hover:bg-green-100">שלח פרטים</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ייצוא */}
        {view==="export" && (
          <div>
            <h1 className="text-lg font-medium mb-4">ייצוא נתונים</h1>
            <div className="grid grid-cols-2 gap-3">
              {[
                {title:"מתנדבים מאושרים",sub:`${approved.length} מתנדבים · כולל ת.ז לביטוח`,icon:"👥"},
                {title:"לקוחות קצה",sub:"47 משפחות · כולל כתובות",icon:"🏠"},
                {title:"עצים פעילים",sub:`${trees.length} עצים`,icon:"🌳"},
                {title:"קטיפים שבוצעו",sub:'23 קטיפים · כולל ק"ג',icon:"📊"},
                {title:"רשימת ביטוח",sub:"שם + ת.ז + תאריך לידה",icon:"🛡️"},
                {title:"גיבוי מלא",sub:"כל הנתונים",icon:"💾"},
              ].map(e=>(
                <div key={e.title} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3">
                  <span className="text-2xl">{e.icon}</span>
                  <div className="flex-1"><div className="text-sm font-medium">{e.title}</div><div className="text-xs text-gray-400 mt-0.5">{e.sub}</div></div>
                  <div className="flex gap-2">
                    <button onClick={()=>showToast("מוריד CSV...")} className="text-xs bg-white text-green-700 border border-green-300 rounded-lg px-2.5 py-1 hover:bg-green-50">CSV</button>
                    <button onClick={()=>showToast("מוריד Excel...")} className="text-xs bg-green-700 text-white rounded-lg px-2.5 py-1 hover:bg-green-800">Excel</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
