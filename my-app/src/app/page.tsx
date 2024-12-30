"use client"
import React, { useState } from 'react';
import { Brain, Heart, ShieldCheck } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Link from 'next/link';
import { useApp } from './context/AppContext';

// const { isDark } = useApp();

const TherapyIcon = ({ isDark }: { isDark: boolean }) => (
  <div className={`relative w-48 h-48 ${isDark ? 'bg-purple-800' : 'bg-purple-900'} rounded-t-full`}>
    <div className="absolute bottom-0 w-32 h-32 left-1/2 -translate-x-1/2">
      <div className={`w-full h-full ${isDark ? 'bg-orange-500' : 'bg-orange-400'} rounded-lg relative`}>
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <Heart className={`w-16 h-16 ${isDark ? 'text-purple-300' : 'text-purple-600'}`} />
        </div>
      </div>
    </div>
  </div>
);

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-purple-100'}`}>
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 mt-12">
        {/* Rest of the content remains the same */}
        <div className={`relative ${
          isDark ? 'bg-gray-800' : 'bg-purple-300'
        } rounded-lg p-12 overflow-hidden transition-colors duration-300`}>
          {/* Decorative Icons */}
          <div className="absolute top-0 left-12 transform -translate-y-1/2">
            <div className={`w-24 h-16 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
              <Heart />
            </div>
          </div>
          <div className="absolute top-0 right-12 transform -translate-y-1/3">
            <div className={`w-16 h-12 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
              <ShieldCheck />
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${
                isDark ? 'text-purple-200' : 'text-purple-900'
              }`}>
                Personalized Therapy with Blockchain Security
              </h1>
              <p className={`mb-6 ${isDark ? 'text-purple-300' : 'text-purple-800'}`}>
                Experience secure, private therapy sessions powered by Edu Chain Chain technology. 
                Earn tokens for your mental health journey.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className={`h-2 rounded w-3/4 ${isDark ? 'bg-gray-700' : 'bg-white'}`} />
                  <span className={`text-sm ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>
                    Privacy Protected
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`h-2 rounded w-1/2 ${isDark ? 'bg-gray-700' : 'bg-white'}`} />
                  <span className={`text-sm ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>
                    Edu Chain Chain Secured
                  </span>
                </div>
              </div>
              <div className="flex gap-4">
                <Link href="/sessions" className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition-colors">
                  Start Healing
                </Link>
                <button className={`px-8 py-3 rounded-full transition-colors ${
                  isDark ? 'bg-gray-700 text-purple-300 hover:bg-gray-600' : 'bg-purple-500 text-white hover:bg-purple-600'
                }`}>
                  Learn More
                </button>
              </div>
            </div>
            
            <div className="flex justify-center">
              <TherapyIcon isDark={isDark} />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            {
              icon: <ShieldCheck className="w-10 h-10" />,
              title: "Secure Sessions",
              description: "End-to-end encrypted therapy sessions on Edu Chain Chain"
            },
            {
              icon: <Heart className="w-10 h-10" />,
              title: "Reward Tokens",
              description: "Earn tokens for completing sessions and achieving goals"
            },
            {
              icon: <Brain className="w-10 h-10" />,
              title: "Personalized Care",
              description: "AI-powered therapist matching and personalized treatment plans"
            }
          ].map((feature, index) => (
            <div key={index} className={`p-6 rounded-lg shadow-md transition-colors duration-300 ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className={`mb-4 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                {feature.icon}
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${
                isDark ? 'text-purple-300' : 'text-purple-900'
              }`}>
                {feature.title}
              </h3>
              <p className={isDark ? 'text-purple-400' : 'text-purple-700'}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Token Info */}
        <div className={`mt-12 p-8 rounded-lg shadow-md transition-colors duration-300 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className={`text-3xl font-bold mb-6 ${
            isDark ? 'text-purple-300' : 'text-purple-900'
          }`}>
            HealToken Economy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { amount: "1 HEAL", description: "Per therapy session attended" },
              { amount: "2 HEAL", description: "For completing weekly goals" },
              { amount: "5 HEAL", description: "Monthly progress milestone" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className={`text-2xl font-bold mb-2 ${
                  isDark ? 'text-purple-400' : 'text-purple-600'
                }`}>
                  {item.amount}
                </div>
                <p className={isDark ? 'text-purple-300' : 'text-purple-700'}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer isDark={isDark} />
    </div>
  );
}