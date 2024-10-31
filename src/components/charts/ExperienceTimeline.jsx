import Plot from 'react-plotly.js';
import { Building2, Briefcase, GraduationCap } from 'lucide-react';

const ExperienceTimeline = () => {
  // Define your experience data with more details
  const timelineData = [
    {
      company: "BioMed X Institute",
      title: "Case Study - Competitive intelligence platform for AI research",
      period: "October 2024 – Present",
      location: "Heidelberg, Germany",
      type: "work",
      highlights: [
        "RAG-enabled chatbot system",
        "Scalable document processing",
        "Novel article ranking metrics"
      ],
      tech: ["Python", "RAG", "NLP", "Vector Databases"]
    },
    {
      company: "R. Chandra & Associates",
      title: "Contract Management and Legal Automation Intern",
      period: "January 2023 – February 2023",
      location: "Lucknow, India",
      type: "work",
      highlights: [
        "Automated contract parsing",
        "Data analysis with SQL",
        "API integrations"
      ],
      tech: ["Python", "SQL", "NLP", "APIs"]
    },
    {
      company: "Honeywell",
      title: "Data Analyst Intern",
      period: "November 2022 – November 2022",
      location: "Roorkee, India",
      type: "work",
      highlights: [
        "Large dataset analysis",
        "Tableau visualizations",
        "ETL pipeline optimization"
      ],
      tech: ["Python", "SQL", "Tableau", "Excel VBA"]
    },
    {
      company: "CSIR Indian Institute of Petroleum",
      title: "Database Administrator and Web Developer Intern",
      period: "July 2022 – September 2022",
      location: "Dehradun, India",
      type: "work",
      highlights: [
        "MySQL database management",
        "Web application development",
        "Query optimization"
      ],
      tech: ["MySQL", "Web Development", "SQL"]
    }
  ];

  // Create the timeline data
  const data = [{
    type: 'scatter',
    mode: 'lines+markers',
    x: timelineData.map((_, i) => i),
    y: Array(timelineData.length).fill(0),
    line: {
      color: '#4A90E2',
      width: 3
    },
    marker: {
      size: 20,
      color: timelineData.map(item => item.type === 'work' ? '#4A90E2' : '#50E3C2'),
      symbol: timelineData.map(item => item.type === 'work' ? 'diamond' : 'star'),
      line: {
        color: '#fff',
        width: 2
      }
    },
    hoverinfo: 'text',
    hovertext: timelineData.map(item => 
      `<b>${item.company}</b><br>
       ${item.title}<br>
       ${item.period}<br>
       ${item.location}<br>
       <br>Key Tech: ${item.tech.join(', ')}`
    )
  }];

  const layout = {
    paper_bgcolor: 'rgba(26, 32, 44, 0)',
    plot_bgcolor: 'rgba(26, 32, 44, 0)',
    xaxis: {
      showgrid: false,
      zeroline: false,
      showticklabels: false,
      fixedrange: true
    },
    yaxis: {
      showgrid: false,
      zeroline: false,
      showticklabels: false,
      fixedrange: true
    },
    margin: { l: 0, r: 0, t: 0, b: 0 },
    showlegend: false,
    hovermode: 'closest',
    height: 150,
    annotations: timelineData.map((item, i) => ({
      x: i,
      y: 0.5,
      text: item.company,
      showarrow: true,
      arrowhead: 0,
      ax: 0,
      ay: 40,
      font: {
        color: '#fff',
        size: 12
      }
    }))
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg mb-16">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Briefcase className="w-6 h-6 text-blue-400" />
        Career Journey
      </h2>
      
      <div className="mb-8">
        <Plot
          data={data}
          layout={layout}
          config={{ 
            displayModeBar: false,
            responsive: true 
          }}
          className="w-full"
        />
      </div>

      {/* Detailed cards for each experience */}
      <div className="space-y-6">
        {timelineData.map((item, index) => (
          <div 
            key={index}
            className="p-6 bg-gray-700 rounded-lg transform transition-all hover:scale-102 hover:bg-gray-600"
          >
            <div className="flex items-start gap-4">
              <div className="bg-blue-500 p-2 rounded-lg">
                {item.type === 'work' ? (
                  <Building2 className="w-6 h-6 text-white" />
                ) : (
                  <GraduationCap className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-400">{item.company}</h3>
                <p className="text-gray-300">{item.title}</p>
                <p className="text-sm text-gray-400 mb-4">{item.period} | {item.location}</p>
                
                <div className="mb-4">
                  {item.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-300 mb-1">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                      {highlight}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.tech.map((tech, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm text-blue-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceTimeline;