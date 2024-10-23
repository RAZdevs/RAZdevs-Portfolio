import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AnimatedTitle: React.FC = () => {
  const titles = ["Software Developer", "UX/UI Designer", "Account Manager"];
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const animateText = () => {
      const currentTitle = titles[currentIndex];
      
      if (!isDeleting) {
        setDisplayText(currentTitle.substring(0, displayText.length + 1));
        
        if (displayText === currentTitle) {
          setIsDeleting(true);
          timeout = setTimeout(animateText, 2000);
        } else {
          timeout = setTimeout(animateText, 100);
        }
      } else {
        setDisplayText(currentTitle.substring(0, displayText.length - 1));
        
        if (displayText === '') {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
        }
        timeout = setTimeout(animateText, 100);
      }
    };

    timeout = setTimeout(animateText, 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex]);

  return (
    <h2 className="text-4xl md:text-5xl font-bold mb-6 h-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
      {displayText}
      <span className="animate-blink">|</span>
    </h2>
  );
};

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "tween",
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="h-full flex items-center justify-center px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between">
        <motion.div className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0" variants={itemVariants}>
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400"
            variants={itemVariants}
          >
            Hi, I'm Rami Zaid
          </motion.h1>
          <motion.div variants={itemVariants}>
            <AnimatedTitle />
          </motion.div>
          <motion.p 
            className="mb-6 text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed font-medium"
            variants={itemVariants}
          >
            Passionate about creating stunning digital experiences that blend creativity with cutting-edge technology. Let's bring your vision to life!
          </motion.p>
          <motion.div className="space-x-4" variants={itemVariants}>
          <button 
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              onClick={() => navigate('/contact')}
            >
              Connect
            </button>
            <button 
              className="border-2 border-blue-500 text-blue-400 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              onClick={() => navigate('/about')}
            >
              About Me
            </button>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="w-full md:w-5/12 relative"
          variants={itemVariants}
        >
          <div className="aspect-square relative max-w-xs md:max-w-sm mx-auto">
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <img 
                src="/public/images/rami.jpg" 
                alt="Rami Zaid" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 opacity-40 rounded-full"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900 rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[100%] h-[100%] border-2 border-blue-900 opacity-900 rounded-full animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomePage;