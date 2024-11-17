import { useState } from 'react';
import Layout from './components/layout/Layout';
import CoffeeMetrics from './components/charts/CoffeeMetrics';
import EnhancedSkills from './components/sections/EnhancedSkills';
import Experience from './components/sections/Projects';
import ExperienceTimeline from './components/charts/ExperienceTimeline';
import SkillsRadar from './components/charts/SkillsRadar';
import SkillsGraph3D from './components/charts/SkillsGraph3D';
import TerminalEmulator from './components/terminal/TerminalEmulator';
import EnhancedHero from './components/sections/EnhancedHero';
import DockerDashboard from './components/docker/DockerDashboard';
import JupyterNotebook from './components/jupyternotebook/JupyterNotebook';
import VSCodeEditor from './components/vscode/VSCodeEditor';
import AIAssistant from './components/AI/AIAssistant';
import NeuralNetworkViz from './components/neuralnetwork/NeuralNetworkViz';
import MobileNav from './components/layout/MobileNav';

function App() {
  // State for showing/hiding interactive components
  const [showTerminal, setShowTerminal] = useState(false);
  const [showDocker, setShowDocker] = useState(false);
  const [showVSCode, setShowVSCode] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [showJupyter, setShowJupyter] = useState(false);
  const [showNeural, setShowNeural] = useState(false);

  return (
    <div className="relative min-h-screen pb-16 lg:pb-0">
      <Layout>
        <EnhancedHero />
        <div className="mb-16">
          <SkillsGraph3D />
        </div>
        <SkillsRadar />
        <ExperienceTimeline />
        <EnhancedSkills />
        <Experience />
        <CoffeeMetrics />
      </Layout>

      {/* Interactive Components */}
      <div className="relative z-50">
        {/* Desktop Components */}
        <div className="hidden lg:block">
          <TerminalEmulator 
            isOpen={showTerminal}
            setIsOpen={setShowTerminal}
          />
          <DockerDashboard 
            isOpen={showDocker}
            setIsOpen={setShowDocker}
          />
          <JupyterNotebook 
            isOpen={showJupyter}
            setIsOpen={setShowJupyter}
          />
          <VSCodeEditor 
            isOpen={showVSCode}
            setIsOpen={setShowVSCode}
          />
          <AIAssistant 
            isOpen={showAI}
            setIsOpen={setShowAI}
          />
          <NeuralNetworkViz 
            isOpen={showNeural}
            setIsOpen={setShowNeural}
          />
        </div>

        {/* Mobile Modals */}
        <div className="lg:hidden">
          {showTerminal && (
            <div className="fixed inset-0 bg-gray-900/95 z-50 p-4">
              <TerminalEmulator 
                isMobile={true}
                isOpen={showTerminal}
                setIsOpen={setShowTerminal}
              />
            </div>
          )}
          {showDocker && (
            <div className="fixed inset-0 bg-gray-900/95 z-50 p-4">
              <DockerDashboard 
                isMobile={true}
                isOpen={showDocker}
                setIsOpen={setShowDocker}
              />
            </div>
          )}
          {showVSCode && (
            <div className="fixed inset-0 bg-gray-900/95 z-50 p-4">
              <VSCodeEditor 
                isMobile={true}
                isOpen={showVSCode}
                setIsOpen={setShowVSCode}
              />
            </div>
          )}
          {showAI && (
            <div className="fixed inset-0 bg-gray-900/95 z-50 p-4">
              <AIAssistant 
                isMobile={true}
                isOpen={showAI}
                setIsOpen={setShowAI}
              />
            </div>
          )}
          {showJupyter && (
            <div className="fixed inset-0 bg-gray-900/95 z-50 p-4">
              <JupyterNotebook 
                isMobile={true}
                isOpen={showJupyter}
                setIsOpen={setShowJupyter}
              />
            </div>
          )}
          {showNeural && (
            <div className="fixed inset-0 bg-gray-900/95 z-50 p-4">
              <NeuralNetworkViz 
                isMobile={true}
                isOpen={showNeural}
                setIsOpen={setShowNeural}
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav
        setShowTerminal={setShowTerminal}
        setShowDocker={setShowDocker}
        setShowVSCode={setShowVSCode}
        setShowAI={setShowAI}
        setShowJupyter={setShowJupyter}
        setShowNeural={setShowNeural}
      />
    </div>
  );
}

export default App;