import { useMemo, useState } from "react";

const WHATSAPP_NUMBER = "972547371700";
const CONTACT_EMAIL = "shachmatjobs@gmail.com";
const CANDIDATE_SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycbxuuXO7OfQelLRKc8bnWkQkw8fq4ILZ44dZqBnjGHi5xo6kn2n7GO9UXnDZXf3cdzyxww/exec";

const cityCoordinates = {
  "פתח תקווה": { lat: 32.087, lng: 34.887 },
  "הוד השרון": { lat: 32.159, lng: 34.893 },
  "כפר סבא": { lat: 32.178, lng: 34.907 },
  "גבעת השלושה": { lat: 32.099, lng: 34.919 },
  "אור יהודה": { lat: 32.031, lng: 34.857 },
  "הרצליה": { lat: 32.166, lng: 34.843 },
  "חולון": { lat: 32.016, lng: 34.779 },
  "ירושלים": { lat: 31.768, lng: 35.214 },
  "עפולה": { lat: 32.609, lng: 35.289 },
  "קיסריה": { lat: 32.518, lng: 34.904 },
  "תל אביב": { lat: 32.085, lng: 34.782 },
  "בני ברק": { lat: 32.084, lng: 34.835 },
  "רמת גן": { lat: 32.068, lng: 34.825 },
  "ראש העין": { lat: 32.095, lng: 34.952 },
  "נתניה": { lat: 32.321, lng: 34.853 },
  "רחובות": { lat: 31.894, lng: 34.812 },
  "נס ציונה": { lat: 31.93, lng: 34.801 },
  "ראשון לציון": { lat: 31.973, lng: 34.792 },
  "בת ים": { lat: 32.016, lng: 34.75 },
  "גבעתיים": { lat: 32.072, lng: 34.808 },
  "רעננה": { lat: 32.184, lng: 34.871 },
  "רמת השרון": { lat: 32.147, lng: 34.841 },
  "יבנה": { lat: 31.878, lng: 34.739 },
  "אשדוד": { lat: 31.804, lng: 34.655 },
  "אשקלון": { lat: 31.668, lng: 34.574 },
  "מודיעין": { lat: 31.898, lng: 35.01 },
  "אלעד": { lat: 32.052, lng: 34.951 },
  "אריאל": { lat: 32.106, lng: 35.185 },
  "חדרה": { lat: 32.435, lng: 34.92 },
  "חיפה": { lat: 32.794, lng: 34.99 },
  "קריות": { lat: 32.844, lng: 35.075 },
  "טבריה": { lat: 32.795, lng: 35.531 },
  "נצרת": { lat: 32.699, lng: 35.303 },
  "בית שמש": { lat: 31.746, lng: 34.988 },
  "ביתר עילית": { lat: 31.697, lng: 35.116 },
  "באר שבע": { lat: 31.252, lng: 34.791 },
  "קריית גת": { lat: 31.61, lng: 34.764 },
  "אילת": { lat: 29.558, lng: 34.948 },
};

const jobs = [
  {
    id: 1,
    title: "מלגזן/ית למשתלה",
    city: "פתח תקווה",
    region: "פתח תקווה והסביבה",
    field: "לוגיסטיקה",
    scope: "משרה מלאה",
    salary: "55 ₪ לשעה",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1200&auto=format&fit=crop",
    description: "למשתלה באזור פתח תקווה דרוש/ה מלגזן/ית עם רישיון מלגזה ונכונות לעבודה פיזית מתונה.",
    details: ["ניידות חובה", "רישיון מלגזה", "נכונות לשילוב עבודה פיזית מתונה / עבודות מחסן", "א'-ה' 6:30-16:30 + שישי קצר"],
  },
  {
    id: 2,
    title: "הנדסאי/מהנדס בניין",
    city: "הוד השרון",
    region: "שרון",
    field: "הנדסה",
    scope: "משרה מלאה",
    salary: "תנאים מעולים",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
    description: "לחברה גדולה דרוש/ה הנדסאי/מהנדס בניין לתכנון פרויקטים גדולים ומורכבים בעבודה מול מחשב.",
    details: ["שליטה באוטוקאד - חובה", "ניסיון לא חובה", "אפשרויות קידום למצטיינים", "קורסים והדרכות בארץ ובעולם"],
  },
  {
    id: 3,
    title: "סייעת לגני תקשורת",
    city: "פתח תקווה",
    region: "פתח תקווה והסביבה",
    field: "חינוך",
    scope: "מלאה / חלקית",
    salary: "45 ₪ לשעה",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1200&auto=format&fit=crop",
    description: "דרוש/ה סייעת לגני תקשורת בפתח תקווה. אין צורך בידע או ניסיון קודם, רק אהבה לילדים.",
    details: ["אין צורך בניסיון קודם", "אפשרות למשרה מלאה או חלקית", "סביבת עבודה חמה ומשמעותית"],
  },
  {
    id: 4,
    title: "אחמ״ש/ית לצרכניה",
    city: "גבעת השלושה",
    region: "פתח תקווה והסביבה",
    field: "קמעונאות",
    scope: "משרה מלאה",
    salary: "42-45 ₪ לשעה",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9c8a213?q=80&w=1200&auto=format&fit=crop",
    description: 'לצרכניה בקיבוץ גבעת השלושה דרוש/ה אחמ"ש/ית עם ניסיון קודם כאחמ"ש או סדרן ראשי.',
    details: ['ניסיון כאחמ"ש / סדרן ראשי וכדומה', "א'-ה' 6:30-14:00/16:00", "שישי עד 14:00 עם גמישות קלה"],
  },
  {
    id: 5,
    title: "טכנאי/ת גידול במשתלה",
    city: "פתח תקווה",
    region: "פתח תקווה והסביבה",
    field: "חקלאות",
    scope: "משרה מלאה",
    salary: "55 ₪ לשעה",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1200&auto=format&fit=crop",
    description: "מחפשים עובד/ת עם אהבה לחקלאות למשרת טכנאי/ת גידול במשתלה באזור פתח תקווה.",
    details: ["אין צורך בידע או ניסיון קודם", "ניידות חובה", "עבודה באווירה ירוקה"],
  },
  {
    id: 6,
    title: "מוכר/ת לרשת אביזרי חשמל",
    city: "הוד השרון",
    region: "מספר סניפים בארץ",
    field: "מכירות",
    scope: "משרה מלאה",
    salary: "שכר מתגמל",
    image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop",
    description: "לרשת חנויות לאביזרי חשמל דרושים/ות מוכרים/ות עם ניסיון במכירות ושליטה בסביבה ממוחשבת.",
    details: ["ניסיון במכירות חובה", "שליטה בסביבה ממוחשבת", "סניפים: אור יהודה, הוד השרון, הרצליה, חולון, ירושלים, עפולה, פתח תקווה וקיסריה"],
  },
  {
    id: 7,
    title: "איש אחזקה לחברת תוכנה",
    city: "כפר סבא",
    region: "שרון",
    field: "אחזקה",
    scope: "משרה מלאה",
    salary: "שכר גבוה למתאימים",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=1200&auto=format&fit=crop",
    description: "לחברת תוכנה דרוש/ה איש אחזקה לתחזוקה של כ-9,000 מ״ר.",
    details: ["ניסיון באחזקה", "הבנה בחשמל - מתח נמוך וגבוה", "א'-ה' 7:30-16:30"],
  },
];

function uniqueValues(key) {
  return Array.from(new Set(jobs.map((job) => job[key])));
}

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function calculateDistanceKm(fromCity, toCity) {
  const from = cityCoordinates[fromCity];
  const to = cityCoordinates[toCity];
  if (!from || !to) return null;

  const earthRadiusKm = 6371;
  const latDelta = degreesToRadians(to.lat - from.lat);
  const lngDelta = degreesToRadians(to.lng - from.lng);
  const a =
    Math.sin(latDelta / 2) ** 2 +
    Math.cos(degreesToRadians(from.lat)) * Math.cos(degreesToRadians(to.lat)) * Math.sin(lngDelta / 2) ** 2;
  return Math.round(earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function jobMatchesFilters(job, filters) {
  const searchText = `${job.title} ${job.city} ${job.region} ${job.field} ${job.scope} ${job.salary} ${job.description} ${job.details.join(" ")}`.toLowerCase();
  const matchesSearch = searchText.includes(filters.search.toLowerCase().trim());
  const matchesRegion = !filters.region || job.region === filters.region;
  const matchesField = !filters.field || job.field === filters.field;
  const matchesScope = !filters.scope || job.scope === filters.scope;
  const distance = calculateDistanceKm(filters.homeCity, job.city);
  const wantsDistanceFilter = filters.homeCity !== "" && filters.maxDistance !== "";
  const matchesDistance = !wantsDistanceFilter || (distance !== null && distance <= Number(filters.maxDistance));
  return matchesSearch && matchesRegion && matchesField && matchesScope && matchesDistance;
}

function runBasicTests() {
  const baseFilters = { search: "", region: "", field: "", scope: "", homeCity: "", maxDistance: "" };
  console.assert(jobs.length === 7, "Expected 7 demo jobs");
  console.assert(jobs.filter((job) => jobMatchesFilters(job, { ...baseFilters, field: "חקלאות" })).length === 1, "Expected one agriculture job");
  console.assert(jobs.filter((job) => jobMatchesFilters(job, { ...baseFilters, search: "אוטוקאד" })).length === 1, "Expected free search to find AutoCAD job");
  console.assert(jobs.filter((job) => jobMatchesFilters(job, { ...baseFilters, region: "פתח תקווה והסביבה" })).length === 4, "Expected four Petach Tikva area jobs");
  console.assert(calculateDistanceKm("פתח תקווה", "הוד השרון") < 15, "Expected Hod Hasharon to be near Petach Tikva");
  console.assert(jobs.filter((job) => jobMatchesFilters(job, { ...baseFilters, homeCity: "פתח תקווה", maxDistance: "10" })).length >= 4, "Expected nearby jobs within 10 km from Petach Tikva");
  console.assert(createShareText(jobs[0]).includes("שחמט עבודות"), "Expected share text to include brand name");
}

function createJobLink(job) {
  const baseUrl = typeof window !== "undefined" ? window.location.origin + window.location.pathname : "https://shachmat-jobs.vercel.app/";
  return `${baseUrl}?job=${job.id}`;
}

function createShareText(job) {
  return `מצאתי משרה שיכולה להתאים לך: ${job.title} ב${job.city}. פרטים והגשת מועמדות באתר שחמט עבודות: ${createJobLink(job)}`;
}

runBasicTests();

function Header() {
  return (
    <header className="relative overflow-hidden bg-[#070707] text-white shadow-xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-red-500 to-transparent opacity-80" />
      <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-red-600/20 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-6 md:flex-row">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-red-500/40 bg-gradient-to-br from-red-600 to-red-800 text-5xl font-black shadow-2xl shadow-red-950/40">
            ♟
          </div>

          <div>
            <div className="flex items-end gap-2 leading-none">
              <span className="text-4xl font-black tracking-tight text-white">שחמט</span>
              <span className="text-3xl font-black tracking-tight text-red-500">עבודות</span>
            </div>
            <div className="mt-2 h-px w-40 bg-gradient-to-l from-red-500 via-white/40 to-transparent" />
            <p className="mt-2 text-sm font-bold tracking-wide text-gray-200">הצעד הנכון למציאת עבודה</p>
          </div>
        </div>

        <nav className="flex gap-3 text-sm font-bold text-gray-200">
          <a href="#jobs" className="rounded-xl px-4 py-2 transition hover:bg-white hover:text-black">משרות</a>
          <a href="#about" className="rounded-xl px-4 py-2 transition hover:bg-white hover:text-black">אודות</a>
          <a href="#contact" className="rounded-xl px-4 py-2 transition hover:bg-white hover:text-black">צור קשר</a>
        </nav>
      </div>
    </header>
  );
}

function ApplicationForm({ job, onClose }) {
  const [form, setForm] = useState({ fullName: "", phone: "", email: "", city: "", message: "", resumeFileName: "" });
  const [status, setStatus] = useState("idle");

  const updateField = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const submitApplication = async (event) => {
    event.preventDefault();
    setStatus("sending");

    try {
      await fetch(CANDIDATE_SHEET_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: job.id,
          jobTitle: job.title,
          jobCity: job.city,
          jobField: job.field,
          ...form,
        }),
      });

      setStatus("success");
    } catch (error) {
      console.error("Application submit failed", error);
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-4 py-8">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 text-black shadow-2xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <div className="mb-2 text-sm font-bold text-red-600">הגשת מועמדות</div>
            <h3 className="text-3xl font-black">{job.title}</h3>
            <p className="mt-1 text-gray-500">📍 {job.city}</p>
          </div>
          <button onClick={onClose} className="rounded-full bg-gray-100 px-4 py-2 font-black hover:bg-gray-200">✕</button>
        </div>

        {status === "success" ? (
          <div className="rounded-3xl bg-red-50 p-8 text-center">
            <div className="mb-3 text-5xl">✅</div>
            <h4 className="mb-2 text-2xl font-black">המועמדות נשלחה בהצלחה</h4>
            <p className="leading-7 text-gray-700">הפנייה נשמרה במערכת. ניצור קשר בהמשך אם תהיה התאמה.</p>
            <button onClick={onClose} className="mt-6 rounded-2xl bg-black px-6 py-3 font-bold text-white hover:bg-gray-800">סגירה</button>
          </div>
        ) : (
          <form onSubmit={submitApplication} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block"><span className="mb-1 block text-sm font-bold">שם מלא *</span><input required value={form.fullName} onChange={(e) => updateField("fullName", e.target.value)} className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-red-500" /></label>
              <label className="block"><span className="mb-1 block text-sm font-bold">טלפון *</span><input required value={form.phone} onChange={(e) => updateField("phone", e.target.value)} className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-red-500" /></label>
              <label className="block"><span className="mb-1 block text-sm font-bold">מייל</span><input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-red-500" /></label>
              <label className="block"><span className="mb-1 block text-sm font-bold">עיר מגורים</span><input value={form.city} onChange={(e) => updateField("city", e.target.value)} className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-red-500" /></label>
            </div>
            <label className="block">
              <span className="mb-1 block text-sm font-bold">העלאת קו״ח</span>
              <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => updateField("resumeFileName", e.target.files?.[0]?.name || "")} className="w-full rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-3" />
              <span className="mt-1 block text-xs text-gray-500">כרגע נשמר שם הקובץ בלבד. בהמשך ניתן לחבר שמירת קובץ מלאה.</span>
            </label>
            <label className="block"><span className="mb-1 block text-sm font-bold">הערות</span><textarea value={form.message} onChange={(e) => updateField("message", e.target.value)} rows={4} className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-red-500" /></label>
            <button type="submit" disabled={status === "sending"} className="w-full rounded-2xl bg-red-600 py-4 text-lg font-black text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400">
              {status === "sending" ? "שולח..." : "שליחת מועמדות"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function JobDetails({ job, onBack, onApply }) {
  const shareText = createShareText(job);
  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const emailLink = `mailto:?subject=${encodeURIComponent(`משרה שיכולה להתאים לך: ${job.title}`)}&body=${encodeURIComponent(shareText)}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(createJobLink(job));
      alert("הקישור למשרה הועתק");
    } catch {
      alert("לא הצלחתי להעתיק אוטומטית. אפשר להעתיק משורת הכתובת.");
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <button onClick={onBack} className="mb-6 rounded-2xl border border-gray-300 bg-white px-5 py-3 font-bold transition hover:bg-gray-100">← חזרה לכל המשרות</button>
      <article className="overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[320px]"><img src={job.image} alt={job.title} className="h-full w-full object-cover" /><div className="absolute right-5 top-5 rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white">{job.field}</div></div>
          <div className="p-8 lg:p-10">
            <div className="mb-4 text-sm font-bold text-red-600">משרה מס׳ {job.id}</div>
            <h1 className="mb-4 text-4xl font-black leading-tight">{job.title}</h1>
            <div className="mb-6 flex flex-wrap gap-3 text-sm font-bold"><span className="rounded-full bg-gray-100 px-4 py-2">📍 {job.city}</span><span className="rounded-full bg-gray-100 px-4 py-2">{job.region}</span><span className="rounded-full bg-gray-100 px-4 py-2">{job.scope}</span><span className="rounded-full bg-black px-4 py-2 text-white">{job.salary}</span></div>
            <p className="mb-6 text-lg leading-8 text-gray-700">{job.description}</p>
            <h2 className="mb-3 text-2xl font-black">פרטי המשרה</h2>
            <ul className="mb-8 space-y-3">{job.details.map((detail) => <li key={detail} className="flex gap-3 rounded-2xl bg-gray-50 p-4 text-gray-700"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-red-600" /><span>{detail}</span></li>)}</ul>
            <div className="mb-6 grid gap-3 sm:grid-cols-2"><button onClick={onApply} className="rounded-2xl bg-red-600 py-4 font-black text-white transition hover:bg-red-700">הגשת מועמדות</button><a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`שלום, אני מתעניינ/ת במשרה: ${job.title}`)}`} target="_blank" rel="noreferrer" className="rounded-2xl border-2 border-black py-4 text-center font-black transition hover:bg-black hover:text-white">שאלות בוואטסאפ</a></div>
            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-5"><h3 className="mb-3 text-xl font-black">שליחת המשרה לעצמי או לחבר</h3><div className="flex flex-wrap gap-3"><a href={whatsappLink} target="_blank" rel="noreferrer" className="rounded-xl bg-green-600 px-4 py-3 font-bold text-white hover:bg-green-700">וואטסאפ</a><a href={emailLink} className="rounded-xl bg-black px-4 py-3 font-bold text-white hover:bg-gray-800">מייל</a><button onClick={copyLink} className="rounded-xl border border-gray-300 bg-white px-4 py-3 font-bold hover:bg-gray-100">העתק קישור</button></div></div>
          </div>
        </div>
      </article>
    </main>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-10">
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">
        <div className="grid lg:grid-cols-2">
          <div className="relative overflow-hidden bg-white p-10 lg:p-12">
            <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-red-100 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-red-50 blur-2xl" />
            <div className="relative z-10">
              <div className="mb-4 inline-block rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-700">נשמח לעזור לכם למצוא עובדים איכותיים</div>
              <h2 className="mb-5 text-4xl font-black leading-tight text-black lg:text-5xl">בואו נדבר על<span className="block text-red-600">הגיוס הבא שלכם</span></h2>
              <p className="mb-8 max-w-xl leading-8 text-gray-600">אנחנו כאן גם למעסיקים שמחפשים עובדים איכותיים, וגם למועמדים שמחפשים את המקום הנכון להתקדם בו — בצורה מהירה, מקצועית ואישית.</p>
              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl border border-red-100 bg-white p-4 shadow-sm transition hover:border-red-300 hover:shadow-md"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-2xl text-red-600">💬</div><div><div className="text-sm text-gray-500">וואטסאפ</div><div className="text-xl font-black text-black">054-737-1700</div></div></a>
                <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-4 rounded-2xl border border-red-100 bg-white p-4 shadow-sm transition hover:border-red-300 hover:shadow-md"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-2xl text-red-600">✉️</div><div><div className="text-sm text-gray-500">דוא״ל</div><div className="break-all text-lg font-black text-black">{CONTACT_EMAIL}</div></div></a>
              </div>
            </div>
          </div>
          <div className="bg-[#fafafa] p-10 lg:p-12"><h3 className="mb-8 text-3xl font-black text-black">למה לעבוד איתנו?</h3><div className="grid gap-5 md:grid-cols-2">{[["⚡", "תגובה מהירה", "אנחנו מבינים שזמן הוא קריטי בתהליך גיוס עובדים ופועלים במהירות וביעילות."], ["🎯", "התאמה איכותית", "דגש על התאמה אמיתית בין המועמד לתפקיד ולתרבות הארגונית."], ["🤝", "יחס אישי", "ליווי אישי וצמוד לאורך כל תהליך הגיוס — גם למעסיקים וגם למועמדים."], ["🛡️", "שקט נפשי", "תהליך מסודר, דיסקרטי ומקצועי שמאפשר לכם להתמקד במה שחשוב באמת."]].map(([icon, title, text]) => <div key={title} className="rounded-3xl border border-red-100 bg-white p-6 shadow-sm"><div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-3xl text-red-600">{icon}</div><div className="mb-2 text-xl font-black text-black">{title}</div><p className="leading-7 text-gray-600">{text}</p></div>)}</div></div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <div className="mb-8 rounded-3xl border-2 border-red-100 bg-red-50 p-6">
            <h3 className="mb-3 text-2xl font-black text-red-700">מחפשים עבודה? אנחנו כאן בשבילכם</h3>
            <p className="mb-4 leading-8 text-gray-700">בשחמט עבודות אנחנו יודעים שחיפוש עבודה הוא הרבה יותר מרק שליחת קורות חיים. זו ההזדמנות למצוא מקום שמתאים לכם באמת — מבחינת שכר, תנאים, סביבת עבודה ואפשרויות להתקדם.</p>
            <p className="leading-8 text-gray-700">באתר תוכלו לחפש משרות בצורה פשוטה ונוחה לפי אזור, תחום, היקף משרה וטווח נסיעה, ולהגיש מועמדות במהירות למשרות שמתאימות לכם.</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">{[["📍", "משרות קרוב אליכם", "סינון חכם לפי עיר מגורים וטווח נסיעה כדי למצוא עבודות שמתאימות לאזור שלכם."], ["⚡", "הגשת מועמדות מהירה", "שליחת מועמדות פשוטה ומהירה בלי תהליכים מסובכים ובלי לבזבז זמן."], ["🚀", "הזדמנויות להתקדם", "מגוון משרות בתחומים שונים עם אפשרויות קידום, תנאים טובים וסביבת עבודה איכותית."]].map(([icon, title, text]) => <div key={title} className="rounded-2xl border border-red-200 bg-white p-4 shadow-sm"><div className="mb-2 text-lg font-black text-red-600">{icon} {title}</div><p className="text-sm leading-7 text-gray-600">{text}</p></div>)}</div>
          </div>
          <div className="mb-4 inline-block rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-700">גיוס חכם. תוצאות מדויקות.</div>
          <h2 className="mb-5 text-4xl font-black leading-tight">משנים את כללי <span className="text-red-600">המשחק בגיוס עובדים</span></h2>
          <p className="mb-5 leading-8 text-gray-700">בשחמט עבודות אנחנו מאמינים שהמועמד הנכון יכול לשנות עסק שלם. לכן בנינו תהליך גיוס מדויק, מהיר ואישי — שמשלב טכנולוגיה מתקדמת, סינון מקצועי והיכרות אמיתית עם עולם התעסוקה.</p>
          <p className="mb-5 leading-8 text-gray-700">אנחנו עובדים עם עסקים וחברות מכל התחומים ומסייעים באיתור עובדים איכותיים למגוון רחב של תפקידים: לוגיסטיקה, מכירות, חינוך, תעשייה, ניהול, טכנולוגיה ועוד.</p>
          <div className="grid gap-4 md:grid-cols-2">{[["🎯", "התאמה מדויקת", "סינון מועמדים לפי ניסיון, אזור מגורים, זמינות ודרישות התפקיד."], ["⚡", "תהליך מהיר", "גיוס מהיר ויעיל שמקצר משמעותית את זמן החיפוש אחר עובדים."], ["🤝", "ליווי אישי", "יחס אישי למעסיקים ולמועמדים לאורך כל תהליך הגיוס."], ["📍", "פריסה ארצית", "משרות ומועמדים מכל רחבי הארץ ובמגוון תחומי עיסוק."]].map(([icon, title, text]) => <div key={title} className="rounded-2xl border border-gray-200 bg-gray-50 p-5"><div className="mb-2 text-lg font-black">{icon} {title}</div><p className="text-sm leading-7 text-gray-600">{text}</p></div>)}</div>
        </div>
        <div className="overflow-hidden rounded-3xl bg-black text-white shadow-lg">
          <div className="bg-red-600 p-8"><div className="mb-3 text-4xl font-black">השירותים שלנו</div><p className="text-lg text-red-50">פתרונות גיוס מתקדמים לעסקים, חברות וארגונים.</p></div>
          <div className="space-y-6 bg-[#f7f7f7] p-8 text-black">{[["🔍", "גיוס עובדים", "איתור מועמדים איכותיים בהתאמה אישית לצרכים של כל עסק."], ["📄", "סינון קורות חיים", "בדיקה וסינון מקצועי של מועמדים כדי לחסוך זמן ולשפר תוצאות."], ["🧠", "ראיונות טלפוניים", "ביצוע ראיונות ראשוניים והעברת מועמדים מתאימים בלבד."], ["💼", "ליווי למעסיקים", "התאמת עובדים לתפקידים ולתרבות הארגונית של העסק."]].map(([icon, title, text]) => <div key={title} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><div className="mb-2 text-xl font-black">{icon} {title}</div><p className="leading-7 text-gray-600">{text}</p></div>)}</div>
        </div>
      </div>
    </section>
  );
}

export default function ShachmatJobs() {
  const emptyFilters = { search: "", region: "", field: "", scope: "", homeCity: "", maxDistance: "" };
  const [filters, setFilters] = useState(emptyFilters);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [applicationJob, setApplicationJob] = useState(null);

  const filteredJobs = useMemo(() => jobs.filter((job) => jobMatchesFilters(job, filters)), [filters]);
  const selectedJob = jobs.find((job) => job.id === selectedJobId);
  const updateFilter = (key, value) => setFilters((current) => ({ ...current, [key]: value }));

  const getDistanceLabel = (job) => {
    if (!filters.homeCity) return null;
    const distance = calculateDistanceKm(filters.homeCity, job.city);
    return distance === null ? null : `כ-${distance} ק״מ ממך`;
  };

  if (selectedJob) {
    return (
      <div dir="rtl" className="min-h-screen bg-[#f5f5f5] text-black">
        <Header />
        <JobDetails job={selectedJob} onBack={() => setSelectedJobId(null)} onApply={() => setApplicationJob(selectedJob)} />
        {applicationJob && <ApplicationForm job={applicationJob} onClose={() => setApplicationJob(null)} />}
        <ScrollTopButton />
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#f5f5f5] text-black">
      <Header />

      <main id="jobs" className="mx-auto max-w-7xl px-6 py-10">
        <section className="mb-10 text-center">
          <h2 className="mb-4 text-5xl font-black">מצאו את המשרה הבאה שלכם</h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">מגוון משרות איכותיות בתחומי הלוגיסטיקה, החינוך, המכירות, ההנדסה, האחזקה ועוד.</p>
        </section>

        <section className="mb-8 rounded-3xl border border-gray-200 bg-white p-5 shadow-lg">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div><h3 className="text-xl font-black">חיפוש משרות</h3><p className="text-sm text-gray-500">סינון לפי תחום, אזור, היקף משרה ומרחק משוער מעיר מגורים</p></div>
            <button onClick={() => setFilters(emptyFilters)} className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-bold transition hover:bg-gray-100">ניקוי סינון</button>
          </div>
          <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
            <input value={filters.search} onChange={(e) => updateFilter("search", e.target.value)} placeholder="חיפוש חופשי..." className="rounded-xl border-2 border-red-500 bg-white px-4 py-3 text-black outline-none xl:col-span-2" />
            <select value={filters.region} onChange={(e) => updateFilter("region", e.target.value)} className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-black"><option value="">כל האזורים</option>{uniqueValues("region").map((region) => <option key={region} value={region}>{region}</option>)}</select>
            <select value={filters.field} onChange={(e) => updateFilter("field", e.target.value)} className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-black"><option value="">כל התחומים</option>{uniqueValues("field").map((field) => <option key={field} value={field}>{field}</option>)}</select>
            <select value={filters.scope} onChange={(e) => updateFilter("scope", e.target.value)} className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-black"><option value="">כל היקפי המשרה</option>{uniqueValues("scope").map((scope) => <option key={scope} value={scope}>{scope}</option>)}</select>
            <div><input list="city-list" value={filters.homeCity} onChange={(e) => updateFilter("homeCity", e.target.value)} placeholder="עיר / יישוב מגורים" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black outline-none" /><datalist id="city-list">{Object.keys(cityCoordinates).sort().map((city) => <option key={city} value={city} />)}</datalist></div>
            <select value={filters.maxDistance} onChange={(e) => updateFilter("maxDistance", e.target.value)} className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-black"><option value="">טווח נסיעה</option><option value="5">עד 5 ק״מ</option><option value="10">עד 10 ק״מ</option><option value="15">עד 15 ק״מ</option><option value="25">עד 25 ק״מ</option><option value="40">עד 40 ק״מ</option><option value="60">עד 60 ק״מ</option></select>
          </div>
        </section>

        <div className="mb-6 text-sm font-semibold text-gray-600">נמצאו {filteredJobs.length} משרות</div>
        {filteredJobs.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-lg"><h3 className="mb-2 text-2xl font-black">לא נמצאו משרות מתאימות</h3><p className="text-gray-600">נסו לשנות את הסינון או לחפש מילה אחרת.</p></div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredJobs.map((job) => (
              <article key={job.id} className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg transition duration-300 hover:shadow-2xl">
                <div className="relative"><img src={job.image} alt={job.title} className="h-56 w-full object-cover" /><div className="absolute right-4 top-4 rounded-full bg-red-600 px-3 py-1 text-sm font-bold text-white">{job.field}</div></div>
                <div className="p-6">
                  <div className="mb-4 flex items-start justify-between gap-3"><div><h3 className="text-2xl font-black leading-tight">{job.title}</h3><p className="mt-1 text-gray-500">📍 {job.city}</p><p className="mt-1 text-sm text-gray-500">{job.scope}</p>{getDistanceLabel(job) && <p className="mt-2 inline-block rounded-full bg-red-50 px-3 py-1 text-sm font-bold text-red-700">{getDistanceLabel(job)}</p>}</div><div className="whitespace-nowrap rounded-xl bg-black px-3 py-2 text-sm text-white">{job.salary}</div></div>
                  <p className="mb-5 leading-7 text-gray-700">{job.description}</p>
                  <ul className="mb-6 space-y-2">{job.details.map((detail) => <li key={detail} className="flex items-center gap-2 text-sm text-gray-700"><span className="h-2 w-2 rounded-full bg-red-600" />{detail}</li>)}</ul>
                  <div className="flex gap-3"><button onClick={() => setApplicationJob(job)} className="flex-1 rounded-2xl bg-red-600 py-3 font-bold text-white transition hover:bg-red-700">הגשת מועמדות</button><button onClick={() => setSelectedJobId(job.id)} className="rounded-2xl border-2 border-black px-5 py-3 font-bold transition hover:bg-black hover:text-white">פרטים</button></div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <AboutSection />
      <ContactSection />
      <Footer />
      {applicationJob && <ApplicationForm job={applicationJob} onClose={() => setApplicationJob(null)} />}
      <ScrollTopButton />
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-16 bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div><div className="mb-2 text-3xl font-black">שחמט עבודות</div><p className="text-gray-300">אתר משרות חכם, פשוט ונוח</p></div>
          <div className="flex flex-col gap-2 text-sm text-gray-300"><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="transition hover:text-red-300">💬 וואטסאפ: 054-737-1700</a><a href={`mailto:${CONTACT_EMAIL}`} className="transition hover:text-red-300">✉️ {CONTACT_EMAIL}</a></div>
        </div>
      </div>
    </footer>
  );
}

function ScrollTopButton() {
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-6 left-6 z-50 rounded-full bg-red-600 px-5 py-4 font-black text-white shadow-2xl transition hover:bg-red-700" aria-label="חזרה לראש העמוד">
      ↑ למעלה
    </button>
  );
}
