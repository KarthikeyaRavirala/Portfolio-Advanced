'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLinkedin, FiGithub, FiTwitter, FiSend } from 'react-icons/fi';

const Contact = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Construct mailto link with form data
      const subject = `Portfolio Contact: Message from ${formData.name}`;
      const body = `Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}`;
      
      // Encode the subject and body for the mailto URL
      const mailtoLink = `mailto:raviralakarthikeya58@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Open the user's email client
      window.location.href = mailtoLink;
      
      // Show success message
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: <FiLinkedin size={20} />,
      url: 'https://linkedin.com/in/karthikeya-ravirala-04332a264/',
      color: 'hover:text-blue-500'
    },
    {
      name: 'GitHub',
      icon: <FiGithub size={20} />,
      url: 'https://github.com/KarthikeyaRavirala',
      color: 'hover:text-gray-300'
    },
    {
      name: 'Email',
      icon: <FiMail size={20} />,
      url: 'mailto:karthikeya.ravirala@example.com',
      color: 'hover:text-red-500'
    },
    {
      name: 'Twitter',
      icon: <FiTwitter size={20} />,
      url: '#',
      color: 'hover:text-blue-400'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-[#1B2631] to-[#3F4E4F]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Let's Connect
          </h2>
          <p className="text-[#A5C8D6] max-w-2xl mx-auto text-lg">
            Ready to collaborate on innovative projects or discuss tech trends? Reach out to me!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#A5C8D6] to-[#D9E4E0] mx-auto rounded-full mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-[#F0F4F8] mb-8">Get in Touch</h3>
            
            <div className="space-y-6">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 10 }}
                  className={`flex items-center space-x-4 p-4 rounded-xl bg-[#3F4E4F]/30 border border-[#A5C8D6] hover:border-[#D9E4E0] transition-all ${link.color}`}
                >
                  <div className="text-xl text-[#A5C8D6]">{link.icon}</div>
                  <span className="text-[#F0F4F8] font-medium">{link.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Collaboration Focus & Resume */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-6 rounded-xl bg-gradient-to-br from-[#A5C8D6]/20 to-[#D9E4E0]/20 border border-[#A5C8D6] h-full">
              <h4 className="text-xl font-bold text-[#F0F4F8] mb-4">Collaboration Focus</h4>
              <ul className="space-y-2 text-[#A5C8D6] mb-6">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#A5C8D6] rounded-full mr-3"></div>
                  AI & ML Projects
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#D9E4E0] rounded-full mr-3"></div>
                  Tech Content Creation
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#F0F4F8] rounded-full mr-3"></div>
                  Innovation Consulting
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#3F4E4F] rounded-full mr-3"></div>
                  Speaking Engagements
                </li>
              </ul>
              
              <div>
                <a 
                  href="/resume.pdf" 
                  download="Karthikeya_Ravirala_Resume.pdf"
                  className="w-full py-3 px-4 bg-gradient-to-r from-[#A5C8D6] to-[#D9E4E0] text-[#1B2631] font-medium rounded-xl hover:opacity-90 transition-opacity block text-center"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;