import { link, linkAccent } from "../ui.js";

const cursor =
  "inline-block h-[0.85em] w-[0.5em] translate-y-[0.1em] animate-blink bg-phosphor motion-reduce:animate-none print:hidden";

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
