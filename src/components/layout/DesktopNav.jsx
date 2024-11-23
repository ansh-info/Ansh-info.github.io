import PropTypes from "prop-types";
import {
  Terminal,
  Container,
  FileCode,
  Bot,
  Database,
  Brain,
} from "lucide-react";

const DesktopNav = ({
  setShowTerminal,
  setShowDocker,
  setShowVSCode,
  setShowAI,
  setShowJupyter,
  setShowNeural,
}) => {
  const tools = [
    {
      icon: <Terminal className="w-6 h-6" />,
      label: "Terminal",
      color: "text-green-400",
      hint: "$ vim main.py",
      action: () => setShowTerminal((prev) => !prev),
      bgColor: "group-hover:bg-green-400/10",
    },
    {
      icon: <Container className="w-6 h-6" />,
      label: "Docker",
      color: "text-blue-400",
      hint: "docker pull",
      action: () => setShowDocker((prev) => !prev),
      bgColor: "group-hover:bg-blue-400/10",
    },
    {
      icon: <FileCode className="w-6 h-6" />,
      label: "VSCode",
      color: "text-blue-500",
      hint: "code .",
      action: () => setShowVSCode((prev) => !prev),
      bgColor: "group-hover:bg-blue-500/10",
    },
    {
      icon: <Bot className="w-6 h-6" />,
      label: "AI Chat",
      color: "text-purple-400",
      hint: "ChatGPT",
      action: () => setShowAI((prev) => !prev),
      bgColor: "group-hover:bg-purple-400/10",
    },
    {
      icon: <Database className="w-6 h-6" />,
      label: "Jupyter",
      color: "text-orange-400",
      hint: "notebook",
      action: () => setShowJupyter((prev) => !prev),
      bgColor: "group-hover:bg-orange-400/10",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      label: "Neural",
      color: "text-purple-500",
      hint: "network",
      action: () => setShowNeural((prev) => !prev),
      bgColor: "group-hover:bg-purple-500/10",
    },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 hidden lg:block z-50">
      {/* Glowing border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl" />

      {/* Main container with glass effect */}
      <div
        className="relative bg-gray-800/80 backdrop-blur-lg border border-gray-700/50 rounded-2xl shadow-lg 
        overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500/10 
        before:via-purple-500/10 before:to-pink-500/10 before:opacity-50"
      >
        <div className="relative flex items-center px-3 py-2 gap-1">
          {tools.map((tool, index) => (
            <button
              key={index}
              onClick={tool.action}
              className={`group px-4 py-3 rounded-xl transition-all duration-200 hover:scale-105 
                relative overflow-hidden ${tool.bgColor}`}
            >
              <div className="flex flex-col items-center gap-1 relative z-10">
                <div
                  className={`${tool.color} transition-transform duration-200 
                  group-hover:scale-110 group-hover:animate-pulse`}
                >
                  {tool.icon}
                </div>
                <span className="text-xs text-gray-300 group-hover:text-white transition-colors">
                  {tool.label}
                </span>
                <span className="text-[10px] text-gray-500 font-mono group-hover:text-gray-400 transition-colors">
                  {tool.hint}
                </span>
              </div>

              {/* Hover glow effect */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent 
                via-white/5 to-transparent opacity-0 group-hover:opacity-100 
                transition-opacity duration-300"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

DesktopNav.propTypes = {
  setShowTerminal: PropTypes.func.isRequired,
  setShowDocker: PropTypes.func.isRequired,
  setShowVSCode: PropTypes.func.isRequired,
  setShowAI: PropTypes.func.isRequired,
  setShowJupyter: PropTypes.func.isRequired,
  setShowNeural: PropTypes.func.isRequired,
};

export default DesktopNav;
