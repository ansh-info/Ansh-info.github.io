import { useState } from "react";
import PropTypes from "prop-types";
import {
  Terminal,
  Container,
  FileCode,
  Bot,
  Database,
  Brain,
} from "lucide-react";

const MobileNav = ({
  setShowTerminal,
  setShowDocker,
  setShowVSCode,
  setShowAI,
  setShowJupyter,
  setShowNeural,
}) => {
  const [activeTab, setActiveTab] = useState(null);

  const tools = [
    {
      icon: <Terminal className="w-5 h-5" />,
      label: "Terminal",
      color: "text-green-400",
      activeColor: "bg-green-400/10",
      borderColor: "border-green-400/50",
      hint: "$ vim main.py",
      action: () => {
        setShowTerminal((prev) => !prev);
        setActiveTab(activeTab === "terminal" ? null : "terminal");
      },
    },
    {
      icon: <Container className="w-5 h-5" />,
      label: "Docker",
      color: "text-blue-400",
      activeColor: "bg-blue-400/10",
      borderColor: "border-blue-400/50",
      hint: "docker pull",
      action: () => {
        setShowDocker((prev) => !prev);
        setActiveTab(activeTab === "docker" ? null : "docker");
      },
    },
    {
      icon: <FileCode className="w-5 h-5" />,
      label: "VSCode",
      color: "text-blue-500",
      activeColor: "bg-blue-500/10",
      borderColor: "border-blue-500/50",
      hint: "code .",
      action: () => {
        setShowVSCode((prev) => !prev);
        setActiveTab(activeTab === "vscode" ? null : "vscode");
      },
    },
    {
      icon: <Bot className="w-5 h-5" />,
      label: "AI Chat",
      color: "text-purple-400",
      activeColor: "bg-purple-400/10",
      borderColor: "border-purple-400/50",
      hint: "ChatGPT",
      action: () => {
        setShowAI((prev) => !prev);
        setActiveTab(activeTab === "ai" ? null : "ai");
      },
    },
    {
      icon: <Database className="w-5 h-5" />,
      label: "Jupyter",
      color: "text-orange-400",
      activeColor: "bg-orange-400/10",
      borderColor: "border-orange-400/50",
      hint: "notebook",
      action: () => {
        setShowJupyter((prev) => !prev);
        setActiveTab(activeTab === "jupyter" ? null : "jupyter");
      },
    },
    {
      icon: <Brain className="w-5 h-5" />,
      label: "Neural",
      color: "text-purple-500",
      activeColor: "bg-purple-500/10",
      borderColor: "border-purple-500/50",
      hint: "network",
      action: () => {
        setShowNeural((prev) => !prev);
        setActiveTab(activeTab === "neural" ? null : "neural");
      },
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden px-4 pb-4">
      {/* Glowing border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl" />

      {/* Main container with glass effect */}
      <div
        className="relative bg-gray-800/80 backdrop-blur-lg border border-gray-700/50 rounded-2xl shadow-lg 
        overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500/10 
        before:via-purple-500/10 before:to-pink-500/10 before:opacity-50"
      >
        <div className="relative flex items-center justify-around p-2">
          {tools.map((tool, index) => (
            <button
              key={index}
              onClick={tool.action}
              className={`group flex flex-col items-center p-2 rounded-xl transition-all duration-200
                ${activeTab === tool.label.toLowerCase() ? `${tool.activeColor} ${tool.borderColor} border` : "hover:bg-gray-700/50"}
                relative overflow-hidden`}
            >
              {/* Icon and Label */}
              <div className="flex flex-col items-center gap-1 relative z-10">
                <div
                  className={`${tool.color} transition-transform duration-200 
                  group-hover:scale-110 ${activeTab === tool.label.toLowerCase() ? "animate-pulse" : ""}`}
                >
                  {tool.icon}
                </div>
                <span
                  className={`text-xs transition-colors duration-200
                  ${activeTab === tool.label.toLowerCase() ? "text-white" : "text-gray-400 group-hover:text-gray-300"}`}
                >
                  {tool.label}
                </span>
              </div>

              {/* Tooltip with hint - Only show on long press or active */}
              <div
                className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 px-3 py-1.5 rounded-lg
                text-xs text-gray-300 whitespace-nowrap border border-gray-700 opacity-0 transition-opacity duration-200
                ${activeTab === tool.label.toLowerCase() ? "opacity-100" : "group-active:opacity-100"}`}
              >
                <div
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 border-gray-700 
                  border-r border-b rotate-45"
                />
                {tool.hint}
              </div>

              {/* Hover glow effect */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </button>
          ))}
        </div>
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
  setShowNeural: PropTypes.func.isRequired,
};

export default MobileNav;

