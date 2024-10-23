import React from 'react';
import { motion } from 'framer-motion';

interface LanguageSkill {
  language: string;
  proficiency: number;
}

const LanguageBar: React.FC<LanguageSkill> = ({ language, proficiency }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-base font-medium text-white">{language}</span>
      <span className="text-sm font-medium text-white">{proficiency}%</span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2.5">
      <motion.div 
        className="bg-blue-600 h-2.5 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${proficiency}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  </div>
);

const AboutPage: React.FC = () => {
  const languageSkills: LanguageSkill[] = [
    { language: "English", proficiency: 100 },
    { language: "Swedish", proficiency: 100 },
    { language: "Arabic", proficiency: 100 },
    
  ];

  return (
    <div className="px-4 md:px-8 py-12 bg-gray-900 text-white">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold mb-12 text-center"
      >
        About Me
      </motion.h1>
      
      <div className="flex flex-col lg:flex-row items-start space-y-12 lg:space-y-0 lg:space-x-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/3"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-transparent opacity-50 rounded-lg"></div>
            <img 
              src="/public/images/rami2.jpg" 
              alt="Rami Zaid" 
              className="w-full h-auto rounded-lg shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-300 opacity-20 rounded-lg"></div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full lg:w-2/3 space-y-6"
        >
          <p className="text-xl leading-relaxed">
            Hello! I'm Rami Zaid, a passionate Software Developer with a keen eye for creating beautiful, functional, and user-centered digital experiences. With 5 years of experience in the field, I've had the opportunity to work on a diverse range of projects, from small business websites to large-scale web applications.
          </p>
          <p className="text-xl leading-relaxed">
            My expertise lies in HTML, CSS, JavaScript/Typescript, Python, and modern frontend frameworks like React and Vue.js. I'm also proficient in backend-development such as NodeJS and in UX/UI design, ensuring that the websites I build look great on all devices. My approach to web development is to create clean, efficient, and maintainable code that provides seamless user experiences.
          </p>
          <p className="text-xl leading-relaxed">
            When I'm not coding, you can find me exploring new web technologies, contributing to open-source projects, and learning new technologies to always stay updated with the latest in the field. I'm always excited to take on new challenges and continue growing as a developer. 
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
          >
            <h2 className="text-3xl font-bold mb-6">Language Skills</h2>
            {languageSkills.map((skill, index) => (
              <LanguageBar key={index} {...skill} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;