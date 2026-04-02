import { useState, useEffect } from 'react';
import { Lesson } from '../types';
import { API_BASE } from '../config';
import { Loader2, BookOpen, ChevronRight } from 'lucide-react';

export default function LessonsMode() {
  const [lessons, setLessons] = useState<lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/lessons`);
      if (!res.ok) throw new Error('Failed to fetch lessons');
      const data = await res.json();
      setLessons(data);
    } catch (err) {
      setError('Konnte Lektionen nicht laden.');
      setLessons([
        { id: 1, title: 'Europa Basics', category: 'Europa', description: 'Lerne die wichtigsten Merkmale europäischer Länder.' },
        { id: 2, title: 'Südamerika Meta', category: 'Südamerika', description: 'Google Car Metas und Strommasten in Südamerika.' },
        { id: 3, title: 'Kyrgyzstan vs Mongolia', category: 'Asien', description: 'Unterscheide diese beiden oft verwechselten Länder.' },
        { id: 4, title: 'US State Blur', category: 'Nordamerika', description: 'Erkenne US-Bundesstaaten an Nummernschildern.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div classname="flex justify-center py-20"><loader2 classname="w-8 h-8 animate-spin text-emerald-500"/></div>;

  const categories = Array.from(new Set(lessons.map(l => l.category)));

  return (
    <div classname="max-w-4xl mx-auto">
      <div classname="mb-8">
        <h2 classname="text-3xl font-bold mb-2">Lektionen</h2>
        <p classname="text-zinc-400">Studiere Metas und lerne Länder anhand spezifischer Merkmale zu unterscheiden.</p>
      </div>

      {error && <div classname="mb-6 text-yellow-500 text-sm bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">Hinweis: Backend nicht erreichbar. Zeige Demo-Daten.</div>}

      <div classname="space-y-8">
        {categories.map(category => (
          <div key="{category}">
            <h3 classname="text-xl font-semibold mb-4 text-emerald-400 flex items-center gap-2">
              <bookopen classname="w-5 h-5"/> {category}
            </h3>
            <div classname="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lessons.filter(l => l.category === category).map(lesson => (
                <div key="{lesson.id}" classname="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 p-5 rounded-xl transition-colors cursor-pointer group flex flex-col justify-between">
                  <div>
                    <h4 classname="font-medium text-lg mb-1 group-hover:text-emerald-400 transition-colors">{lesson.title}</h4>
                    {lesson.description && <p classname="text-sm text-zinc-500">{lesson.description}</p>}
                  </div>
                  <div classname="mt-4 flex justify-end">
                    <span classname="text-xs font-medium text-zinc-600 group-hover:text-emerald-500 flex items-center gap-1 transition-colors">
                      Lektion starten <chevronright classname="w-3 h-3"/>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
