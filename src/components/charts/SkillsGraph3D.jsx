import { useEffect, useState, useRef } from "react";
import Plot from "react-plotly.js";
import PropTypes from "prop-types";

const SkillsGraph3D = ({ initialWidth = 500, initialHeight = 500 }) => {
  const [rotation, setRotation] = useState(0);
  const [dimensions, setDimensions] = useState({
    width: initialWidth,
    height: initialHeight,
  });
  const [isMobile, setIsMobile] = useState(false);
  const plotRef = useRef(null);

  const skills = [
    { name: "Python", level: 0.9, category: "Programming" },
    { name: "SQL", level: 0.85, category: "Database" },
    { name: "TensorFlow", level: 0.8, category: "ML" },
    { name: "PyTorch", level: 0.75, category: "ML" },
    { name: "Docker", level: 0.7, category: "DevOps" },
    { name: "Pandas", level: 0.85, category: "Data" },
    { name: "Scikit-learn", level: 0.8, category: "ML" },
    { name: "Power BI", level: 0.75, category: "Visualization" },
  ];

  const generateSkillCoordinates = () => {
    const radius = isMobile ? 1.5 : 2.0;
    const verticalSpread = isMobile ? 0.7 : 0.9;

    return skills.map((skill, i) => {
      const angle = (i * 2 * Math.PI) / skills.length + rotation;
      const heightOffset = Math.sin(rotation * 2 + i * 0.8) * 0.15;
      const verticalPosition = Math.cos((i * Math.PI) / 4) * verticalSpread;

      return {
        x: Math.cos(angle) * radius * skill.level,
        y: Math.sin(angle) * radius * skill.level,
        z: verticalPosition * skill.level + heightOffset,
        ...skill,
      };
    });
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setDimensions({
        width: mobile
          ? window.innerWidth - 40
          : Math.min(500, window.innerWidth - 40),
        height: mobile ? 300 : 500,
      });
    };

    const rotationTimer = setInterval(() => {
      setRotation((prev) => prev + (isMobile ? 0.015 : 0.01));
    }, 50);

    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.ctrlKey) {
        e.preventDefault();
      }
    };

    const plotElement = plotRef.current;
    if (plotElement) {
      plotElement.addEventListener("wheel", handleWheel, { passive: false });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      clearInterval(rotationTimer);
      window.removeEventListener("resize", handleResize);
      if (plotElement) {
        plotElement.removeEventListener("wheel", handleWheel);
      }
    };
  }, [isMobile]);

  const coordinates = generateSkillCoordinates();

  const plotData = [
    {
      type: "scatter3d",
      mode: "markers+text",
      x: coordinates.map((c) => c.x),
      y: coordinates.map((c) => c.y),
      z: coordinates.map((c) => c.z),
      text: coordinates.map((c) => c.name),
      textposition: "top center",
      textfont: {
        size: isMobile ? 10 : 12,
        color: "#E2E8F0",
      },
      marker: {
        size: isMobile ? 8 : 12,
        color: coordinates.map((c) => {
          const colors = {
            Programming: "#60A5FA",
            Database: "#34D399",
            ML: "#F87171",
            DevOps: "#A78BFA",
            Data: "#FBBF24",
            Visualization: "#EC4899",
          };
          return colors[c.category];
        }),
        opacity: 0.8,
        line: {
          color: "#1F2937",
          width: isMobile ? 0.5 : 1,
        },
      },
      hoverinfo: "text",
      hovertext: coordinates.map(
        (c) =>
          `${c.name}\n${c.category}\nProficiency: ${(c.level * 100).toFixed(0)}%`,
      ),
    },
  ];

  const layout = {
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    scene: {
      xaxis: {
        showgrid: false,
        zeroline: false,
        showticklabels: false,
        range: [-2, 2],
        bgcolor: "rgba(0,0,0,0)",
      },
      yaxis: {
        showgrid: false,
        zeroline: false,
        showticklabels: false,
        range: [-2, 2],
        bgcolor: "rgba(0,0,0,0)",
      },
      zaxis: {
        showgrid: false,
        zeroline: false,
        showticklabels: false,
        range: [-1, 1],
        bgcolor: "rgba(0,0,0,0)",
      },
      camera: {
        eye: isMobile ? { x: 1.2, y: 1.2, z: 0.8 } : { x: 1.5, y: 1.5, z: 1 },
        center: { x: 0, y: 0, z: 0 },
        up: { x: 0, y: 0, z: 1 },
      },
      aspectmode: "cube",
      bgcolor: "rgba(0,0,0,0)",
    },
    margin: isMobile ? { l: 0, r: 0, t: 0, b: 0 } : { l: 0, r: 0, t: 0, b: 0 },
    showlegend: false,
    width: dimensions.width,
    height: dimensions.height,
    autosize: true,
  };

  return (
    <div className="relative flex flex-col items-center w-full -mt-24">
      <div
        ref={plotRef}
        className="w-full"
        style={{
          maxWidth: isMobile ? "100%" : "500px",
          touchAction: "pan-y pinch-zoom",
        }}
      >
        <div
          style={{
            position: "relative",
            willChange: "transform",
          }}
          className="transform-gpu"
        >
          <Plot
            data={plotData}
            layout={layout}
            config={{
              displayModeBar: false,
              responsive: true,
              scrollZoom: false,
              staticPlot: false,
              doubleClick: false,
              modeBarButtonsToRemove: [
                "resetCameraDefault3d",
                "resetCameraLastSave3d",
              ],
            }}
            style={{
              width: "100%",
              height: "100%",
              background: "transparent",
            }}
            useResizeHandler={true}
            onUpdate={(figure) => {
              if (figure && figure.layout) {
                figure.layout.dragmode = false;
              }
            }}
          />
        </div>
        <div className="text-center text-xs sm:text-sm text-gray-400/80 mt-2">
          Interactive 3D View - {isMobile ? "Touch" : "Drag"} to rotate
        </div>
      </div>
    </div>
  );
};

SkillsGraph3D.propTypes = {
  initialWidth: PropTypes.number,
  initialHeight: PropTypes.number,
};

export default SkillsGraph3D;

