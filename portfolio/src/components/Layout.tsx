import { NavLink, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from './Footer';

const Layout: React.FC = () => {
  return (
    <div className="bg-gray-900 h-screen text-white font-sans flex flex-col overflow-hidden">
      <header className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600"
        >
          <NavLink to="/">Rami.</NavLink>
        </motion.div>
        <nav>
          <ul className="flex space-x-4 md:space-x-8">
            {[
              { name: 'Home', path: '/' },
              { name: 'About', path: '/about' },
              { name: 'Education', path: '/education' },
              { name: 'Contact', path: '/contact' },
              { name: 'Projects', path: '/projects' },
            ].map((item, index) => (
              <motion.li 
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <NavLink 
                  to={item.path}
                  className={({ isActive }) => 
                    isActive ? "text-blue-400" : "hover:text-blue-400 transition-colors duration-300"
                  }
                >
                  {item.name}
                </NavLink>
              </motion.li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="flex-grow overflow-auto">
        <Outlet />
      </main>
      <div className="container mx-auto px-6 py-4">
        <div className="absolute bottom-6 left-6">
        </div>
          <Footer />

      </div>
    </div>
  );
};

export default Layout;