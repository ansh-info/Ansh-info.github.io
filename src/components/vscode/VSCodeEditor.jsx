import { useState } from "react";
import PropTypes from "prop-types";
import {
  Code,
  Files,
  GitBranch,
  Search,
  Bug,
  Coffee,
  X,
  ChevronRight,
  Folder,
  FileCode,
  Menu as MenuIcon,
} from "lucide-react";

const VSCodeEditor = ({ isMobile = false, isOpen, setIsOpen }) => {
  const [activeFile, setActiveFile] = useState("app.py");
  const [activeTab, setActiveTab] = useState("explorer");

  const files = {
    "app.py": {
      content: `# ML Model Training Pipeline
import tensorflow as tf
import pandas as pd
from sklearn.model_selection import train_test_split

class CoffeePredictor:
    def __init__(self):
        self.coffee_level = 100
        self.productivity = 0
    
    def drink_coffee(self, cups):
        self.coffee_level += cups
        self.productivity = min(100, self.coffee_level * 1.5)
        return f"Productivity increased to {self.productivity}%"

    def train_model(self, data):
        if self.coffee_level < 50:
            return "Error: Coffee levels too low for training"
        
        # Advanced AI stuff happens here
        return "Model successfully overthinking data"`,
      language: "python",
    },
    "data_processor.py": {
      content: `def process_coffee_metrics(data):
    """
    Processes coffee consumption metrics
    Returns insights about caffeine-code correlation
    """
    pass`,
      language: "python",
    },
    "config.yaml": {
      content: `model:
  coffee_threshold: 9000
  productivity_multiplier: 1.5
  chaos_enabled: true`,
      language: "yaml",
    },
  };

  const explorer = {
    src: {
      type: "folder",
      items: ["app.py", "data_processor.py"],
    },
    config: {
      type: "folder",
      items: ["config.yaml"],
    },
    node_modules: {
      type: "folder",
      items: ["too-many-files-to-count"],
    },
  };

  const problems = [
    { type: "error", message: "Coffee levels critically low" },
    { type: "warning", message: "Potential caffeine overflow" },
    { type: "info", message: "AI model needs more training data" },
  ];

  if (!isOpen) return null;

  return (
    <div
      className={`fixed ${
        isMobile
          ? "inset-0 bg-gray-900/95 z-50"
          : "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[min(1200px,95vw)] h-[min(800px,90vh)] z-40"
      } bg-gray-900 rounded-lg shadow-2xl border border-gray-700 flex overflow-hidden`}
    >
      {/* Mobile Menu Toggle */}
      {isMobile && (
        <button
          onClick={() => setActiveTab(activeTab ? null : "explorer")}
          className="absolute top-2 left-2 p-2 rounded hover:bg-gray-700 z-10"
        >
          <MenuIcon className="w-5 h-5 text-gray-400" />
        </button>
      )}

      {/* Activity Bar & Sidebar */}
      <div
        className={`${
          isMobile
            ? `fixed inset-y-0 left-0 w-72 bg-gray-800 transform transition-transform duration-300 ${
                activeTab ? "translate-x-0" : "-translate-x-full"
              }`
            : "flex"
        }`}
      >
        {/* Activity Bar */}
        <div className="w-12 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-2 gap-4 shrink-0">
          {[
            { id: "explorer", icon: <Files className="w-5 h-5" /> },
            { id: "search", icon: <Search className="w-5 h-5" /> },
            { id: "git", icon: <GitBranch className="w-5 h-5" /> },
            { id: "debug", icon: <Bug className="w-5 h-5" /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`p-2 rounded hover:bg-gray-700 transition-colors ${
                activeTab === item.id ? "bg-gray-700" : ""
              }`}
            >
              {item.icon}
            </button>
          ))}
        </div>

        {/* Sidebar */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 shrink-0">
          {activeTab === "explorer" && (
            <div className="p-2 h-full overflow-y-auto">
              <div className="text-xs text-gray-400 uppercase font-bold mb-2">
                Explorer
              </div>
              {Object.entries(explorer).map(([name, content]) => (
                <div key={name}>
                  <div className="flex items-center gap-1 px-2 py-1 hover:bg-gray-700 rounded cursor-pointer">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <Folder className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300 text-sm">{name}</span>
                  </div>
                  {content.items.map((item) => (
                    <div
                      key={item}
                      onClick={() => {
                        setActiveFile(item);
                        if (isMobile) setActiveTab(null);
                      }}
                      className={`flex items-center gap-1 px-2 py-1 ml-4 hover:bg-gray-700 rounded cursor-pointer
                        ${activeFile === item ? "bg-gray-700" : ""}`}
                    >
                      <FileCode className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          {activeTab === "debug" && (
            <div className="p-2">
              <div className="text-xs text-gray-400 uppercase font-bold mb-2">
                Problems
              </div>
              {problems.map((problem, index) => (
                <div
                  key={index}
                  className="px-2 py-1 hover:bg-gray-700 rounded text-sm"
                >
                  <div
                    className={`
                    ${
                      problem.type === "error"
                        ? "text-red-400"
                        : problem.type === "warning"
                          ? "text-yellow-400"
                          : "text-blue-400"
                    }
                  `}
                  >
                    {problem.message}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Tabs */}
        <div className="h-9 bg-gray-800 border-b border-gray-700 flex items-center px-2 overflow-x-auto shrink-0">
          {Object.keys(files).map((filename) => (
            <div
              key={filename}
              onClick={() => setActiveFile(filename)}
              className={`px-3 py-1 flex items-center gap-2 text-sm cursor-pointer whitespace-nowrap
                ${activeFile === filename ? "bg-gray-900 text-white" : "text-gray-400 hover:bg-gray-700"}`}
            >
              <FileCode className="w-4 h-4" />
              {filename}
            </div>
          ))}
        </div>

        {/* Code Area */}
        <div className="flex-1 p-4 overflow-auto">
          <pre className="font-mono text-sm">
            <code className="text-gray-300 whitespace-pre-wrap break-words">
              {files[activeFile]?.content}
            </code>
          </pre>
        </div>

        {/* Status Bar */}
        <div className="h-6 bg-gray-800 border-t border-gray-700 flex items-center justify-between px-2 shrink-0">
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <GitBranch className="w-3 h-3" />
              main
            </div>
            <div className="flex items-center gap-1">
              <Coffee className="w-3 h-3" />
              Caffeine Level: 82%
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <div>{files[activeFile]?.language}</div>
            <div>UTF-8</div>
          </div>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-2 right-2 p-2 hover:bg-gray-700 rounded transition-colors"
      >
        <X className="w-4 h-4 text-gray-400" />
      </button>
    </div>
  );
};

VSCodeEditor.propTypes = {
  isMobile: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default VSCodeEditor;

