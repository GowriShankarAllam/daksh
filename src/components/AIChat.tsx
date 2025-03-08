import React, { useState } from 'react';
import { Send, X } from 'lucide-react';

interface Message {
  text: string;
  isAI: boolean;
}

interface AIChatProps {
  onClose: () => void;
}

export default function AIChat({ onClose }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm your AI assistant. How can I help you today?", isAI: true },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, isAI: false }]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "I'm analyzing your request and will provide assistance shortly.",
          isAI: true,
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-20 right-6 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <h3 className="font-semibold dark:text-white">AI Assistant</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
      
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isAI ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.isAI
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  : 'bg-blue-600 text-white'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t dark:border-gray-700">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 p-2 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 dark:text-white"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}