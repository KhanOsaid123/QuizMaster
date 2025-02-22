import { useState } from "react";
import Leaderboard from "./leaderBoard";

function WelcomeScreen({ onStart }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      setError("Please enter your name");
      return;
    }
    onStart(name);
  };

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6">Quiz App</h1>
        <p className="mb-6 text-gray-600">
          Test your knowledge with our exciting quiz!
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Let's Get Started
          </button>
        </form>
      </div>

      <Leaderboard />
    </div>
  );
}

export default WelcomeScreen;
