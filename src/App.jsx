import { useState } from "react";
import Layout from "./components/layout/Layout";
import CoffeeMetrics from "./components/charts/CoffeeMetrics";
import EnhancedSkills from "./components/sections/EnhancedSkills";
import Experience from "./components/sections/Projects";
import ExperienceTimeline from "./components/charts/ExperienceTimeline";
import SkillsRadar from "./components/charts/SkillsRadar";
import SkillsGraph3D from "./components/charts/SkillsGraph3D";
import TerminalEmulator from "./components/terminal/TerminalEmulator";
import EnhancedHero from "./components/sections/EnhancedHero";
import DockerDashboard from "./components/docker/DockerDashboard";
import JupyterNotebook from "./components/jupyternotebook/JupyterNotebook";
import VSCodeEditor from "./components/vscode/VSCodeEditor";
import AIAssistant from "./components/AI/AIAssistant";
import NeuralNetworkViz from "./components/neuralnetwork/NeuralNetworkViz";
import MobileNav from "./components/layout/MobileNav";
import DesktopNav from "./components/layout/DesktopNav";

function App() {
  // State for showing/hiding interactive components
  const [showTerminal, setShowTerminal] = useState(false);
  const [showDocker, setShowDocker] = useState(false);
  const [showVSCode, setShowVSCode] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [showJupyter, setShowJupyter] = useState(false);
  const [showNeural, setShowNeural] = useState(false);

  // Function to handle closing all modals
  const closeAllModals = () => {
    setShowTerminal(false);
    setShowDocker(false);
    setShowVSCode(false);
    setShowAI(false);
    setShowJupyter(false);
    setShowNeural(false);
  };

  const handleModalOpen = (modalSetter) => {
    // Close all other modals
    closeAllModals();
    // Open the selected modal directly
    modalSetter(true);
  };

  // Update the navigation sections:

  {
    /* Navigation - Show either Desktop or Mobile based on screen size */
  }
  {
    window.innerWidth >= 1024 ? (
      <DesktopNav
        setShowTerminal={() => handleModalOpen(setShowTerminal)}
        setShowDocker={() => handleModalOpen(setShowDocker)}
        setShowVSCode={() => handleModalOpen(setShowVSCode)}
        setShowAI={() => handleModalOpen(setShowAI)}
        setShowJupyter={() => handleModalOpen(setShowJupyter)}
        setShowNeural={() => handleModalOpen(setShowNeural)}
      />
    ) : (
      <MobileNav
        setShowTerminal={() => handleModalOpen(setShowTerminal)}
        setShowDocker={() => handleModalOpen(setShowDocker)}
        setShowVSCode={() => handleModalOpen(setShowVSCode)}
        setShowAI={() => handleModalOpen(setShowAI)}
        setShowJupyter={() => handleModalOpen(setShowJupyter)}
        setShowNeural={() => handleModalOpen(setShowNeural)}
      />
    );
  }

  return (
    <div className="relative min-h-screen pb-20">
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

      {/* Desktop Navigation (Bottom Bar) */}
      <div className="hidden lg:block">
        <DesktopNav
          setShowTerminal={() => handleModalOpen(setShowTerminal)}
          setShowDocker={() => handleModalOpen(setShowDocker)}
          setShowVSCode={() => handleModalOpen(setShowVSCode)}
          setShowAI={() => handleModalOpen(setShowAI)}
          setShowJupyter={() => handleModalOpen(setShowJupyter)}
          setShowNeural={() => handleModalOpen(setShowNeural)}
        />
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <MobileNav
          setShowTerminal={() => handleModalOpen(setShowTerminal)}
          setShowDocker={() => handleModalOpen(setShowDocker)}
          setShowVSCode={() => handleModalOpen(setShowVSCode)}
          setShowAI={() => handleModalOpen(setShowAI)}
          setShowJupyter={() => handleModalOpen(setShowJupyter)}
          setShowNeural={() => handleModalOpen(setShowNeural)}
        />
      </div>

      {/* Interactive Components */}
      <div className="relative z-50">
        {/* Components for both Desktop and Mobile */}
        {showTerminal && (
          <TerminalEmulator
            isOpen={showTerminal}
            setIsOpen={setShowTerminal}
            isMobile={window.innerWidth < 1024}
          />
        )}
        {showDocker && (
          <DockerDashboard
            isOpen={showDocker}
            setIsOpen={setShowDocker}
            isMobile={window.innerWidth < 1024}
          />
        )}
        {showVSCode && (
          <VSCodeEditor
            isOpen={showVSCode}
            setIsOpen={setShowVSCode}
            isMobile={window.innerWidth < 1024}
          />
        )}
        {showAI && (
          <AIAssistant
            isOpen={showAI}
            setIsOpen={setShowAI}
            isMobile={window.innerWidth < 1024}
          />
        )}
        {showJupyter && (
          <JupyterNotebook
            isOpen={showJupyter}
            setIsOpen={setShowJupyter}
            isMobile={window.innerWidth < 1024}
          />
        )}
        {showNeural && (
          <NeuralNetworkViz
            isOpen={showNeural}
            setIsOpen={setShowNeural}
            isMobile={window.innerWidth < 1024}
          />
        )}
      </div>
    </div>
  );
}

export default App;

