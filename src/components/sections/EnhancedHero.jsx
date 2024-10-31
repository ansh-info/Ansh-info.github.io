import { useState, useEffect } from 'react';
import { Code, Terminal, Database, Brain, Sparkles } from 'lucide-react';

const EnhancedHero = () => {
  const [activeIcon, setActiveIcon] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const icons = [
    { icon: <Code className="w-8 h-8" />, label: "Code" },
    { icon: <Terminal className="w-8 h-8" />, label: "CLI" },
    { icon: <Database className="w-8 h-8" />, label: "Data" },
    { icon: <Brain className="w-8 h-8" />, label: "ML" }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveIcon((prev) => (prev + 1) % icons.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mb-16 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />
      
      <div className={`relative text-center transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {icons.map((_, index) => (
            <Sparkles
              key={index}
              className={`absolute w-4 h-4 transition-all duration-500 ${
                Math.random() > 0.5 ? 'text-blue-400' : 'text-purple-400'
              }`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2,
                transform: `scale(${Math.random() * 0.5 + 0.5})`,
                animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite`
              }}
            />
          ))}
        </div>

        {/* Main Title */}
        <h1 className="text-6xl font-bold mb-4">
          Data Science & Sorcery
          <span className="text-blue-400 animate-pulse">.</span>
        </h1>

        {/* Subtitle with Rotating Icons */}
        <div className="flex items-center justify-center gap-4 text-xl text-gray-400">
          <span>Turning</span>
          <div className="relative w-8 h-8">
            {icons.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-500 transform ${
                  activeIcon === index
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-75'
                }`}
              >
                {item.icon}
              </div>
            ))}
          </div>
          <span>into insights since {new Date().getFullYear() - 22}</span>
        </div>

        {/* Interactive Elements */}
        <div className="mt-8 flex justify-center gap-4">
          {icons.map((item, index) => (
            <button
              key={index}
              onMouseEnter={() => setActiveIcon(index)}
              className={`p-4 rounded-lg transition-all duration-300 ${
                activeIcon === index
                  ? 'bg-blue-500 scale-110'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {item.icon}
              <span className="block text-xs mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedHero;