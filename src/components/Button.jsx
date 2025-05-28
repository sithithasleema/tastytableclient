// import motion, { AnimatePresence } from "motion/react";
import { motion, AnimatePresence } from "framer-motion";

const Button = ({ text, type = "button", onClick, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-primary text-white w-[10rem] py-2 px-6 hover:bg-secondary ${className}`}
    >
      {/* Framer motion for show animating text */}
      <AnimatePresence mode="wait">
        <motion.span
          key={text}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.1 }}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default Button;
