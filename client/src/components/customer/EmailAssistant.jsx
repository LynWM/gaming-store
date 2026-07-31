import { MessageCircle, Send, MailCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function EmailAssistant() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, title: 'Virtual inbox', body: 'Verification codes and reset codes appear here.' },
  ]);
  const location = useLocation();

  useEffect(() => {
    const fromStorage = window.localStorage.getItem('nextplay-messages');
    if (fromStorage) {
      setMessages(JSON.parse(fromStorage));
    }
  }, [location.pathname]);

  const handleSend = () => {
    if (!message.trim()) return;
    const entry = { id: Date.now(), title: 'You', body: message };
    const next = [entry, ...messages].slice(0, 5);
    setMessages(next);
    window.localStorage.setItem('nextplay-messages', JSON.stringify(next));
    setMessage('');
  };

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
          <div className="max-h-56 space-y-2 overflow-y-auto rounded-xl border border-[#231C30] bg-[#1B1625] p-3 text-sm text-gray-300">
            {messages.map((entry) => (
              <div key={entry.id} className="rounded-lg border border-[#2A233A] bg-[#110D1A] p-2">
                <div className="flex items-center gap-2 text-white">
                  <MailCheck size={14} className="text-purple-400" />
                  <span className="font-medium">{entry.title}</span>
                </div>
                <p className="mt-1 text-xs text-gray-400">{entry.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a note"
              className="flex-1 rounded-lg border border-[#2A233A] bg-[#1B1625] px-3 py-2 text-sm text-white outline-none"
            />
            <button onClick={handleSend} className="rounded-lg bg-[#7C3AED] p-2 text-white">
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
