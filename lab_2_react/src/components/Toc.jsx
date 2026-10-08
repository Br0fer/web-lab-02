import { useEffect, useRef, useState } from "react";

const items = [
  ["objective", "Мета"],
  ["skills", "Ключові навички"],
  ["education", "Освіта"],
  ["certifications", "Додаткова освіта та сертифікації"],
  ["languages", "Іноземні мови"],
  ["additional", "Додаткова інформація"],
];

// Зміст як статус-рядок tmux: сесія [cv], вікна-розділи, активне позначене «*».
function Toc() {
  const [active, setActive] = useState(null);
  const listRef = useRef(null);

  // Позначаємо розділ, який зараз посередині екрана.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    items.forEach(([id]) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  // На вузькому екрані прокручуємо рядок так, щоб активне вікно було видно.
  useEffect(() => {
    const list = listRef.current;
    const current = list?.querySelector('[aria-current="location"]');
    if (!list || !current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left: current.offsetLeft - 48, behavior: reduce ? "auto" : "smooth" });
  }, [active]);

  return (
    <nav
      aria-label="Зміст"
      className="sticky top-0 z-10 bg-phosphor text-void print:hidden"
    >
      <div className="mx-auto flex h-9 max-w-6xl items-stretch text-sm sm:px-6">
        <span aria-hidden="true" className="flex shrink-0 items-center px-3 font-bold sm:pl-0">
          [cv]
        </span>
        <ul
          ref={listRef}
          className="flex min-w-0 flex-1 items-stretch overflow-x-auto [scrollbar-width:none] [mask-image:linear-gradient(to_right,#000_80%,transparent)] sm:[mask-image:none]"
        >
          {items.map(([id, label], i) => {
            const isActive = active === id;
            return (
              <li key={id} className="flex">
                <a
                  href={`#${id}`}
                  aria-current={isActive ? "location" : undefined}
                  className="flex items-center px-1.5 whitespace-nowrap transition-[color,background-color,transform] duration-150 ease-snap hover:bg-void hover:text-phosphor focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-void active:scale-[0.97] aria-[current=location]:bg-void aria-[current=location]:font-bold aria-[current=location]:text-phosphor"
                >
                  {i + 1}:{label}
                  <span aria-hidden="true" className="w-[1ch]">
                    {isActive ? "*" : ""}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default Toc;
