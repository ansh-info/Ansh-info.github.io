import { useState, useEffect } from 'react';
import { ResponsiveContainer, PolarGrid, 
         PolarAngleAxis, PolarRadiusAxis, Radar, RadarChart } from 'recharts';
import { Brain } from 'lucide-react';

const SkillsRadar = () => {
  const [animated, setAnimated] = useState(false);

  const skillCategories = [
    { subject: 'Machine Learning', A: 90, fullMark: 100 },
    { subject: 'Data Analysis', A: 95, fullMark: 100 },
    { subject: 'DevOps', A: 75, fullMark: 100 },
    { subject: 'Visualization', A: 85, fullMark: 100 },
    { subject: 'Backend Dev', A: 80, fullMark: 100 },
    { subject: 'Databases', A: 88, fullMark: 100 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gray-800 p-8 rounded-lg mb-16">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="w-8 h-8 text-blue-400" />
        <h2 className="text-2xl font-bold">Skills Radar</h2>
      </div>
      
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart outerRadius={150} data={skillCategories}>
            <PolarGrid stroke="#4a5568" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#a0aec0' }}
              fontSize={12}
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tick={{ fill: '#a0aec0' }}
              stroke="#4a5568"
            />
            <Radar
              name="Skills"
              dataKey="A"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={animated ? 0.3 : 0}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {skillCategories.map((skill) => (
          <div 
            key={skill.subject}
            className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
          >
            <span className="text-gray-200">{skill.subject}</span>
            <span className="text-blue-400 font-bold">{skill.A}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsRadar;