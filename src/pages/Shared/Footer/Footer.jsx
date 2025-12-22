import React from 'react';
import { Link } from 'react-router-dom';
import { FaDiscord, FaFacebook, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Logo from '../../../components/Logo/Logo';

const Footer = () => {

  return (
    <footer className="bg-indigo-50 text-gray-800 pt-10 pb-6 border-t border-gray-200">
      <div className="px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Logo/>
            <p className="text-gray-600 text-sm">Our platform provides a complete solution for students, tutors, and parents to find quality tuition, connect seamlessly, and manage learning with trust and transparency.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-indigo-600">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-600 hover:text-indigo-600 transition">Home</Link></li>
              <li><Link to="/all-tuitions" className="text-gray-600 hover:text-indigo-600 transition">Tuitions</Link></li>
              <li><Link to="/all-tutors" className="text-gray-600 hover:text-indigo-600 transition">Tutors</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-indigo-600 transition">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-indigo-600">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href='' className="text-gray-600 hover:text-indigo-600 transition">FAQ</a></li>
              <li><a href='' className="text-gray-600 hover:text-indigo-600 transition">Privacy Policy</a></li>
              <li><a href='' className="text-gray-600 hover:text-indigo-600 transition">Terms of Service</a></li>
              <li><a href='' className="text-gray-600 hover:text-indigo-600 transition">Support</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-indigo-600">Follow Us</h3>
            <div className="flex space-x-4 text-2xl">
              <a href="https://www.facebook.com" target="_blank" className="bg-gray-200 text-gray-600 p-[0.3rem] rounded-full transition transform hover:scale-110 hover:bg-[#1877F2] hover:text-white"><FaFacebook /></a>
              <a href="https://wa.me" target="_blank" className="bg-gray-200 text-gray-600 p-[0.3rem] rounded-full transition transform hover:scale-110 hover:bg-[#25D366] hover:text-white"><FaWhatsapp /></a>
              <a href="https://discord.com" target="_blank" className="bg-gray-200 text-gray-600 p-[0.3rem] rounded-full transition transform hover:scale-110 hover:bg-[#5865F2] hover:text-white"><FaDiscord /></a>
              <a href="https://www.linkedin.com" target="_blank" className="bg-gray-200 text-gray-600 p-[0.3rem] rounded-full transition transform hover:scale-110 hover:bg-[#0A66C2] hover:text-white"><FaLinkedinIn /></a>
              <a href="https://x.com" target="_blank" className="bg-gray-200 text-gray-600 p-[0.3rem] rounded-full transition transform hover:scale-110 hover:bg-black hover:text-white"><FaXTwitter /></a>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200" />

        <div className="text-center text-sm text-gray-500">&copy; {new Date().getFullYear()} eTuitionBd. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;