import Section from "./Section.jsx";
import { link } from "../ui.js";

function Education() {
  return (
    <Section id="education" cmd="cat" arg={`"Освіта"`} title="Освіта">
      <article>
        <h3 className="text-lg font-bold md:text-xl">
          <a className={link} href="https://lpnu.ua/">
            Національний університет «Львівська політехніка»
          </a>
        </h3>
        <p className="mt-1 text-dim">
          <time dateTime="2025">2025</time> – дотепер
        </p>
        <dl className="mt-4 grid grid-cols-[max-content_minmax(0,1fr)] gap-x-4 gap-y-1.5">
          <dt className="text-phosphor">Спеціальність:</dt>
          <dd>«Кібербезпека»</dd>
          <dt className="text-phosphor">Рівень:</dt>
          <dd>бакалавр</dd>
        </dl>
      </article>
    </Section>
  );
}

export default Education;
