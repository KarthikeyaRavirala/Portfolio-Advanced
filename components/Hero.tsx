'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#1B2631] via-[#3F4E4F] to-[#1B2631]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#A5C8D6]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#D9E4E0]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F0F4F8]/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 bg-gradient-to-r from-[#A5C8D6]/20 to-[#D9E4E0]/20 rounded-full text-[#A5C8D6] border border-[#3F4E4F] text-sm font-medium">
                Tech Creator
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold mb-6 text-[#F0F4F8] leading-tight"
              aria-label="Hi, I'm Karthikeya - AI Engineer & Tech Creator"
            >
              Hi, I'm <span className="gradient-text">Karthikeya</span> 👋
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-xl text-[#A5C8D6] max-w-2xl mb-8 leading-relaxed"
              aria-describedby="hero-description"
            >
              Innovative <span className="text-[#F0F4F8] font-semibold">AI Engineer</span> & <span className="gradient-text">Tech Creator</span> building
              cutting-edge solutions and inspiring the next generation of developers.
            </motion.p>
            
            <div id="hero-description" className="sr-only">
              Top Tech Creator specializing in AI Engineering and Tech Content Creation
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <span className="px-4 py-2 bg-[#3F4E4F]/50 rounded-full text-[#A5C8D6] border border-[#A5C8D6] text-sm">
                🧠 LLMs
              </span>
              <span className="px-4 py-2 bg-[#3F4E4F]/50 rounded-full text-[#A5C8D6] border border-[#A5C8D6] text-sm">
                📚 RAG
              </span>
              <span className="px-4 py-2 bg-[#3F4E4F]/50 rounded-full text-[#A5C8D6] border border-[#A5C8D6] text-sm">
                👁️ Computer Vision
              </span>
              <span className="px-4 py-2 bg-[#3F4E4F]/50 rounded-full text-[#A5C8D6] border border-[#A5C8D6] text-sm">
                🤖 Deep Learning
              </span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex flex-wrap gap-4"
            >
              <a 
                href="#projects" 
                className="px-8 py-4 bg-gradient-to-r from-[#A5C8D6] to-[#D9E4E0] text-[#1B2631] font-medium rounded-xl hover:opacity-90 transition-opacity"
              >
                View My Work
              </a>
              <a 
                href="#contact" 
                className="px-8 py-4 bg-[#3F4E4F] text-[#F0F4F8] font-medium rounded-xl border border-[#A5C8D6] hover:bg-[#A5C8D6] hover:text-[#1B2631] transition-colors"
              >
                Contact Me
              </a>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="flex space-x-6 mt-10"
            >
              <a href="https://github.com/KarthikeyaRavirala" target="_blank" rel="noopener noreferrer" className="text-[#A5C8D6] hover:text-[#F0F4F8] transition-colors">
                <FaGithub size={24} />
              </a>
              <a href="https://linkedin.com/in/karthikeya-ravirala-04332a264/" target="_blank" rel="noopener noreferrer" className="text-[#A5C8D6] hover:text-[#D9E4E0] transition-colors">
                <FaLinkedin size={24} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#A5C8D6] hover:text-[#A5C8D6] transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="mailto:karthikeya.ravirala@example.com" className="text-[#A5C8D6] hover:text-[#D9E4E0] transition-colors">
                <FaEnvelope size={24} />
              </a>
            </motion.div>
          </motion.div>
          
          {/* Visual Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-[#A5C8D6]/20 to-[#D9E4E0]/20 p-1">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#3F4E4F] to-[#1B2631] flex items-center justify-center overflow-hidden">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#A5C8D6]/10 via-transparent to-[#D9E4E0]/10"></div>
                    <div className="text-center z-10">
                      <div className="w-48 h-48 md:w-56 md:h-56 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#A5C8D6] to-[#D9E4E0] flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#F0F4F8]/20 to-transparent"></div>
                        <img 
                          src="/portimg.png" 
                          alt="Karthikeya Ravirala" 
                          className="w-full h-full object-cover rounded-full z-10"
                          width={224}
                          height={224}
                        />
                      </div>
                      <h3 className="text-2xl font-bold text-[#F0F4F8] mb-2">Karthikeya Ravirala</h3>
                      <p className="text-[#A5C8D6]"></p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-[#A5C8D6] to-[#D9E4E0] rounded-xl flex items-center justify-center"
              >
                <span className="text-[#1B2631] font-bold">AI</span>
              </motion.div>
              
              <motion.div 
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-[#D9E4E0] to-[#F0F4F8] rounded-xl flex items-center justify-center"
              >
                <span className="text-[#1B2631] font-bold">ML</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;