import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Sparkles, User, Bot } from 'lucide-react';
import { ChatMessage, Scheme, LanguageCode } from '../types';
import { SCHEMES_DB, UI_TRANSLATIONS } from '../src/constants';
import { getSchemeRecommendations } from '../services/geminiService';
import { SchemeCard } from './SchemeCard';

interface ChatInterfaceProps {
  language: LanguageCode;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ language }) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS['en'];
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  // Initialize chat when language changes or on first load
  useEffect(() => {
    // Only reset if it's the very first load or if the user explicitly switches language
    // We want to keep history but maybe add a new greeting in the new language?
    // For simplicity, we just add the greeting to the list.
    const initialMsg: ChatMessage = {
      id: `init-${Date.now()}`,
      role: 'assistant',
      content: t.initialMessage,
      timestamp: Date.now()
    };
    
    // If it's the first render, set messages. 
    // If it's a language switch, we append the new greeting to show language change acknowledgment.
    if (!initialized.current) {
      setMessages([initialMsg]);
      initialized.current = true;
    } else {
       // Optional: Add a system note or just a new assistant message when lang changes?
       // Let's just update the greeting if the chat is empty, otherwise user keeps context.
       setMessages(prev => {
         if (prev.length <= 1) return [initialMsg];
         return prev; 
       });
    }
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getSchemeRecommendations(userMsg.content, language);
      
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.reply,
        matchedSchemes: response.schemeIds,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error("Failed to fetch response", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getMatchedSchemes = (ids?: string[]): Scheme[] => {
    if (!ids) return [];
    return SCHEMES_DB.filter(s => ids.includes(s.id));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] max-w-5xl mx-auto bg-white md:border-x border-gray-200 shadow-xl">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50 scrollbar-hide">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[90%] md:max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
              {/* Avatar */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                msg.role === 'user' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
              }`}>
                {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
              </div>

              {/* Message Content */}
              <div className={`flex flex-col space-y-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-orange-600 text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>

                {/* Render Matched Schemes if any */}
                {msg.matchedSchemes && msg.matchedSchemes.length > 0 && (
                  <div className="w-full mt-2">
                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                      {t.recommendedSchemes} ({msg.matchedSchemes.length})
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {getMatchedSchemes(msg.matchedSchemes).map(scheme => (
                        <SchemeCard key={scheme.id} scheme={scheme} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
           <div className="flex justify-start">
             <div className="flex flex-row gap-3">
               <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                 <Bot size={18} />
               </div>
               <div className="px-4 py-3 bg-white rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex items-center space-x-2">
                 <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                 <span className="text-sm text-gray-500">{t.checking}</span>
               </div>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        {messages.length < 3 && (
          <div className="mb-4 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
            <div className="flex space-x-2">
              {t.suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setInput(s)}
                  className="px-3 py-1.5 bg-gray-50 hover:bg-orange-50 text-gray-600 hover:text-orange-700 text-xs rounded-full border border-gray-200 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="relative flex items-end space-x-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={t.placeholder}
            className="w-full p-3 pr-10 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-sm min-h-[50px] max-h-[120px]"
            rows={1}
            style={{ minHeight: '52px' }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-3 rounded-xl flex items-center justify-center transition-all duration-200 ${
              input.trim() && !isLoading
                ? 'bg-orange-600 text-white shadow-md hover:bg-orange-700 hover:shadow-lg transform hover:-translate-y-0.5' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
        <p className="text-center text-[10px] text-gray-400 mt-2">
          <Sparkles className="inline w-3 h-3 mr-1" />
          {t.disclaimer}
        </p>
      </div>
    </div>
  );
};