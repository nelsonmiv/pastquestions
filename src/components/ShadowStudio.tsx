import React from "react";
import {
  Mic,
  MicOff,
  Volume2,
  Trophy,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Play,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ShadowPrompt, SpeechSettings } from "../types";
import { playSfx, speakPhrase, prefetchPhrase } from "../utils/audio";

import { shadowPrompts as dbShadowPrompts } from "../data/shadowPrompts";

const shadowPrompts: ShadowPrompt[] = dbShadowPrompts;

function shuffleShadows(arr: ShadowPrompt[]): ShadowPrompt[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function cleanString(str: string): string {
  return str
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Levenshtein distance for speech accuracy assessment
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

interface ShadowStudioProps {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  settings: SpeechSettings;
}

export default function ShadowStudio({ score, setScore, settings }: ShadowStudioProps) {
  const [prompts, setPrompts] = React.useState<ShadowPrompt[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isRecording, setIsRecording] = React.useState(false);
  const [heardTranscript, setHeardTranscript] = React.useState("");
  const [accuracy, setAccuracy] = React.useState(0);
  const [evaluationTag, setEvaluationTag] = React.useState("Waiting for voice...");
  const [evaluationClass, setEvaluationClass] = React.useState("border border-white/5 bg-slate-800/30 text-slate-400");
  const [hasRecognizedFinished, setHasRecognizedFinished] = React.useState(false);

  const [completedTexts, setCompletedTexts] = React.useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("quest_buddy_completed_shadow_texts");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          return [];
        }
      }
    }
    return [];
  });

  const markShadowAsCompleted = (text: string) => {
    setCompletedTexts((prev) => {
      if (prev.includes(text)) return prev;
      const next = [...prev, text];
      localStorage.setItem("quest_buddy_completed_shadow_texts", JSON.stringify(next));
      return next;
    });
  };

  const loadActiveShadows = React.useCallback(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("quest_buddy_completed_shadow_texts") : null;
    let completedParsed: string[] = [];
    if (stored) {
      try {
        completedParsed = JSON.parse(stored);
      } catch (e) {
        completedParsed = [];
      }
    }
    const uncompleted = shadowPrompts.filter(p => !completedParsed.includes(p.text));
    if (uncompleted.length === 0) {
      setPrompts([]);
    } else {
      setPrompts(shuffleShadows(uncompleted));
    }
    setCurrentIndex(0);
  }, []);

  const recognitionRef = React.useRef<any>(null);

  React.useEffect(() => {
    loadActiveShadows();
  }, [loadActiveShadows]);

  const activePrompt = prompts[currentIndex];

  // Audio prefetch is disabled to conserve free-tier API rate limits. 
  // TTS audio is generated on-demand when user clicks speech trigger icon.

  // Speech Recognition API init
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognitionClass =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognitionClass) {
        const rec = new SpeechRecognitionClass();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = "en-US";

        rec.onstart = () => {
          setIsRecording(true);
          setHeardTranscript("Listening closely... Speak now!");
        };

        rec.onend = () => {
          setIsRecording(false);
        };

        rec.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          evaluateSpeech(transcript);
        };

        rec.onerror = (e: any) => {
          console.error("Speech recognition shadow error:", e);
          setHeardTranscript("");
          setEvaluationTag("Could not hear clearly. Use the manual checklist below!");
          setEvaluationClass("border border-rose-500/20 bg-rose-500/10 text-rose-400");
          setIsRecording(false);
        };

        recognitionRef.current = rec;
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [currentIndex, prompts]);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      setEvaluationTag("Browser voice recognition is unsupported. Rely on manual grading options below!");
      setEvaluationClass("border border-amber-500/20 bg-amber-500/10 text-amber-400");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      setHasRecognizedFinished(false);
      recognitionRef.current.start();
    }
  };

  const evaluateSpeech = (transcript: string) => {
    if (!activePrompt) return;

    setHeardTranscript(transcript);

    const cleanTarget = cleanString(activePrompt.text);
    const cleanHeard = cleanString(transcript);

    const distance = levenshteinDistance(cleanTarget, cleanHeard);
    const maxLength = Math.max(cleanTarget.length, cleanHeard.length);

    let scoreAccuracy = 100;
    if (maxLength > 0) {
      scoreAccuracy = Math.round(((maxLength - distance) / maxLength) * 100);
    }
    scoreAccuracy = Math.max(0, Math.min(100, scoreAccuracy));
    setAccuracy(scoreAccuracy);
    setHasRecognizedFinished(true);

    if (scoreAccuracy >= 85) {
      setEvaluationTag("Excellent Pronunciation! Double point score trigger!");
      setEvaluationClass("border border-emerald-500/20 bg-emerald-500/10 text-emerald-400");
      setScore((s) => s + 15);
      playSfx("correct");
      markShadowAsCompleted(activePrompt.text);
    } else if (scoreAccuracy >= 60) {
      setEvaluationTag("Good quality! Focus on cadence and accents.");
      setEvaluationClass("border border-indigo-500/20 bg-indigo-500/10 text-indigo-400");
      setScore((s) => s + 5);
      playSfx("correct");
      markShadowAsCompleted(activePrompt.text);
    } else {
      setEvaluationTag("Repeating allows you to master key vocal tones!");
      setEvaluationClass("border border-amber-500/20 bg-amber-500/10 text-amber-400");
      playSfx("incorrect");
    }
  };

  const playTargetAudio = () => {
    if (activePrompt) {
      speakPhrase(activePrompt.text, settings);
    }
  };

  const handleManualCheck = (isPassed: boolean) => {
    setHasRecognizedFinished(true);
    if (isPassed) {
      setAccuracy(100);
      setEvaluationTag("Splendid! Manual confirmation recorded.");
      setEvaluationClass("border border-teal-500/20 bg-teal-500/10 text-teal-400");
      setScore((s) => s + 10);
      playSfx("correct");
      markShadowAsCompleted(activePrompt.text);
    } else {
      setAccuracy(0);
      setEvaluationTag("Mastering pronunciation requires practice iteration!");
      setEvaluationClass("border border-rose-500/20 bg-rose-500/10 text-rose-400");
      playSfx("incorrect");
    }
  };

  const handleNextPrompt = () => {
    setAccuracy(0);
    setHeardTranscript("");
    setEvaluationTag("Waiting for voice...");
    setEvaluationClass("border border-white/5 bg-slate-800/30 text-slate-400");
    setHasRecognizedFinished(false);
    setCurrentIndex((prev) => (prev + 1) % prompts.length);
  };

  const handleReshuffle = () => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("quest_buddy_completed_shadow_texts") : null;
    let completedParsed: string[] = [];
    if (stored) {
      try {
        completedParsed = JSON.parse(stored);
      } catch (e) {
        completedParsed = [];
      }
    }
    const uncompleted = shadowPrompts.filter(p => !completedParsed.includes(p.text));
    setPrompts(shuffleShadows(uncompleted));
    setCurrentIndex(0);
    setAccuracy(0);
    setHeardTranscript("");
    setEvaluationTag("Waiting for voice...");
    setEvaluationClass("border border-white/5 bg-slate-800/30 text-slate-400");
    setHasRecognizedFinished(false);
  };

  if (completedTexts.length >= shadowPrompts.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900/50 backdrop-blur-md border border-white/8 rounded-3xl p-8 text-center space-y-6 max-w-xl mx-auto my-12"
      >
        <div className="w-16 h-16 bg-indigo-500/15 border border-indigo-500/30 rounded-full flex items-center justify-center mx-auto text-indigo-400">
          <Sparkles className="w-8 h-8 animate-pulse" />
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white font-display">
          ¡Excelente Trabajo! 🎙️
        </h2>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Has completado con éxito los <strong>{shadowPrompts.length} ejercicios</strong> de imitación de voz (Shadowing) en Pasado Simple y Pasado Continuo. Tu progreso ha sido guardado exitosamente en este dispositivo.
        </p>
        <div className="bg-slate-950/60 p-4 rounded-2xl border border-white/5 inline-block px-8 py-3">
          <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Total Puntuación</div>
          <div className="text-2xl font-black text-indigo-400 font-display mt-0.5">{score} XP</div>
        </div>
        <div>
          <button
            onClick={() => {
              setCompletedTexts([]);
              localStorage.removeItem("quest_buddy_completed_shadow_texts");
              setTimeout(() => {
                loadActiveShadows();
              }, 50);
            }}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-500 to-teal-500 hover:from-indigo-400 hover:to-teal-400 text-white font-bold rounded-2xl transition-all shadow-lg hover:scale-105 cursor-pointer"
          >
            Resetear Todo y Reiniciar Práctica
          </button>
        </div>
      </motion.div>
    );
  }

  if (!activePrompt) {
    return (
      <div className="flex justify-center items-center h-48">
        <RefreshCw className="animate-spin text-indigo-500 w-8 h-8" />
      </div>
    );
  }

  // Calculate SVG circle properties
  const radius = 54;
  const circumference = 2 * Math.PI * radius; // ~339.29
  const strokeDashoffset = circumference - (accuracy / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      {/* Visual Anchor Indicator header */}
      <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5 flex-1">
          <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/20">
            <Mic className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-slate-100 font-display">
              Shadowing & Pronunciation Lab
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Speak simultaneous patterns alongside clean voice synthesis models. Perfect your cadence!
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic Progress Card */}
      <div className="bg-slate-900/50 backdrop-blur-md border border-white/8 rounded-3xl p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1 w-full font-medium">
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-display">
            <span>Progress: {completedTexts.length} / {shadowPrompts.length} Completed</span>
            <span>
              Prompt {completedTexts.length + 1} of {shadowPrompts.length}
            </span>
          </div>
          <div className="w-full bg-slate-950/80 border border-white/5 h-3 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-teal-400 h-full transition-all duration-500"
              style={{ width: `${(completedTexts.length / shadowPrompts.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto shrink-0 select-none">
          <button
            onClick={handleReshuffle}
            className="px-4 py-2.5 text-xs font-bold bg-white/5 hover:bg-white/10 text-slate-300 rounded-2xl flex items-center justify-center gap-1.5 transition-all border border-white/5 cursor-pointer"
            title="Reshuffles the remaining uncompleted exercises"
          >
            <RotateCcw className="w-3.5 h-3.5 text-indigo-400" /> Reshuffle Queue
          </button>
          <button
            onClick={() => {
              if (confirm("Reset finished shadowing sessions history and restart from the beginning?")) {
                setCompletedTexts([]);
                localStorage.removeItem("quest_buddy_completed_shadow_texts");
                setTimeout(() => {
                  loadActiveShadows();
                }, 50);
              }
            }}
            className="px-4 py-2.5 text-xs font-bold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 rounded-2xl flex items-center justify-center gap-1.5 transition-all border border-rose-500/10 cursor-pointer"
          >
            Clear Progress
          </button>
        </div>
      </div>

      {/* Main interactive sandboxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Playback Box */}
        <div className="md:col-span-2 bg-slate-900/40 backdrop-blur-md border border-white/8 rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                Target Audio Sentence
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                🗣️ Metronome Mode: Listen, repeat immediately!
              </span>
            </div>

            {/* Huge display text */}
            <div className="py-8 text-center bg-slate-950/40 border border-white/5 rounded-2xl relative my-4">
              <h1 className="text-xl md:text-3xl font-black text-white px-4 leading-relaxed font-display">
                {activePrompt.text}
              </h1>
              <span className="block mt-3 text-xs text-slate-400 italic font-medium">
                Translation: {activePrompt.translation}
              </span>
            </div>

            {/* Speed configurations indicator */}
            <div className="flex items-center justify-between bg-white/5 border border-white/5 p-4 rounded-2xl mt-4">
              <div className="flex items-center space-x-3">
                <button
                  onClick={playTargetAudio}
                  className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  title="Play reference voice sample"
                >
                  <Play className="w-5 h-5 ml-0.5 fill-white" />
                </button>
                <div>
                  <h5 className="text-xs font-bold text-slate-200">Standard Voice Pattern</h5>
                  <p className="text-[10px] text-slate-500">Repeated inputs optimize vocal habits</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] bg-slate-800 border border-white/5 font-bold px-2.5 py-1 rounded-lg text-slate-400">
                  Cadence Speed:
                </span>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                  {settings.speed === 0.75 ? "Slow (0.75x)" : "Normal (1.0x)"}
                </span>
              </div>
            </div>
          </div>

          {/* Micro Evaluation */}
          <div className="mt-8 pt-6 border-t border-white/5">
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* Voice Waves */}
              <div
                className={`flex items-end justify-center space-x-1.5 h-10 w-full mb-2 transition-opacity duration-300 ${
                  isRecording ? "opacity-100" : "opacity-30"
                }`}
              >
                <div
                  className={`bar w-1.5 bg-indigo-500 rounded-full h-1 ${
                    isRecording ? "animate-[pulse_1.2s_ease-in-out_infinite]" : ""
                  }`}
                />
                <div
                  className={`bar w-1.5 bg-indigo-400 rounded-full h-1 ${
                    isRecording ? "animate-[pulse_1.2s_ease-in-out_0.1s_infinite]" : ""
                  }`}
                />
                <div
                  className={`bar w-1.5 bg-teal-400 rounded-full h-1 ${
                    isRecording ? "animate-[pulse_1.2s_ease-in-out_0.2s_infinite]" : ""
                  }`}
                />
                <div
                  className={`bar w-1.5 bg-indigo-400 rounded-full h-1 ${
                    isRecording ? "animate-[pulse_1.2s_ease-in-out_0.3s_infinite]" : ""
                  }`}
                />
                <div
                  className={`bar w-1.5 bg-indigo-500 rounded-full h-1 ${
                    isRecording ? "animate-[pulse_1.2s_ease-in-out_0.4s_infinite]" : ""
                  }`}
                />
              </div>

              {/* Huge Recording Target Toggle */}
              <div className="relative">
                <button
                  onClick={toggleRecording}
                  className={`w-20 h-20 bg-gradient-to-r ${
                    isRecording
                      ? "from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 shadow-rose-500/20"
                      : "from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 shadow-indigo-500/20"
                  } text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer relative z-10`}
                >
                  {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                </button>
                {isRecording && (
                  <div className="absolute inset-0 bg-rose-500/30 rounded-full animate-ping" />
                )}
              </div>

              <div className="text-center space-y-1">
                <h4 className="text-sm font-bold text-slate-200">
                  {isRecording ? "We are listening... Speak clearly!" : "Click the Microphone and read aloud!"}
                </h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto text-center font-medium leading-relaxed">
                  Repeat correct syllable sequences to refine your speech precision.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Evaluation Output Dashboard */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-white/8 rounded-3xl p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="bg-teal-500/10 text-teal-300 border border-teal-500/20 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
              Speech Analysis Console
            </span>

            {/* Radial Match Gauge */}
            <div className="flex flex-col items-center justify-center py-6 border-b border-white/5">
              <div className="relative w-32 h-32 flex items-center justify-center select-none">
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r={radius}
                    className="stroke-slate-800"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r={radius}
                    className="stroke-teal-400 transition-all duration-1000"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                  />
                </svg>
                <div className="text-center z-10">
                  <span className="text-3xl font-black text-white font-display">
                    {accuracy}%
                  </span>
                  <p className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">
                    Acoustics
                  </p>
                </div>
              </div>

              <span
                className={`mt-4 px-3.5 py-1 rounded-full text-xs font-bold leading-normal text-center shadow-2xs max-w-full ${evaluationClass}`}
              >
                {evaluationTag}
              </span>
            </div>

            {/* Live translation container */}
            <div className="space-y-1.5 selection:bg-indigo-300/30">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-display">
                Captured Transcript:
              </label>
              <div className="bg-slate-950/50 rounded-xl p-3.5 border border-white/5 min-h-[70px] text-xs text-slate-300 font-medium italic leading-relaxed">
                {heardTranscript ? `"${heardTranscript}"` : "Press mic to stream voice..."}
              </div>
            </div>
          </div>

          {/* Self-check panel if browsers fail to capture Speech API info */}
          <div className="mt-6 pt-4 border-t border-white/5 space-y-4">
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-2 font-display">
                Manual Self-Evaluation Validation:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleManualCheck(false)}
                  className="px-3 py-2 bg-slate-800 hover:bg-rose-500/10 text-[11px] text-rose-400 border border-white/5 hover:border-rose-500/20 font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1"
                >
                  Try Again 🔄
                </button>
                <button
                  onClick={() => handleManualCheck(true)}
                  className="px-3 py-2 bg-teal-500/10 hover:bg-teal-500/15 text-[11px] text-teal-400 border border-teal-500/20 font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1"
                >
                  Good Play 🎉
                </button>
              </div>
            </div>

            <button
              onClick={handleNextPrompt}
              className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold rounded-2xl text-xs transition-all shadow-md transform hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 cursor-pointer font-display"
            >
              Next Exercise <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
