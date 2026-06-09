
// ======================= Login.jsx =======================

import API_URL from "../config";

import "./Login.css";

import { useState } from "react";

import { toast } from "react-toastify";

import { motion } from "framer-motion";

import {
  Link,
  useNavigate
} from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // LOGIN
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        `${API_URL}/api/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {

        localStorage.setItem(
          "token",
          data.token
        );

        toast.success(
          "Login Successful"
        );

        navigate("/dashboard");

      } else {

        toast.error(data.message);

      }

    } catch (error) {

      console.log(error);

      toast.error("Server Error");

    }
  };

  return (

    <div className="login-container">

      <div className="login-blur-one"></div>

      <div className="login-blur-two"></div>

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

        className="login-left"
      >

        <h1>

          Welcome Back To

          <span>
            {" "}SyncTask
          </span>

        </h1>

        <p>

          Manage your projects,
          teams and productivity.

        </p>

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

        className="login-box"
      >

        <h2>
          Login
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="input-box">

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />

          </div>

          <div className="input-box">

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />

          </div>

          <button type="submit">
            Login
          </button>

        </form>

        <p className="signup-text">

          Don’t have account?

          <Link to="/register">
            {" "}Register
          </Link>

        </p>

      </motion.div>

    </div>
  );
}

export default Login;

