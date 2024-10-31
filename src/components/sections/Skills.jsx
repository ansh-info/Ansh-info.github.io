import { Brain, Terminal, ChartLine, Code } from 'lucide-react';

const Skills = () => {
  const skills = [
    {
      icon: <Brain className="w-8 h-8 text-purple-400" />,
      title: "Machine Learning",
      description: "Teaching computers to think, because humans are overrated"
    },
    {
      icon: <Terminal className="w-8 h-8 text-green-400" />,
      title: "Python Wizardry",
      description: "import solution as magic"
    },
    {
      icon: <ChartLine className="w-8 h-8 text-blue-400" />,
      title: "Data Visualization",
      description: "Making pretty pictures until the patterns make sense"
    },
    {
      icon: <Code className="w-8 h-8 text-red-400" />,
      title: "Statistical Analysis",
      description: "Finding correlations until something becomes causation"
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Tech Stack of Chaos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              {skill.icon}
              <h3 className="text-xl font-bold">{skill.title}</h3>
            </div>
            <p className="text-gray-400">{skill.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;