import Section from "./Section.jsx";

const courses = [
  ["2024", "Курси Python Pro"],
  ["2023", "Курси Python Intermediate"],
  ["2022", "Курси Python Beginner"],
];

// Вивід у стилі git log --graph: від найновішого до найстарішого.
function Certifs() {
  return (
    <Section
      id="certifications"
      cmd="git log --graph"
      arg={`"Додаткова освіта та сертифікації"`}
      title="Додаткова освіта та сертифікації"
    >
      <ol reversed className="max-w-3xl">
        {courses.map(([year, name], i) => (
          <li
            key={year}
            className="grid grid-cols-[1.5rem_3.5rem_minmax(0,1fr)] items-baseline gap-x-2 sm:grid-cols-[1.5rem_3.5rem_minmax(0,1fr)_auto]"
          >
            <span aria-hidden="true" className="text-phosphor">
              *
            </span>
            <time dateTime={year} className="font-bold text-phosphor">
              {year}
            </time>
            <span className="text-term">{name}</span>
            <span className="col-start-3 text-sm text-dim sm:col-start-auto">(Logika)</span>
            {i < courses.length - 1 && (
              <span aria-hidden="true" className="col-span-full pl-0 text-phosphor-deep">
                |
              </span>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}

export default Certifs;
