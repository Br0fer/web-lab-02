import { useEffect, useState } from "react";
import { link, linkAccent } from "../ui.js";

const cursor =
  "inline-block h-[0.85em] w-[0.5em] translate-y-[0.1em] animate-blink bg-phosphor motion-reduce:animate-none print:hidden";

const STORAGE_KEY = "systemInfo";

function detectOS(ua) {
  if (/Windows NT 10/.test(ua)) return "Windows 10/11";
  if (/Windows/.test(ua)) return "Windows";
  if (/Android/.test(ua)) return "Android";
  if (/iPhone|iPad|iPod/.test(ua)) return "iOS";
  if (/Mac OS X/.test(ua)) return "macOS";
  if (/Linux/.test(ua)) return "Linux";
  return "Невідома";
}

function detectBrowser(ua) {
  // Порядок важливий: Edge і Opera теж містять «Chrome» у userAgent.
  const rules = [
    ["Edge", /Edg\/(\d+)/],
    ["Opera", /OPR\/(\d+)/],
    ["Firefox", /Firefox\/(\d+)/],
    ["Chrome", /Chrome\/(\d+)/],
    ["Safari", /Version\/(\d+).*Safari/],
  ];
  for (const [name, pattern] of rules) {
    const match = ua.match(pattern);
    if (match) return `${name} ${match[1]}`;
  }
  return "Невідомий";
}

function collectSystemInfo() {
  const ua = navigator.userAgent;
  return {
    "Операційна система": detectOS(ua),
    Браузер: detectBrowser(ua),
    Платформа: navigator.platform || "—",
    Мова: navigator.language,
    "Часовий пояс": Intl.DateTimeFormat().resolvedOptions().timeZone,
    "User-Agent": ua,
  };
}

// Вивід у стилі neofetch: «ключ: значення» з localStorage.
function SystemInfo() {
  const [info, setInfo] = useState(null);

  // Після монтування: зберігаємо дані в localStorage і одразу зчитуємо їх звідти.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collectSystemInfo()));
    setInfo(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  }, []);

  if (!info) return null;

  return (
    <section aria-labelledby="sysinfo-title" className="mt-3 print:hidden">
      <h2 id="sysinfo-title" className="text-sm">
        <span aria-hidden="true" className="text-dim">
          ~$ cat localStorage/{STORAGE_KEY}
        </span>
        <span className="sr-only">Ваша система (дані з localStorage)</span>
      </h2>
      <dl className="mt-3 grid grid-cols-1 gap-x-4 gap-y-1 text-sm sm:grid-cols-[max-content_minmax(0,1fr)]">
        {Object.entries(info).map(([label, value]) => (
          <div key={label} className="contents">
            <dt className="font-bold text-phosphor">{label}:</dt>
            <dd className="mb-2 min-w-0 break-words text-term sm:mb-0">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line bg-panel">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span aria-hidden="true" className="text-dim sm:text-xl">
            ~$ mail
          </span>
          <a
            className={`${linkAccent} inline-block px-1 text-xl font-bold active:scale-[0.97] motion-reduce:active:scale-100 sm:text-3xl lg:text-4xl`}
            href="mailto:tarik.shap@gmail.com"
          >
            tarik.shap@gmail.com
          </a>
          <span className="text-dim"># Зв'язатися зі мною:</span>
        </p>

        <p className="mt-3 flex flex-wrap items-baseline gap-x-3">
          <span aria-hidden="true" className="text-dim">
            ~$ call
          </span>
          <a className={link} href="tel:+380938576383">
            +380 93 857 63 83
          </a>
        </p>

        <SystemInfo />

        <p aria-hidden="true" className="mt-3 text-dim">
          ~$ <span className={cursor} />
        </p>

        <p className="mt-14 flex flex-wrap justify-between gap-2 border-t border-line pt-5 text-sm text-dim">
          <small className="text-sm">&copy; 2026 Шаповалов Тарас</small>
          <span aria-hidden="true">logout</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
