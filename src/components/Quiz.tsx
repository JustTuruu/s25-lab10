import React, { useState } from 'react';
import './Quiz.css';
import QuizCore from '../core/QuizCore';

const Quiz: React.FC = () => {
  const [quiz, setQuiz] = useState(new QuizCore()); // Persist QuizCore instance
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState(quiz.getCurrentQuestion());

  const handleOptionSelect = (option: string): void => {
    setSelectedAnswer(option);
  };

  const handleButtonClick = (): void => {
    if (selectedAnswer) {
      quiz.answerQuestion(selectedAnswer); // Process the answer
      setScore(quiz.getScore()); // Update score
      quiz.nextQuestion(); // Move to the next question
      setCurrentQuestion(quiz.getCurrentQuestion()); // Fetch new question
      setSelectedAnswer(null); // Reset selected answer
    }
  };

  const handlePlayAgain = (): void => {
    const newQuiz = new QuizCore(); // Create a new instance
    setQuiz(newQuiz);
    setScore(0);
    setSelectedAnswer(null);
    setCurrentQuestion(newQuiz.getCurrentQuestion());
  };

  if (!currentQuestion) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {score} out of {quiz.getTotalQuestions()}</p>
        <button onClick={handlePlayAgain}>Play Again</button> {/* Play Again Button */}
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>

      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={`option ${selectedAnswer === option ? 'selected' : ''}`}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick}>Next Question</button>
    </div>
  );
};

export default Quiz;
