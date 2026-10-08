import Header from "./components/Header.jsx";
import Toc from "./components/Toc.jsx";
import Objective from "./components/Objective.jsx";
import Skills from "./components/Skills.jsx";
import Education from "./components/Education.jsx";
import Certifs from "./components/Certifs.jsx";
import Langs from "./components/Langs.jsx";
import Addit from "./components/Addit.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <div className="min-h-screen bg-[repeating-linear-gradient(to_bottom,transparent_0_2px,rgb(61_255_122/0.022)_2px_3px)] print:bg-none print:**:border-black/30! print:**:bg-transparent! print:**:text-black! print:**:[text-shadow:none]!">
      <Header />
      <Toc />

      <main className="mx-auto max-w-6xl px-4 sm:px-6">
        <Objective />
        <Skills />
        <Education />
        <Certifs />
        <Langs />
        <Addit />
      </main>

      <Footer />
    </div>
  );
}

export default App;
