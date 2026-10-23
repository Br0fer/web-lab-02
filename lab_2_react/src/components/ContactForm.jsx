import { useEffect, useRef, useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mkjjnwvb";
const OPEN_DELAY = 60 * 1000; // 1 хвилина на сайті
const SHOWN_KEY = "feedbackShown"; // sessionStorage: щоб не показувати повторно

const fields = [
  { name: "name", label: "Ім'я", type: "text", autoComplete: "name", required: true },
  { name: "email", label: "Email", type: "email", autoComplete: "email", required: true },
  { name: "phone", label: "Телефон", type: "tel", autoComplete: "tel", placeholder: "+380 __ ___ __ __" },
];

const input =
  "w-full border border-line bg-void px-3 py-2 text-term placeholder:text-dim/70 transition-colors duration-150 focus:border-phosphor focus:outline-none";

const button =
  "border px-4 py-2 font-bold transition-[color,background-color,transform] duration-150 ease-snap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-phosphor active:scale-[0.97] motion-reduce:active:scale-100";

// Вікно форми: рендериться лише коли isOpen === true.
function Modal({ onClose }) {
  const firstFieldRef = useRef(null);

  // Фокус на першому полі та закриття клавішею Esc.
  useEffect(() => {
    firstFieldRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 p-4 backdrop-blur-[2px]"
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-title"
        className="max-h-[calc(100dvh-2rem)] w-full max-w-lg animate-pop overflow-y-auto border border-phosphor bg-panel shadow-[0_0_40px_rgb(61_255_122/0.12)] motion-reduce:animate-none light:shadow-lg"
      >
        <div className="flex items-center justify-between bg-phosphor px-4 py-1.5 text-sm font-bold text-void">
          <span id="feedback-title">[ mail -s "Зворотний зв'язок" ]</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрити форму"
            className="px-1.5 transition-colors duration-150 hover:bg-void hover:text-phosphor focus-visible:outline-2 focus-visible:outline-void"
          >
            [x]
          </button>
        </div>

        <div className="p-5 sm:p-6">
          <p className="text-sm text-dim"># Маєте пропозицію чи питання? Лист прийде мені на пошту.</p>

          <form action={FORMSPREE_ENDPOINT} method="POST" className="mt-5 grid gap-4">
            {fields.map(({ name, label, ...rest }, i) => (
              <label key={name} className="grid gap-1 text-sm">
                <span className="text-phosphor">{label}:</span>
                <input ref={i === 0 ? firstFieldRef : undefined} name={name} className={input} {...rest} />
              </label>
            ))}

            <label className="grid gap-1 text-sm">
              <span className="text-phosphor">Повідомлення:</span>
              <textarea name="message" rows={5} required className={`${input} resize-y`} />
            </label>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className={`${button} border-phosphor bg-phosphor text-void hover:bg-transparent hover:text-phosphor`}
              >
                Надіслати
              </button>
              <button
                type="button"
                onClick={onClose}
                className={`${button} border-line text-term hover:border-phosphor hover:text-phosphor`}
              >
                Закрити
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);

  // Через 1 хвилину відкриваємо форму — якщо в цій сесії її ще не показували.
  useEffect(() => {
    if (sessionStorage.getItem(SHOWN_KEY)) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem(SHOWN_KEY, "true");
    }, OPEN_DELAY);

    return () => clearTimeout(timer);
  }, []);

  return isOpen && <Modal onClose={() => setIsOpen(false)} />;
}

export default ContactForm;
