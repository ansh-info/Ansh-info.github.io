import { useState } from 'react';
import { Coffee } from 'lucide-react';

const CoffeeMetrics = () => {
  const [coffeeCount, setCoffeeCount] = useState(0);

  return (
    <div className="bg-gray-800 p-8 rounded-lg mb-16">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Coffee-Driven Development</h2>
          <p className="text-gray-400">Because no good code was ever written without caffeine</p>
        </div>
        <button 
          onClick={() => setCoffeeCount(prev => prev + 1)}
          className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg flex items-center gap-2"
        >
          <Coffee size={24} />
          <span>Cups today: {coffeeCount}</span>
        </button>
      </div>
    </div>
  );
};

export default CoffeeMetrics;