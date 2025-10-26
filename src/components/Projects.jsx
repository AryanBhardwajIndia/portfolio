import React from "react";
import "./Projects.css";

const projects = [
  {
    title: "QuickLink - URL Shortener",
    link: "https://github.com/AryanBhardwajIndia/quick-link",
  },
  {
    title: "CollabDocs",
    link: "https://github.com/AryanBhardwajIndia/collab-docs",
  },
  {
    title: "Is My Resume Compatible?",
    link: "https://github.com/AryanBhardwajIndia/is-my-resume-compatible",
  },
  {
    title: "Facebook Helpdesk",
    link: "https://github.com/AryanBhardwajIndia/fb-helpdesk",
  },
  {
    title: "Employee Salary Prediction",
    link: "https://github.com/AryanBhardwajIndia/employee-salary-prediction",
  },
  {
    title: "Snake Game",
    link: "https://github.com/AryanBhardwajIndia/SnakeGame",
  },
];

const Projects = () => {
  return (
    <section className="projects-section">
      <h2 className="projects-heading">Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-box">
            <h3>{project.title}</h3>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              View on GitHub →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
