function Header() {
  return (
    <header>
      <h1>Шаповалов Тарас</h1>
      <p>Резюме</p>
      <address>
        <ul>
          <li>
            Дата народження:{" "}
            <time dateTime="2008-04-22">22 квітня 2008 р.</time>
          </li>
          <li>Місто: Львів</li>
          <li>
            Телефон: <a href="tel:+380938576383">+380938576383</a>
          </li>
          <li>
            E-mail:{" "}
            <a href="mailto:tarik.shap@gmail.com">tarik.shap@gmail.com</a>
          </li>
        </ul>
      </address>
      <nav>
        <ul>
          <li>
            <a href="#objective">Мета</a>
          </li>
          <li>
            <a href="#skills">Ключові навички</a>
          </li>
          <li>
            <a href="#education">Освіта</a>
          </li>
          <li>
            <a href="#certifications">Додаткова освіта та сертифікації</a>
          </li>
          <li>
            <a href="#languages">Іноземні мови</a>
          </li>
          <li>
            <a href="#additional">Додаткова інформація</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
