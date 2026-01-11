import React, { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle } from 'lucide-react';

const PYQSection = ({ pyqs }) => {
  const [answers, setAnswers] = useState({});
  const [showSolutions, setShowSolutions] = useState({});

  if (!pyqs || pyqs.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <HelpCircle size={48} className="mx-auto mb-3 opacity-50" />
        <p className="text-lg">No practice questions available for this video</p>
      </div>
    );
  }

  const handleAnswerSelect = (pyqId, optionIndex) => {
    setAnswers(prev => ({ ...prev, [pyqId]: optionIndex }));
  };

  const handleCheckAnswer = (pyqId) => {
    setShowSolutions(prev => ({ ...prev, [pyqId]: true }));
  };

  const handleReset = (pyqId) => {
    setAnswers(prev => {
      const newAnswers = { ...prev };
      delete newAnswers[pyqId];
      return newAnswers;
    });
    setShowSolutions(prev => {
      const newSolutions = { ...prev };
      delete newSolutions[pyqId];
      return newSolutions;
    });
  };

  return (
    <div className="space-y-6">
      {pyqs.map((pyq, index) => {
        const selectedAnswer = answers[pyq.id];
        const isAnswered = selectedAnswer !== undefined;
        const isCorrect = selectedAnswer === pyq.correctIndex;
        const showSolution = showSolutions[pyq.id];

        return (
          <div key={pyq.id} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-start gap-3 mb-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm">
                {index + 1}
              </span>
              <p className="text-gray-800 font-medium flex-1 leading-relaxed">{pyq.question}</p>
            </div>

            <div className="space-y-3 ml-11">
              {pyq.options.map((option, optionIndex) => {
                const isSelected = selectedAnswer === optionIndex;
                const isCorrectOption = optionIndex === pyq.correctIndex;
                
                let optionClass = "border-2 border-gray-200 hover:border-blue-300";
                if (showSolution) {
                  if (isCorrectOption) {
                    optionClass = "border-2 border-green-500 bg-green-50";
                  } else if (isSelected && !isCorrect) {
                    optionClass = "border-2 border-red-500 bg-red-50";
                  }
                } else if (isSelected) {
                  optionClass = "border-2 border-blue-500 bg-blue-50";
                }

                return (
                  <button
                    key={optionIndex}
                    onClick={() => !showSolution && handleAnswerSelect(pyq.id, optionIndex)}
                    disabled={showSolution}
                    className={`w-full text-left p-4 rounded-lg transition-all ${optionClass} ${
                      showSolution ? 'cursor-default' : 'cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-6 h-6 border-2 rounded-full flex items-center justify-center text-sm font-semibold">
                        {String.fromCharCode(65 + optionIndex)}
                      </span>
                      <span className="flex-1">{option}</span>
                      {showSolution && isCorrectOption && (
                        <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                      )}
                      {showSolution && isSelected && !isCorrect && (
                        <XCircle size={20} className="text-red-600 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 ml-11 flex gap-3">
              {!showSolution ? (
                <button
                  onClick={() => handleCheckAnswer(pyq.id)}
                  disabled={!isAnswered}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    isAnswered
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Check Answer
                </button>
              ) : (
                <button
                  onClick={() => handleReset(pyq.id)}
                  className="px-6 py-2 rounded-lg font-medium bg-gray-600 text-white hover:bg-gray-700 transition-colors"
                >
                  Try Again
                </button>
              )}
            </div>

            {showSolution && (
              <div className={`mt-4 ml-11 p-4 rounded-lg ${
                isCorrect ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'
              }`}>
                <p className={`font-semibold mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                </p>
                {pyq.solution && (
                  <div>
                    <p className="font-medium text-gray-700 mb-1">Explanation:</p>
                    <p className="text-gray-600 leading-relaxed">{pyq.solution}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PYQSection;