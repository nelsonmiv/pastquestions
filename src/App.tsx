import React from "react";
import {
  RotateCcw,
  Mic,
  BookOpen,
  GraduationCap,
  CircleCheck,
  Flame,
  Star,
  Activity,
  User,
  Settings,
} from "lucide-react";
import AudioSettings from "./components/AudioSettings";
import PracticeStudio from "./components/PracticeStudio";
import ShadowStudio from "./components/ShadowStudio";
import GrammarHandbook from "./components/GrammarHandbook";
import { SpeechSettings } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = React.useState<"practice" | "shadow" | "guide">("practice");
  const [score, setScore] = React.useState(0);
  const [streak, setStreak] = React.useState(0);

  // Load state from local storage on mount (optional safe check)
  React.useEffect(() => {
    try {
      const storedScore = localStorage.getItem("quest_buddy_score");
      const storedStreak = localStorage.getItem("quest_buddy_streak");
      if (storedScore) setScore(parseInt(storedScore, 10));
      if (storedStreak) setStreak(parseInt(storedStreak, 10));
    } catch (e) {
      // silently absorb sandbox localstorage blockers
    }
  }, []);

  // Save to local storage on change
  React.useEffect(() => {
    try {
      localStorage.setItem("quest_buddy_score", score.toString());
      localStorage.setItem("quest_buddy_streak", streak.toString());
    } catch (e) {
      // safe fallbacks
    }
  }, [score, streak]);

  // Audio system state manager
  const [speechSettings, setSpeechSettings] = React.useState<SpeechSettings>({
    voice: "Kore",
    speed: 0.85, // Standard comfortable pace for A2 learning
    useGeminiTts: true,
  });

  return (
    <div className="min-h-screen w-full bg-[#020617] text-[#f1f5f9] flex flex-col font-sans selection:bg-indigo-500/30 overflow-x-hidden antialiased">
      {/* Sleek radial gradient overlay */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_0%_0%,#1e1b4b_0%,#020617_60%)] pointer-events-none z-0" />

      {/* Top Header Navigation */}
      <aside className="w-full bg-slate-950/80 border-b border-white/5 flex flex-row items-center justify-between px-6 py-4 z-10 relative backdrop-blur-md shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-2 rounded-xl shadow-lg border border-indigo-400/30 transform hover:rotate-6 transition-all duration-300 cursor-default">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-[#f1f5f9] tracking-tight font-display hidden sm:inline-block">Quest-Buddy</span>
        </div>

        {/* Buttons */}
        <nav className="flex flex-row gap-4 items-center" aria-label="Main Navigation">
          <button
            onClick={() => setActiveTab("practice")}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 cursor-pointer relative group ${
              activeTab === "practice"
                ? "bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                : "bg-white/3 text-indigo-450 hover:bg-white/5 border border-white/5 hover:text-white"
            }`}
            title="Reverse Questioning practice mode"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 border border-white/10 text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
              Reverse Qs
            </span>
          </button>

          <button
            onClick={() => setActiveTab("shadow")}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 cursor-pointer relative group ${
              activeTab === "shadow"
                ? "bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                : "bg-white/3 text-indigo-450 hover:bg-white/5 border border-white/5 hover:text-white"
            }`}
            title="Interactive Shadowing Lab"
          >
            <Mic className="w-4 h-4" />
            <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 border border-white/10 text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
              Shadowing Lab
            </span>
          </button>

          <button
            onClick={() => setActiveTab("guide")}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 cursor-pointer relative group ${
              activeTab === "guide"
                ? "bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                : "bg-white/3 text-indigo-450 hover:bg-white/5 border border-white/5 hover:text-white"
            }`}
            title="Grammar rules Cheat Sheet guide"
          >
            <BookOpen className="w-4 h-4" />
            <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 border border-white/10 text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
              Cheat Sheet
            </span>
          </button>
        </nav>

        {/* Profile icon */}
        <div className="flex items-center">
          <div className="w-10 h-10 bg-indigo-500/10 border border-white/5 rounded-2xl flex items-center justify-center text-slate-400 cursor-default">
            <User className="w-4 h-4" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col p-6 md:p-8 lg:p-10 z-10 max-w-5xl mx-auto w-full relative">
        
        {/* Header Console Sync */}
        <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <div className="logo-area">
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white font-display">
              Quest-Buddy <span className="text-indigo-400 font-medium">Console</span>
            </h1>
            <div className="text-slate-400 text-xs mt-1 font-medium select-none flex items-center gap-1.5 duration-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Simple Past & Past Continuous Mastery Matrix
            </div>
          </div>
          <div className="status-badge flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full font-bold text-[10px] tracking-wider uppercase w-fit select-none shrink-0 self-start sm:self-center">
            SYSTEM OPERATIONAL
          </div>
        </header>


        {/* Global Sound Settings panel */}
        <AudioSettings settings={speechSettings} onChange={setSpeechSettings} />

        {/* Dynamic active task rendering */}
        <div className="flex-1 relative">
          {activeTab === "practice" && (
            <PracticeStudio
              score={score}
              streak={streak}
              setScore={setScore}
              setStreak={setStreak}
              settings={speechSettings}
            />
          )}

          {activeTab === "shadow" && (
            <ShadowStudio score={score} setScore={setScore} settings={speechSettings} />
          )}

          {activeTab === "guide" && <GrammarHandbook />}
        </div>
      </main>
    </div>
  );
}
