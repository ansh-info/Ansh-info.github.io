import { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Brain, 
  Github, 
  Mail, 
  Linkedin,
  Globe,
  Coffee,
  Terminal
} from 'lucide-react';
import SkillsGraph3D from '../charts/SkillsGraph3D';
import { personalInfo } from '../../data/resume';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('skills');

  const categories = {
    'Programming': ['Python'],
    'Database': ['SQL'],
    'ML': ['TensorFlow', 'PyTorch', 'Scikit-learn'],
    'DevOps': ['Docker'],
    'Data': ['Pandas'],
    'Visualization': ['Power BI']
  };

  const skillLevels = {
    'Python': 90,
    'SQL': 85,
    'TensorFlow': 80,
    'PyTorch': 75,
    'Docker': 70,
    'Pandas': 85,
    'Scikit-learn': 80,
    'Power BI': 75
  };

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

  const sections = [
    { id: 'skills', icon: <Brain className="w-5 h-5" />, label: 'Skills' },
    { id: 'social', icon: <Globe className="w-5 h-5" />, label: 'Connect' }
  ];

  
// Add useEffect to handle initial state based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) { // lg breakpoint
        setIsOpen(false);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      className={`fixed left-0 top-0 h-full bg-gray-800/90 backdrop-blur-sm z-40 transition-all duration-300 
        border-r border-gray-700/50 flex flex-col
        ${isOpen ? 'w-16 md:w-[400px]' : 'w-16'}`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-8 bg-gray-800 p-1.5 rounded-full border border-gray-700/50"
      >
        {isOpen ? (
          <ChevronLeft className="w-4 h-4 text-white" />
        ) : (
          <ChevronRight className="w-4 h-4 text-white" />
        )}
      </button>

      {/* Sidebar Content */}
      <div className="h-full flex flex-col">
        {/* Header with Personal Info */}
        <div className="p-4 border-b border-gray-700/50">
          {isOpen ? (
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">{personalInfo.name}</h2>
              <p className="text-sm text-white/90">{personalInfo.title}</p>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <Globe className="w-4 h-4" />
                {personalInfo.location}
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                {personalInfo.name.charAt(0)}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        {isOpen && (
          <div className="flex border-b border-gray-700/50">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-1 p-3 flex items-center justify-center gap-2 transition-all
                  ${activeSection === section.id 
                    ? 'bg-gray-700/50 text-blue-400' 
                    : 'hover:bg-gray-700/30 text-white'}`}
              >
                {section.icon}
                <span className="text-sm font-medium">{section.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4">
          {isOpen ? (
            <>
              {activeSection === 'skills' ? (
                <div className="space-y-6">
                  {/* 3D Skills Visualization */}
                  <SkillsGraph3D />

                  {/* Skills Categories */}
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(categories).map(([category, skills]) => (
                      <div 
                        key={category}
                        className="bg-gray-700/50 p-3 rounded-lg hover:bg-gray-700/70 transition-all"
                      >
                        <div className="text-sm font-medium mb-2 text-white">{category}</div>
                        {skills.map(skill => (
                          <div 
                            key={skill}
                            className="flex items-center justify-between text-xs"
                          >
                            <span className="text-white">{skill}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-1 bg-gray-600 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-400 rounded-full transition-all"
                                  style={{ width: `${skillLevels[skill]}%` }}
                                />
                              </div>
                              <span className="text-white">{skillLevels[skill]}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-700/50 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Coffee className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-white">Daily Coffee</span>
                      </div>
                      <div className="text-2xl font-bold mt-1 text-white">4 cups</div>
                    </div>
                    <div className="bg-gray-700/50 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-white">Lines of Code</span>
                      </div>
                      <div className="text-2xl font-bold mt-1 text-white">42k+</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Social Links */}
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-all group"
                    >
                      <div className="p-2 bg-gray-600 rounded-lg group-hover:bg-blue-500 transition-all text-white">
                        {link.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white">{link.label}</div>
                        <div className="text-xs text-white/80">{link.username}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-all" />
                    </a>
                  ))}
                  
                  {/* Additional Contact Info */}
                  <div className="mt-6 p-4 bg-gray-700/30 rounded-lg">
                    <div className="text-sm text-white/90">
                      Available for collaborations and interesting projects.
                      Feel free to reach out!
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center space-y-6">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setIsOpen(true);
                    setActiveSection(section.id);
                  }}
                  className="p-2 hover:bg-gray-700/50 rounded-lg transition-all text-white"
                >
                  {section.icon}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;