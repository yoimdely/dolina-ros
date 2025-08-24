import React, { useEffect, useState, useCallback } from "react";
import {
  Home, MapPin, Menu, X,
  Waves, Building2, Bath, ParkingSquare, Ruler,
  FileText, CircuitBoard, ShieldCheck, Hammer,
  HeartHandshake, Store, Bike, Trees,
  Dumbbell, FileSignature, Handshake, KeyRound, Banknote, ArrowUp, Sun, Calendar, Flower2
} from "lucide-react";
import { motion } from "framer-motion";

/* ================= SEO + ФОНТЫ ================= */
function injectSEO() {
  if (typeof document === "undefined") return;

  document.title = "ЖК «Долина Роз» — Судак, ул. Алуштинская | бизнес‑класс у моря";

  const meta = [
    { name: "description", content: "ЖК «Долина Роз» в Судаке (Крым): 8‑этажные дома бизнес‑класса, 316 квартир, двор с бассейном, спорт‑ и детзонами, баня. Паркинг на 191 место. ДДУ 214‑ФЗ, эскроу. Первый ввод — I кв. 2027." },
    { property: "og:title", content: "ЖК «Долина Роз» — новый квартал в Судаке" },
    { property: "og:description", content: "Исторический район у гор и моря: бассейн под открытым небом, аркады с розами, террасы, прогулочные аллеи." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/og-image-dolina-roz.jpg" },
    { property: "og:url", content: typeof location !== "undefined" ? location.href : "https://example.com/" }
  ];

  meta.forEach((m) => {
    const key = m.name ? "name" : "property";
    let el = document.querySelector(`meta[${key}="${m.name || m.property}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(key, m.name || m.property);
      document.head.appendChild(el);
    }
    el.setAttribute("content", m.content);
  });

  // canonical
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = typeof location !== "undefined" ? location.href : "https://example.com/";

  // preload hero (замените на рендер проекта при наличии)
  let pl = document.querySelector('link[rel="preload"][as="image"]');
  if (!pl) {
    pl = document.createElement("link");
    pl.rel = "preload";
    pl.as = "image";
    pl.href = "https://images.unsplash.com/photo-1473442918382-00a3e9be7dbb?q=80&w=1600&auto=format&fit=crop"; // розовый сад + горы заглушка
    document.head.appendChild(pl);
  }
}

function injectFonts() {
  if (typeof document === "undefined") return;
  const links = [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Prata&display=swap" }
  ];
  links.forEach(cfg => {
    const l = document.createElement("link");
    Object.entries(cfg).forEach(([k, v]) => v !== undefined && l.setAttribute(k, v as string));
    document.head.appendChild(l);
  });
}

/* ================= ВСПОМОГАТЕЛЬНЫЕ UI ================= */
function Stat({ value, label, sub, icon }) {
  return (
    <div className="p-5 rounded-2xl border h-full relative overflow-hidden"
      style={{ borderColor: "#F8D7E8", backgroundColor: "#FFFFFF", color: "#341226" }}>
      <div className="absolute -top-8 -right-8 opacity-10 pointer-events-none">
        <div className="w-28 h-28 rounded-full" style={{ background: "radial-gradient(closest-side, #E11D48 30%, transparent 70%)" }} />
      </div>
      <div className="text-sm mb-2 flex items-center gap-2">{icon}{label}</div>
      <div className="text-xl font-semibold">{value}</div>
      {sub && <div className="text-xs mt-1" style={{ color: "#7A4566" }}>{sub}</div>}
    </div>
  );
}

function IconWrap({ children }) {
  return (
    <div className="w-10 h-10 rounded-xl grid place-items-center border shadow-sm"
         style={{ borderColor: "#F8D7E8", backgroundColor: "#FFF5FA", color: "#341226" }}>
      {children}
    </div>
  );
}

function FireIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2s4 4 0 8c3 0 6 2 6 6a6 6 0 0 1-12 0c0-2.5 1.5-4.5 3.5-5.5C9 8 10 5 12 2z" />
    </svg>
  );
}

/* ================= ПРИЛОЖЕНИЕ ================= */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [showUp, setShowUp] = useState(false);

  useEffect(() => {
    injectFonts();
    injectSEO();
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
    const onScroll = () => setShowUp(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      const form = e.currentTarget;
      const data = new FormData(form);
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data
      });
      if (!res.ok) throw new Error("Network error");
      setSent(true);
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Не удалось отправить форму. Попробуйте ещё раз или напишите в WhatsApp.");
    } finally {
      setSending(false);
    }
  }, []);

  return (
    <div className="min-h-screen relative"
      style={{ backgroundColor: "#FFF7FB", color: "#2B1424", fontFamily: "Montserrat, sans-serif" }}>

      {/* ДЕКОР: розовые волны */}
      <div className="pointer-events-none select-none absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #FFE6F1 0%, #FFF7FB 45%, #FFF7FB 100%)" }} />
        <motion.svg initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="absolute top-0 left-1/2 -translate-x-1/2" width="1200" height="240" viewBox="0 0 1200 240" fill="none">
          <path d="M0,120 C200,180 300,40 500,80 C700,120 800,200 1200,120 L1200,0 L0,0 Z" fill="#F8D7E8" opacity="0.8" />
          <path d="M0,160 C200,220 300,80 520,120 C740,160 820,220 1200,160 L1200,0 L0,0 Z" fill="#FFD1E2" opacity="0.8" />
        </motion.svg>
      </div>

      {/* NAVIGATION: сетка + просторные кнопки */}
      <header className="sticky top-0 z-30 border-b backdrop-blur" style={{ backgroundColor: "rgba(255,247,251,0.9)", borderColor: "#F8D7E8" }}>
        <div className="max-w-6xl mx-auto px-5 py-3 grid grid-cols-12 items-center gap-3">
          <a href="#" className="col-span-8 sm:col-span-6 md:col-span-4 flex items-center gap-3 shrink-0 min-w-0">
            <div className="w-9 h-9 rounded-2xl grid place-items-center font-semibold shadow flex-none" style={{ backgroundColor: "#2B1424", color: "#FFD1E2" }}>Р</div>
            <div className="leading-tight truncate">
              <div className="font-extrabold flex items-center gap-2 truncate" style={{ fontFamily: "Prata, serif", fontSize: 18 }}>
                <Home size={18} className="flex-none" /> <span className="truncate">ЖК «Долина Роз»</span>
              </div>
              <div className="text-[11px] truncate" style={{ color: "#7A4566" }}>
                <MapPin size={12} className="inline mr-1" /> Судак, ул. Алуштинская
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex col-span-4 md:col-span-5 justify-center items-center text-[13px]" aria-label="Главное меню">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {["О проекте", "Курортный двор", "Планировки", "Локация", "Сроки", "FAQ"].map((t, i) => (
                <a key={i} href={['#about','#resort','#plans','#location','#status','#faq'][i]} className="hover:text-rose-700 whitespace-nowrap transition-colors" style={{ color: "#7A4566" }}>{t}</a>
              ))}
            </div>
          </nav>

          <div className="col-span-4 sm:col-span-6 md:col-span-3 flex justify-end">
            <div className="hidden sm:flex flex-wrap gap-2 md:gap-3 justify-end">
              <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="px-3 md:px-4 py-2 rounded-2xl border hover:shadow-md" style={{ borderColor: "#F3B8CF", color: "#2B1424" }}>WhatsApp</a>
              <a href="#cta" className="px-3 md:px-4 py-2 rounded-2xl hover:shadow-md" style={{ backgroundColor: "#E11D48", color: "#FFF7FB" }}>Подбор</a>
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden ml-2" aria-label="Меню">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
          </div>
        </div>
        {menuOpen && (
          <div className="sm:hidden bg-white shadow-md border-t" style={{ borderColor: '#F8D7E8' }}>
            <div className="px-4 py-3 flex flex-col gap-2">
              {[['О проекте','#about'],['Курортный двор','#resort'],['Планировки','#plans'],['Локация','#location'],['Сроки','#status'],['FAQ','#faq'],['Контакты','#cta']].map(([t,href]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-rose-50" style={{ color: '#7A4566' }}>{t}</a>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-xl border text-center" style={{ borderColor: '#F3B8CF', color: '#2B1424' }}>WhatsApp</a>
                <a href="#cta" className="px-3 py-2 rounded-xl text-center" style={{ backgroundColor: '#E11D48', color: '#FFF7FB' }}>Подбор</a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4 pt-10 pb-16 md:pb-24 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-extrabold tracking-tight" style={{ fontFamily: "Prata, serif", color: "#2B1424", fontSize: "clamp(28px, 5vw, 56px)", lineHeight: 1.1, maxWidth: "18ch" }}>
              «Долина Роз» — курортный квартал в Судаке
            </h1>
            <p className="mt-5 text-base md:text-lg" style={{ color: "#7A4566", maxWidth: 640 }}>
              8‑этажные дома бизнес‑класса в окружении гор и виноградников. Двор как в отеле: открытый бассейн, баня, спорт‑ и детские площадки, прогулочные аллеи с арками роз. Продажи по ДДУ (214‑ФЗ) через эскроу‑счета.
            </p>

            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[["316 квартир", <Building2 size={18} key="b" />],["Бассейн и баня", <Bath size={18} key="ba" />],["Паркинг на 191 авто", <ParkingSquare size={18} key="p" />],["Студии–2‑комн.", <Ruler size={18} key="r" />]].map(([t, icon], i) => (
                <li key={i} className="p-3 rounded-xl shadow flex items-center gap-2 border bg-white" style={{ borderColor: "#F8D7E8", color: "#2B1424" }}>{icon} {t}</li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#cta" className="px-5 py-3 rounded-2xl hover:shadow-md" style={{ backgroundColor: "#E11D48", color: "#FFF7FB" }}>Получить подборку</a>
              <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-2xl border hover:shadow-md" style={{ borderColor: "#F3B8CF", color: "#2B1424" }}>Связаться в WhatsApp</a>
            </div>
          </motion.div>

          <motion.div className="rounded-3xl overflow-hidden shadow-lg border relative" style={{ height: 520, borderColor: "#F8D7E8" }} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <div className="absolute -top-1 left-0 right-0 h-10 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(248,215,232,0.7), transparent)" }} />
            <img src="https://images.unsplash.com/photo-1473442918382-00a3e9be7dbb?q=80&w=1600&auto=format&fit=crop" alt="Розовые арки и горы, Судак" className="w-full h-full object-cover" loading="eager" fetchpriority="high" width={1600} height={1040} />
          </motion.div>
        </div>
      </section>

      {/* КЛЮЧЕВЫЕ ЧИСЛА */}
      <section id="benefits" className="py-10">
        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-5 items-stretch">
          <div className="h-full"><Stat value="8" label="Этажей" sub="монолит‑кирпич" icon={<Building2 size={18} />} /></div>
          <div className="h-full"><Stat value="316" label="Квартир" sub="видовые и с террасами" icon={<Home size={18} />} /></div>
          <div className="h-full"><Stat value="191" label="М/мест" sub="наземный паркинг" icon={<ParkingSquare size={18} />} /></div>
          <div className="h-full"><Stat value="I кв. 2027" label="Пусковой этап" sub="поэтапный ввод" icon={<Calendar size={18} />} /></div>
        </div>
      </section>

      {/* О ПРОЕКТЕ */}
      <section id="about" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Prata, serif' }}>О проекте</h2>
            <p className="mt-4" style={{ color: '#7A4566' }}>
              «Долина Роз» расположена в историческом районе Судака, среди гор и виноградников, недалеко от Судакской бухты. Концепция — «город в городе»: жилые дома и курортные активности в закрытом дворе. Сделки — по ДДУ (214‑ФЗ) c расчётами через эскроу.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                { h: 'Сроки', t: 'Ориентир первого ввода — I квартал 2027 года; дальнейшие этапы — в 2027.', icon: <Calendar size={18} /> },
                { h: 'Конструктив', t: 'Монолитно‑кирпичная технология, панорамное остекление, энергоэффективность.', icon: <CircuitBoard size={18} /> },
                { h: 'Правовой формат', t: 'ДДУ по 214‑ФЗ, эскроу‑счета. Бренд девелопера — «Перспектива».', icon: <ShieldCheck size={18} /> },
                { h: 'Масштаб', t: '316 квартир; паркинг на 191 место; двор с бассейном, баней, спорт‑ и детзонами.', icon: <Hammer size={18} /> },
              ].map((c, i) => (
                <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ borderColor: '#F8D7E8', backgroundColor: '#FFFFFF' }}>
                  <IconWrap>{c.icon}</IconWrap>
                  <div>
                    <div className="font-semibold" style={{ color: '#2B1424' }}>{c.h}</div>
                    <div className="text-sm mt-1" style={{ color: '#7A4566' }}>{c.t}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="p-6 rounded-2xl border" style={{ backgroundColor: '#FFD1E2', borderColor: '#F8D7E8' }}>
            <div className="font-semibold flex items-center gap-2" style={{ color: '#2B1424' }}>
              <Store size={18} /> Ключевые факты
            </div>
            <ul className="mt-3 space-y-2 text-sm" style={{ color: '#7A4566' }}>
              <li><MapPin size={14} className="inline mr-2" /> Судак, ул. Алуштинская</li>
              <li><Waves size={14} className="inline mr-2" /> Пляжи Судакской бухты — ~4,8 км</li>
              <li><Bike size={14} className="inline mr-2" /> Остановка ~15 мин пешком; автовокзал ~2 км</li>
            </ul>
            <a href="#cta" className="mt-5 inline-block w-full text-center px-4 py-2 rounded-xl hover:shadow-md" style={{ backgroundColor: '#E11D48', color: '#FFF7FB' }}>Запросить подборку</a>
          </aside>
        </div>
      </section>

      {/* КУРОРТНЫЙ ДВОР */}
      <section id="resort" className="py-14 md:py-20" style={{ backgroundColor: '#FFE6F1' }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}>
            <Flower2 size={22} /> Курортный двор
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {[
              { t: "Отдых и оздоровление", points: [[Bath, "Открытый бассейн с зонами шезлонгов"], [Bath, "Традиционная баня"], [Sun, "Террасы и лаунж‑пространства"]] },
              { t: "Активности", points: [[Dumbbell, "Многофункциональная спортплощадка"], [Bike, "Workout и прогулочные аллеи"], [Trees, "Зелёные арки из роз"]] },
              { t: "Для детей", points: [[HeartHandshake, "Площадки с безопасным покрытием"], [Store, "Сервисы на территории"], [ParkingSquare, "Гостевые места и паркинг"]] }
            ].map((b, i) => (
              <div key={i} className="p-6 rounded-2xl border" style={{ backgroundColor: '#FFFFFF', borderColor: '#F8D7E8' }}>
                <div className="font-semibold" style={{ color: '#2B1424' }}>{b.t}</div>
                <ul className="mt-3 space-y-2 text-sm" style={{ color: '#7A4566' }}>
                  {b.points.map(([Ic, txt], j) => (
                    <li key={j} className="flex gap-3 items-start"><Ic size={16} /> {txt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПЛАНИРОВКИ */}
      <section id="plans" className="py-14 md:py-20">
        <div className="max-w-6xl mx_auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Ruler size={22} /> Планировочные решения</h2>
          <p className="mt-3" style={{ color: '#7A4566' }}>
            Студии, 1‑ и 2‑комнатные квартиры, видовые этажи и планы с террасами. Актуальные варианты и цены отправим в PDF‑подборке.
          </p>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              { t: "Студии", d: "Компактные форматы для старта/аренды", icon: <Home size={18} /> },
              { t: "1‑комнатные", d: "Кухни‑гостиные, балконы и террасы", icon: <Home size={18} /> },
              { t: "2‑комнатные", d: "Семейные сценарии, отдельные спальни", icon: <Home size={18} /> },
            ].map((c, i) => (
              <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ backgroundColor: '#FFFFFF', borderColor: '#F8D7E8' }}>
                <IconWrap>{c.icon}</IconWrap>
                <div>
                  <div className="font-semibold" style={{ color: '#2B1424' }}>{c.t}</div>
                  <div className="text-sm mt-1" style={{ color: '#7A4566' }}>{c.d}</div>
                  <a href="#cta" className="mt-3 inline-block text-sm hover:underline" style={{ color: '#C50E3C' }}>Запросить PDF‑подборку планировок</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* СТАТУС И СРОКИ */}
      <section id="status" className="py-14 md:py-20" style={{ backgroundColor: '#FFE6F1' }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><FileText size={22} /> Сроки и статус</h2>
        </div>
        <div className="max-w-6xl mx-auto px-4 mt-6 grid md:grid-cols-4 gap-4">
          {[
            { t: "Адрес", d: "Республика Крым, г. Судак, ул. Алуштинская", icon: <MapPin size={18} /> },
            { t: "Сроки", d: "Ближайший ввод — I кв. 2027; поэтапно в 2027", icon: <Calendar size={18} /> },
            { t: "Девелопер", d: "Бренд «Перспектива». По данным ЕРЗ: ООО СЗ «Развитие Девелопмент».", icon: <ShieldCheck size={18} /> },
            { t: "Парковка", d: "191 место на территории", icon: <ParkingSquare size={18} /> },
          ].map((s, i) => (
            <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ backgroundColor: '#FFFFFF', borderColor: '#F8D7E8' }}>
              <IconWrap>{s.icon}</IconWrap>
              <div>
                <div className="text-lg font-semibold" style={{ color: '#2B1424' }}>{s.t}</div>
                <div className="text-sm mt-1" style={{ color: '#7A4566' }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ЛОКАЦИЯ */}
      <section id="location" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><MapPin size={22} /> Доступность и расстояния</h2>
            <ul className="mt-4 space-y-2" style={{ color: '#7A4566' }}>
              {[
                "Центр Судака — ~4,7 км (10 мин на авто)",
                "Пляжи Судакской бухты — ~4,8 км (13 мин на авто)",
                "Остановки — ~15 мин пешком; автовокзал — ~2 км",
              ].map((t, i) => (
                <li key={i} className="flex gap-3 items-start"><span className="mt-0.5"><Bike size={16} /></span> {t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow border" style={{ borderColor: '#F8D7E8' }}>
            <iframe title="map" src="https://yandex.ru/map-widget/v1/?text=%D0%A1%D1%83%D0%B4%D0%B0%D0%BA%2C%20%D1%83%D0%BB.%20%D0%90%D0%BB%D1%83%D1%88%D1%82%D0%B8%D0%BD%D1%81%D0%BA%D0%B0%D1%8F&z=14" className="w-full h-[360px]" loading="lazy" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Prata, serif' }}>Вопросы и ответы</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {[
              { q: "Где расположен комплекс?", a: "Республика Крым, г. Судак, ул. Алуштинская." },
              { q: "Какие дома и этажность?", a: "Бизнес‑класс, 8 этажей, монолит‑кирпич." },
              { q: "Какая инфраструктура во дворе?", a: "Открытый бассейн, баня, спорт‑ и детские площадки, прогулочные аллеи." },
              { q: "Какие сроки?", a: "Ближайший ввод — I кв. 2027; поэтапный ввод в 2027." },
              { q: "Есть ли паркинг?", a: "Да, 191 машиноместо на территории." },
              { q: "Как проходит покупка?", a: "ДДУ по 214‑ФЗ с расчетами через эскроу‑счета." }
            ].map((i, idx) => (
              <details key={idx} className="p-5 rounded-2xl border bg-white" style={{ borderColor: '#F8D7E8' }}>
                <summary className="font-semibold cursor-pointer" style={{ color: '#2B1424' }}>{i.q}</summary>
                <p className="mt-2 text-sm" style={{ color: '#7A4566' }}>{i.a}</p>
              </details>
            ))}
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Где расположен комплекс?", "acceptedAnswer": { "@type": "Answer", "text": "Республика Крым, г. Судак, ул. Алуштинская." } },
            { "@type": "Question", "name": "Какие дома и этажность?", "acceptedAnswer": { "@type": "Answer", "text": "Бизнес‑класс, 8 этажей, монолит‑кирпич." } },
            { "@type": "Question", "name": "Какая инфраструктура во дворе?", "acceptedAnswer": { "@type": "Answer", "text": "Открытый бассейн, баня, спорт‑ и детские площадки, прогулочные аллеи." } },
            { "@type": "Question", "name": "Какие сроки?", "acceptedAnswer": { "@type": "Answer", "text": "Ближайший ввод — I кв. 2027; поэтапный ввод в 2027." } },
            { "@type": "Question", "name": "Есть ли паркинг?", "acceptedAnswer": { "@type": "Answer", "text": "191 место на территории." } },
            { "@type": "Question", "name": "Как проходит покупка?", "acceptedAnswer": { "@type": "Answer", "text": "ДДУ по 214‑ФЗ и эскроу‑счета." } }
          ]
        }) }} />
      </section>

      {/* CTA + ФОРМА */}
      <section id="cta" className="py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Handshake size={22} /> Оставьте заявку на подбор</h2>
            <p style={{ color: '#7A4566' }}>
              Пришлём PDF с планировками, этажами и видами, а также актуальные условия покупки и сроки.
            </p>
            <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="inline-block px-5 py-3 rounded-2xl border hover:shadow-md" style={{ borderColor: '#F3B8CF', color: '#2B1424' }}>Связаться в WhatsApp</a>
          </div>
          <div className="p-6 rounded-2xl border shadow" style={{ backgroundColor: '#FFFFFF', borderColor: '#F8D7E8' }}>
            {sent ? (
              <div className="text-center">
                <div className="text-xl font-semibold" style={{ color: '#2B1424' }}>Спасибо! Заявка отправлена.</div>
                <p className="mt-2" style={{ color: '#7A4566' }}>Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <>
                <div className="text-xl font-semibold" style={{ color: '#2B1424' }}>Получить подборку</div>
                <p className="text-sm mt-1" style={{ color: '#7A4566' }}>
                  Оставьте контакты — вышлем планировки и цены по ЖК «Долина Роз».
                </p>
                <form onSubmit={onSubmit} className="mt-4 space-y-3">
                  <input type="hidden" name="access_key" value="af90736e-9a82-429d-9943-30b5852e908a" />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#F8D7E8' }} name="name" placeholder="Ваше имя" required />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#F8D7E8' }} name="phone" placeholder="Телефон" required />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#F8D7E8' }} name="email" placeholder="Email (по желанию)" />
                  <textarea className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#F8D7E8' }} name="message" placeholder="Комментарий" rows={3} />
                  <button type="submit" disabled={sending} className="w-full px-4 py-3 rounded-xl hover:shadow-md disabled:opacity-70" style={{ backgroundColor: '#E11D48', color: '#FFF7FB' }}>
                    {sending ? "Отправляем..." : "Отправить"}
                  </button>
                </form>
                <a href="/policy.html" className="block text-xs mt-3 underline" style={{ color: '#A06187' }}>Политика конфиденциальности</a>
                <a href="/consent.html" className="block text-xs underline" style={{ color: '#A06187' }}>Согласие на обработку ПДн</a>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t" style={{ borderColor: '#F8D7E8' }}>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-sm" style={{ color: '#7A4566' }}>
          <div className="md:col-span-2">
            <div className="font-semibold flex items-center gap-2" style={{ color: '#2B1424' }}>
              <Home size={16} /> ЖК «Долина Роз»
            </div>
            <p className="mt-2">Республика Крым, г. Судак, ул. Алуштинская</p>
            <p className="mt-1">ДДУ по 214‑ФЗ, расчёты через эскроу‑счета.</p>
          </div>
          <div className="md:text-right">
            <a href="/policy.html" className="underline">Политика конфиденциальности</a>
            <span className="mx-2">•</span>
            <a href="/consent.html" className="underline">Согласие на обработку ПДн</a>
          </div>
        </div>
      </footer>

      {/* JSON-LD Residence */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Residence",
        "name": "ЖК «Долина Роз»",
        "url": typeof location !== "undefined" ? location.href : "https://example.com/",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "ул. Алуштинская",
          "addressLocality": "Судак",
          "addressRegion": "Республика Крым",
          "addressCountry": "RU"
        }
      }) }} />

      {/* Scroll to top */}
      {showUp && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-5 right-5 rounded-full shadow-lg" style={{ backgroundColor: "#E11D48", color: "#FFF7FB", padding: 12 }} aria-label="Наверх">
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
