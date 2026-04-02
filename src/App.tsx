import { useState, ReactNode } from 'react';
import { Map, Brain, BookOpen, BarChart3 } from 'lucide-react';
import FlashcardMode from './components/FlashcardMode';
import QuizMode from './components/QuizMode';
import LessonsMode from './components/LessonsMode';
import StatsView from './components/StatsView';

export default function App() {
  const [activeTab, setActiveTab] = useState('flashcards');

  return (
    <div classname="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500/30">
      <nav classname="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
        <div classname="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div classname="flex items-center justify-between h-16">
            <div classname="flex items-center gap-2">
              <map classname="w-6 h-6 text-emerald-500"/>
              <span classname="font-bold text-xl tracking-tight">GeoTrainer</span>
            </div>
            <div classname="flex space-x-1">
              <navbutton active="{activeTab" =="=" 'flashcards'}="" onclick="{()" ==""> setActiveTab('flashcards')} icon={<brain classname="w-4 h-4"/>} label="Flashcards" />
              <navbutton active="{activeTab" =="=" 'quiz'}="" onclick="{()" ==""> setActiveTab('quiz')} icon={<map classname="w-4 h-4"/>} label="Quiz" />
              <navbutton active="{activeTab" =="=" 'lessons'}="" onclick="{()" ==""> setActiveTab('lessons')} icon={<bookopen classname="w-4 h-4"/>} label="Lessons" />
              <navbutton active="{activeTab" =="=" 'stats'}="" onclick="{()" ==""> setActiveTab('stats')} icon={<barchart3 classname="w-4 h-4"/>} label="Stats" />
            </div>
          </div>
        </div>
      </nav>

      <main classname="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'flashcards' && <flashcardmode/>}
        {activeTab === 'quiz' && <quizmode/>}
        {activeTab === 'lessons' && <lessonsmode/>}
        {activeTab === 'stats' && <statsview/>}
      </main>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: ReactNode, label: string }) {
  return (
    <button onclick="{onClick}" classname="{`flex" items-center="" gap-2="" px-3="" py-2="" rounded-md="" text-sm="" font-medium="" transition-colors="" ${="" active="" ?="" 'bg-zinc-800="" text-emerald-400'="" :="" 'text-zinc-400="" hover:bg-zinc-800="" 50="" hover:text-zinc-200'="" }`}="">
      {icon}
      <span classname="hidden sm:inline">{label}</span>
    </button>
  );
}
