import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import PropTypes from 'prop-types';

const SkillsGraph3D = ({ width = 500, height = 500 }) => {
  const [rotation, setRotation] = useState(0);

  const skills = [
    { name: 'Python', level: 0.9, category: 'Programming' },
    { name: 'SQL', level: 0.85, category: 'Database' },
    { name: 'TensorFlow', level: 0.8, category: 'ML' },
    { name: 'PyTorch', level: 0.75, category: 'ML' },
    { name: 'Docker', level: 0.7, category: 'DevOps' },
    { name: 'Pandas', level: 0.85, category: 'Data' },
    { name: 'Scikit-learn', level: 0.8, category: 'ML' },
    { name: 'Power BI', level: 0.75, category: 'Visualization' }
  ];

  const generateSkillCoordinates = () => {
    const radius = 2.0;
    const verticalSpread = 0.9;
    
    return skills.map((skill, i) => {
      const angle = (i * 2 * Math.PI) / skills.length + rotation;
      const heightOffset = Math.sin(rotation * 2 + i * 0.8) * 0.15;
      const verticalPosition = Math.cos(i * Math.PI / 4) * verticalSpread;
      
      return {
        x: Math.cos(angle) * radius * skill.level,
        y: Math.sin(angle) * radius * skill.level,
        z: verticalPosition * skill.level + heightOffset,
        ...skill
      };
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setRotation(prev => prev + 0.01);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const coordinates = generateSkillCoordinates();

  const data = [{
    type: 'scatter3d',
    mode: 'markers+text',
    x: coordinates.map(c => c.x),
    y: coordinates.map(c => c.y),
    z: coordinates.map(c => c.z),
    text: coordinates.map(c => c.name),
    textposition: 'top center',
    textfont: {
      size: 12,
      color: '#E2E8F0'
    },
    marker: {
      size: 12,
      color: coordinates.map(c => {
        const colors = {
          'Programming': '#60A5FA',
          'Database': '#34D399',
          'ML': '#F87171',
          'DevOps': '#A78BFA',
          'Data': '#FBBF24',
          'Visualization': '#EC4899'
        };
        return colors[c.category];
      }),
      opacity: 0.8,
      line: {
        color: '#1F2937',
        width: 1
      }
    },
    hoverinfo: 'text',
    hovertext: coordinates.map(c => 
      `${c.name}\n${c.category}\nProficiency: ${(c.level*100).toFixed(0)}%`
    )
  }];

  const layout = {
    paper_bgcolor: 'rgba(11, 15, 25, 0)',
    plot_bgcolor: 'rgba(11, 15, 25, 0)',
    scene: {
      xaxis: { 
        showgrid: false, 
        zeroline: false, 
        showticklabels: false,
        range: [-2, 2] // Adjusted for better centering
      },
      yaxis: { 
        showgrid: false, 
        zeroline: false, 
        showticklabels: false,
        range: [-2, 2] // Adjusted for better centering
      },
      zaxis: { 
        showgrid: false, 
        zeroline: false, 
        showticklabels: false,
        range: [-1, 1]
      },
      camera: {
        eye: { x: 1.5, y: 1.5, z: 1 },
        center: { x: 0, y: 0, z: 0 }, // Ensures perfect centering
        up: { x: 0, y: 0, z: 1 } // Maintains proper orientation
      },
      aspectmode: 'cube',
      bgcolor: 'rgba(11, 15, 25, 0)'
    },
    margin: { l: 0, r: 0, t: 0, b: 0 },
    showlegend: false,
    width,
    height,
    autosize: true
  };

  return (
    <div className="flex justify-center items-center w-full -mt-24">
      <div className="w-full" style={{ maxWidth: '500px' }}> {/* Fixed width container */}
        <Plot
          data={data}
          layout={layout}
          config={{ 
            displayModeBar: false,
            responsive: true
          }}
          style={{ width: '100%', height: '100%' }}
          useResizeHandler={true}
        />
        <div className="text-center text-sm text-gray-400/80 mt-2">
          Interactive 3D View - Drag to rotate
        </div>
      </div>
    </div>
  );
};

SkillsGraph3D.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

export default SkillsGraph3D;