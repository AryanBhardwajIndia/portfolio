import "./Skills.css";

const skills = [
  { name: "C", icon: "/c.png" },
  { name: "C++", icon: "/cpp.png" },
  { name: "JavaScript", icon: "/js.png" },
  { name: "Python", icon: "/python.webp" },
  { name: "HTML", icon: "/html.png" },
  { name: "CSS", icon: "/css.png" },
  { name: "PHP", icon: "/php.png" },
  { name: "MySQL", icon: "/mysql.png" },
  { name: "Kotlin", icon: "/kotlin.png" },
];

const Skills = () => {
  return (
    <section className="skills-section">
      <h2 className="skills-title">My Skills</h2>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div className="skill-box" key={index}>
            <img src={skill.icon} alt={skill.name} className="skill-icon" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
