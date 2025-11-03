import React, { useState, FormEvent, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { coursesData } from '../data/coursesData';

interface Message {
  text: string;
  sender: 'user' | 'ai' | 'error';
}

const AICourseAdvisor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm your AI course advisor. How can I help you today? Ask me for course recommendations based on your interests!", sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const courseList = coursesData.map(c => `- ${c.id} ${c.title}: ${c.description}`).join('\n');
      const systemInstruction = `You are a helpful and friendly course advisor for the Computer Science department of a university. Your goal is to help students choose courses based on their interests. You must only recommend courses from the provided list. Your tone should be encouraging and informative. If a user's interest doesn't match any course, suggest the closest available options or a foundational course like 'Introduction to Programming'. Do not invent new courses. Here is the list of available courses:\n\n${courseList}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: inputValue,
        config: {
          systemInstruction: systemInstruction,
        },
      });

      const aiMessage: Message = { text: response.text, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errorMessage: Message = { text: 'Sorry, I encountered an error. Please try again later.', sender: 'error' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button className="ai-advisor-fab" onClick={toggleChat} aria-label="Open AI Course Advisor">
        🤖
      </button>
      <div className={`chat-window ${isOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-labelledby="chat-heading">
        <div className="chat-header">
          <h3 id="chat-heading">AI Course Advisor</h3>
          <button className="chat-close-btn" onClick={toggleChat} aria-label="Close chat">&times;</button>
        </div>
        <div className="chat-messages" aria-live="polite">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="loading-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form className="chat-input-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about courses..."
            aria-label="Your message"
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !inputValue.trim()} aria-label="Send message">
            ➤
          </button>
        </form>
      </div>
    </>
  );
};

export default AICourseAdvisor;
