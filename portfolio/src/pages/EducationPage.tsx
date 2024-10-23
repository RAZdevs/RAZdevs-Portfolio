import { motion } from 'framer-motion';

const EducationPage: React.FC = () => {
    const educationData = [
      {
        degree: "Front-End Development Programme",
        school: "Jensen YH",
        year: "2022 - 2024",
        description: "Specialized Front-End development and software methodologies - Attaining proficiency in HTML, CSS, and JavaScript. Mastering responsive design, version control, and front-end frameworks. Building captivating and user-friendly web interfaces. Preparing for further learning or job opportunities in the web development sector. HTML, CSS, JavaScript, and version control with Git. Front-end frameworks like ReactJS.CSS frameworks like Tailwind CSS and Bootstrap. Working with APIs and advanced HTTP networking."
      },
   
      {
        degree: "Back-End Web Development Programme",
        school: "Alx Academy",
        year: "2019 - 2020",
        description: "Focused on Back-End development software methodologies - Gaining proficiency in backend languages, frameworks, and databases. Mastering RESTful API design authentication and server deployment. Building and deploying a fully functional web application. Backend language ( Python) Web Framework (Django) Database management with SQL (e.g., MySQL) and NoSQL (e.g., MongoDB) databases. REST API, Authentication, and other backend concepts. "
      },
      {
        degree: "Account Manager",
        school: "IHM Business School",
        year: "2017 - 2018",
        description: "The Account Manager B2B is a specialized sales training program strongly focused on providing you with practical experience, applicable tools, and methods that directly prepare you to step into the workforce after graduation. Through the program, you gain hands-on experience through various exercises and role-playing, which help to reinforce knowledge and develop practical skills."
      }
      ];
  
    return (
      <div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold mb-12 text-center"
        >
          My Education
        </motion.h1>
        
        <div className="space-y-12">
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-blue-400 mb-2">{edu.degree}</h2>
              <h3 className="text-xl mb-2">{edu.school}</h3>
              <p className="text-gray-400 mb-4">{edu.year}</p>
              <p className="text-gray-300">{edu.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  export default EducationPage;