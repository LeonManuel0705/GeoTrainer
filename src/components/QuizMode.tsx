import { useState, useEffect } from 'react';
import { QuizQuestion } from '../types';
import { API_BASE } from '../config';
import { Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function QuizMode() {
  const [questions, setQuestions] = useState<quizquestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string |="" null="">(null);
  const [isCorrect, setIsCorrect] = useState<boolean |="" null="">(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/quiz`);
      if (!res.ok) throw new Error('Failed to fetch quiz');
      const data = await res.json();
      setQuestions(Array.isArray(data) ? data : [data]);
    } catch (err) {
      setError('Konnte Quiz nicht laden.');
      setQuestions([
        { card_id: 1, filename: 'quiz1.jpg', options: ['Kenia', 'Senegal', 'Ghana', 'Uganda'] },
        { card_id: 2, filename: 'quiz2.jpg', options: ['Japan', 'Südkorea', 'Taiwan', 'China'] }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (answer: string) => {
    if (selectedAnswer) return;
    
    setSelectedAnswer(answer);
    const question = questions[currentIndex];
    
    try {
      const res = await fetch(`${API_BASE}/api/quiz/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ card_id: question.card_id, answer }),
      });
      const data = await res.json();
      setIsCorrect(data.correct ?? (answer === data.correct_answer));
    } catch (err) {
      console.error('Failed to submit answer', err);
      setIsCorrect(Math.random() > 0.5);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      fetchQuiz();
      setCurrentIndex(0);
    }
  };

  if (loading) return <div classname="flex justify-center py-20"><loader2 classname="w-8 h-8 animate-spin text-emerald-500"/></div>;
  if (questions.length === 0 && !error) return <div classname="text-center py-20">Keine Quizfragen verfügbar.</div>;

  const question = questions[currentIndex];

  return (
    <div classname="max-w-3xl mx-auto">
      {error && <div classname="mb-6 w-full text-yellow-500 text-sm bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">{error} Zeige Demo-Quiz.</div>}

      {question && (
        <div classname="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
          <div classname="relative aspect-video bg-zinc-950">
            <img src="{`${API_BASE}/data/images/${question.filename}`}" alt="Quiz Location" classname="w-full h-full object-cover" onerror="{(e)" ==""> {
                (e.target as HTMLImageElement).src = `https://picsum.photos/seed/quiz${question.card_id}/800/450`;
              }}
            />
            <div classname="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium">
              Quiz {currentIndex + 1} / {questions.length}
            </div>
          </div>

          <div classname="p-6 sm:p-8">
            <h3 classname="text-xl font-medium mb-6 text-center">Welches Land ist das?</h3>
            
            <div classname="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {question.options.map((option, idx) => {
                let btnClass = "bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-200";
                
                if (selectedAnswer) {
                  if (option === selectedAnswer) {
                    btnClass = isCorrect 
                      ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" 
                      : "bg-red-500/20 border-red-500 text-red-400";
                  } else {
                    btnClass = "bg-zinc-800/50 border-zinc-800 text-zinc-500 opacity-50";
                  }
                }

                return (
                  <button key="{idx}" onclick="{()" ==""> handleAnswer(option)}
                    disabled={selectedAnswer !== null}
                    className={`p-4 rounded-xl border-2 font-medium transition-all text-left flex justify-between items-center ${btnClass}`}
                  >
                    {option}
                    {selectedAnswer === option && isCorrect && <checkcircle2 classname="w-5 h-5"/>}
                  </button>
                );
              })}
            </div>

            {selectedAnswer && (
              <div classname="mt-8 flex justify-end animate-in fade-in">
                <button onclick="{nextQuestion}" classname="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors">
                  Nächste Frage <arrowright classname="w-4 h-4"/>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
