import "./Skills.css";

const skills = [
  { name: "C", icon: "src/components/logos/c.png" },
  { name: "C++", icon: "src/components/logos/cpp.png" },
  { name: "JavaScript", icon: "src/components/logos/js.png" },
  { name: "Python", icon: "src/components/logos/python.webp" },
  { name: "HTML", icon: "src/components/logos/html.png" },
  { name: "CSS", icon: "src/components/logos/css.png" },
  { name: "PHP", icon: "src/components/logos/php.png" },
  { name: "MySQL", icon: "src/components/logos/mysql.png" },
  { name: "Kotlin", icon: "src/components/logos/kotlin.png" },
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
