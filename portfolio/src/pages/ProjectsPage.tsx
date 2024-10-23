import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Project {
  title: string;
  description: string;
  websiteUrl: string;
  imagePath: string; 
}

interface ProjectCardProps extends Project {
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, websiteUrl, imagePath, index }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
  });

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl"
    >
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
      </div>
      <div className="h-54 w-full relative">
        {inView && (
          <img
            src={imagePath}
            alt={title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={handleLoad}
          />
        )}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
            <span className="text-white text-lg font-semibold">Loading...</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Visit Website
        </a>
      </div>
    </motion.div>
  );
};

const ProjectsPage: React.FC = () => {
  const [visibleProjects, setVisibleProjects] = useState(1);
  const projects: Project[] = [
    {
      title: "MakeSpace",
      description: "A platform for creative workspace solutions.",
      websiteUrl: "https://www.makespace.se/",
      imagePath: "/images/screenshotsmakespace2.png",
    },
    {
      title: "Riksauktioner",
      description: "Online auction platform for various goods.",
      websiteUrl: "https://riksauktioner.se/",
      imagePath: "/images/screenshotsriksauktioner.png",
    },
    {
      title: "NoteMe",
      description: "Digital note-taking and organization tool.",
      websiteUrl: "https://noteme.se/",
      imagePath: "/images/screenshotsnoteme.png",
    },
    {
      title: "Dopest",
      description: "The Swedish platform for culture & more.",
      websiteUrl: "https://dopest.se/",
      imagePath: "/images/screenshotsdopest.png",
    },
    {
      title: "Edda Förskola",
      description: "Preschool in Stockholm and Uppsala",
      websiteUrl: "https://eddaforskola.se/",
      imagePath: "/images/screenshotsedda.png",
    },
    {
      title: "Reierstam",
      description: "Well established architecture agency",
      websiteUrl: "https://www.reierstam.se/",
      imagePath: "/images/screenshotsreierstam.png",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleProjects(prev => Math.min(prev + 1, projects.length));
    }, 500);

    return () => clearInterval(timer);
  }, [projects.length]);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-center"
        >
          My Projects
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.slice(0, visibleProjects).map((project, index) => (
            <ProjectCard key={index} {...project} index={index} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsPage;