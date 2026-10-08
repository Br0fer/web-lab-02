// Розділ як команда в терміналі: заголовок — це команда, вміст — її вивід.
function Section({ id, cmd, arg, title, children }) {
  return (
    <section
      id={id}
      className="group/section scroll-mt-16 border-t border-line py-10 first:border-t-0 md:py-14"
    >
      <h2
        aria-label={title}
        className="mb-6 text-base md:text-lg"
      >
        <span aria-hidden="true" className="text-dim">
          taras@lviv:~${" "}
        </span>
        <span aria-hidden="true" className="text-phosphor">
          {cmd}{" "}
        </span>
        <span className="font-bold text-term group-target/section:bg-phosphor group-target/section:px-1 group-target/section:text-void">
          {arg}
        </span>
      </h2>
      <div className="md:pl-6">{children}</div>
    </section>
  );
}

export default Section;
