import { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import {
  Building2,
  Briefcase,
  GraduationCap,
  Smartphone,
  Monitor,
} from "lucide-react";

const ExperienceTimeline = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [dimensions, setDimensions] = useState({
    height: 150,
    width: 800,
  });

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setDimensions({
        height: mobile ? 120 : 150,
        width: Math.min(800, window.innerWidth - 40),
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        "Novel article ranking metrics",
      ],
      tech: ["Python", "RAG", "NLP", "Vector Databases"],
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
        "API integrations",
      ],
      tech: ["Python", "SQL", "NLP", "APIs"],
    },
    {
      company: "Honeywell",
      title: "Data Analyst Intern",
      period: "November 2022",
      location: "Roorkee, India",
      type: "work",
      highlights: [
        "Large dataset analysis",
        "Tableau visualizations",
        "ETL pipeline optimization",
      ],
      tech: ["Python", "SQL", "Tableau", "Excel VBA"],
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
        "Query optimization",
      ],
      tech: ["MySQL", "Web Development", "SQL"],
    },
  ];

  // Create the timeline data with mobile optimizations
  const data = [
    {
      type: "scatter",
      mode: "lines+markers",
      x: timelineData.map((_, i) => i),
      y: Array(timelineData.length).fill(0),
      line: {
        color: "#4A90E2",
        width: isMobile ? 2 : 3,
      },
      marker: {
        size: isMobile ? 15 : 20,
        color: timelineData.map((item) =>
          item.type === "work" ? "#4A90E2" : "#50E3C2",
        ),
        symbol: timelineData.map((item) =>
          item.type === "work" ? "diamond" : "star",
        ),
        line: {
          color: "#fff",
          width: isMobile ? 1 : 2,
        },
      },
      hoverinfo: "text",
      hovertext: timelineData.map(
        (item) =>
          `<b>${item.company}</b><br>
       ${item.title}<br>
       ${item.period}<br>
       ${item.location}<br>
       <br>Key Tech: ${item.tech.join(", ")}`,
      ),
    },
  ];

  const layout = {
    paper_bgcolor: "rgba(26, 32, 44, 0)",
    plot_bgcolor: "rgba(26, 32, 44, 0)",
    xaxis: {
      showgrid: false,
      zeroline: false,
      showticklabels: false,
      fixedrange: true,
    },
    yaxis: {
      showgrid: false,
      zeroline: false,
      showticklabels: false,
      fixedrange: true,
    },
    margin: { l: 0, r: 0, t: 0, b: 0 },
    showlegend: false,
    hovermode: "closest",
    height: dimensions.height,
    width: dimensions.width,
    annotations: timelineData.map((item, i) => ({
      x: i,
      y: 0.5,
      text: isMobile ? item.company.split(" ")[0] : item.company,
      showarrow: true,
      arrowhead: 0,
      ax: 0,
      ay: isMobile ? 30 : 40,
      font: {
        color: "#fff",
        size: isMobile ? 10 : 12,
      },
    })),
  };

  return (
    <div className="bg-gray-800 p-4 sm:p-8 rounded-lg mb-16">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl font-bold">Career Journey</h2>
        </div>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <Smartphone
            className={`w-4 h-4 ${isMobile ? "text-blue-400" : ""}`}
          />
          <span>/</span>
          <Monitor className={`w-4 h-4 ${!isMobile ? "text-blue-400" : ""}`} />
          <span className="hidden sm:inline">
            {isMobile ? "Mobile View" : "Desktop View"}
          </span>
        </div>
      </div>

      <div className="mb-8">
        <Plot
          data={data}
          layout={layout}
          config={{
            displayModeBar: false,
            responsive: true,
          }}
          className="w-full"
          useResizeHandler={true}
        />
      </div>

      {/* Detailed cards with responsive design */}
      <div className="space-y-4 sm:space-y-6">
        {timelineData.map((item, index) => (
          <div
            key={index}
            className="p-4 sm:p-6 bg-gray-700 rounded-lg transform transition-all hover:scale-[1.01] hover:bg-gray-600"
          >
            <div className="flex items-start gap-4">
              <div className="bg-blue-500 p-2 rounded-lg shrink-0">
                {item.type === "work" ? (
                  <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                ) : (
                  <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                )}
              </div>
              <div className="min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-blue-400 truncate">
                  {item.company}
                </h3>
                <p className="text-sm sm:text-base text-gray-300">
                  {item.title}
                </p>
                <p className="text-xs sm:text-sm text-gray-400 mb-4">
                  {item.period} | {item.location}
                </p>

                <div className="mb-4 space-y-1">
                  {item.highlights.map((highlight, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm sm:text-base text-gray-300"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full shrink-0"></span>
                      {highlight}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 sm:px-3 py-1 bg-gray-800 rounded-full text-xs sm:text-sm text-blue-400"
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

