import React from "react";
import { Sliders, ChevronDown } from "lucide-react";
import { SpeechSettings } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface AudioSettingsProps {
  settings: SpeechSettings;
  onChange: (newSettings: SpeechSettings) => void;
}

export default function AudioSettings({ settings, onChange }: AudioSettingsProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const setVoice = (voice: string) => {
    onChange({ ...settings, voice });
  };

  const setSpeed = (speed: number) => {
    onChange({ ...settings, speed });
  };

  const setUseGeminiTts = (useGeminiTts: boolean) => {
    onChange({ ...settings, useGeminiTts });
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-md border border-white/8 rounded-3xl p-4 mb-6 shadow-md select-none transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left focus:outline-none cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/20">
            <Sliders className="w-4 h-4 text-indigo-300" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-sm md:text-base font-display">
              Audio & Speech Engine Control
            </h3>
            <p className="text-xs text-slate-400">Choose voice, speed, and high-fidelity cloud parameters</p>
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1 tracking-wider font-display">
                  Voice Accent (Gemini TTS)
                </label>
                <select
                  value={settings.voice}
                  onChange={(e) => setVoice(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-slate-950 text-white font-medium"
                >
                  <option value="Kore">Kore (Clear & Gentle US)</option>
                  <option value="Zephyr">Zephyr (Bright US Accent)</option>
                  <option value="Puck">Puck (Cheerful & Warm US)</option>
                  <option value="Aoede">Aoede (Expressive Warm UK)</option>
                  <option value="Charon">Charon (Deep & Low US)</option>
                  <option value="native">Local Browser Accent (Offline)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1 tracking-wider font-display">
                  Vocal Speed Controls
                </label>
                <div className="flex bg-slate-950 p-1 rounded-xl border border-white/5 gap-1">
                  <button
                    onClick={() => setSpeed(0.75)}
                    className={`flex-1 py-1.5 text-[10px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      settings.speed === 0.75
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    🐌 Slow (0.75x)
                  </button>
                  <button
                    onClick={() => setSpeed(0.85)}
                    className={`flex-1 py-1.5 text-[10px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      settings.speed === 0.85
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    🎓 A2 (0.85x)
                  </button>
                  <button
                    onClick={() => setSpeed(1.0)}
                    className={`flex-1 py-1.5 text-[10px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      settings.speed === 1.0
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    ⚡ Normal (1.0x)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1 tracking-wider font-display">
                  High-Fidelity Rendering
                </label>
                <div className="flex items-center space-x-2.5 mt-2 select-none">
                  <input
                    type="checkbox"
                    id="use-gemini-tts"
                    checked={settings.useGeminiTts}
                    disabled={settings.voice === "native"}
                    onChange={(e) => setUseGeminiTts(e.target.checked)}
                    className="rounded text-indigo-500 bg-slate-950 border-white/10 focus:ring-indigo-400 w-4 h-4 disabled:opacity-40 cursor-pointer"
                  />
                  <label
                    htmlFor="use-gemini-tts"
                    className={`text-xs font-semibold cursor-pointer ${
                      settings.voice === "native" ? "text-slate-500" : "text-slate-300"
                    }`}
                  >
                    Use high-fidelity Gemini Voice
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
