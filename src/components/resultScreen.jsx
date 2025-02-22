function ResultScreen({ userName, score, totalQuestions, onRestart }) {
  const percentage = (score / totalQuestions) * 100;
  let message = "";

  if (percentage >= 80) {
    message = "Excellent! Youre a quiz master!";
  } else if (percentage >= 60) {
    message = "Good job! You know your stuff!";
  } else if (percentage >= 40) {
    message = "Not bad! Keep learning!";
  } else {
    message = "Keep practicing, youll get better!";
  }

  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold text-indigo-600 mb-2">
        Quiz Complete!
      </h2>
      <p className="text-gray-600 mb-6">Great effort, {userName}!</p>

      <div className="bg-indigo-50 p-6 rounded-lg mb-6">
        <div className="text-5xl font-bold text-indigo-600 mb-2">
          {score} / {totalQuestions}
        </div>
        <p className="text-gray-700">{message}</p>
      </div>

      <button
        onClick={onRestart}
        className="bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition duration-300"
      >
        Try Again
      </button>
    </div>
  );
}

export default ResultScreen;
