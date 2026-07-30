import { MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';

export default function EmailAssistant() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-3 w-80 rounded-2xl border border-[#2A233A] bg-[#110D1A] p-4 shadow-2xl">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Virtual inbox</p>
              <p className="text-xs text-gray-400">Verification and reset codes arrive here</p>
            </div>
          </div>
          <div className="rounded-xl border border-[#231C30] bg-[#1B1625] p-3 text-sm text-gray-300">
            <p className="font-medium text-white">Latest message</p>
            <p className="mt-1">Your verification and reset codes will appear here in real time.</p>
          </div>
          <div className="mt-3 flex gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a note"
              className="flex-1 rounded-lg border border-[#2A233A] bg-[#1B1625] px-3 py-2 text-sm text-white outline-none"
            />
            <button className="rounded-lg bg-[#7C3AED] p-2 text-white">
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((value) => !value)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#7C3AED] text-white shadow-xl transition hover:scale-105"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
}
