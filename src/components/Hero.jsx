import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Typewriter } from "react-simple-typewriter";
import "./Hero.css";
import WaveCanvas from "./InteractiveParticles";
import Navbar from "./Navbar";
import scroll from "./scroll";
const Hero = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <section className="hero-container">
        <Navbar />
    <WaveCanvas/>
      {/* Hero Text */}
      <div className="hero-content">
        <div className="hero-content-top">Hi, I'm Aryan</div>
        <div className="hero-content-bottom">
          I am{" "}
          <span>
            <Typewriter
              words={["a Developer.", "a Coder.", "a Student."]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </span>
        </div>
      </div>
      <div className="scroll-indicator">
  <div className="scroll-dot"></div>
</div>
    </section>
  );
};

export default Hero;
