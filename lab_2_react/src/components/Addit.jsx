import Section from "./Section.jsx";

function Addit() {
  return (
    <Section id="additional" cmd="cat" arg={`"Додаткова інформація"`} title="Додаткова інформація">
      <p className="max-w-[72ch] leading-relaxed text-term">
        Наявність закордонного паспорту, 4 роки навчання програмування. Швидко
        навчаюсь, маю аналітичний склад розуму та готовий до швидкого засвоєння
        нових інструментів.
      </p>
    </Section>
  );
}

export default Addit;
