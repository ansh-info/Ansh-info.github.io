import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const LearningCurve = () => {
  const learningCurve = [
    { day: 'Day 1', knowledge: 10, coffeeCups: 2, bugs: 15 },
    { day: 'Day 30', knowledge: 25, coffeeCups: 45, bugs: 12 },
    { day: 'Day 60', knowledge: 45, coffeeCups: 90, bugs: 8 },
    { day: 'Day 90', knowledge: 70, coffeeCups: 180, bugs: 5 },
    { day: 'Day 120', knowledge: 85, coffeeCups: 250, bugs: 3 },
    { day: 'Day 150', knowledge: 95, coffeeCups: 300, bugs: 1 },
  ];

  return (
    <div className="bg-gray-800 p-8 rounded-lg mb-16">
      <h2 className="text-2xl font-bold mb-6">My Data Science Journey</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={learningCurve}>
            <XAxis dataKey="day" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937',
                border: 'none',
                borderRadius: '8px',
                color: 'white'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="knowledge" 
              stroke="#3b82f6" 
              strokeWidth={2}
              name="Knowledge"
            />
            <Line 
              type="monotone" 
              dataKey="coffeeCups" 
              stroke="#ef4444" 
              strokeWidth={2}
              name="Coffee Consumed"
            />
            <Line 
              type="monotone" 
              dataKey="bugs" 
              stroke="#84cc16" 
              strokeWidth={2}
              name="Bugs (they're features)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LearningCurve;