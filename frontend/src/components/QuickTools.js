import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Clock, 
  Target, 
  CheckCircle, 
  Play, 
  Calendar 
} from 'lucide-react';

const dailyQuizQuestions = [
  {
    id: 1,
    question: "Which of the following is the capital of India?",
    options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
    correctAnswer: "Delhi"
  },
  {
    id: 2,
    question: "Who is the current President of India?",
    options: ["Narendra Modi", "Droupadi Murmu", "Ram Nath Kovind", "Pranab Mukherjee"],
    correctAnswer: "Droupadi Murmu"
  }
];

const QuickTools = () => {
  const [dailyQuiz, setDailyQuiz] = useState({
    currentQuestion: 0,
    score: 0,
    selectedAnswer: null,
    quizCompleted: false
  });

  const [examCountdown, setExamCountdown] = useState({
    upcomingExam: "UPSC Prelims",
    date: "15 June 2025"
  });

  const handleQuizAnswer = (selectedOption) => {
    const currentQuestion = dailyQuizQuestions[dailyQuiz.currentQuestion];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    setDailyQuiz(prev => ({
      ...prev,
      selectedAnswer: selectedOption,
      score: isCorrect ? prev.score + 1 : prev.score
    }));

    // Move to next question or complete quiz
    setTimeout(() => {
      if (dailyQuiz.currentQuestion < dailyQuizQuestions.length - 1) {
        setDailyQuiz(prev => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1,
          selectedAnswer: null
        }));
      } else {
        setDailyQuiz(prev => ({
          ...prev,
          quizCompleted: true
        }));
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setDailyQuiz({
      currentQuestion: 0,
      score: 0,
      selectedAnswer: null,
      quizCompleted: false
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <BookOpen className="mr-3 text-indigo-600" />
        Quick Study Tools
      </h2>

      {/* Daily Quiz */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <CheckCircle className="mr-2 text-green-600" />
            Daily Quiz
          </h3>
          {!dailyQuiz.quizCompleted && (
            <span className="text-sm text-gray-600">
              Question {dailyQuiz.currentQuestion + 1} of {dailyQuizQuestions.length}
            </span>
          )}
        </div>

        {!dailyQuiz.quizCompleted ? (
          <div>
            <p className="text-gray-700 mb-4">
              {dailyQuizQuestions[dailyQuiz.currentQuestion].question}
            </p>
            <div className="space-y-2">
              {dailyQuizQuestions[dailyQuiz.currentQuestion].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleQuizAnswer(option)}
                  className={`w-full text-left p-3 rounded-lg transition ${
                    dailyQuiz.selectedAnswer === option
                      ? option === dailyQuizQuestions[dailyQuiz.currentQuestion].correctAnswer
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              Quiz Completed!
            </h4>
            <p className="text-gray-600 mb-4">
              Your Score: {dailyQuiz.score} / {dailyQuizQuestions.length}
            </p>
            <button
              onClick={resetQuiz}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Retake Quiz
            </button>
          </div>
        )}
      </div>

      {/* Exam Countdown */}
      <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Calendar className="mr-3 text-blue-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {examCountdown.upcomingExam}
            </h3>
            <p className="text-sm text-gray-600">Exam Date: {examCountdown.date}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Clock className="mr-2 text-orange-600" />
          <span className="text-gray-700 font-medium">
            Countdown Feature Coming Soon
          </span>
        </div>
      </div>

      {/* Quick Mock Test */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Target className="mr-3 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-800">Quick Mock Test</h3>
          </div>
          <button 
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center"
            onClick={() => alert('Mock Test feature coming soon!')}
          >
            <Play className="mr-2 h-4 w-4" />
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickTools;
