"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, HelpCircle, Award, RotateCcw, Sparkles } from "lucide-react";
import { playSound } from "@/lib/wasteDatabase";

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    question: "Where should an oil-stained, greasy pizza box be placed?",
    options: [
      "🔵 Clean Paper Recycling Bin",
      "🟢 Compost / Organic Waste or General Trash",
      "🟣 Special E-Waste Collection Bin",
      "🔴 Battery Drop-off Bin",
    ],
    correctIndex: 1,
    explanation:
      "Oil & grease contaminate paper pulp fibers during paper recycling, ruining clean paper batches! Put greasy cardboard in compost or trash.",
  },
  {
    question: "What should you NEVER do with dead AA or lithium batteries?",
    options: [
      "Store them in a dry plastic container",
      "Tape battery terminals before drop-off",
      "❌ Throw them into regular household trash bins",
      "Take them to a supermarket battery collection point",
    ],
    correctIndex: 2,
    explanation:
      "Batteries contain toxic heavy metals and acids that leak into soil or ignite dangerous chemical fires when compacted inside garbage trucks.",
  },
  {
    question: "Why does recycling aluminum cans save 95% energy?",
    options: [
      "Because aluminum melts at room temperature",
      "Because refining new metal from raw bauxite ore requires huge electricity, while remelting cans takes very little",
      "Because cans are made from paper fibers",
      "Because aluminum naturally dissolves in rainwater",
    ],
    correctIndex: 1,
    explanation:
      "Remelting recycled aluminum requires 95% less energy than mining and smelting raw bauxite ore, making aluminum an infinitely recyclable metal!",
  },
  {
    question: "Which plastic resin code is microwave-safe for reheating food?",
    options: [
      "♳ #1 PET (Water bottles)",
      "♵ #3 PVC (Pipes & vinyl)",
      "♷ #5 PP (Polypropylene food containers)",
      "♸ #6 PS (Styrofoam cups)",
    ],
    correctIndex: 2,
    explanation:
      "Polypropylene (#5 PP) has a high melting point and chemical stability, making it food-grade and microwave-safe. Plastics #1, #3, and #6 should never be heated.",
  },
  {
    question: "What essential step must you take before recycling an old smartphone?",
    options: [
      "Soak it in soapy water",
      "Back up data, perform a factory wipe, and remove SIM/SD cards",
      "Puncture the lithium battery",
      "Toss it into the plastic bottle recycling bin",
    ],
    correctIndex: 1,
    explanation:
      "Always back up your memories, perform a full factory data wipe to protect privacy, remove SIM/SD cards, and take it to an authorized e-waste kiosk.",
  },
];

interface EcoQuizProps {
  onQuizComplete?: () => void;
}

export default function EcoQuiz({ onQuizComplete }: EcoQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    const isCorrect = index === QUIZ_QUESTIONS[currentQuestion].correctIndex;
    if (isCorrect) {
      playSound("success");
      setScore((prev) => prev + 1);
    } else {
      playSound("click");
    }
  };

  const handleNext = () => {
    playSound("click");
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
      playSound("success");
      onQuizComplete?.();
    }
  };

  const handleRestart = () => {
    playSound("click");
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">EcoSort Recycling Knowledge Quiz</h3>
            <p className="text-slate-400 text-xs">Test your waste sorting & eco-sustainability IQ</p>
          </div>
        </div>

        {!isFinished && (
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-full border border-cyan-800/50">
            Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
          </span>
        )}
      </div>

      {!isFinished ? (
        <div className="space-y-6">
          <h4 className="text-base sm:text-lg font-semibold text-white">
            {QUIZ_QUESTIONS[currentQuestion].question}
          </h4>

          <div className="space-y-3">
            {QUIZ_QUESTIONS[currentQuestion].options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === QUIZ_QUESTIONS[currentQuestion].correctIndex;
              let btnClass = "bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700";

              if (selectedOption !== null) {
                if (isCorrect) {
                  btnClass = "bg-emerald-950/60 border-emerald-500/60 text-emerald-300 font-semibold";
                } else if (isSelected) {
                  btnClass = "bg-rose-950/60 border-rose-500/60 text-rose-300";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between ${btnClass}`}
                >
                  <span>{option}</span>
                  {selectedOption !== null && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  )}
                  {selectedOption !== null && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {selectedOption !== null && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-3 animate-in fade-in">
              <p>
                <strong>Explanation:</strong> {QUIZ_QUESTIONS[currentQuestion].explanation}
              </p>
              <button
                onClick={handleNext}
                className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md"
              >
                {currentQuestion < QUIZ_QUESTIONS.length - 1 ? "Next Question →" : "See Final Score"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Award className="w-8 h-8" />
          </div>
          <h4 className="text-2xl font-extrabold text-white">Quiz Completed!</h4>
          <p className="text-slate-300 text-sm">
            You scored <strong className="text-amber-400 text-lg">{score}</strong> out of{" "}
            <strong>{QUIZ_QUESTIONS.length}</strong>!
          </p>
          <p className="text-xs text-emerald-400 font-semibold">
            🎉 +50 Eco Points earned! Achievement unlocked in your Eco Badges tab.
          </p>

          <button
            onClick={handleRestart}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-lg"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Quiz</span>
          </button>
        </div>
      )}
    </div>
  );
}
