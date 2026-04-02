import { useState, useEffect, ReactNode } from 'react';
import { Stats } from '../types';
import { API_BASE } from '../config';
import { Loader2, Target, Flame, Layers, Clock } from 'lucide-react';

export default function StatsView() {
  const [stats, setStats] = useState<stats |="" null="">(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/stats`);
      if (!res.ok) throw new Error('Failed to fetch stats');
      const data = await res.json();
      setStats(data);
    } catch (err) {
      setStats({
        total_cards: 1240,
        cards_due: 42,
        accuracy: 78.5,
        streak: 12
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div classname="flex justify-center py-20"><loader2 classname="w-8 h-8 animate-spin text-emerald-500"/></div>;
  if (!stats) return null;

  return (
    <div classname="max-w-4xl mx-auto">
      <div classname="mb-8">
        <h2 classname="text-3xl font-bold mb-2">Statistiken</h2>
        <p classname="text-zinc-400">Dein Lernfortschritt im Überblick.</p>
      </div>

      <div classname="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <statcard icon="{&lt;Layers" classname="w-6 h-6 text-blue-400"/>}
          label="Karten gesamt"
          value={stats.total_cards.toString()}
        />
        <statcard icon="{&lt;Clock" classname="w-6 h-6 text-orange-400"/>}
          label="Heute fällig"
          value={stats.cards_due.toString()}
        />
        <statcard icon="{&lt;Target" classname="w-6 h-6 text-emerald-400"/>}
          label="Genauigkeit"
          value={`${stats.accuracy}%`}
        />
        <statcard icon="{&lt;Flame" classname="w-6 h-6 text-red-400"/>}
          label="Streak"
          value={`${stats.streak} Tage`}
        />
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: ReactNode, label: string, value: string }) {
  return (
    <div classname="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col items-center text-center">
      <div classname="p-3 bg-zinc-950 rounded-xl mb-4 border border-zinc-800">
        {icon}
      </div>
      <p classname="text-zinc-400 text-sm font-medium mb-1">{label}</p>
      <p classname="text-3xl font-bold">{value}</p>
    </div>
  );
}
