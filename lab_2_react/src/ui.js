// Спільні набори утилітарних класів Tailwind, щоб не повторювати їх у компонентах.

// База посилання без кольору: при наведенні інвертується, як виділення в терміналі.
const linkBase =
  "underline decoration-phosphor-deep underline-offset-4 transition-[color,background-color,transform] duration-150 ease-snap hover:bg-phosphor hover:text-void hover:decoration-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-phosphor active:bg-phosphor-deep";

export const link = `${linkBase} text-term`;
export const linkAccent = `${linkBase} text-phosphor`;

// Рівень/мітка в рамці.
export const tag = "border border-line px-1.5 text-sm text-dim";
