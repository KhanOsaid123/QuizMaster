import { useState, useEffect } from "react";
import { getLeaderboard } from "../utils/indexedDB";

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard();
        setLeaderboardData(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load leaderboard");
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return <div className="text-center py-4">Loading leaderboard...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  if (leaderboardData.length === 0) {
    return (
      <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
        <h3 className="text-xl font-semibold text-indigo-600 mb-2">
          Leaderboard
        </h3>
        <p className="text-gray-600">No scores yet. Be the first to play!</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-indigo-600 mb-4">
        Leaderboard
      </h3>
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Rank
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Player
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Score
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leaderboardData.map((entry, index) => (
              <tr
                key={entry.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {entry.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {entry.score}/{entry.totalQuestions} (
                  {Math.round((entry.score / entry.totalQuestions) * 100)}%)
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(entry.date)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
