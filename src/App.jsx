import { useState, useEffect } from "react";
import WelcomeScreen from "./components/welcomeScreen";
import QuizScreen from "./components/quizScreen";
import ResultScreen from "./components/resultScreen";
import questionsData from "./data/questions.json";
import { addToLeaderboard } from "./utils/indexedDB";

function App() {
  const [gameState, setGameState] = useState("welcome"); // 'welcome', 'quiz', 'result'
  const [userName, setUserName] = useState("");
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(30);
  const [timeUp, setTimeUp] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answer, setAnswer] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (gameState === "quiz" && timer > 0 && !timeUp) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else if (timer === 0 && !timeUp && gameState === "quiz") {
      setTimeUp(true);
      setShowExplanation(true);
      setIsCorrect(false);
    }
  }, [timer, timeUp, gameState]);

  const startQuiz = (name) => {
    setUserName(name);
    setGameState("quiz");
    setScore(0);
    setQuestionIndex(0);
    setTimer(30);
    setTimeUp(false);
    setSelectedOption(null);
    setAnswer("");
    setShowExplanation(false);
    setIsCorrect(false);
  };

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
    const currentQuestion = questionsData[questionIndex];
    const isAnswerCorrect =
      currentQuestion.options[optionIndex] === currentQuestion.correctAnswer;

    setIsCorrect(isAnswerCorrect);
    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + 1);
    } else {
      setShowExplanation(true);
    }
  };

  const handleIntegerSubmit = (value) => {
    setAnswer(value);
    const currentQuestion = questionsData[questionIndex];
    const isAnswerCorrect = value === currentQuestion.correctAnswer;

    setIsCorrect(isAnswerCorrect);
    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + 1);
    } else {
      setShowExplanation(true);
    }
  };

  const handleNextQuestion = () => {
    if (questionIndex < questionsData.length - 1) {
      setQuestionIndex((prevIndex) => prevIndex + 1);
      setTimer(30);
      setTimeUp(false);
      setSelectedOption(null);
      setAnswer("");
      setShowExplanation(false);
      setIsCorrect(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    // Save to leaderboard before changing state
    await addToLeaderboard({
      name: userName,
      score: score,
      totalQuestions: questionsData.length,
    });

    setGameState("result");
  };

  const toggleExplanation = () => {
    setShowExplanation((prev) => !prev);
  };

  const restartQuiz = () => {
    setGameState("welcome");
    setUserName("");
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg overflow-hidden">
        {gameState === "welcome" && <WelcomeScreen onStart={startQuiz} />}

        {gameState === "quiz" && (
          <QuizScreen
            question={questionsData[questionIndex]}
            timer={timer}
            timeUp={timeUp}
            questionNumber={questionIndex + 1}
            totalQuestions={questionsData.length}
            onOptionSelect={handleOptionSelect}
            onIntegerSubmit={handleIntegerSubmit}
            onNextQuestion={handleNextQuestion}
            selectedOption={selectedOption}
            answer={answer}
            showExplanation={showExplanation}
            toggleExplanation={toggleExplanation}
            isCorrect={isCorrect}
          />
        )}

        {gameState === "result" && (
          <ResultScreen
            userName={userName}
            score={score}
            totalQuestions={questionsData.length}
            onRestart={restartQuiz}
          />
        )}
      </div>
    </div>
  );
}

export default App;
