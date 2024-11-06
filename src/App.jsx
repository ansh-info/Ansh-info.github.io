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

function App() {
  return (
    <div className="relative min-h-screen">
      <Layout>
        <EnhancedHero />
        <div className="mb-16 w-full">
          <SkillsGraph3D />
        </div>
        {/* <div className="mb-16">
          <SkillsGraph3D />
        </div> */}
        <SkillsRadar />
        <ExperienceTimeline />
        <EnhancedSkills />
        <Experience />
        <CoffeeMetrics />
      </Layout>
      
      {/* Interactive Components */}
      <div className="relative z-50">
        <TerminalEmulator />
        <DockerDashboard />
        <JupyterNotebook />
        <VSCodeEditor />
        <AIAssistant />
        <NeuralNetworkViz />
      </div>
    </div>
  );
}

export default App;