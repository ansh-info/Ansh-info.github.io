import { useState, useEffect } from "react";
import { Brain, X, Play, Pause, RefreshCw, Layers, Zap } from "lucide-react";
import Plot from "react-plotly.js";
import PropTypes from "prop-types";

const NeuralNetworkViz = ({ isMobile = false, isOpen, setIsOpen }) => {
  const [epoch, setEpoch] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [loss, setLoss] = useState(1);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingHistory, setTrainingHistory] = useState({
    accuracy: [],
    loss: [],
  });

  // Network architecture
  const layers = [4, 8, 6, 3, 1];
  const [activeNeurons, setActiveNeurons] = useState(new Set());
  const [networkData, setNetworkData] = useState(null);
  const [selectedLayer, setSelectedLayer] = useState(null);

  useEffect(() => {
    generateNetworkData();
  }, []);

  const generateNetworkData = () => {
    const nodes = [];
    const edges = [];
    const xPositions = layers.map((_, i) => (i - (layers.length - 1) / 2) * 2);

    let nodeIndex = 0;

    // Generate nodes
    layers.forEach((layerSize, layerIndex) => {
      const x = xPositions[layerIndex];

      for (let i = 0; i < layerSize; i++) {
        const y = (i - (layerSize - 1) / 2) * 1.5;
        const isActive = activeNeurons.has(nodeIndex);
        const isSelectedLayer = selectedLayer === layerIndex;

        nodes.push({
          x: [x],
          y: [y],
          z: [0],
          type: "scatter3d",
          mode: "markers",
          marker: {
            size: isActive ? 10 : 8,
            color: isActive
              ? "#9F7AEA"
              : isSelectedLayer
                ? "#4299E1"
                : "#4A5568",
            opacity: 0.8,
            symbol: isActive ? "circle" : "circle-open",
          },
          name: `Node ${nodeIndex}`,
          hoverinfo: "text",
          hovertext: `Layer ${layerIndex + 1}, Node ${i + 1}\nActivation: ${isActive ? "Active" : "Inactive"}`,
        });

        // Generate edges to next layer
        if (layerIndex < layers.length - 1) {
          for (let j = 0; j < layers[layerIndex + 1]; j++) {
            const nextX = xPositions[layerIndex + 1];
            const nextY = (j - (layers[layerIndex + 1] - 1) / 2) * 1.5;
            const nextNodeActive = activeNeurons.has(
              nodeIndex + layers[layerIndex],
            );

            edges.push({
              x: [x, nextX],
              y: [y, nextY],
              z: [0, 0],
              type: "scatter3d",
              mode: "lines",
              line: {
                color: isActive || nextNodeActive ? "#9F7AEA" : "#2D3748",
                width: isActive || nextNodeActive ? 2 : 1,
              },
              opacity: isActive || nextNodeActive ? 0.8 : 0.3,
              showlegend: false,
            });
          }
        }

        nodeIndex++;
      }
    });

    setNetworkData([...edges, ...nodes]);
  };

  useEffect(() => {
    if (isTraining) {
      const interval = setInterval(() => {
        setEpoch((e) => {
          const newEpoch = (e + 1) % 100;
          return newEpoch;
        });

        setAccuracy((acc) => {
          const newAcc = Math.min(0.98, acc + Math.random() * 0.05);
          setTrainingHistory((prev) => ({
            ...prev,
            accuracy: [...prev.accuracy, newAcc],
          }));
          return newAcc;
        });

        setLoss((l) => {
          const newLoss = Math.max(0.02, l - Math.random() * 0.05);
          setTrainingHistory((prev) => ({
            ...prev,
            loss: [...prev.loss, newLoss],
          }));
          return newLoss;
        });

        // Randomly activate neurons
        const newActiveNeurons = new Set();
        const totalNeurons = layers.reduce((a, b) => a + b, 0);
        for (let i = 0; i < totalNeurons / 3; i++) {
          newActiveNeurons.add(Math.floor(Math.random() * totalNeurons));
        }
        setActiveNeurons(newActiveNeurons);
        generateNetworkData();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isTraining]);

  if (!isOpen) return null;

  const layout3D = {
    paper_bgcolor: "rgba(26, 32, 44, 0)",
    plot_bgcolor: "rgba(26, 32, 44, 0)",
    scene: {
      xaxis: { showgrid: false, zeroline: false, showticklabels: false },
      yaxis: { showgrid: false, zeroline: false, showticklabels: false },
      zaxis: { showgrid: false, zeroline: false, showticklabels: false },
      camera: {
        eye: { x: 2, y: 0.2, z: 0.4 },
      },
      aspectmode: "cube",
    },
    margin: { l: 0, r: 0, t: 0, b: 0 },
    showlegend: false,
    autosize: true,
  };

  const metricsLayout = {
    paper_bgcolor: "rgba(26, 32, 44, 0)",
    plot_bgcolor: "rgba(26, 32, 44, 0)",
    xaxis: {
      showgrid: true,
      gridcolor: "#2D3748",
      title: "Epoch",
      color: "#A0AEC0",
    },
    yaxis: {
      showgrid: true,
      gridcolor: "#2D3748",
      color: "#A0AEC0",
    },
    margin: { l: 40, r: 10, t: 10, b: 40 },
    showlegend: true,
    legend: {
      x: 0,
      y: 1,
      font: { color: "#A0AEC0" },
    },
    autosize: true,
  };

  return (
    <div
      className={`fixed ${
        isMobile
          ? "inset-0 bg-gray-900/95 z-50"
          : "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[min(1000px,90vw)] h-[min(800px,90vh)] z-40"
      } bg-gray-800 rounded-lg shadow-2xl border border-gray-700 flex flex-col overflow-hidden`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            <span className="font-semibold text-white">
              Neural Network Visualizer
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs px-2 py-0.5 bg-blue-400/20 text-blue-400 rounded-full">
              Epoch: {epoch}
            </span>
            <span className="text-xs px-2 py-0.5 bg-green-400/20 text-green-400 rounded-full">
              Acc: {(accuracy * 100).toFixed(1)}%
            </span>
            <span className="text-xs px-2 py-0.5 bg-red-400/20 text-red-400 rounded-full">
              Loss: {loss.toFixed(3)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsTraining(!isTraining)}
            className={`p-2 rounded-lg transition-colors ${
              isTraining
                ? "bg-red-400 hover:bg-red-500"
                : "bg-green-400 hover:bg-green-500"
            }`}
          >
            {isTraining ? (
              <Pause className="w-4 h-4 text-white" />
            ) : (
              <Play className="w-4 h-4 text-white" />
            )}
          </button>
          <button
            onClick={() => {
              setEpoch(0);
              setAccuracy(0);
              setLoss(1);
              setTrainingHistory({ accuracy: [], loss: [] });
              setActiveNeurons(new Set());
              generateNetworkData();
            }}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {/* Network Visualization */}
        <div className="p-4">
          <div className="h-[350px] w-full">
            {networkData && (
              <Plot
                data={networkData}
                layout={layout3D}
                config={{
                  displayModeBar: false,
                  responsive: true,
                }}
                style={{ width: "100%", height: "100%" }}
                useResizeHandler={true}
              />
            )}
          </div>
        </div>

        {/* Training Metrics */}
        <div className="p-4 border-t border-gray-700">
          <div className="h-[200px] w-full">
            <Plot
              data={[
                {
                  x: Array.from(
                    { length: trainingHistory.accuracy.length },
                    (_, i) => i,
                  ),
                  y: trainingHistory.accuracy,
                  type: "scatter",
                  mode: "lines",
                  name: "Accuracy",
                  line: { color: "#48BB78" },
                },
                {
                  x: Array.from(
                    { length: trainingHistory.loss.length },
                    (_, i) => i,
                  ),
                  y: trainingHistory.loss,
                  type: "scatter",
                  mode: "lines",
                  name: "Loss",
                  line: { color: "#F56565" },
                },
              ]}
              layout={metricsLayout}
              config={{
                displayModeBar: false,
                responsive: true,
              }}
              style={{ width: "100%", height: "100%" }}
              useResizeHandler={true}
            />
          </div>
        </div>
      </div>

      {/* Layer Info */}
      <div className="p-4 border-t border-gray-700 shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {layers.map((size, index) => (
              <button
                key={index}
                onClick={() => setSelectedLayer(index)}
                className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 ${
                  selectedLayer === index
                    ? "bg-blue-400 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                <Layers className="w-4 h-4" />
                Layer {index + 1}
                <span className="ml-1 text-xs opacity-70">({size})</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Zap className="w-4 h-4" />
            Active Neurons: {activeNeurons.size}
          </div>
        </div>
      </div>
    </div>
  );
};

NeuralNetworkViz.propTypes = {
  isMobile: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default NeuralNetworkViz;

