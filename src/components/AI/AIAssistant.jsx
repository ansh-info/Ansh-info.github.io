import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Bot, Send, X, Brain, Copy, Check, Loader } from "lucide-react";

const AIAssistant = ({ isMobile = false, isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content:
        "Hello! I'm your AI coding assistant. I specialize in data science, machine learning, and making terrible coding puns. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const mockResponses = [
    {
      type: "explanation",
      trigger: ["explain", "how", "what"],
      response:
        "Let me explain this like I'm explaining overfitting to a neural network - thoroughly but without getting too attached to the details.",
      codeExample: `import numpy as np
from sklearn.model_selection import train_test_split

def prevent_overfitting(enthusiasm):
    if enthusiasm > 9000:
        return "You might be overfitting to your coffee intake"
    return "Keep coding, you're doing great!"`,
    },
    {
      type: "code",
      trigger: ["code", "example", "show"],
      response:
        "Here's a pythonic way to solve that, with a side of caffeine-driven optimization:",
      codeExample: `# The Data Scientist's Guide to Coffee-Driven Development
def optimize_productivity(coffee_level, bugs_count):
    if coffee_level < 3:
        return "Need more coffee!"
    
    productivity = min(100, coffee_level * 20 - bugs_count)
    return f"Productivity level: {productivity}%"`,
    },
    {
      type: "joke",
      trigger: ["joke", "funny"],
      response:
        "Why do data scientists make terrible painters? Because they keep trying to paint with matplotlib! 🎨",
    },
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    for (const mockResponse of mockResponses) {
      if (mockResponse.trigger.some((t) => lowerMessage.includes(t))) {
        setIsTyping(true);

        setTimeout(() => {
          const newMessages = [
            {
              type: "bot",
              content: mockResponse.response,
              timestamp: new Date(),
            },
          ];

          if (mockResponse.codeExample) {
            newMessages.push({
              type: "code",
              content: mockResponse.codeExample,
              timestamp: new Date(),
            });
          }

          setMessages((prev) => [...prev, ...newMessages]);
          setIsTyping(false);
        }, 1500);
        return;
      }
    }

    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content:
            "That's an interesting problem! Let me process that with my neural networks... *beep boop* 🤖",
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = () => {
    if (!inputMessage.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        content: inputMessage,
        timestamp: new Date(),
      },
    ]);

    generateResponse(inputMessage);
    setInputMessage("");
  };

  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed ${
        isMobile
          ? "inset-0 bg-gray-900/95 z-50"
          : "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[min(800px,90vw)] h-[min(600px,80vh)] z-40"
      } bg-gray-800 rounded-lg shadow-2xl border border-gray-700 flex flex-col overflow-hidden`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700 shrink-0">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-purple-400" />
          <span className="font-semibold text-white">AI Assistant</span>
          <span className="text-xs px-2 py-0.5 bg-purple-400/20 text-purple-400 rounded-full">
            ML Expert
          </span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 hover:bg-gray-700 rounded transition-colors"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.type === "bot" && (
              <div className="w-8 h-8 rounded-full bg-purple-400/20 flex items-center justify-center mr-2 shrink-0">
                <Bot className="w-4 h-4 text-purple-400" />
              </div>
            )}

            <div
              className={`max-w-[80%] ${
                message.type === "user"
                  ? "bg-blue-500 text-white"
                  : message.type === "code"
                    ? "bg-gray-900 font-mono"
                    : "bg-gray-700 text-white"
              } rounded-lg p-3 ${
                message.type === "code" ? "relative group" : ""
              }`}
            >
              {message.type === "code" ? (
                <>
                  <button
                    onClick={() => handleCopy(message.content, index)}
                    className={`absolute top-2 right-2 p-1 bg-gray-800 rounded ${
                      isMobile
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    } transition-opacity`}
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                  <pre className="text-sm text-green-400 overflow-x-auto whitespace-pre-wrap break-words">
                    <code>{message.content}</code>
                  </pre>
                </>
              ) : (
                <div className="text-sm break-words">{message.content}</div>
              )}
            </div>

            {message.type === "user" && (
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center ml-2 shrink-0">
                <Brain className="w-4 h-4 text-blue-400" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 text-gray-400">
            <Loader className="w-4 h-4 animate-spin" />
            <span className="text-sm">AI is thinking...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-700 shrink-0">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about data science, ML, or request code..."
            className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 text-sm focus:outline-none 
              focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-purple-400 rounded-lg hover:bg-purple-500 transition-colors"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

AIAssistant.propTypes = {
  isMobile: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default AIAssistant;

