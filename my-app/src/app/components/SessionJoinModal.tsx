'use client'

import * as React from 'react'
import { AlertCircle, X } from 'lucide-react'

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

interface SessionJoinModalProps {
  session: Session | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onJoin: (session: Session) => void;
}

const SessionJoinModal: React.FC<SessionJoinModalProps> = ({ session, isOpen, setIsOpen, onJoin }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md relative">
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Join Session with {session?.therapist}
          </h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-gray-600">
            You are about to join a {session?.type} session scheduled for{' '}
            {session?.date
              ? new Date(session.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
              : 'an unknown date'}{' '}
            at {session?.time || 'an unknown time'}.
          </p>

          <p className="text-sm text-gray-600">
            Duration: {session?.duration}
          </p>

          {/* Alert */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3 mt-4">
            <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              This session will cost 1 HEAL token
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (session) {
                onJoin(session); // Ensure `onJoin` gets called only when `session` exists
              } else {
                console.error('Session is undefined or invalid');
              }
              setIsOpen(false); // Safely close the modal or toggle state
            }}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Join Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionJoinModal;