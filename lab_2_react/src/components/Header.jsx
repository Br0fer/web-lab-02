import { link } from "../ui.js";

const meta = [
  { label: "Дата народження", value: <time dateTime="2008-04-22">22 квітня 2008 р.</time> },
  { label: "Місто", value: "Львів" },
  {
    label: "Телефон",
    value: (
      <a className={link} href="tel:+380938576383">
        +380 93 857 63 83
      </a>
    ),
  },
  {
    label: "E-mail",
    value: (
      <a className={link} href="mailto:tarik.shap@gmail.com">
        tarik.shap@gmail.com
      </a>
    ),
  },
  { label: "Редакція", value: <time dateTime="2026-10">жовтень 2026</time> },
  {
    label: "Позначка",
    value: (
      <span
        title="Traffic Light Protocol: інформацію можна поширювати вільно"
        className="border border-white/50 bg-black px-1.5 py-px text-xs font-medium tracking-wider text-white"
      >
        TLP:CLEAR
      </span>
    ),
  },
];

const stack = [
  ["code", "Python"],
  ["code", "C# / .NET"],
  ["code", "HTML · CSS · JS"],
  ["code", "Git & GitHub"],
  ["ops", "Linux (Fedora)"],
  ["ops", "Windows"],
  ["net", "TCP/IP · OSI"],
  ["sec", "CTF: Linux PrivEsc"],
  ["sec", "ISO/IEC 27001"],
];

// Замок із блокових символів: власний ASCII-логотип у стилі neofetch.
const padlock = `      ▄▄██████▄▄
    ▄██▀▀    ▀▀██▄
    ██▀        ▀██
    ██          ██
  ▄████████████████▄
  ██████▀▀  ▀▀██████
  ██████      ██████
  ████████  ████████
  ████████  ████████
  ▀████████████████▀`;

function Header() {
  return (
    <header id="top" className="border-b border-line bg-panel">
      <div className="mx-auto max-w-6xl px-4 pt-10 pb-10 sm:px-6 md:pt-16">
        <p className="text-sm text-dim md:text-base">
          <span className="text-phosphor">taras@lviv</span>:~${" "}
          <span className="inline-block animate-type whitespace-nowrap text-term motion-reduce:animate-none">
            whoami
          </span>
        </p>

        <div className="animate-reveal motion-reduce:animate-none">
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-phosphor [text-shadow:0_0_22px_rgb(61_255_122/0.35)] sm:text-5xl lg:text-6xl">
            Шаповалов Тарас
            <span
              aria-hidden="true"
              className="ml-3 inline-block h-[0.8em] w-[0.45em] translate-y-[0.08em] animate-blink bg-phosphor motion-reduce:animate-none print:hidden"
            />
          </h1>
          <p className="mt-3 text-term/80 md:text-lg">
            Резюме · Кібербезпека, бакалавр НУ «Львівська політехніка»
          </p>
        </div>

        <div className="mt-10 grid items-start gap-x-12 gap-y-8 md:grid-cols-[auto_minmax(0,1fr)]">
          <pre
            aria-hidden="true"
            className="hidden text-[0.8rem] leading-[1.15] text-phosphor-deep select-none md:block print:hidden"
          >
            {padlock}
          </pre>

          <address className="not-italic">
            <p className="text-phosphor">
              taras<span className="text-dim">@</span>lviv
            </p>
            <p aria-hidden="true" className="text-dim">
              ----------
            </p>

            <dl className="mt-2 grid grid-cols-[max-content_minmax(0,1fr)] gap-x-3 gap-y-1.5 text-sm md:text-base">
              {meta.map(({ label, value }) => (
                <div key={label} className="contents">
                  <dt className="font-bold text-phosphor">{label}:</dt>
                  <dd className="min-w-0 break-words">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-3">
              <h2 className="shrink-0 text-sm font-bold text-phosphor md:text-base">
                Стек:
              </h2>
              <ul className="flex flex-wrap gap-1.5">
                {stack.map(([group, name]) => (
                  <li
                    key={name}
                    data-group={group}
                    className="border border-line px-2 py-0.5 text-sm whitespace-nowrap text-term data-[group=sec]:border-phosphor data-[group=sec]:bg-phosphor data-[group=sec]:font-bold data-[group=sec]:text-void"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>

            <div aria-hidden="true" className="mt-5 flex print:hidden">
              {["bg-void", "bg-line", "bg-phosphor-deep", "bg-dim", "bg-phosphor", "bg-term"].map(
                (c) => (
                  <span key={c} className={`h-4 w-7 ${c}`} />
                ),
              )}
            </div>
          </address>
        </div>
      </div>
    </header>
  );
}

export default Header;
