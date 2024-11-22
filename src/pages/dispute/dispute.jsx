import  { useState, useEffect } from "react";


const App = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const targetDate = new Date("2024-12-01T00:00:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <img src="/logo.svg" className="text-4xl font-bold mb-2" />
      <p className="text-lg text-gray-600 mt-3 mb-6">
        Effortless escrow services for secure transactions. Coming soon!
      </p>

      <div className="flex gap-4 mb-8">
        {["days", "hours", "minutes", "seconds"].map((unit) => (
          <div key={unit} className="text-center">
            <div className="text-3xl font-bold">
              {timeLeft[unit] < 10 ? `0${timeLeft[unit]}` : timeLeft[unit]}
            </div>
            <div className="text-sm uppercase">{unit}</div>
          </div>
        ))}
      </div>

      <div className="w-full max-w-md">
        <form className="flex">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg"
          >
            Notify Me
          </button>
        </form>
      </div>

    
    </div>
  );
};

export default App;
