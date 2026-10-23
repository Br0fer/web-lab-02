import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Toc from "./components/Toc.jsx";
import Objective from "./components/Objective.jsx";
import Skills from "./components/Skills.jsx";
import Education from "./components/Education.jsx";
import Certifs from "./components/Certifs.jsx";
import Langs from "./components/Langs.jsx";
import Addit from "./components/Addit.jsx";
import Reviews from "./components/Reviews.jsx";
import Footer from "./components/Footer.jsx";
import ContactForm from "./components/ContactForm.jsx";

// Денна тема з 07:00 до 21:00, нічна — в увесь інший час.
function getThemeByTime(date = new Date()) {
  const hours = date.getHours();
  return hours >= 7 && hours < 21 ? "light" : "dark";
}

function App() {
  const [theme, setTheme] = useState("dark");

  // Автоматичне перемикання: при першому завантаженні дивимось на годинник.
  useEffect(() => {
    setTheme(getThemeByTime());
  }, []);

  // Клас теми на <html>: від нього залежать токени кольорів в index.css.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
  }, [theme]);

  const toggleTheme = () => setTheme((current) => (current === "dark" ? "light" : "dark"));

  return (
    <div className="min-h-screen bg-[repeating-linear-gradient(to_bottom,transparent_0_2px,rgb(61_255_122/0.022)_2px_3px)] light:bg-none print:bg-none print:**:border-black/30! print:**:bg-transparent! print:**:text-black! print:**:[text-shadow:none]!">
      <Header />
      <Toc theme={theme} onToggleTheme={toggleTheme} />

      <main className="mx-auto max-w-6xl px-4 sm:px-6">
        <Objective />
        <Skills />
        <Education />
        <Certifs />
        <Langs />
        <Addit />
        <Reviews />
      </main>

      <Footer />
      <ContactForm />
    </div>
  );
}

export default App;
