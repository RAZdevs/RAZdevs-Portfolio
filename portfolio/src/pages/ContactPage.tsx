import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type AlertType = 'success' | 'error';

interface CustomAlertProps {
  message: string;
  type: AlertType;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ message, type }) => (
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.3 }}
    className={`mt-4 p-4 rounded-lg ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white text-center`}
  >
    {message}
  </motion.div>
);

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface Alert {
  message: string;
  type: AlertType;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [alert, setAlert] = useState<Alert | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
    setFormErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlert(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok) {
        setAlert({ message: 'Your message has been sent successfully!', type: 'success' });
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setAlert(null), 5000);
      } else {
        throw new Error(responseData.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setAlert({ 
        message: error instanceof Error ? error.message : 'An unexpected error occurred', 
        type: 'error' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold mb-12 text-center"
      >
        Get In Touch
      </motion.h1>
      
      <div className="max-w-2xl mx-auto">
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
          onSubmit={handleSubmit}
          noValidate
        >
          <div>
            <label htmlFor="name" className="block text-lg mb-2">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 ${
                formErrors.name ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
              }`}
            />
            {formErrors.name && (
              <p className="mt-1 text-red-500">{formErrors.name}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-lg mb-2">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 ${
                formErrors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
              }`}
            />
            {formErrors.email && (
              <p className="mt-1 text-red-500">{formErrors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="message" className="block text-lg mb-2">Message</label>
            <textarea 
              id="message" 
              name="message" 
              rows={5} 
              value={formData.message}
              onChange={handleChange}
              className={`w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 resize-none ${
                formErrors.message ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
              }`}
            ></textarea>
            {formErrors.message && (
              <p className="mt-1 text-red-500">{formErrors.message}</p>
            )}
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300 disabled:opacity-50"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </motion.form>

        <AnimatePresence>
          {alert && (
            <CustomAlert message={alert.message} type={alert.type} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ContactPage;