import React, { useState, useRef, useEffect } from 'react';
import { generateResponse } from '../../services/geminiService';

const Dashboard = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'bot',
      content: "Hello! I'm MediBot, your AI health assistant. How can I help you today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const suggestedQuestions = [
    "How can I improve my sleep quality?",
    "What are common cold remedies?",
    "Tell me about healthy eating habits.",
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage('');
    setIsLoading(true);

    // Add user message to chat
    setChatHistory(prev => [...prev, { type: 'user', content: userMessage }]);

    try {
      // Get response from Gemini API
      const response = await generateResponse(userMessage, chatHistory);
      
      // Add bot response to chat
      setChatHistory(prev => [...prev, { type: 'bot', content: response }]);
    } catch (error) {
      let errorMessage = "I apologize, but I'm having trouble responding right now. Please try again later.";
      
      if (error.message.includes('API key')) {
        errorMessage = "I'm currently experiencing technical difficulties. Our team has been notified.";
        console.error('API Key Error:', error);
      }

      setChatHistory(prev => [...prev, {
        type: 'bot',
        content: errorMessage,
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Chat History */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4 h-[60vh] overflow-y-auto">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${
              msg.type === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block max-w-[80%] p-3 rounded-lg ${
                msg.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-left mb-4">
            <div className="inline-block bg-gray-100 text-gray-800 p-3 rounded-lg">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggested Questions */}
      <div className="mb-4 flex flex-wrap gap-2">
        {suggestedQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => setMessage(question)}
            className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm hover:bg-blue-100 transition-colors"
            disabled={isLoading}
          >
            {question}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          className={`px-6 py-2 bg-blue-600 text-white rounded-lg transition-colors ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>

      {/* Medical Disclaimer */}
      <p className="mt-4 text-sm text-gray-500 text-center">
        Medical Disclaimer: This AI assistant provides general information and is not a substitute for professional medical advice.
        Always consult with qualified healthcare providers for medical diagnosis and treatment.
      </p>
    </div>
  );
};

export default Dashboard; 