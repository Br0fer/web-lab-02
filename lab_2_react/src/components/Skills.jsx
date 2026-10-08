import Section from "./Section.jsx";

const groups = [
  {
    title: "Мови програмування та розробка",
    items: [
      [
        "Python:",
        "практичний досвід, розуміння статичної типізації (mypy), автоматизація завдань, робота зі сторонніми API.",
      ],
      [
        "C# / .NET:",
        "об'єктно-орієнтоване проєктування (ООП), створення десктопних застосунків (WinForms).",
      ],
      [null, "База HTML, CSS, JS."],
      [
        "Git & GitHub:",
        "базовий досвід роботи з розподіленими системами контролю версій (ініціалізація репозиторіїв, створення комітів, робота з гілками, merge, пулл-реквести/PR, оформлення кодової бази та README).",
      ],
    ],
  },
  {
    title: "Операційні системи та адміністрування",
    items: [
      [
        null,
        "Досвід роботи та базового адміністрування Linux (Fedora, налаштування та кастомізація середовища).",
      ],
      [null, "Впевнений користувач та досвід роботи в середовищі Windows."],
    ],
  },
  {
    title: "Мережеві технології",
    items: [
      [
        null,
        "Розуміння архітектури комп'ютерних мереж, моделі OSI, стеку протоколів TCP/IP, принципів адресації та маршрутизації.",
      ],
    ],
  },
  {
    title: "Інформаційна безпека та стандарти",
    items: [
      [
        null,
        "Базові принципи моніторингу та логування (збір і базовий аналіз системних та мережевих подій).",
      ],
      [
        null,
        "Розуміння концепцій безпеки систем, досвід вирішення CTF-завдань (Linux Privilege Escalation).",
      ],
      [null, "Ознайомлення зі стандартами інформаційної безпеки (ISO/IEC 27001)."],
    ],
  },
];

// Гілки дерева, як у виводі команди tree.
const branch = (last) => (last ? "└── " : "├── ");

function Skills() {
  return (
    <Section id="skills" cmd="tree" arg={`"Ключові навички"/`} title="Ключові навички">
      <div className="grid gap-x-12 gap-y-8 lg:grid-cols-2">
        {groups.map((group) => (
          <section key={group.title}>
            <h3 className="font-bold text-phosphor">
              {group.title}
              <span aria-hidden="true" className="text-dim">
                /
              </span>
            </h3>
            <ul className="mt-2">
              {group.items.map(([label, text], i) => (
                <li
                  key={text}
                  className="grid grid-cols-[auto_minmax(0,1fr)] text-[0.9375rem] leading-relaxed"
                >
                  <span aria-hidden="true" className="whitespace-pre text-phosphor-deep">
                    {branch(i === group.items.length - 1)}
                  </span>
                  <span className="text-term/85">
                    {label && <strong className="font-bold text-term">{label}</strong>}{" "}
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Section>
  );
}

export default Skills;
