import "./Team.css";
import { motion } from "framer-motion";

function Team() {
  const members = [
    { name: "Amit", role: "Frontend Dev", icon: "👨‍💻" },
    { name: "Rahul", role: "Backend Dev", icon: "🧠" },
    { name: "Neha", role: "UI/UX Designer", icon: "🎨" },
  ];

  return (
    <div className="page">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        👥 Team Members
      </motion.h2>

      <div className="grid">
        {members.map((m, i) => (
          <motion.div
            key={i}
            className="card"
            whileHover={{ scale: 1.05 }}
          >
            <div className="icon">{m.icon}</div>
            <h3>{m.name}</h3>
            <p>{m.role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Team;