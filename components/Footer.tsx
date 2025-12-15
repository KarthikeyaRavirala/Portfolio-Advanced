import React from 'react';

const Footer = () => {
  return (
    <footer className="max-w-5xl mx-auto px-6 py-20">
      <p className="text-gray-400 mb-4">
        Wanna discuss an idea or work together?
      </p>

      <a
        href="https://calendly.com/yourname"
        className="inline-block bg-white text-black px-6 py-2 rounded-lg font-medium"
      >
        Book a meeting
      </a>

      <div className="flex gap-4 mt-6 text-gray-400">
        <a href="https://github.com/KarthikeyaRavirala" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="mailto:karthikeya.ravirala@example.com">Email</a>
      </div>
    </footer>
  );
};

export default Footer;