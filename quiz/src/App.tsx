import React, { useState } from 'react';
import { Difficulty, fetchQuizQuestions, QuestionState } from './API';

import QuestionCard from './components/QuestionCard';
import { GlobalStyle, Wrapper } from './App.style'

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string
}

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY));
  console.log(questions);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore(prev => prev + 1);

      const answerObjet = {
        question: questions[number].question,
        answer, correct,
        correctAnswer: questions[number].correct_answer
      };
      setUserAnswers((prev) => [...prev, answerObjet]);
    }
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  }

  return (
    <div>
      <GlobalStyle />
      <Wrapper>
        <h1>Quiz</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className='start' onClick={startTrivia}>Start</button>) : null}
        {!gameOver ? <p className='score'>Score: {score}</p> : null}
        {loading && <p>Loading Questions</p>}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer} />
        )}
        {!loading && !gameOver && userAnswers.length == number + 1 && userAnswers.length != TOTAL_QUESTIONS &&
          (<button className='next' onClick={nextQuestion}>Next Question</button>)}
      </Wrapper>
    </div >
  );
}

export default App;
