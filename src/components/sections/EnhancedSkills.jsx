import { useState } from 'react';
import { Brain, Cpu, Database, LineChart, Globe } from 'lucide-react';
import { skills } from '../../data/resume';

const EnhancedSkills = () => {
  const [activeCategory, setActiveCategory] = useState('technical');

  const categories = {
    technical: {
      icon: <Cpu className="w-8 h-8 text-blue-400" />,
      title: "Technical Stack",
      skills: skills.technical,
      description: "Core programming and development tools"
    },
    domains: {
      icon: <Brain className="w-8 h-8 text-purple-400" />,
      title: "Domain Expertise",
      skills: skills.domains,
      description: "Specialized knowledge areas"
    },
    dataTools: {
      icon: <Database className="w-8 h-8 text-green-400" />,
      title: "Data Tools",
      skills: ["Pandas", "Numpy", "Scikit-learn", "TensorFlow", "PyTorch", "Power BI", "Tableau"],
      description: "Data processing and visualization tools"
    },
    visualization: {
      icon: <LineChart className="w-8 h-8 text-yellow-400" />,
      title: "Visualization",
      skills: ["Power BI", "Tableau", "Plotly", "D3.js", "Matplotlib", "Seaborn"],
      description: "Data visualization expertise"
    }
  };

  return (
    <div className="w-full bg-gray-800 p-4 sm:p-8 rounded-lg mb-16">
      <h2 className="text-2xl font-bold mb-6">Skills & Expertise</h2>
      
      <div className="flex flex-wrap gap-4 mb-6">
        {Object.keys(categories).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all
              ${activeCategory === cat 
                ? 'bg-blue-500 shadow-lg scale-105' 
                : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            {categories[cat].icon}
            <span>{categories[cat].title}</span>
          </button>
        ))}
      </div>

      <div className="mb-4 text-gray-400">
        {categories[activeCategory].description}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories[activeCategory].skills.map((skill, idx) => (
          <div
            key={idx}
            className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 
                     transition-all hover:scale-105 cursor-pointer 
                     flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            {skill}
          </div>
        ))}
      </div>

      {/* Languages Section */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Globe className="w-6 h-6 text-green-400" />
          Languages
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.languages.map((lang, idx) => (
            <div
              key={idx}
              className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
            >
              <span className="font-bold">{lang.name}</span>
              <span className="text-sm text-gray-400 px-2 py-1 bg-gray-600 rounded">
                {lang.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedSkills;