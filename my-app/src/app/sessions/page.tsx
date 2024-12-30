"use client"
import React, { useState } from 'react';
import SessionJoinModal from '../components/SessionJoinModal'; 
import { Calendar, Clock, Video, MessageCircle, Brain, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import contractAbi from "../contractInfo/contractAbi.json"
import { BrowserProvider, ethers } from 'ethers';
import contractAddress from "../contractInfo/contractAddress.json"

interface Session {
  id: string;
  therapist: string;
  date: string;
  time: string;
  type: 'video' | 'chat';
  status: 'upcoming' | 'completed';
  duration: string;
  tokens: number;
}

export default function SessionsPage() {
  const [isDark, setIsDark] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const handleJoinSession = (session: Session) => {
    // Here you can add logic for handling the session join
    console.log('Joining session:', session);
    // Add API call or other logic here
    deposit()
  };

  const deposit = async ()=> {
    const {abi} = contractAbi;
    const charge = 1;
    const provider = new BrowserProvider(window.ethereum);

    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    const bounceContract = new ethers.Contract(contractAddress.address, abi, signer)

    await (await bounceContract.donate(address,"0x94A7Af5edB47c3B91d1B4Ffc2CA535d7aDA8CEDe", ethers.parseUnits(charge.toString(), 18))).wait();
  
  }

  const upcomingSessions: Session[] = [
    {
      id: '1',
      therapist: 'Dr. Sarah Johnson',
      date: '2024-10-25',
      time: '10:00 AM',
      type: 'video',
      status: 'upcoming',
      duration: '50 min',
      tokens: 1
    },
    {
      id: '2',
      therapist: 'Dr. Michael Chen',
      date: '2024-10-27',
      time: '2:30 PM',
      type: 'chat',
      status: 'upcoming',
      duration: '45 min',
      tokens: 1
    },
    {
      id: '3',
      therapist: 'Dr. Emma Wilson',
      date: '2024-10-29',
      time: '11:15 AM',
      type: 'video',
      status: 'upcoming',
      duration: '50 min',
      tokens: 1
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-purple-100'}`}>
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className={`mb-12 flex items-center justify-between`}>
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-purple-300' : 'text-purple-900'}`}>
              Your Therapy Journey
            </h1>
            <p className={`${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
              Track your sessions and earn HEAL tokens for your progress
            </p>
          </div>
          <Link 
            href="/book-session"
            className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            Book New Session
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { 
              icon: <CheckCircle className="w-8 h-8" />,
              title: 'Completed Sessions',
              value: '12'
            },
            {
              icon: <Brain className="w-8 h-8" />,
              title: 'HEAL Tokens Earned',
              value: '15'
            },
            {
              icon: <Calendar className="w-8 h-8" />,
              title: 'Next Session',
              value: 'Oct 25, 10:00 AM'
            }
          ].map((stat, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg ${
                isDark ? 'bg-gray-800' : 'bg-white'
              } transition-colors duration-300`}
            >
              <div className={`mb-4 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                {stat.icon}
              </div>
              <div className={`text-2xl font-bold mb-1 ${
                isDark ? 'text-purple-300' : 'text-purple-900'
              }`}>
                {stat.value}
              </div>
              <div className={`${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
                {stat.title}
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Sessions */}
        <div className={`p-8 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} mb-12`}>
          <h2 className={`text-2xl font-bold mb-6 ${
            isDark ? 'text-purple-300' : 'text-purple-900'
          }`}>
            Upcoming Sessions
          </h2>
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div
                key={session.id}
                className={`p-6 rounded-lg border ${
                  isDark ? 'border-gray-700 hover:border-purple-500' : 'border-purple-100 hover:border-purple-300'
                } transition-colors duration-300`}
              >
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${
                      isDark ? 'bg-gray-700' : 'bg-purple-100'
                    }`}>
                      {session.type === 'video' ? (
                        <Video className={`w-6 h-6 ${
                          isDark ? 'text-purple-400' : 'text-purple-600'
                        }`} />
                      ) : (
                        <MessageCircle className={`w-6 h-6 ${
                          isDark ? 'text-purple-400' : 'text-purple-600'
                        }`} />
                      )}
                    </div>
                    <div>
                      <h3 className={`font-semibold ${
                        isDark ? 'text-purple-300' : 'text-purple-900'
                      }`}>
                        {session.therapist}
                      </h3>
                      <div className={`flex items-center gap-4 mt-1 ${
                        isDark ? 'text-purple-400' : 'text-purple-700'
                      }`}>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(session.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {session.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-2 rounded-full text-sm ${
                      isDark ? 'bg-gray-700 text-purple-300' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {session.duration}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedSession(session);
                        setIsJoinModalOpen(true);
                        // joinAndWithdraw();
                      }}
                      className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors"
                    >
                      Join Session
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <SessionJoinModal
        session={selectedSession}
        isOpen={isJoinModalOpen}
        setIsOpen={setIsJoinModalOpen}
        onJoin={handleJoinSession}
      />

      <Footer isDark={isDark} />
    </div>
  );
}