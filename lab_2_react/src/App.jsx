import Header from "./components/Header.jsx";
import Objective from "./components/Objective.jsx";
import Skills from "./components/Skills.jsx";
import Education from "./components/Education.jsx";
import Certifs from "./components/Certifs.jsx";
import Langs from "./components/Langs.jsx";
import Addit from "./components/Addit.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <>
      <Header />

      <main>
        <Objective />
        <Skills />
        <Education />
        <Certifs />
        <Langs />
        <Addit />
      </main>
      <Footer />
    </>
  );
}

export default App;
