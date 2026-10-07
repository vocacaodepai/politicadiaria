"use client";

import { useState } from "react";

export type QuizQuestion = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export function QuizWidget({ questions }: { questions: QuizQuestion[] }) {
  const [selected, setSelected] = useState<Record<number, number>>({});

  if (!questions || questions.length === 0) return null;

  const answeredCount = Object.keys(selected).length;
  const correctCount = Object.entries(selected).filter(
    ([qi, oi]) => questions[Number(qi)].answer === oi
  ).length;

  function choose(qIndex: number, oIndex: number) {
    setSelected((prev) => (prev[qIndex] !== undefined ? prev : { ...prev, [qIndex]: oIndex }));
  }

  return (
    <div className="mt-10 rounded-xl border border-border bg-surface p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">Teste o que você aprendeu</h2>
        {answeredCount === questions.length && (
          <span className="label-mono shrink-0 rounded-lg border border-accent/30 bg-accent/10 px-2.5 py-1 text-accent">
            {correctCount}/{questions.length} certas
          </span>
        )}
      </div>

      <div className="mt-5 space-y-6">
        {questions.map((q, qi) => {
          const chosen = selected[qi];
          const answered = chosen !== undefined;
          return (
            <div key={qi}>
              <p className="font-medium text-foreground">{q.question}</p>
              <div className="mt-3 space-y-2">
                {q.options.map((opt, oi) => {
                  const isCorrect = oi === q.answer;
                  const isChosen = chosen === oi;
                  let stateClasses = "border-border bg-background hover:border-accent/40";
                  if (answered && isCorrect) {
                    stateClasses = "border-success/60 bg-success/10";
                  } else if (answered && isChosen && !isCorrect) {
                    stateClasses = "border-danger/60 bg-danger/10";
                  }
                  return (
                    <button
                      key={oi}
                      type="button"
                      disabled={answered}
                      onClick={() => choose(qi, oi)}
                      className={`block w-full rounded-lg border px-4 py-2.5 text-left text-sm transition ${stateClasses} ${answered ? "cursor-default" : "cursor-pointer"}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {answered && (
                <p className="mt-2 text-sm leading-relaxed text-muted">{q.explanation}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
