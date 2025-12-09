import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-indigo-50 text-gray-800 py-12 px-6 md:px-16 border-t border-gray-200">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold text-indigo-600 mb-4">eTuitionBd</h3>
          <p className="text-sm leading-relaxed text-gray-700">
            eTuitionBd connects students with verified tutors and trusted tuition posts. 
            We ensure quality, transparency, and smooth communication for every learning journey.
          </p>
        </div>

        {/* Quick Links (Row style) */}
        <div>
          <h4 className="text-lg font-semibold text-indigo-600 mb-4">Quick Links</h4>
          <div className="flex flex-wrap gap-4 text-sm font-medium">
            <a href="/" className="hover:text-indigo-600 transition">Home</a>
            <a href="/all-tuitions" className="hover:text-indigo-600 transition">Tuitions</a>
            <a href="/all-tutors" className="hover:text-indigo-600 transition">Tutors</a>
            <a href="/about" className="hover:text-indigo-600 transition">About</a>
            <a href="/contact" className="hover:text-indigo-600 transition">Contact</a>
          </div>
        </div>

        {/* Social Media Icons */}
        <div>
          <h4 className="text-lg font-semibold text-indigo-600 mb-4">Follow Us</h4>
          <div className="flex gap-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition"><FaFacebookF /></a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition"><FaXTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 text-center text-sm text-gray-600 border-t border-gray-200 pt-6">
        © 2025 eTuitionBd. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
