
import "./Home.css";

import { useState } from "react";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaTasks,
  FaUsers,
  FaChartLine,
  FaCheckCircle,
  FaArrowRight
} from "react-icons/fa";

function Home() {

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [darkMode, setDarkMode] =
    useState(true);

  const handleLinkClick = () =>
    setMenuOpen(false);

  return (

    <div
      className={
        darkMode
          ? "home-container dark"
          : "home-container light"
      }
    >

      {/* BLUR EFFECTS */}
      <div className="blur-one"></div>
      <div className="blur-two"></div>

      {/* ================= NAVBAR ================= */}
      <nav className="navbar">

        <motion.h1
          initial={{
            opacity: 0,
            y: -30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="logo"
        >

          SyncTask

        </motion.h1>

        {/* DESKTOP MENU */}
        <div className="nav-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/tasks">
            Tasks
          </Link>

          <Link to="/team">
            Team
          </Link>

          <Link to="/projects">
            Projects
          </Link>

          <Link to="/login">
            Login
          </Link>

          <Link
            to="/register"
            className="start-btn"
          >

            Get Started

          </Link>

          <button
            className="theme-btn"
            onClick={() =>
              setDarkMode(
                !darkMode
              )
            }
          >

            {darkMode
              ? "☀️"
              : "🌙"}

          </button>

        </div>

        {/* MOBILE MENU ICON */}
        <div
          className="mobile-icon"
          onClick={() =>
            setMenuOpen(
              !menuOpen
            )
          }
        >

          {menuOpen
            ? <FaTimes />
            : <FaBars />}

        </div>

      </nav>


      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (

        <motion.div
          initial={{
            x: 300,
          }}
          animate={{
            x: 0,
          }}
          className="mobile-menu"
        >

          <Link
            to="/"
            onClick={
              handleLinkClick
            }
          >

            Home

          </Link>

          <Link
            to="/dashboard"
            onClick={
              handleLinkClick
            }
          >

            Dashboard

          </Link>

          <Link
            to="/tasks"
            onClick={
              handleLinkClick
            }
          >

            Tasks

          </Link>

          <Link
            to="/team"
            onClick={
              handleLinkClick
            }
          >

            Team

          </Link>

          <Link
            to="/projects"
            onClick={
              handleLinkClick
            }
          >

            Projects

          </Link>

          <Link
            to="/register"
            className="mobile-btn"
            onClick={
              handleLinkClick
            }
          >

            Get Started

          </Link>

        </motion.div>
      )}


      {/* ================= HERO ================= */}
      <section className="hero">

        {/* LEFT */}
        <motion.div
          initial={{
            opacity: 0,
            x: -80,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="hero-left"
        >

          <div className="badge">

            <span>
              NEW
            </span>

            <p>
            
            </p>

          </div>

          <h1 className="hero-title">

            Organize Your

            <span className="gradient-text">

              {" "}Tasks & Teams

            </span>

            <br />

            In One Place

          </h1>

          <p className="hero-text">

            Modern productivity platform
            for startups, developers,
            freelancers and growing teams.

          </p>

          <div className="hero-buttons">

            <Link
              to="/register"
              className="primary-btn"
            >

              Start Free

              <FaArrowRight />

            </Link>

            <button
              className="secondary-btn"
            >

              Live Demo

            </button>

          </div>

          <div className="hero-users">

            <div className="user-images">

              <img
                src="https://i.pravatar.cc/40?img=1"
                alt=""
              />

              <img
                src="https://i.pravatar.cc/40?img=2"
                alt=""
              />

              <img
                src="https://i.pravatar.cc/40?img=3"
                alt=""
              />

              <img
                src="https://i.pravatar.cc/40?img=4"
                alt=""
              />

            </div>

            <p>

              Trusted by 10,000+
              teams worldwide

            </p>

          </div>

        </motion.div>


        {/* RIGHT */}
        <motion.div
          initial={{
            opacity: 0,
            x: 80,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="dashboard"
        >

          <div className="dashboard-top">

            <h2>

              Dashboard

            </h2>

            <button>

              This Week

            </button>

          </div>

          <div className="dashboard-grid">

            <div className="dashboard-card">

              <p>
                Total Projects
              </p>

              <h1>24</h1>

            </div>

            <div className="dashboard-card">

              <p>
                Pending Tasks
              </p>

              <h1>18</h1>

            </div>

            <div className="dashboard-card">

              <p>
                Team Members
              </p>

              <h1>12</h1>

            </div>

          </div>

          <div className="graph-box">

            <h3>

              Weekly Progress

            </h3>

            <div className="graph">

              <div className="bar h1"></div>
              <div className="bar h2"></div>
              <div className="bar h3"></div>
              <div className="bar h4"></div>
              <div className="bar h5"></div>
              <div className="bar h6"></div>

            </div>

          </div>

          <div className="activity-box">

            <h3>

              Activities

            </h3>

            <div className="activity">

              <p>
                Dashboard UI
              </p>

              <span className="green">

                Completed

              </span>

            </div>

            <div className="activity">

              <p>
                API Integration
              </p>

              <span className="blue">

                Running

              </span>

            </div>

            <div className="activity">

              <p>
                Team Meeting
              </p>

              <span className="purple">

                Scheduled

              </span>

            </div>

          </div>

        </motion.div>

      </section>


      {/* ================= FEATURES ================= */}
      <section className="features">

        <h1 className="features-title">

          Why Choose

          <span className="gradient-text">

            {" "}SyncTask?

          </span>

        </h1>

        <p className="feature-subtitle">

          Everything you need
          to manage projects
          professionally.

        </p>

        <div className="features-grid">

          <motion.div
            whileHover={{
              y: -10,
            }}
            className="feature-card"
          >

            <div className="feature-icon cyan">

              <FaTasks />

            </div>

            <h2>
              Smart Tasks
            </h2>

            <p>

              Manage tasks with
              real-time updates.

            </p>

          </motion.div>

          <motion.div
            whileHover={{
              y: -10,
            }}
            className="feature-card"
          >

            <div className="feature-icon purple">

              <FaUsers />

            </div>

            <h2>
              Team Work
            </h2>

            <p>

              Collaborate with
              your team easily.

            </p>

          </motion.div>

          <motion.div
            whileHover={{
              y: -10,
            }}
            className="feature-card"
          >

            <div className="feature-icon orange">

              <FaChartLine />

            </div>

            <h2>
              Analytics
            </h2>

            <p>

              Track productivity
              and performance.

            </p>

          </motion.div>

        </div>

      </section>


      {/* ================= STATS ================= */}
      <section className="stats-section">

        <div className="stat-box">

          <h1>10K+</h1>

          <p>
            Active Users
          </p>

        </div>

        <div className="stat-box">

          <h1>99%</h1>

          <p>
            Client Satisfaction
          </p>

        </div>

        <div className="stat-box">

          <h1>24/7</h1>

          <p>
            Support
          </p>

        </div>

      </section>


      {/* ================= TESTIMONIAL ================= */}
      <section className="testimonial-section">

        <h1>

          Loved By Teams

        </h1>

        <div className="testimonial-card">

          <FaCheckCircle className="quote-icon" />

          <p>

            “SyncTask completely
            changed how our team
            manages projects.”

          </p>

          <h3>

            — Nitin Kumar

          </h3>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="footer">

        <h1>

          SyncTask

        </h1>

        <p>

          Modern Project Management
          SaaS Platform.

        </p>

        <div className="footer-links">

          <a href="#">
            Privacy
          </a>

          <a href="#">
            Terms
          </a>

          <a href="#">
            Contact
          </a>

        </div>

        <span>

          © 2026 SyncTask.
          All rights reserved.

        </span>

      </footer>

    </div>
  );
}

export default Home;

