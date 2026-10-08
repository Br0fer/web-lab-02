import Section from "./Section.jsx";
import { tag } from "../ui.js";

const langs = [
  ["LANG=uk_UA.UTF-8", "Українська", "рідна"],
  ["LANGUAGE=en", "Англійська", "B2/C1"],
];

// Вивід у стилі команди locale: змінна середовища + коментар з рівнем.
function Langs() {
  return (
    <Section id="languages" cmd="locale  #" arg="Іноземні мови" title="Іноземні мови">
      <ul className="space-y-2">
        {langs.map(([variable, name, level]) => (
          <li key={variable} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span aria-hidden="true" className="w-[17ch] shrink-0 text-phosphor-deep">
              {variable}
            </span>
            <span>
              <span className="font-bold text-term">{name}</span> –{" "}
              <span className={tag}>{level}</span>
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export default Langs;
