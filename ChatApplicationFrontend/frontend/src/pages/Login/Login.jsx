import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
import "./Login.css";
import loginImage from "../../assets/images/login.png";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const response = await api.post("/auth/login", formData);
      
      console.log("LOGIN RESPONSE:", response.data);

      // Store logged-in user
      localStorage.setItem("username", response.data.username);

      toast.success(response.data.message);

      navigate("/chat");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div className="login-container">

      <motion.div
        className="login-left"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1>ConvoSphere</h1>

        <p>
          Welcome back! Login to continue your conversations.
        </p>

        <img
        src={loginImage}
        alt="Login Illustration"
        />
      </motion.div>

      <motion.div
        className="login-right"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="login-card">

          <h2>Login</h2>

          <form onSubmit={handleLogin}>

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />

            <div className="password-box">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

            <button className="login-btn">
              Login
            </button>

          </form>

          <p>
            Don't have an account?
            <Link to="/register"> Register</Link>
          </p>

        </div>
      </motion.div>

    </div>
  );
}

export default Login;