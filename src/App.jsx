import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Project from "./components/Projects";
import Contact from "./components/Contact";

const App = () => {
  return (
    <div className="main-wrapper">
      <Hero />
      <About />
      <Skills />
      <Project/>
      <Contact/>
    </div>
  );
};

export default App;
