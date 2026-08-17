import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Bot, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const QUICK_PROMPTS = [
  "🚀 Build a Web App",
  "📈 Performance Marketing",
  "⚡ Tech Stack & Pricing",
  "💬 Book Discovery Call"
];

const BOT_KNOWLEDGE = [
  {
    keywords: ['web', 'app', 'react', 'next', 'website', 'build', 'stack', 'frontend', 'backend'],
    reply: "We engineer high-performance web applications using React, Next.js, Node.js, and modern cloud architecture with sub-second page load times and conversion-focused UX.",
    actionLink: "/work",
    actionText: "View Case Studies"
  },
  {
    keywords: ['marketing', 'roas', 'ad', 'campaign', 'seo', 'growth', 'ppc', 'scale'],
    reply: "Our performance marketing unit leverages AI-driven audience targeting, real-time ROAS dashboards, and viral creative funnels to yield 4.2x average client revenue growth.",
    actionLink: "/services",
    actionText: "Explore Growth Services"
  },
  {
    keywords: ['price', 'cost', 'pricing', 'quote', 'budget', 'rate'],
    reply: "Every project is tailored to your scope and growth milestones. You can calculate estimated project ROAS or request a custom proposal directly in your client portal.",
    actionLink: "/login",
    actionText: "Start A Project"
  },
  {
    keywords: ['call', 'contact', 'book', 'talk', 'hire', 'meet', 'consult'],
    reply: "Ready to accelerate your business? You can sign in to book a strategy session with our lead architects.",
    actionLink: "/login",
    actionText: "Sign In to Schedule"
  }
];

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: "👋 Hi! I'm DigiBot, your AI Technical Architect at DigiToomasha. How can we help turn your product vision into high-converting reality today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = (textToSend) => {
    const query = textToSend || inputMsg;
    if (!query.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputMsg('');
    setIsTyping(true);

    // Simulate developer AI response
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      const matchedRule = BOT_KNOWLEDGE.find(rule => 
        rule.keywords.some(kw => lowerQuery.includes(kw))
      );

      let botText = "Thank you for reaching out! Our senior team specializes in custom full-stack web platforms, mobile apps, and data-driven growth strategies.";
      let actionLink = "/login";
      let actionText = "Start A Project";

      if (matchedRule) {
        botText = matchedRule.reply;
        actionLink = matchedRule.actionLink;
        actionText = matchedRule.actionText;
      }

      const botMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botText,
        actionLink,
        actionText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* Expanded Light Theme Chat Box */}
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-3rem)] sm:w-96 h-[520px] max-h-[80vh] bg-white/98 backdrop-blur-2xl rounded-3xl border border-[#DCDCD6] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Light Header */}
          <div className="p-4 bg-white text-[#1A1A1A] flex items-center justify-between border-b border-[#E5E7EB]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-[#1E3A2B] flex items-center justify-center text-white font-bold text-sm shadow-md">
                  <Sparkles className="w-5 h-5 text-[#D99B00]" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold tracking-tight flex items-center gap-2 text-[#1A1A1A]">
                  DigiBot AI
                  <span className="text-[10px] bg-[#1E3A2B] text-white px-2 py-0.5 rounded-full font-mono uppercase">Developer</span>
                </h3>
                <p className="text-[11px] text-[#686868] font-medium">Digital Growth & Systems Consultant</p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-[#F3F4F6] hover:bg-[#E5E7EB] flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-[#1A1A1A]" />
            </button>
          </div>

          {/* Light Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#FAF8F2]">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.sender === 'user' 
                    ? 'bg-[#1A1A1A] text-white' 
                    : 'bg-[#1E3A2B] text-white'
                }`}>
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`max-w-[80%] flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#1E3A2B] text-white rounded-tr-none shadow-sm'
                      : 'bg-white text-[#1A1A1A] border border-[#E5E7EB] shadow-sm rounded-tl-none'
                  }`}>
                    {msg.text}
                    {msg.actionLink && (
                      <Link 
                        to={msg.actionLink}
                        onClick={() => setIsOpen(false)}
                        className="mt-3 inline-flex items-center gap-1.5 bg-[#D99B00] text-[#1A1A1A] px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-[#1E3A2B] hover:text-white transition-colors text-decoration-none"
                      >
                        {msg.actionText}
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-xs text-gray-500">
                <div className="w-7 h-7 rounded-full bg-[#1E3A2B] text-white flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white px-4 py-2 rounded-2xl rounded-tl-none border border-[#E5E7EB] shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#D99B00] rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-[#D99B00] rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-[#D99B00] rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips (Light) */}
          <div className="px-3 py-2 bg-white border-t border-[#E5E7EB] overflow-x-auto flex gap-1.5 no-scrollbar">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap bg-[#F3F4F6] hover:bg-[#1E3A2B] hover:text-white text-[#374151] text-[10px] font-semibold px-2.5 py-1 rounded-full transition-colors border border-[#E5E7EB]"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Light Input Footer */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="p-3 bg-white border-t border-[#E5E7EB] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Ask DigiBot anything..."
              className="flex-1 bg-[#F3F4F6] text-[#1A1A1A] placeholder-gray-400 text-xs px-4 py-2.5 rounded-full outline-none focus:ring-2 focus:ring-[#1E3A2B] focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!inputMsg.trim()}
              className="w-9 h-9 rounded-full bg-[#1E3A2B] text-white disabled:opacity-40 flex items-center justify-center hover:bg-[#D99B00] hover:text-[#1A1A1A] transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

      {/* Floating Action Button (FAB Light Theme) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-3 bg-white text-[#1A1A1A] px-5 py-3.5 rounded-full shadow-2xl hover:border-[#1E3A2B] transition-all duration-300 border border-[#E0DDD2] hover:scale-105 active:scale-95"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5 text-[#1E3A2B] transition-colors" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500" />
        </div>
        <span className="text-xs font-extrabold uppercase tracking-wider hidden sm:inline-block text-[#1A1A1A]">
          {isOpen ? 'Close Chat' : 'Talk with AI Architect'}
        </span>
      </button>

    </div>
  );
};
