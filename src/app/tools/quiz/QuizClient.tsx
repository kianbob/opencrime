'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

type City = {
  slug: string; city: string; state: string; population: number;
  violentRate: number; murderRate: number; propertyRate: number;
};

type Question = {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateQuestions(cities: City[]): Question[] {
  const sorted = [...cities].sort((a, b) => b.violentRate - a.violentRate);
  const safest = [...cities].sort((a, b) => a.violentRate - b.violentRate);
  const questions: Question[] = [];

  // Q1: Which city has a higher violent crime rate?
  const high = sorted[Math.floor(Math.random() * 10)];
  const low = safest[Math.floor(Math.random() * 10)];
  if (high && low) {
    questions.push({
      question: `Which city has a higher violent crime rate?`,
      options: [high.city + ', ' + high.state, low.city + ', ' + low.state],
      correct: 0,
      explanation: `${high.city} has a violent crime rate of ${high.violentRate.toFixed(0)}/100K vs ${low.city}'s ${low.violentRate.toFixed(0)}/100K.`,
    });
  }

  // Q2: National average
  questions.push({
    question: 'What is the approximate US violent crime rate per 100,000 people (2024)?',
    options: ['About 150', 'About 360', 'About 600', 'About 900'],
    correct: 1,
    explanation: 'The 2024 US violent crime rate is approximately 359 per 100,000 — down 53% from the 1991 peak of 758.',
  });

  // Q3: Peak year
  questions.push({
    question: 'In which year did violent crime in America peak?',
    options: ['1981', '1991', '2001', '2020'],
    correct: 1,
    explanation: 'Violent crime peaked in 1991 at 758.2 per 100K during the crack cocaine epidemic, and has generally declined since.',
  });

  // Q4: Murder rate comparison
  questions.push({
    question: 'How does the US murder rate compare to Japan?',
    options: ['About 2x higher', 'About 5x higher', 'About 20x higher', 'About the same'],
    correct: 2,
    explanation: 'The US murder rate (~6.4/100K) is roughly 21 times higher than Japan\'s (~0.3/100K).',
  });

  // Q5: Property vs violent
  questions.push({
    question: 'For every violent crime in the US, approximately how many property crimes occur?',
    options: ['About 2', 'About 5', 'About 10', 'About 20'],
    correct: 1,
    explanation: 'There are roughly 5 property crimes for every violent crime — about 6.7 million property crimes vs 1.2 million violent crimes in 2024.',
  });

  // Q6: Unreported crime
  questions.push({
    question: 'According to the Bureau of Justice Statistics, what percentage of violent crimes go unreported to police?',
    options: ['About 20%', 'About 40%', 'About 60%', 'About 80%'],
    correct: 2,
    explanation: 'The NCVS estimates roughly 60% of violent crimes and 67% of property crimes go unreported to police.',
  });

  // Q7: Cost of murder
  questions.push({
    question: 'What is the estimated total societal cost of one murder (including lost productivity, criminal justice, etc.)?',
    options: ['About $500,000', 'About $2 million', 'About $10 million', 'About $50 million'],
    correct: 2,
    explanation: 'The DOJ estimates one murder costs society approximately $9.9 million when including medical costs, criminal justice, lost productivity, and intangible costs.',
  });

  // Q8: Incarceration
  questions.push({
    question: 'The US has what percentage of the world\'s prisoners while having 4% of its population?',
    options: ['About 8%', 'About 15%', 'About 20%', 'About 30%'],
    correct: 2,
    explanation: 'The US holds roughly 20% of the world\'s prisoners (about 1.8 million) despite having only 4.2% of the world\'s population.',
  });

  // Q9: Safest large city
  if (safest.length > 0) {
    const top3safe = safest.filter(c => c.population >= 200000).slice(0, 4);
    if (top3safe.length >= 2) {
      const answer = top3safe[0];
      const opts = shuffle([answer, ...shuffle(sorted.filter(c => c.population >= 200000).slice(0, 3))].slice(0, 4));
      questions.push({
        question: `Which of these large cities (200K+) has the LOWEST violent crime rate?`,
        options: opts.map(c => `${c.city}, ${c.state}`),
        correct: opts.indexOf(answer),
        explanation: `${answer.city} has a violent crime rate of just ${answer.violentRate.toFixed(0)}/100K.`,
      });
    }
  }

  // Q10: Crime trend
  questions.push({
    question: 'Since the 1990s peak, violent crime in America has:',
    options: ['Stayed about the same', 'Dropped about 25%', 'Dropped about 50%', 'Doubled'],
    correct: 2,
    explanation: 'Violent crime has dropped approximately 53% from the 1991 peak — one of the largest sustained declines in US history.',
  });

  return questions.slice(0, 10);
}

export default function QuizClient({ cities }: { cities: City[] }) {
  const questions = useMemo(() => generateQuestions(cities), [cities]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const q = questions[current];

  function handleAnswer(idx: number) {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === q.correct) setScore(s => s + 1);
  }

  function next() {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    const grade = pct >= 90 ? 'A+' : pct >= 80 ? 'A' : pct >= 70 ? 'B' : pct >= 60 ? 'C' : pct >= 50 ? 'D' : 'F';
    const msg = pct >= 80 ? 'Crime data expert! 🎓' : pct >= 60 ? 'Solid knowledge! 📊' : pct >= 40 ? 'Room to learn! 📚' : 'Time to explore OpenCrime! 🔍';

    return (
      <div className="text-center py-10">
        <div className="text-6xl mb-4">{pct >= 70 ? '🏆' : pct >= 40 ? '📊' : '📚'}</div>
        <h2 className="font-heading text-3xl font-bold mb-2">Quiz Complete!</h2>
        <p className="text-5xl font-bold text-[#1e3a5f] mb-2">{score}/{questions.length}</p>
        <p className="text-xl text-gray-600 mb-2">Grade: <span className="font-bold">{grade}</span></p>
        <p className="text-lg mb-6">{msg}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={() => { setCurrent(0); setScore(0); setSelected(null); setAnswered(false); setFinished(false); }}
            className="px-6 py-3 bg-[#1e3a5f] text-white rounded-xl font-medium hover:bg-[#2a5a8f]">
            Try Again
          </button>
          <Link href="/dashboard" className="px-6 py-3 border border-[#1e3a5f] text-[#1e3a5f] rounded-xl font-medium hover:bg-blue-50">
            Explore the Data →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm text-gray-500">Question {current + 1} of {questions.length}</span>
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-[#1e3a5f] transition-all" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
        </div>
        <span className="text-sm font-bold">{score} pts</span>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 mb-4">
        <h2 className="text-xl font-bold mb-6">{q.question}</h2>
        <div className="space-y-3">
          {q.options.map((opt, i) => {
            let cls = 'w-full text-left px-5 py-4 rounded-xl border-2 font-medium transition ';
            if (!answered) {
              cls += 'border-gray-200 hover:border-[#1e3a5f] hover:bg-blue-50';
            } else if (i === q.correct) {
              cls += 'border-green-500 bg-green-50 text-green-800';
            } else if (i === selected) {
              cls += 'border-red-500 bg-red-50 text-red-800';
            } else {
              cls += 'border-gray-200 opacity-50';
            }
            return (
              <button key={i} className={cls} onClick={() => handleAnswer(i)}>
                <span className="inline-block w-7 h-7 rounded-full bg-gray-100 text-center leading-7 text-sm mr-3">
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation */}
      {answered && (
        <div className={`rounded-xl p-4 mb-4 ${selected === q.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <p className="font-bold mb-1">{selected === q.correct ? '✅ Correct!' : '❌ Not quite!'}</p>
          <p className="text-sm">{q.explanation}</p>
        </div>
      )}

      {answered && (
        <button onClick={next} className="w-full py-3 bg-[#1e3a5f] text-white rounded-xl font-medium hover:bg-[#2a5a8f]">
          {current + 1 >= questions.length ? 'See Results' : 'Next Question →'}
        </button>
      )}
    </div>
  );
}
