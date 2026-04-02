import { useState, useEffect } from 'react';
import { Card } from '../types';
import { API_BASE } from '../config';
import { Loader2, CheckCircle2 } from 'lucide-react';

export default function FlashcardMode() {
  const [cards, setCards] = useState<card[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/cards/due`);
      if (!res.ok) throw new Error('Failed to fetch cards');
      const data = await res.json();
      setCards(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Konnte keine Karten laden. Stelle sicher, dass das Backend auf localhost:8000 läuft.');
      setCards([
        { id: 1, filename: 'demo1.jpg', country: 'Senegal', region: 'Dakar (Rifts in sky)' },
        { id: 2, filename: 'demo2.jpg', country: 'Japan', region: 'Low camera, yellow plates' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleRating = async (rating: number) => {
    const card = cards[currentIndex];
    try {
      await fetch(`${API_BASE}/api/cards/${card.id}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating }),
      });
    } catch (err) {
      console.error('Failed to submit rating', err);
    }

    setShowAnswer(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      fetchCards();
      setCurrentIndex(0);
    }
  };

  if (loading) return <div classname="flex justify-center py-20"><loader2 classname="w-8 h-8 animate-spin text-emerald-500"/></div>;
  if (cards.length === 0 && !error) return (
    <div classname="text-center py-20 flex flex-col items-center">
      <checkcircle2 classname="w-16 h-16 text-emerald-500 mb-4"/>
      <h2 classname="text-2xl font-bold mb-2">Alles erledigt!</h2>
      <p classname="text-zinc-400">Du hast alle fälligen Karten für heute gelernt.</p>
      <button onclick="{fetchCards}" classname="mt-6 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">Erneut prüfen</button>
    </div>
  );

  const card = cards[currentIndex];

  return (
    <div classname="max-w-3xl mx-auto flex flex-col items-center">
      {error && <div classname="mb-6 w-full text-yellow-500 text-sm bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">{error} Zeige Demo-Karten.</div>}
      
      {card && (
        <div classname="w-full bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
          <div classname="relative aspect-video bg-zinc-950">
            <img src="{`${API_BASE}/data/images/${card.filename}`}" alt="Location" classname="w-full h-full object-cover" onerror="{(e)" ==""> {
                (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${card.country}/800/450`;
              }}
            />
            <div classname="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium">
              {currentIndex + 1} / {cards.length}
            </div>
          </div>

          <div classname="p-6 sm:p-8 flex flex-col items-center min-h-[200px] justify-center text-center">
            {!showAnswer ? (
              <button onclick="{()" ==""> setShowAnswer(true)}
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-emerald-900/20"
              >
                Antwort anzeigen
              </button>
            ) : (
              <div classname="w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
                <h2 classname="text-3xl font-bold mb-2">{card.country}</h2>
                {card.region && <p classname="text-zinc-400 mb-6">{card.region}</p>}
                
                <div classname="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mt-8">
                  <ratingbutton rating="{1}" label="Nochmal (1)" color="bg-red-500/10 text-red-400 hover:bg-red-500/20 border-red-500/20" onclick="{()" ==""> handleRating(1)} />
                  <ratingbutton rating="{2}" label="Schwer (2)" color="bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 border-orange-500/20" onclick="{()" ==""> handleRating(2)} />
                  <ratingbutton rating="{3}" label="Gut (3)" color="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/20" onclick="{()" ==""> handleRating(3)} />
                  <ratingbutton rating="{4}" label="Einfach (4)" color="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border-blue-500/20" onclick="{()" ==""> handleRating(4)} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function RatingButton({ label, color, onClick }: { rating: number, label: string, color: string, onClick: () => void }) {
  return (
    <button onclick="{onClick}" classname="{`py-3" px-2="" rounded-xl="" border="" font-medium="" transition-all="" ${color}`}="">
      {label}
    </button>
  );
}
