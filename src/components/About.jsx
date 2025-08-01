import "./About.css";
import profilePic from "./IMG_1436.jpg"; // update path if needed

const About = () => {
    return (
        <section className="about-section">
            <div className="about-content">
                <div className="about-text-container">
                    <div className="about-heading">About Me</div>
                    <div className="about-below">
                        I'm Aryan, an aspiring Software Engineer currently pursuing my degree and sharpening my skills in full-stack web development.
                        <br /><br />
                        My focus is on mastering technologies like JavaScript, React, Node.js, and databases, while also building a strong foundation in data structures, algorithms, and system design.
                        <br /><br />
                        I'm passionate about building clean, efficient, and scalable applications. Every project I take on is an opportunity to push my boundaries and get closer to the software engineering role I’m working toward.
                        <br /><br />
                        Outside of coding, I'm always exploring new tech, contributing to personal projects, and preparing for technical interviews to land impactful roles in the tech industry.
                    </div>
                </div>
                <img src={profilePic} alt="Aryan" className="about-image" />
            </div>
        </section>
    );
};

export default About;
