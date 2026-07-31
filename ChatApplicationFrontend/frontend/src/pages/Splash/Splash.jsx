import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaComments } from "react-icons/fa";
import "./Splash.css";

function Splash() {
  const navigate = useNavigate();

  return (
    <div className="splash-container">

      {/* Floating Circles */}
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>

      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.5
          }}
        >
          <FaComments className="logo-icon" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .6 }}
        >
          ConvoSphere
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .9 }}
        >
          Real Conversations. Real Connections.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: .95 }}
          onClick={() => navigate("/login")}
        >
          Get Started
        </motion.button>

      </motion.div>

    </div>
  );
}

export default Splash;