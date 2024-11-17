import { useState } from 'react';
import { 
  FileCode, 
  X, 
  Play, 
  Plus,
  Save,
  RefreshCw,
  BookOpen
} from 'lucide-react';
import PropTypes from 'prop-types';

const JupyterNotebook = ({ isMobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cells, setCells] = useState([
    {
      id: 1,
      type: 'markdown',
      content: '# Data Science Adventures\nWhere we turn coffee into insights and bugs into features.',
      output: null
    },
    {
      id: 2,
      type: 'code',
      content: 'import pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\n\n# Load the dataset of coffee consumption vs bugs fixed\ndata = pd.DataFrame({\n    "coffee_cups": np.random.randint(1, 10, 100),\n    "bugs_fixed": np.random.normal(5, 2, 100)\n})',
      output: 'DataFrame created with 100 rows and 2 columns'
    },
    {
      id: 3,
      type: 'code',
      content: '# Calculate correlation between coffee and productivity\ncorr = data.corr()\nprint(f"Correlation between coffee and bugs fixed: {corr.iloc[0,1]:.2f}")\n\n# Plot the relationship\nplt.scatter(data.coffee_cups, data.bugs_fixed)\nplt.xlabel("Coffee Cups")\nplt.ylabel("Bugs Fixed")\nplt.title("The Coffee-Debug Correlation")',
      output: 'Correlation between coffee and bugs fixed: 0.85\n\n[Scatter Plot Visualization]'
    }
  ]);

  const [kernelStatus, setKernelStatus] = useState('idle');
  const [selectedCell, setSelectedCell] = useState(null);

  const addCell = (type) => {
    const newCell = {
      id: Date.now(),
      type,
      content: type === 'markdown' ? '# New Cell' : '# Add your code here',
      output: null
    };
    setCells([...cells, newCell]);
  };

  const executeCell = (id) => {
    setKernelStatus('busy');
    const funnyOutputs = [
      'Model is having an existential crisis...',
      'Converting caffeine to code...',
      'Debugging the debugger...',
      'Training neural networks to appreciate coffee...',
      'Calculating the meaning of NaN...'
    ];

    setTimeout(() => {
      setCells(cells.map(cell => {
        if (cell.id === id && cell.type === 'code') {
          return {
            ...cell,
            output: funnyOutputs[Math.floor(Math.random() * funnyOutputs.length)]
          };
        }
        return cell;
      }));
      setKernelStatus('idle');
    }, 1000);
  };

  return (
    <>
      {/* Jupyter Button - Only show on desktop */}
      {!isMobile && (
        <div className="fixed top-[400px] right-4 z-50 flex flex-col items-end gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group bg-gray-800/90 p-4 rounded-xl hover:bg-gray-700 transition-all duration-200 
              backdrop-blur-sm border border-gray-700/50 shadow-lg hover:scale-105 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <FileCode className="w-8 h-8 text-orange-400 group-hover:text-orange-300" />
              <div className="flex items-center gap-2">
                <span className="text-green-400 font-mono text-sm">$</span>
                <span className="text-gray-400 font-mono text-sm">Jupyter Notebook</span>
              </div>
            </div>
          </button>
          
          <div className="bg-gray-800/80 backdrop-blur-sm p-2 rounded-lg text-xs font-mono max-w-[300px] 
            truncate border border-gray-700/50 flex items-center gap-2"
          >
            <span className="text-green-400">$</span>
            <span className="text-gray-400">Run All Cells</span>
          </div>
        </div>
      )}

      {/* Jupyter Notebook Interface */}
      {(isOpen || isMobile) && (
        <div className={`${
          isMobile
            ? 'fixed inset-0 bg-gray-900/95 z-50'
            : 'fixed top-[300px] right-[580px] w-[1000px] h-[650px]'
        } bg-gray-800 rounded-lg shadow-2xl border border-gray-700 flex flex-col`}>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2 border-b border-gray-700 gap-2">
            <div className="flex items-center gap-2">
              <FileCode className="w-5 h-5 text-orange-400" />
              <h2 className="text-sm font-semibold text-white">Jupyter Notebook</h2>
              <span className="text-xs text-gray-400 px-2 py-1 bg-gray-700 rounded">
                Python 3.9 (Sarcasm Kernel)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded ${
                kernelStatus === 'idle' ? 'text-green-400' : 'text-yellow-400'
              }`}>
                {kernelStatus === 'idle' ? '● Idle' : '● Running'}
              </span>
              <button 
                onClick={() => isMobile ? setIsOpen(false) : setIsOpen(false)}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Toolbar - Scrollable on mobile */}
          <div className="flex items-center gap-2 p-2 border-b border-gray-700 overflow-x-auto">
            <button
              onClick={() => addCell('code')}
              className="px-2 py-1 text-xs text-gray-300 hover:bg-gray-700 rounded flex items-center gap-1 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              Code
            </button>
            <button
              onClick={() => addCell('markdown')}
              className="px-2 py-1 text-xs text-gray-300 hover:bg-gray-700 rounded flex items-center gap-1 whitespace-nowrap"
            >
              <BookOpen className="w-4 h-4" />
              Markdown
            </button>
            <button className="px-2 py-1 text-xs text-gray-300 hover:bg-gray-700 rounded flex items-center gap-1 whitespace-nowrap">
              <Save className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={() => setKernelStatus(s => s === 'idle' ? 'busy' : 'idle')}
              className="px-2 py-1 text-xs text-gray-300 hover:bg-gray-700 rounded flex items-center gap-1 whitespace-nowrap"
            >
              <RefreshCw className="w-4 h-4" />
              Restart Kernel
            </button>
          </div>

          {/* Notebook Cells - Adjust height for mobile */}
          <div className={`p-4 space-y-4 overflow-y-auto ${
            isMobile ? 'h-[calc(100vh-180px)]' : 'max-h-[500px]'
          }`}>
            {cells.map((cell) => (
              <div 
                key={cell.id}
                className={`rounded-lg transition-all ${
                  selectedCell === cell.id ? 'ring-2 ring-blue-400' : ''
                }`}
                onClick={() => setSelectedCell(cell.id)}
              >
                {/* Input Area */}
                <div className="flex items-start gap-2">
                  <div className="bg-gray-700/50 px-2 py-1 rounded-tl-lg text-xs text-gray-400 font-mono">
                    In [{cell.id}]:
                  </div>
                  <div className="flex-1 min-w-0"> {/* Added min-width to prevent overflow */}
                    <div className="bg-gray-700/30 p-3 font-mono text-sm text-white">
                      <pre className="whitespace-pre-wrap break-words">{cell.content}</pre>
                    </div>
                    {cell.type === 'code' && (
                      <div className="flex justify-end p-1">
                        <button
                          onClick={() => executeCell(cell.id)}
                          className="px-2 py-1 text-xs text-gray-300 hover:bg-gray-700 rounded flex items-center gap-1"
                        >
                          <Play className="w-3 h-3" />
                          Run
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Output Area */}
                {cell.output && (
                  <div className="flex items-start gap-2 mt-1">
                    <div className="bg-gray-700/50 px-2 py-1 rounded-tl-lg text-xs text-gray-400 font-mono">
                      Out [{cell.id}]:
                    </div>
                    <div className="flex-1 bg-gray-700/30 p-3 font-mono text-sm text-green-400 break-words">
                      {cell.output}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Status Bar */}
          <div className="p-2 border-t border-gray-700 flex flex-wrap justify-between items-center gap-2 text-xs text-gray-400">
            <div>Python 3.9 | Powered by Coffee</div>
            <div>Memory Usage: Over 9000 MB</div>
          </div>
        </div>
      )}
    </>
  );
};

JupyterNotebook.propTypes = {
  isMobile: PropTypes.bool
};

export default JupyterNotebook;