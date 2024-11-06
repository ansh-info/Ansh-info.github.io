import { useState, useEffect } from 'react';
import { 
  Code, 
  Terminal, 
  Database, 
  Brain, 
  Sparkles,
  Github,
  Mail,
  Linkedin,
  Globe 
} from 'lucide-react';
import { personalInfo } from '../../data/resume';

const EnhancedHero = () => {
  const [activeIcon, setActiveIcon] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const icons = [
    { icon: <Code className="w-8 h-8" />, label: "Code" },
    { icon: <Terminal className="w-8 h-8" />, label: "CLI" },
    { icon: <Database className="w-8 h-8" />, label: "Data" },
    { icon: <Brain className="w-8 h-8" />, label: "ML" }
  ];

  const socialLinks = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      href: `mailto:${personalInfo.email}`,
      username: personalInfo.email
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: 'GitHub',
      href: personalInfo.github,
      username: 'github.com/ansh-info'
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: 'LinkedIn',
      href: personalInfo.linkedin,
      username: 'linkedin.com/in/ansh-kumar-ak1402'
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveIcon((prev) => (prev + 1) % icons.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mb-16">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />
      
      <div className={`relative transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        {/* Personal Info */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-6xl font-bold mb-4">
            {personalInfo.name}
            <span className="text-blue-400 animate-pulse">.</span>
          </h1>
          <p className="text-xl text-gray-400 mb-2">{personalInfo.title}</p>
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <Globe className="w-4 h-4" />
            {personalInfo.location}
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 
                transition-all group"
            >
              <div className="text-gray-400 group-hover:text-blue-400">
                {link.icon}
              </div>
              <span className="text-sm text-gray-300">{link.label}</span>
            </a>
          ))}
        </div>

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
        <div className="mt-8 flex flex-wrap justify-center gap-4">
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