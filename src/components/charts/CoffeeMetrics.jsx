import { useState, useEffect } from "react";
import {
  Coffee,
  Clock,
  Users,
  Activity,
  Code,
  Brain,
  Sparkles,
  Bug,
  Zap,
  LineChart,
} from "lucide-react";

const CoffeeMetrics = () => {
  const [coffeeCount, setCoffeeCount] = useState(0);
  const [stats, setStats] = useState({
    pageHits: 0,
    visitors: {
      lastHour: 0,
      lastDay: 0,
      lastWeek: 0,
    },
    productivity: 0,
    linesOfCode: 0,
    bugsFixed: 0,
    coffeeStats: {
      today: 0,
      week: 0,
      avgPerDay: 0,
    },
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Simulate real-time stats updates
    const updateStats = () => {
      setStats((prev) => ({
        pageHits: prev.pageHits + Math.floor(Math.random() * 3),
        visitors: {
          lastHour: Math.floor(Math.random() * 50 + 100),
          lastDay: Math.floor(Math.random() * 500 + 1000),
          lastWeek: Math.floor(Math.random() * 2000 + 5000),
        },
        productivity: Math.min(100, prev.productivity + coffeeCount * 2),
        linesOfCode:
          prev.linesOfCode + coffeeCount * Math.floor(Math.random() * 100),
        bugsFixed:
          prev.bugsFixed +
          (coffeeCount > 0 ? Math.floor(Math.random() * 3) : 0),
        coffeeStats: {
          today: coffeeCount,
          week: coffeeCount * 5,
          avgPerDay: ((coffeeCount * 5) / 5).toFixed(1),
        },
      }));
    };

    const statsInterval = setInterval(updateStats, 5000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(statsInterval);
    };
  }, [coffeeCount]);

  const handleCoffeeClick = () => {
    setCoffeeCount((prev) => prev + 1);
    setStats((prev) => ({
      ...prev,
      productivity: Math.min(100, prev.productivity + 5),
    }));
  };

  const StatCard = ({ icon: Icon, title, value, subValue, color }) => (
    <div
      className={`bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700/70 transition-all
      ${isMobile ? "w-full" : "w-auto"}`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-xl font-bold">{value}</p>
          {subValue && <p className="text-xs text-gray-400 mt-1">{subValue}</p>}
        </div>
      </div>
    </div>
  );

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(num);
  };

  return (
    <div className="bg-gray-800 p-4 sm:p-8 rounded-lg mb-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Coffee-Driven Development</h2>
          <p className="text-gray-400">
            Because no good code was ever written without caffeine(Tap to give
            me a boost)
          </p>
        </div>
        <button
          onClick={handleCoffeeClick}
          className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg flex items-center gap-2 
            transition-all hover:scale-105 whitespace-nowrap"
        >
          <Coffee className="w-5 h-5" />
          <span>Cups today: {stats.coffeeStats.today}</span>
        </button>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={Activity}
          title="Productivity"
          value={`${stats.productivity}%`}
          subValue={`${stats.coffeeStats.today} cups = ${stats.productivity}% efficiency`}
          color="bg-green-500"
        />
        <StatCard
          icon={Users}
          title="Visitors"
          value={formatNumber(stats.visitors.lastDay)}
          subValue={`${formatNumber(stats.visitors.lastHour)} in last hour`}
          color="bg-blue-500"
        />
        <StatCard
          icon={Code}
          title="Lines of Code"
          value={formatNumber(stats.linesOfCode)}
          subValue="And counting..."
          color="bg-purple-500"
        />
        <StatCard
          icon={Bug}
          title="Bugs Fixed"
          value={stats.bugsFixed}
          subValue="(or cleverly hidden)"
          color="bg-red-500"
        />
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Clock}
          title="Weekly Coffee"
          value={`${stats.coffeeStats.week} cups`}
          subValue={`Avg: ${stats.coffeeStats.avgPerDay}/day`}
          color="bg-yellow-500"
        />
        <StatCard
          icon={Brain}
          title="Neural Activity"
          value={`${Math.min(100, stats.coffeeStats.today * 20)}%`}
          subValue="Caffeine-enhanced thinking"
          color="bg-indigo-500"
        />
        <StatCard
          icon={Sparkles}
          title="Ideas Generated"
          value={formatNumber(stats.coffeeStats.today * 42)}
          subValue="Some might even work!"
          color="bg-pink-500"
        />
        <StatCard
          icon={Zap}
          title="Energy Level"
          value={`${Math.min(100, stats.coffeeStats.today * 15)}%`}
          subValue={
            stats.coffeeStats.today > 5
              ? "Approaching hyperdrive"
              : "Need more coffee"
          }
          color="bg-orange-500"
        />
      </div>

      {/* Coffee Performance Correlation */}
      <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <LineChart className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold">
            Coffee-Performance Correlation
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="text-gray-400">
            <div className="flex justify-between mb-1">
              <span>Code Quality</span>
              <span className="text-green-400">
                {Math.min(100, stats.coffeeStats.today * 12)}%
              </span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div
                className="bg-green-400 rounded-full h-2 transition-all"
                style={{
                  width: `${Math.min(100, stats.coffeeStats.today * 12)}%`,
                }}
              />
            </div>
          </div>
          <div className="text-gray-400">
            <div className="flex justify-between mb-1">
              <span>Bug Prevention</span>
              <span className="text-blue-400">
                {Math.min(100, stats.coffeeStats.today * 15)}%
              </span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div
                className="bg-blue-400 rounded-full h-2 transition-all"
                style={{
                  width: `${Math.min(100, stats.coffeeStats.today * 15)}%`,
                }}
              />
            </div>
          </div>
          <div className="text-gray-400">
            <div className="flex justify-between mb-1">
              <span>Debugging Speed</span>
              <span className="text-purple-400">
                {Math.min(100, stats.coffeeStats.today * 18)}%
              </span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div
                className="bg-purple-400 rounded-full h-2 transition-all"
                style={{
                  width: `${Math.min(100, stats.coffeeStats.today * 18)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeMetrics;
