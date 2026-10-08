import Section from "./Section.jsx";

function Objective() {
  return (
    <Section id="objective" cmd="cat" arg={`"Мета"`} title="Мета">
      <p className="max-w-[72ch] text-base leading-relaxed text-term md:text-lg md:leading-relaxed">
        Вмотивований початківець у сфері IT та розробки програмного забезпечення
        зі стійкою базою у програмуванні (Python, JS), системному
        адмініструванні Linux/Windows та комп'ютерних мережах. Прагну
        застосувати технічні навички, аналітичне мислення та академічні знання
        для вирішення практичних завдань команди, швидкої адаптації до нових
        технологій і професійного зростання.
      </p>
    </Section>
  );
}

export default Objective;
