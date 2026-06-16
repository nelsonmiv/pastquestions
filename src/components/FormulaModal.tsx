import React from "react";
import { X, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FormulaModal({ isOpen, onClose }: FormulaModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div id="hint-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="bg-slate-900 border border-white/10 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden"
          >
            <div className="p-6 bg-gradient-to-r from-indigo-900/40 via-purple-900/20 to-indigo-900/40 border-b border-white/5 text-white flex justify-between items-center">
              <h3 className="font-extrabold text-lg font-display flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-400 fill-amber-400/20 animate-pulse" />
                Past Tense Question Formulas
              </h3>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white font-bold transition-all border border-white/5 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 text-slate-350" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-300">
                Pick the right logic based on whether the action is completed or ongoing:
              </p>

              <div className="bg-slate-950/50 border border-white/5 p-4 rounded-2xl">
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest block mb-1">
                  Structure A: Simple Past
                </span>
                <div className="font-mono text-xs text-indigo-300 font-bold bg-slate-950 border border-white/5 px-3 py-2.5 rounded-xl">
                  {"[Did] + [Subject] + [Verb in Base Form]?"}
                </div>
                <span className="text-[11px] text-slate-500 block mt-2 font-medium">
                  Example: <em className="text-slate-400">Did she buy a green jacket?</em> (NOT "did she bought")
                </span>
              </div>

              <div className="bg-slate-950/50 border border-white/5 p-4 rounded-2xl">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block mb-1">
                  Structure B: Past Continuous
                </span>
                <div className="font-mono text-xs text-indigo-300 font-bold bg-slate-950 border border-white/5 px-3 py-2.5 rounded-xl">
                  {"[Was / Were] + [Subject] + [Verb + -ing]?"}
                </div>
                <span className="text-[11px] text-slate-500 block mt-2 font-medium">
                  Example: <em className="text-slate-400">Were they playing tennis at 8 PM?</em>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <div className="border border-white/5 p-2.5 rounded-xl bg-slate-950/30">
                  <span className="text-xs font-bold block text-teal-400">Use WAS with:</span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    I, He, She, It, Singular nouns (was running)
                  </span>
                </div>
                <div className="border border-white/5 p-2.5 rounded-xl bg-slate-950/30">
                  <span className="text-xs font-bold block text-indigo-400">Use WERE with:</span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    You, We, They, Plural nouns (were eating)
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-950/50 px-6 py-4 border-t border-white/5 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-all cursor-pointer shadow-md"
              >
                I Understand!
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
