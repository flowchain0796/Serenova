"use client"
import React from 'react';
import { Brain, Heart, Shield, Github, Twitter, Linkedin } from 'lucide-react';

interface FooterProps {
  isDark: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDark }) => {
  return (
    <footer className={`mt-24 ${isDark ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className={`text-xl font-bold flex items-center gap-2 ${
              isDark ? 'text-purple-300' : 'text-purple-600'
            }`}>
              <Brain className="w-6 h-6" />
              SereNova
            </div>
            <p className={`${isDark ? 'text-purple-300' : 'text-purple-700'}`}>
              Revolutionizing mental healthcare through blockchain technology and tokenized rewards.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`font-semibold mb-4 ${isDark ? 'text-purple-300' : 'text-purple-900'}`}>
              Quick Links
            </h3>
            <ul className={`space-y-2 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Find Therapists</a></li>
              <li><a href="#" className="hover:underline">Token Economics</a></li>
              <li><a href="#" className="hover:underline">FAQs</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className={`font-semibold mb-4 ${isDark ? 'text-purple-300' : 'text-purple-900'}`}>
              Resources
            </h3>
            <ul className={`space-y-2 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
              <li><a href="#" className="hover:underline">Documentation</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
              <li><a href="#" className="hover:underline">Support</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className={`font-semibold mb-4 ${isDark ? 'text-purple-300' : 'text-purple-900'}`}>
              Stay Updated
            </h3>
            <div className="space-y-4">
              <p className={`${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                Subscribe to our newsletter for updates
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`flex-1 px-4 py-2 rounded-l-full focus:outline-none ${
                    isDark ? 'bg-gray-700 text-purple-300' : 'bg-purple-100 text-purple-900'
                  }`}
                />
                <button className="bg-purple-600 text-white px-6 py-2 rounded-r-full hover:bg-purple-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`pt-8 border-t ${
          isDark ? 'border-gray-700' : 'border-purple-100'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`text-sm ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
              © 2024 SereNova. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className={`hover:text-purple-500 ${
                isDark ? 'text-purple-400' : 'text-purple-600'
              }`}>
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className={`hover:text-purple-500 ${
                isDark ? 'text-purple-400' : 'text-purple-600'
              }`}>
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className={`hover:text-purple-500 ${
                isDark ? 'text-purple-400' : 'text-purple-600'
              }`}>
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;