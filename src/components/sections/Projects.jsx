import { Briefcase } from 'lucide-react';
import { projects } from '../../data/resume';

const Projects = () => {
  return (
    <div className="bg-gray-800 p-8 rounded-lg mb-16">
      <h2 className="text-2xl font-bold mb-6">Projects</h2>
      <p className="text-gray-400 mb-4">(Click on the project titles to view on GitHub)</p>
      
      <div className="space-y-8">
        {projects.map((project, idx) => (
          <div key={idx} className="relative pl-8 border-l-2 border-gray-700">
            <div className="absolute -left-3 top-0">
              <div className="bg-blue-500 p-2 rounded-full">
                <Briefcase size={16} />
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold">
                <a 
                  href={project.githubLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-200 hover:text-blue-400 hover:underline"
                >
                  {project.title}
                </a>
              </h3>
              <p className="text-blue-400">{project.category}</p>
              <ul className="list-disc list-inside text-gray-300">
                {project.highlights.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;

