import { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  Terminal,
  Container,
  FileCode,
  Bot,
  Brain,
  Database
} from 'lucide-react';

const MobileNav = ({ 
  setShowTerminal,
  setShowDocker,
  setShowVSCode,
  setShowAI,
  setShowJupyter,
  setShowNeural
}) => {
  const [activeTab, setActiveTab] = useState(null);

  const tools = [
    {
      icon: <Terminal className="w-5 h-5" />,
      label: 'Terminal',
      color: 'text-green-400',
      action: () => {
        setShowTerminal(prev => !prev);
        setActiveTab(activeTab === 'terminal' ? null : 'terminal');
      }
    },
    {
      icon: <Container className="w-5 h-5" />,
      label: 'Docker',
      color: 'text-blue-400',
      action: () => {
        setShowDocker(prev => !prev);
        setActiveTab(activeTab === 'docker' ? null : 'docker');
      }
    },
    {
      icon: <FileCode className="w-5 h-5" />,
      label: 'VSCode',
      color: 'text-blue-500',
      action: () => {
        setShowVSCode(prev => !prev);
        setActiveTab(activeTab === 'vscode' ? null : 'vscode');
      }
    },
    {
      icon: <Bot className="w-5 h-5" />,
      label: 'AI Chat',
      color: 'text-purple-400',
      action: () => {
        setShowAI(prev => !prev);
        setActiveTab(activeTab === 'ai' ? null : 'ai');
      }
    },
    {
      icon: <Database className="w-5 h-5" />,
      label: 'Jupyter',
      color: 'text-orange-400',
      action: () => {
        setShowJupyter(prev => !prev);
        setActiveTab(activeTab === 'jupyter' ? null : 'jupyter');
      }
    },
    {
      icon: <Brain className="w-5 h-5" />,
      label: 'Neural',
      color: 'text-purple-500',
      action: () => {
        setShowNeural(prev => !prev);
        setActiveTab(activeTab === 'neural' ? null : 'neural');
      }
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800/90 backdrop-blur-lg border-t border-gray-700/50 z-50 lg:hidden">
      <div className="flex justify-around items-center p-2">
        {tools.map((tool, index) => (
          <button
            key={index}
            onClick={tool.action}
            className={`flex flex-col items-center p-2 rounded-lg transition-all ${
              activeTab === tool.label.toLowerCase() 
                ? 'bg-gray-700' 
                : 'hover:bg-gray-700/50'
            }`}
          >
            <div className={tool.color}>{tool.icon}</div>
            <span className="text-xs text-gray-400 mt-1">{tool.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

MobileNav.propTypes = {
  setShowTerminal: PropTypes.func.isRequired,
  setShowDocker: PropTypes.func.isRequired,
  setShowVSCode: PropTypes.func.isRequired,
  setShowAI: PropTypes.func.isRequired,
  setShowJupyter: PropTypes.func.isRequired,
  setShowNeural: PropTypes.func.isRequired
};

export default MobileNav;