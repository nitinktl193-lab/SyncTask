import "./Projects.css";
import { motion } from "framer-motion";

function Projects() {
  const projects = [
    { name: "E-Commerce App", status: "Active" },
    { name: "Task Manager", status: "Pending" },
    { name: "Portfolio Website", status: "Completed" },
  ];

  return (
    <div className="page">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        📁 Projects
      </motion.h2>

      <div className="grid">
        {projects.map((p, i) => (
          <motion.div key={i} className="card" whileHover={{ scale: 1.05 }}>
            <h3>{p.name}</h3>
            <p>Status: {p.status}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Projects;