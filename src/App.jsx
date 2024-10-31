import Layout from './components/layout/Layout';
// import Hero from './components/sections/Hero';
import CoffeeMetrics from './components/charts/CoffeeMetrics';
import EnhancedSkills from './components/sections/EnhancedSkills';
import Experience from './components/sections/Projects';
import ExperienceTimeline from './components/charts/ExperienceTimeline';
import SkillsRadar from './components/charts/SkillsRadar';
import TerminalEmulator from './components/terminal/TerminalEmulator';
import Sidebar from './components/layout/Sidebar';
import EnhancedHero from './components/sections/EnhancedHero';
import DockerDashboard from './components/docker/DockerDashboard';
import JupyterNotebook from './components/jupyternotebook/JupyterNotebook';
import VSCodeEditor from './components/vscode/VSCodeEditor';
import AIAssistant from './components/AI/AIAssistant';
import NeuralNetworkViz from './components/neuralnetwork/NeuralNetworkViz';

function App() {
  return (
    <div className="relative min-h-screen">
      <Sidebar />
      <TerminalEmulator />
      <DockerDashboard />
      <JupyterNotebook />
      <VSCodeEditor />
      <AIAssistant />
      <NeuralNetworkViz />
      <Layout>
        <EnhancedHero />
        <SkillsRadar />
        <ExperienceTimeline />
        <EnhancedSkills />
        <Experience />
        <CoffeeMetrics />
      </Layout>
    </div>
  );
}

export default App;