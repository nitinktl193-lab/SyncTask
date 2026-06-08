import "./Register.css";

import { useState } from "react";

import { motion } from "framer-motion";

import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    name: "",

    email: "",

    password: "",

  });

  // INPUT CHANGE
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  // REGISTER
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(

        "http://localhost:5000/api/register",

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify(formData),

        }

      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {

        toast.success(
          "Register Successful"
        );

        navigate("/login");

      } else {

        toast.error(data.message);

      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Server Error"
      );

    }

  };

  return (

    <div className="register-container">

      {/* Left */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="register-left"
      >

        <h1>

          Create Your

          <span>
            {" "}SyncTask
          </span>

          Account

        </h1>

      </motion.div>

      {/* Right */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="register-box"
      >

        <h2>
          Register
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="input-box">

            <label>
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />

          </div>

          <div className="input-box">

            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

          </div>

          <div className="input-box">

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
            />

          </div>

          <button
            type="submit"
            className="register-btn"
          >

            Create Account →

          </button>

        </form>

        <p className="login-text">

          Already have an account?

          <Link to="/login">
            {" "}Login
          </Link>

        </p>

      </motion.div>

    </div>

  );
}

export default Register;