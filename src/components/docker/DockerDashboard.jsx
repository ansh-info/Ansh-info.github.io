import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  Box, 
  Container, 
  X, 
  Play, 
  Square, 
  RefreshCw, 
  AlertCircle,
  Coffee,
  Cpu,
  HardDrive,
  Network
} from 'lucide-react';

const DockerDashboard = ({ isMobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [containers, setContainers] = useState([
    {
      id: 'coffee-service',
      name: 'Coffee Service',
      status: 'running',
      uptime: '2 days',
      image: 'caffeine-injector:latest',
      memory: '128MB',
      cpu: '2%',
      ports: '8080:8080',
      networks: ['caffeine-net']
    },
    {
      id: 'bug-generator',
      name: 'Bug Generator',
      status: 'running',
      uptime: '5 days',
      image: 'chaos-monkey:latest',
      memory: '256MB',
      cpu: '5%',
      ports: '3000:3000',
      networks: ['chaos-net']
    },
    {
      id: 'ml-overthinker',
      name: 'ML Overthinker',
      status: 'sleeping',
      uptime: '1 day',
      image: 'tensorflow-anxiety:2.0',
      memory: '2GB',
      cpu: '80%',
      ports: '6006:6006',
      networks: ['neural-net']
    }
  ]);

  const [logs, setLogs] = useState([
    '[INFO] Initializing coffee monitoring system...',
    '[WARN] Coffee levels critically low',
    '[ERROR] Neural network stuck in existential crisis',
    '[INFO] Deploying emergency caffeine protocols',
    '[WARN] Bug generator running at optimal chaos levels',
    '[INFO] ML model questioning its existence again'
  ]);

  const [systemStats, setSystemStats] = useState({
    cpuUsage: 45,
    memoryUsage: 62,
    networkUsage: 30,
    coffeeLevel: 65
  });

  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 8)]);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'running':
        return 'text-green-400';
      case 'sleeping':
        return 'text-yellow-400';
      default:
        return 'text-red-400';
    }
  };

  const toggleContainer = (id) => {
    setContainers(prev => prev.map(container => {
      if (container.id === id) {
        const newStatus = container.status === 'running' ? 'sleeping' : 'running';
        addLog(`Container ${container.name} ${newStatus === 'running' ? 'started' : 'stopped'}`);
        return { ...container, status: newStatus };
      }
      return container;
    }));
  };

  const restartContainer = (id) => {
    const container = containers.find(c => c.id === id);
    addLog(`Restarting ${container.name}...`);
    
    // Simulate restart sequence
    setContainers(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, status: 'restarting' };
      }
      return c;
    }));

    setTimeout(() => {
      setContainers(prev => prev.map(c => {
        if (c.id === id) {
          return { ...c, status: 'running' };
        }
        return c;
      }));
      addLog(`${container.name} successfully restarted`);
    }, 2000);
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update container stats
      setContainers(prev => prev.map(container => ({
        ...container,
        cpu: `${Math.floor(Math.random() * 100)}%`,
        memory: `${Math.floor(Math.random() * 512)}MB`
      })));

      // Update system stats
      setSystemStats(prev => ({
        cpuUsage: Math.floor(Math.random() * 100),
        memoryUsage: Math.floor(Math.random() * 100),
        networkUsage: Math.floor(Math.random() * 100),
        coffeeLevel: Math.max(0, prev.coffeeLevel - Math.random() * 5)
      }));

      // Randomly add logs
      if (Math.random() < 0.3) {
        const messages = [
          'Neural network discovering memes again',
          'Coffee service optimizing bean allocation',
          'Bug generator achieved new levels of chaos',
          'ML model contemplating its training data',
          'Container orchestration reaching peak sarcasm'
        ];
        const types = ['INFO', 'WARN', 'ERROR'];
        const type = types[Math.floor(Math.random() * types.length)];
        addLog(`[${type}] ${messages[Math.floor(Math.random() * messages.length)]}`);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Coffee level warning
  useEffect(() => {
    if (systemStats.coffeeLevel < 30) {
      addLog('[CRITICAL] Coffee levels dangerously low! Productivity at risk!');
    }
  }, [systemStats.coffeeLevel]);

  return (
    <>
      {/* Docker Toggle Button - Only show on desktop */}
      {!isMobile && (
        <div className="fixed top-[200px] right-4 z-50 flex flex-col items-end gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group bg-gray-800/90 p-4 rounded-xl hover:bg-gray-700 transition-all duration-200 
              backdrop-blur-sm border border-gray-700/50 shadow-lg hover:scale-105 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Container className="w-8 h-8 text-blue-400 group-hover:text-blue-300" />
              <div className="flex items-center gap-2">
                <span className="text-green-400 font-mono text-sm">$</span>
                <span className="text-gray-400 font-mono text-sm">Docker</span>
              </div>
            </div>
          </button>
          
          <div className="bg-gray-800/80 backdrop-blur-sm p-2 rounded-lg text-xs font-mono max-w-[300px] 
            truncate border border-gray-700/50 flex items-center gap-2"
          >
            <span className="text-green-400">$</span>
            <span className="text-gray-400">docker pull - click to start</span>
          </div>
        </div>
      )}

      {/* Docker Dashboard */}
      {(isOpen || isMobile) && (
        <div className={`${
          isMobile
            ? 'fixed inset-0 bg-gray-900/95 z-50'
            : 'fixed top-[300px] right-[600px] w-[900px] h-[650px]'
        } bg-gray-800 rounded-lg shadow-2xl border border-gray-700 flex flex-col overflow-hidden`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-2 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <Container className="w-5 h-5 text-blue-400" />
              <h2 className="text-sm font-semibold text-white">Docker Dashboard</h2>
              <span className="text-xs text-gray-400 px-2 py-1 bg-gray-700 rounded hidden sm:inline-block">
                v20.10.69-sarcasm
              </span>
            </div>
            <button 
              onClick={() => isMobile ? setIsOpen(false) : setIsOpen(false)}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* System Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 border-b border-gray-700">
            {[
              { icon: <Cpu className="w-4 h-4" />, label: 'CPU', value: systemStats.cpuUsage, color: 'bg-blue-400' },
              { icon: <HardDrive className="w-4 h-4" />, label: 'Memory', value: systemStats.memoryUsage, color: 'bg-purple-400' },
              { icon: <Network className="w-4 h-4" />, label: 'Network', value: systemStats.networkUsage, color: 'bg-green-400' },
              { icon: <Coffee className="w-4 h-4" />, label: 'Coffee', value: systemStats.coffeeLevel, color: 'bg-yellow-400' }
            ].map((stat, index) => (
              <div key={index} className="bg-gray-700/50 p-2 rounded-lg">
                <div className="flex items-center gap-2 text-xs text-gray-300 mb-1">
                  {stat.icon}
                  {stat.label}
                </div>
                <div className="w-full h-1.5 bg-gray-600 rounded-full">
                  <div 
                    className={`h-full ${stat.color} rounded-full transition-all`}
                    style={{ width: `${stat.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Container List - Scrollable container */}
          <div className={`p-4 space-y-3 overflow-y-auto ${
            isMobile ? 'h-[calc(100vh-400px)]' : 'max-h-[300px]'
          }`}>
            {containers.map((container) => (
              <div 
                key={container.id}
                className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700/70 transition-all"
              >
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Box className="w-4 h-4 text-blue-400" />
                    <span className="font-medium text-white">{container.name}</span>
                    <span className={`text-xs ${getStatusColor(container.status)}`}>
                      ● {container.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleContainer(container.id)}
                      className="p-2 hover:bg-gray-600 rounded transition-colors" // Increased touch target
                    >
                      {container.status === 'running' ? (
                        <Square className="w-4 h-4 text-red-400" />
                      ) : (
                        <Play className="w-4 h-4 text-green-400" />
                      )}
                    </button>
                    <button
                      onClick={() => restartContainer(container.id)}
                      className="p-2 hover:bg-gray-600 rounded transition-colors" // Increased touch target
                    >
                      <RefreshCw className="w-4 h-4 text-yellow-400" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
                  <div className="truncate">Image: {container.image}</div>
                  <div>Uptime: {container.uptime}</div>
                  <div>Memory: {container.memory}</div>
                  <div>CPU: {container.cpu}</div>
                  <div>Ports: {container.ports}</div>
                  <div>Network: {container.networks.join(', ')}</div>
                </div>
              </div>
            ))}
          </div>

          {/* System Logs */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-white">System Logs</span>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-2 font-mono text-xs space-y-1 max-h-[100px] sm:max-h-[150px] overflow-y-auto">
              {logs.map((log, index) => (
                <div 
                  key={index}
                  className={`${
                    log.includes('[ERROR]') ? 'text-red-400' :
                    log.includes('[WARN]') ? 'text-yellow-400' :
                    'text-green-400'
                  } break-words`}
                >
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

DockerDashboard.propTypes = {
  isMobile: PropTypes.bool
};

export default DockerDashboard;