import { useState } from "react";

function QuizScreen({
  question,
  timer,
  timeUp,
  questionNumber,
  totalQuestions,
  onOptionSelect,
  onIntegerSubmit,
  onNextQuestion,
  selectedOption,
  answer,
  showExplanation,
  toggleExplanation,
  isCorrect,
}) {
  const [integerAnswer, setIntegerAnswer] = useState("");
  const timerPercentage = (timer / 30) * 100;
  const timerColor =
    timer > 10 ? "bg-green-500" : timer > 5 ? "bg-yellow-500" : "bg-red-500";

  const handleIntegerSubmit = (e) => {
    e.preventDefault();
    if (integerAnswer.trim() !== "") {
      onIntegerSubmit(integerAnswer);
    }
  };

  const hasAnswered =
    question.type === "mcq" ? selectedOption !== null : answer !== "";

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm font-medium text-gray-500">
          Question {questionNumber} of {totalQuestions}
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
            <span
              className={`font-bold ${
                timer <= 5 ? "text-red-600" : "text-indigo-600"
              }`}
            >
              {timer}
            </span>
          </div>
          <span className="text-sm text-gray-500">seconds left</span>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div
          className={`h-2.5 rounded-full ${timerColor}`}
          style={{ width: `${timerPercentage}%` }}
        ></div>
      </div>

      <h2 className="text-xl font-semibold mb-6">{question.question}</h2>

      {question.type === "mcq" ? (
        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`w-full p-3 text-left rounded-md transition ${
                selectedOption === index
                  ? option === question.correctAnswer
                    ? "bg-green-100 border-green-500 border-2"
                    : "bg-red-100 border-red-500 border-2"
                  : timeUp && option === question.correctAnswer
                  ? "bg-green-100 border-green-500 border-2"
                  : "bg-gray-50 border border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => !hasAnswered && !timeUp && onOptionSelect(index)}
              disabled={hasAnswered || timeUp}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <form onSubmit={handleIntegerSubmit} className="mb-6">
          <div className="mb-4">
            <input
              type="number"
              placeholder="Enter your answer"
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                answer
                  ? answer === question.correctAnswer
                    ? "border-green-500 focus:ring-green-500 bg-green-50"
                    : "border-red-500 focus:ring-red-500 bg-red-50"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
              value={integerAnswer}
              onChange={(e) => setIntegerAnswer(e.target.value)}
              disabled={hasAnswered || timeUp}
            />
          </div>
          <button
            type="submit"
            className={`px-6 py-2 rounded-md ${
              !integerAnswer || hasAnswered || timeUp
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
            disabled={!integerAnswer || hasAnswered || timeUp}
          >
            Submit Answer
          </button>
        </form>
      )}

      {((!isCorrect && hasAnswered) || timeUp) && (
        <div className="mb-6">
          <button
            onClick={toggleExplanation}
            className="flex items-center justify-center w-full px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition mb-2"
          >
            {showExplanation ? "Hide" : "Show"} Explanation
          </button>

          {showExplanation && (
            <div className="bg-indigo-50 p-4 rounded-md">
              <p className="text-gray-800">{question.explanation}</p>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-end">
        <button
          className={`px-6 py-2 rounded-md ${
            hasAnswered || timeUp
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={onNextQuestion}
          disabled={!hasAnswered && !timeUp}
        >
          {questionNumber === totalQuestions ? "Finish Quiz" : "Next Question"}
        </button>
      </div>
    </div>
  );
}

export default QuizScreen;
