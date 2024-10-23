import React from "react";
import { motion } from 'framer-motion';
import { Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  const iconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            when: "beforeChildren",
            staggerChildren: 0.1
          }
        }
      }}
      className="flex flex-col items-center"
    >
      <div className="flex space-x-4 w-full justify-between items-center">
        <div className="flex space-x-4"> 
          <motion.a
            href="https://github.com/RAZdevs"
            target="_blank"
            rel="noopener noreferrer"
            variants={iconVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Github className="text-blue-400 hover:text-blue-300" size={24} />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/rami-zaid-a864a025b/"
            target="_blank"
            rel="noopener noreferrer"
            variants={iconVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Linkedin className="text-blue-400 hover:text-blue-300" size={24} />
          </motion.a>
        </div>
        <motion.a
          variants={iconVariants}
          className="text-blue-400 text-sm flex-grow text-center" 
        >
          Designed & Developed by Rami Zaid
        </motion.a>
      </div>
    </motion.div>
  );
};

export default Footer;