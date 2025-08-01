import "./Skills.css";

const skills = [
  { name: "C", icon: "src/components/c.png" },
  { name: "C++", icon: "src/components/cpp.png" },
  { name: "JavaScript", icon: "src/components/js.png" },
  { name: "Python", icon: "src/components/python.webp" },
  { name: "HTML", icon: "src/components/html.png" },
  { name: "CSS", icon: "src/components/css.png" },
  { name: "PHP", icon: "src/components/php.png" },
  { name: "MySQL", icon: "src/components/mysql.png" },
  { name: "Kotlin", icon: "src/components/kotlin.png" },
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
