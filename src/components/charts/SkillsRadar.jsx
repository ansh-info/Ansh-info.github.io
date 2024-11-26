import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";
import { Brain, Smartphone, Monitor } from "lucide-react";

const SkillsRadar = () => {
  const [animated, setAnimated] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [chartHeight, setChartHeight] = useState(400);

  const skillCategories = [
    { subject: "Machine Learning", A: 90, fullMark: 100 },
    { subject: "Data Analysis", A: 95, fullMark: 100 },
    { subject: "DevOps", A: 75, fullMark: 100 },
    { subject: "Visualization", A: 85, fullMark: 100 },
    { subject: "Backend Dev", A: 80, fullMark: 100 },
    { subject: "Databases", A: 88, fullMark: 100 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 500);

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setChartHeight(mobile ? 300 : 400);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-gray-800 p-4 sm:p-8 rounded-lg mb-16">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Brain className="w-8 h-8 text-blue-400" />
          <h2 className="text-2xl font-bold">Skills Radar</h2>
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

      <div className={`h-[${chartHeight}px] w-full`}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart outerRadius={isMobile ? 100 : 150} data={skillCategories}>
            <PolarGrid stroke="#4a5568" strokeWidth={isMobile ? 0.5 : 1} />
            <PolarAngleAxis
              dataKey="subject"
              tick={{
                fill: "#a0aec0",
                fontSize: isMobile ? 10 : 12,
                // Rotate labels for better mobile readability
                angle: isMobile ? 45 : 0,
              }}
              dy={isMobile ? 5 : 0}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{
                fill: "#a0aec0",
                fontSize: isMobile ? 10 : 12,
              }}
              stroke="#4a5568"
              tickCount={isMobile ? 4 : 5}
            />
            <Radar
              name="Skills"
              dataKey="A"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={animated ? 0.3 : 0}
              strokeWidth={isMobile ? 1 : 2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 mt-6">
        {skillCategories.map((skill) => (
          <div
            key={skill.subject}
            className="bg-gray-700 p-2 sm:p-4 rounded-lg flex justify-between items-center"
          >
            <span className="text-sm sm:text-base text-gray-200 truncate pr-2">
              {skill.subject}
            </span>
            <span className="text-xs sm:text-sm text-blue-400 font-bold whitespace-nowrap">
              {skill.A}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsRadar;

