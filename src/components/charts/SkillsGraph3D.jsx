import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import PropTypes from 'prop-types';

const SkillsGraph3D = ({ width = 368, height = 400 }) => {
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
    const radius = 2.0; // Increased radius for more spread
    const verticalSpread = 0.9; // Increased vertical spread
    
    return skills.map((skill, i) => {
      const angle = (i * 2 * Math.PI) / skills.length + rotation;
      // Modified distribution to create more space between points
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
      setRotation(prev => prev + 0.02); // Doubled rotation speed
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const coordinates = generateSkillCoordinates();

  // Create grid planes
  const createGridPlane = (axis1, axis2, fixedAxis, value) => ({
    type: 'mesh3d',
    x: axis1 === 'x' ? [-1.8, 1.8, 1.8, -1.8] : // Increased grid size
       axis1 === 'y' ? [value, value, value, value] : [-1.8, -1.8, 1.8, 1.8],
    y: axis1 === 'x' ? [value, value, value, value] : 
       axis1 === 'y' ? [-1.8, 1.8, 1.8, -1.8] : [-1.8, 1.8, 1.8, -1.8],
    z: axis1 === 'z' ? [-1.8, -1.8, 1.8, 1.8] : 
       [value, value, value, value],
    i: [0],
    j: [1],
    k: [2],
    opacity: 0.1,
    color: '#1E293B',
    hoverinfo: 'skip'
  });

  const gridPlanes = [
    createGridPlane('x', 'y', 'z', -0.6),
    createGridPlane('x', 'y', 'z', 0),
    createGridPlane('x', 'y', 'z', 0.6)
  ];

  const data = [
    ...gridPlanes,
    {
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
        size: 14,
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
        symbol: 'circle',
        opacity: 1,
        line: {
          color: 'rgba(255, 255, 255, 0.4)',
          width: 1.5
        }
      },
      hoverinfo: 'text',
      hovertext: coordinates.map(c => 
        `<b>${c.name}</b><br>
         ${c.category}<br>
         Proficiency: ${(c.level*100).toFixed(0)}%`
      )
    }
  ];

  const layout = {
    paper_bgcolor: 'rgba(17, 24, 39, 0)',
    plot_bgcolor: 'rgba(17, 24, 39, 0)',
    scene: {
      xaxis: { 
        showgrid: true,
        gridcolor: '#1E293B',
        gridwidth: 1,
        zeroline: false,
        showticklabels: false,
        range: [-1.8, 1.8] // Increased range
      },
      yaxis: { 
        showgrid: true,
        gridcolor: '#1E293B',
        gridwidth: 1,
        zeroline: false,
        showticklabels: false,
        range: [-1.8, 1.8] // Increased range
      },
      zaxis: { 
        showgrid: true,
        gridcolor: '#1E293B',
        gridwidth: 1,
        zeroline: false,
        showticklabels: false,
        range: [-0.8, 1.8] // Adjusted range for better vertical distribution
      },
      camera: {
        eye: { x: 1.8, y: 1.8, z: 1.2 }, // Adjusted camera position
        center: { x: 0, y: 0, z: 0 }
      },
      aspectmode: 'cube',
      bgcolor: 'rgba(17, 24, 39, 0.5)'
    },
    margin: { l: 0, r: 0, t: 0, b: 0 },
    showlegend: false,
    width,
    height
  };

  return (
    <div className="relative">
      <Plot
        data={data}
        layout={layout}
        config={{ 
          displayModeBar: false,
          responsive: true
        }}
        className="mx-auto"
      />
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm text-gray-400">
        Interactive 3D View - Drag to rotate
      </div>
    </div>
  );
};

SkillsGraph3D.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

export default SkillsGraph3D;