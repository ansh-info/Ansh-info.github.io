import { useState } from 'react';
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
} from 'lucide-react';

const VSCodeEditor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFile, setActiveFile] = useState('app.py');
  const [activeTab, setActiveTab] = useState('explorer');

  const files = {
    'app.py': {
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
      language: 'python'
    },
    'data_processor.py': {
      content: `def process_coffee_metrics(data):
    """
    Processes coffee consumption metrics
    Returns insights about caffeine-code correlation
    """
    pass`,
      language: 'python'
    },
    'config.yaml': {
      content: `model:
  coffee_threshold: 9000
  productivity_multiplier: 1.5
  chaos_enabled: true`,
      language: 'yaml'
    }
  };

  const explorer = {
    'src': {
      type: 'folder',
      items: ['app.py', 'data_processor.py']
    },
    'config': {
      type: 'folder',
      items: ['config.yaml']
    },
    'node_modules': {
      type: 'folder',
      items: ['too-many-files-to-count']
    }
  };

  const problems = [
    { type: 'error', message: 'Coffee levels critically low' },
    { type: 'warning', message: 'Potential caffeine overflow' },
    { type: 'info', message: 'AI model needs more training data' }
  ];

  return (
    <>
      {/* VS Code Button */}
      <div className="fixed top-[600px] right-4 z-50 flex flex-col items-end gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group bg-gray-800/90 p-4 rounded-xl hover:bg-gray-700 transition-all duration-200 
            backdrop-blur-sm border border-gray-700/50 shadow-lg hover:scale-105 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Code className="w-8 h-8 text-blue-400 group-hover:text-blue-300" />
            <div className="flex items-center gap-2">
              <span className="text-green-400 font-mono text-sm">$</span>
              <span className="text-gray-400 font-mono text-sm">VScode</span>
            </div>
          </div>
        </button>
        
        <div className="bg-gray-800/80 backdrop-blur-sm p-2 rounded-lg text-xs font-mono max-w-[150px] 
          truncate border border-gray-700/50 flex items-center gap-2"
        >
          <span className="text-green-400">$</span>
          <span className="text-gray-400">code .</span>
        </div>
      </div>

      {/* VS Code Interface */}
      {isOpen && (
        <div className="fixed top-[300px] right-[560px] w-[1000px] h-[800px] bg-gray-900 rounded-lg shadow-2xl z-40 
          border border-gray-700 flex overflow-hidden"
        >
          {/* Activity Bar */}
          <div className="w-12 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-2 gap-4">
            <button 
              onClick={() => setActiveTab('explorer')}
              className={`p-2 rounded hover:bg-gray-700 ${activeTab === 'explorer' ? 'bg-gray-700' : ''}`}
            >
              <Files className="w-5 h-5 text-gray-400" />
            </button>
            <button 
              onClick={() => setActiveTab('search')}
              className={`p-2 rounded hover:bg-gray-700 ${activeTab === 'search' ? 'bg-gray-700' : ''}`}
            >
              <Search className="w-5 h-5 text-gray-400" />
            </button>
            <button 
              onClick={() => setActiveTab('git')}
              className={`p-2 rounded hover:bg-gray-700 ${activeTab === 'git' ? 'bg-gray-700' : ''}`}
            >
              <GitBranch className="w-5 h-5 text-gray-400" />
            </button>
            <button 
              onClick={() => setActiveTab('debug')}
              className={`p-2 rounded hover:bg-gray-700 ${activeTab === 'debug' ? 'bg-gray-700' : ''}`}
            >
              <Bug className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Sidebar */}
          <div className="w-64 bg-gray-800 border-r border-gray-700">
            {activeTab === 'explorer' && (
              <div className="p-2">
                <div className="text-xs text-gray-400 uppercase font-bold mb-2">Explorer</div>
                {Object.entries(explorer).map(([name, content]) => (
                  <div key={name}>
                    <div className="flex items-center gap-1 px-2 py-1 hover:bg-gray-700 rounded cursor-pointer">
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                      <Folder className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300 text-sm">{name}</span>
                    </div>
                    {content.items.map(item => (
                      <div 
                        key={item}
                        onClick={() => setActiveFile(item)}
                        className={`flex items-center gap-1 px-2 py-1 ml-4 hover:bg-gray-700 rounded cursor-pointer
                          ${activeFile === item ? 'bg-gray-700' : ''}`}
                      >
                        <FileCode className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'debug' && (
              <div className="p-2">
                <div className="text-xs text-gray-400 uppercase font-bold mb-2">Problems</div>
                {problems.map((problem, index) => (
                  <div key={index} className="px-2 py-1 hover:bg-gray-700 rounded text-sm">
                    <div className={`
                      ${problem.type === 'error' ? 'text-red-400' : 
                        problem.type === 'warning' ? 'text-yellow-400' : 
                        'text-blue-400'}
                    `}>
                      {problem.message}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Editor */}
          <div className="flex-1 flex flex-col">
            {/* Tabs */}
            <div className="h-9 bg-gray-800 border-b border-gray-700 flex items-center px-2">
              {Object.keys(files).map(filename => (
                <div
                  key={filename}
                  onClick={() => setActiveFile(filename)}
                  className={`px-3 py-1 flex items-center gap-2 text-sm cursor-pointer
                    ${activeFile === filename ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                >
                  <FileCode className="w-4 h-4" />
                  {filename}
                </div>
              ))}
            </div>

            {/* Code Area */}
            <div className="flex-1 p-4 overflow-auto">
              <pre className="font-mono text-sm">
                <code className="text-gray-300">
                  {files[activeFile]?.content}
                </code>
              </pre>
            </div>

            {/* Status Bar */}
            <div className="h-6 bg-gray-800 border-t border-gray-700 flex items-center justify-between px-2">
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
            className="absolute top-2 right-2 p-1 hover:bg-gray-700 rounded transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      )}
    </>
  );
};

export default VSCodeEditor;