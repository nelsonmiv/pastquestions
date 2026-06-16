import React from "react";
import {
  RotateCcw,
  Volume2,
  Eye,
  EyeOff,
  Mic,
  MicOff,
  CircleCheck,
  ArrowRight,
  Info,
  Lightbulb,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PracticePrompt, SpeechSettings } from "../types";
import { playSfx, speakPhrase, prefetchPhrase } from "../utils/audio";
import FormulaModal from "./FormulaModal";

import { rawPracticePrompts as dbPracticePrompts } from "../data/practicePrompts";

// Loaded past tense practice prompts
const rawPracticePrompts: PracticePrompt[] = dbPracticePrompts;

function shufflePrompts(arr: PracticePrompt[]): PracticePrompt[] {
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

interface PracticeStudioProps {
  score: number;
  streak: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setStreak: React.Dispatch<React.SetStateAction<number>>;
  settings: SpeechSettings;
}

export default function PracticeStudio({
  score,
  streak,
  setScore,
  setStreak,
  settings,
}: PracticeStudioProps) {
  const [prompts, setPrompts] = React.useState<PracticePrompt[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [inputValue, setInputValue] = React.useState("");

  const [completedIds, setCompletedIds] = React.useState<number[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("quest_buddy_completed_practice_ids");
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

  const markPromptAsCompleted = (id: number) => {
    setCompletedIds((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      localStorage.setItem("quest_buddy_completed_practice_ids", JSON.stringify(next));
      return next;
    });
  };

  const loadActivePrompts = React.useCallback(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("quest_buddy_completed_practice_ids") : null;
    let completedParsed: number[] = [];
    if (stored) {
      try {
        completedParsed = JSON.parse(stored);
      } catch (e) {
        completedParsed = [];
      }
    }
    const uncompleted = rawPracticePrompts.filter(p => !completedParsed.includes(p.id));
    if (uncompleted.length === 0) {
      setPrompts([]);
    } else {
      setPrompts(shufflePrompts(uncompleted));
    }
    setCurrentIndex(0);
  }, []);

  React.useEffect(() => {
    loadActivePrompts();
  }, [loadActivePrompts]);

  const activePrompt = prompts[currentIndex];

  const [isTranslationVisible, setIsTranslationVisible] = React.useState(false);
  const [isFormulaModalOpen, setIsFormulaModalOpen] = React.useState(false);

  const [isEvaluated, setIsEvaluated] = React.useState(false);
  const [isCorrect, setIsCorrect] = React.useState(false);
  const [feedbackMsg, setFeedbackMsg] = React.useState("");

  const [isDictating, setIsDictating] = React.useState(false);
  const [dictationWarning, setDictationWarning] = React.useState("");
  const recognitionRef = React.useRef<any>(null);

  // Audio prefetch is disabled to conserve free-tier API rate limits (3 requests / minute)
  // TTS audio is generated on-demand when user clicks speech trigger icon.

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognitionClass =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognitionClass) {
        const recognition = new SpeechRecognitionClass();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onstart = () => {
          setIsDictating(true);
          setDictationWarning("");
        };

        recognition.onend = () => {
          setIsDictating(false);
        };

        recognition.onresult = (event: any) => {
          let transcript = event.results[0][0].transcript;
          if (transcript) {
            transcript = transcript.trim();
            transcript = transcript.charAt(0).toUpperCase() + transcript.slice(1);
            if (!transcript.endsWith("?")) {
              transcript += "?";
            }
            setInputValue(transcript);
          }
        };

        recognition.onerror = (e: any) => {
          console.error("Dictation recognition error:", e);
          setDictationWarning("Couldn't catch your voice. Try speaking again or typing.");
          setIsDictating(false);
        };

        recognitionRef.current = recognition;
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const handleDictatingToggle = () => {
    if (!recognitionRef.current) {
      setDictationWarning("Speech synthesis / recognition is unavailable in this browser. Try Chrome!");
      return;
    }

    if (isDictating) {
      recognitionRef.current.stop();
    } else {
      setDictationWarning("");
      recognitionRef.current.start();
    }
  };

  const handleResetSet = () => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("quest_buddy_completed_practice_ids") : null;
    let completedParsed: number[] = [];
    if (stored) {
      try {
        completedParsed = JSON.parse(stored);
      } catch (e) {
        completedParsed = [];
      }
    }
    const uncompleted = rawPracticePrompts.filter(p => !completedParsed.includes(p.id));
    const reshuffled = shufflePrompts(uncompleted);
    setPrompts(reshuffled);
    setCurrentIndex(0);
    setInputValue("");
    setIsEvaluated(false);
    setIsTranslationVisible(false);
    setFeedbackMsg("");
  };

  const handleSpeakAnswer = () => {
    if (activePrompt) {
      speakPhrase(activePrompt.answer, settings);
    }
  };

  const handleSpeakCorrectQuestion = () => {
    if (activePrompt) {
      speakPhrase(activePrompt.correctQuestion, settings);
    }
  };

  const handleCheckAnswer = () => {
    if (!inputValue.trim()) {
      setFeedbackMsg("Please type or record a reply first!");
      return;
    }

    const cleanedStudent = cleanString(inputValue);
    const cleanedTarget = cleanString(activePrompt.correctQuestion);
    const correct = cleanedStudent === cleanedTarget;

    setIsCorrect(correct);
    setIsEvaluated(true);

    if (correct) {
      setScore((s) => s + 10);
      setStreak((st) => st + 1);
      playSfx("correct");
      setFeedbackMsg("Excellent! You paired the perfect question!");
      markPromptAsCompleted(activePrompt.id);
    } else {
      setStreak(0);
      playSfx("incorrect");
      setFeedbackMsg(`Not quite! The standard target question structure was: "${activePrompt.correctQuestion}"`);
    }
  };

  const handleSkipQuestion = () => {
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    setIsEvaluated(false);
    setIsTranslationVisible(false);
    setInputValue("");
    setFeedbackMsg("");
    setCurrentIndex((prev) => (prev + 1) % prompts.length);
  };

  const handleRevealAnswer = () => {
    if (activePrompt) {
      setInputValue(activePrompt.correctQuestion);
      setStreak(0);
      setIsCorrect(true);
      setIsEvaluated(true);
      setFeedbackMsg(`Grammar structure unlocked. Observe rules:`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (isEvaluated) {
        handleNextQuestion();
      } else {
        handleCheckAnswer();
      }
    }
  };

  if (completedIds.length >= rawPracticePrompts.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900/50 backdrop-blur-md border border-white/8 rounded-3xl p-8 text-center space-y-6 max-w-xl mx-auto my-12"
      >
        <div className="w-16 h-16 bg-amber-500/15 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto text-amber-400">
          <Sparkles className="w-8 h-8 animate-pulse" />
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white font-display">
          ¡Felicidades! 🎉
        </h2>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Has completado con éxito los <strong>{rawPracticePrompts.length} ejercicios</strong> de formulación de preguntas inversas de Pasados (Simple y Continuo). Tu progreso ha sido guardado exitosamente en este dispositivo.
        </p>
        <div className="bg-slate-950/60 p-4 rounded-2xl border border-white/5 inline-block px-8 py-3">
          <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Total Puntuación</div>
          <div className="text-2xl font-black text-teal-400 font-display mt-0.5">{score} XP</div>
        </div>
        <div>
          <button
            onClick={() => {
              setCompletedIds([]);
              localStorage.removeItem("quest_buddy_completed_practice_ids");
              setTimeout(() => {
                loadActivePrompts();
              }, 50);
            }}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white font-bold rounded-2xl transition-all shadow-lg hover:scale-105 cursor-pointer"
          >
            Resetear Todo y Reiniciar Curso
          </button>
        </div>
      </motion.div>
    );
  }

  if (!activePrompt) {
    return (
      <div className="flex justify-center items-center h-48">
        <RefreshCw className="animate-spin text-teal-600 w-8 h-8" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      {/* Progress Card */}
      <div className="bg-slate-900/50 backdrop-blur-md border border-white/8 rounded-3xl p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1 w-full font-medium">
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-display">
            <span>Progress: {completedIds.length} / {rawPracticePrompts.length} Completed</span>
            <span>
              Question {completedIds.length + 1} of {rawPracticePrompts.length}
            </span>
          </div>
          <div className="w-full bg-slate-950/80 border border-white/5 h-3 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-teal-400 to-indigo-500 h-full transition-all duration-500"
              style={{ width: `${(completedIds.length / rawPracticePrompts.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto shrink-0 select-none">
          <button
            onClick={handleResetSet}
            className="px-4 py-2.5 text-xs font-bold bg-white/5 hover:bg-white/10 text-slate-300 rounded-2xl flex items-center justify-center gap-1.5 transition-all border border-white/5 cursor-pointer"
            title="Reshuffles the remaining uncompleted exercises"
          >
            <RotateCcw className="w-3.5 h-3.5 text-indigo-400" /> Reshuffle Queue
          </button>
          <button
            onClick={() => {
              if (confirm("Reset finished exercises history and restart from the beginning?")) {
                setCompletedIds([]);
                localStorage.removeItem("quest_buddy_completed_practice_ids");
                setTimeout(() => {
                  loadActivePrompts();
                }, 50);
              }
            }}
            className="px-4 py-2.5 text-xs font-bold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 rounded-2xl flex items-center justify-center gap-1.5 transition-all border border-rose-500/10 cursor-pointer"
          >
            Clear Progress
          </button>
        </div>
      </div>

      {/* Main Core Question Card */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-white/8 rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-400 to-indigo-500" />

        <div className="flex justify-between items-center mb-6">
          <span className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
            Reverse Challenge (Grammar Swap)
          </span>

          <button
            onClick={() => setIsFormulaModalOpen(true)}
            className="text-teal-400 hover:text-teal-300 font-bold text-xs flex items-center gap-1.5 bg-teal-500/10 hover:bg-teal-500/15 px-3 py-1.5 rounded-full transition-all cursor-pointer border border-teal-500/20"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-500 fill-amber-500/10" /> View Formula
          </button>
        </div>

        {/* Target Answer Render Box */}
        <div className="bg-gradient-to-r from-teal-500/10 via-indigo-500/5 to-transparent border border-white/5 p-6 rounded-2xl mb-6 relative">
          <div className="absolute -top-3 left-4 bg-teal-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
            Read and Listen to the Answer:
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-black text-white leading-snug">
                {activePrompt.answer}
              </h2>

              <AnimatePresence>
                {isTranslationVisible && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs md:text-sm text-slate-400 italic bg-slate-950/60 py-1.5 px-3 rounded-xl border border-white/5 block w-fit"
                  >
                    💡 Translation: {activePrompt.translation}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex space-x-2 self-end md:self-center">
              <button
                onClick={() => setIsTranslationVisible(!isTranslationVisible)}
                className={`p-3 rounded-full border shadow-xs transition-all duration-150 flex items-center justify-center cursor-pointer hover:scale-105 ${
                  isTranslationVisible
                    ? "bg-amber-500/20 border-amber-500/30 text-amber-300"
                    : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10"
                }`}
                title="Toggle Spanish Translation Guide"
              >
                {isTranslationVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                onClick={handleSpeakAnswer}
                className="bg-indigo-600 hover:bg-indigo-700 text-white p-3.5 rounded-full shadow-md hover:scale-105 transition-all duration-150 flex items-center justify-center cursor-pointer"
                title="Listen using native digital synthesizers"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Input Answer Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label htmlFor="type-input" className="text-xs font-bold text-slate-400 uppercase tracking-widest font-display">
              Type or dictate the proper Question:
            </label>
            <div className="flex items-center">
              <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-2xs">
                🔑 Clue: Start with "<strong>{activePrompt.clue}</strong>"
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="relative flex-1">
              <input
                id="type-input"
                type="text"
                disabled={isEvaluated}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder='Type or dictate the correct question (e.g., Did you... / Were you...?)'
                className="w-full pl-5 pr-12 py-4 rounded-2xl border bg-slate-950/40 text-white text-base md:text-lg font-medium transition-all shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 border-white/10 disabled:opacity-70 disabled:cursor-not-allowed"
              />
              <p className="text-[10px] text-slate-500 mt-1.5 leading-relaxed">
                Ensure proper helper verbs, base verbs, correct capitalization, and end with a "?" !
              </p>
            </div>

            <button
              onClick={handleDictatingToggle}
              disabled={isEvaluated}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm hover:scale-105 transition-all relative shrink-0 active:scale-95 duration-100 cursor-pointer ${
                isDictating
                  ? "bg-rose-600 text-white animate-pulse"
                  : "bg-white/5 hover:bg-white/10 border border-white/5 text-slate-300"
              }`}
              title="Dictate with your voice"
            >
              {isDictating ? <MicOff className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5 text-indigo-400" />}
              {isDictating && (
                <div className="absolute inset-0 bg-rose-600/20 rounded-2xl animate-ping" />
              )}
            </button>
          </div>

          {/* Warning / Status messages */}
          {isDictating && (
            <div className="text-xs text-indigo-400 font-bold flex items-center gap-1.5 animate-pulse pl-1 select-none">
              <div className="w-2 h-2 rounded-full bg-rose-500" />
              Listening closely... Speak your question clearly now!
            </div>
          )}

          {dictationWarning && (
            <div className="text-xs text-rose-400 font-bold bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-xl animate-bounce">
              ⚠️ {dictationWarning}
            </div>
          )}
        </div>

        {/* Action Panel / Feedback Box */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <AnimatePresence>
            {feedbackMsg && (
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="flex items-center gap-3 w-full md:w-2/3"
              >
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white text-base ${
                    isEvaluated && !isCorrect
                      ? "bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400"
                      : "bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-teal-400 animate-bounce"
                  }`}
                >
                  {isEvaluated && isCorrect ? (
                    <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300/20 animate-pulse" />
                  ) : (
                    <Info className="w-4 h-4 text-white" />
                  )}
                </div>
                <div>
                  <h4
                    className={`font-black text-sm ${
                      isEvaluated && !isCorrect ? "text-amber-400" : "text-emerald-400"
                    }`}
                  >
                    {isEvaluated && isCorrect ? "Fantastic Job!" : "Review Lessons:"}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{feedbackMsg}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex space-x-3 w-full md:w-auto ml-auto shrink-0 justify-end select-none">
            {!isEvaluated ? (
              <>
                <button
                  onClick={handleRevealAnswer}
                  className="px-4 py-3 bg-amber-500/10 hover:bg-amber-500/15 text-amber-300 border border-amber-500/20 font-bold rounded-2xl text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  Reveal Q
                </button>
                <button
                  onClick={handleSkipQuestion}
                  className="px-5 py-3.5 bg-white/5 hover:bg-white/10 text-slate-450 font-bold rounded-2xl text-xs transition-all border border-white/5 text-slate-300 cursor-pointer"
                >
                  Skip
                </button>
                <button
                  onClick={handleCheckAnswer}
                  className="px-7 py-3.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-2xl text-xs shadow-md transition-all transform active:scale-95 flex items-center gap-1.5 hover:opacity-90 cursor-pointer"
                >
                  Check <CircleCheck className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-2xl text-xs shadow-md transition-all transform active:scale-95 flex items-center gap-1.5 justify-center hover:opacity-95 cursor-pointer animate-pulse font-display"
              >
                Next Question <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Breakdown Box */}
        <AnimatePresence>
          {isEvaluated && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-6 p-5 bg-indigo-500/5 border border-indigo-500/15 rounded-2xl"
            >
              <div className="flex gap-2.5">
                <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div className="space-y-4 w-full">
                  <div>
                    <h5 className="font-extrabold text-indigo-300 text-xs uppercase tracking-widest font-display">
                      Past Tense Grammar Breakdown Lesson
                    </h5>
                    <p className="text-xs text-indigo-200 mt-1 leading-relaxed font-medium">
                      {activePrompt.explanation}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-indigo-500/10 flex flex-wrap items-center gap-3">
                    <span className="text-[11px] font-bold text-slate-400">
                      Standard Pronunciation Practice:
                    </span>
                    <button
                      onClick={handleSpeakCorrectQuestion}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all duration-150 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Read Aloud with Guidance
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <FormulaModal isOpen={isFormulaModalOpen} onClose={() => setIsFormulaModalOpen(false)} />
    </motion.div>
  );
}
