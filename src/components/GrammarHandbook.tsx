import React from "react";
import { BookOpen, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

export default function GrammarHandbook() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      {/* Visual Anchor Infographic Card */}
      <div className="bg-gradient-to-r from-indigo-900/60 via-indigo-950 to-slate-900 border border-white/15 text-white rounded-3xl p-6 md:p-8 shadow-lg relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 opacity-5 text-9xl">
          <BookOpen className="w-40 h-40" />
        </div>
        <div className="max-w-xl">
          <span className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Past Tenses Visual Scaffold Lesson
          </span>
          <h2 className="text-2xl md:text-3xl font-black mt-3 leading-tight font-display">
            Simple Past & Past Continuous Questions
          </h2>
          <p className="text-sm text-slate-300 mt-2">
            In English, forming past questions depends on if you're asking about completed actions (<span className="font-bold text-indigo-300">Simple Past</span>, using <span className="underline font-mono">DID</span> or <span className="underline font-mono">WAS/WERE</span>) or ongoing past events (<span className="font-bold text-teal-300">Past Continuous</span>, using <span className="underline font-mono">WAS/WERE + -ING</span>).
          </p>
        </div>
      </div>

      {/* Live Formula Handbook */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Simple Past Rules Card */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-white/8 rounded-3xl p-6 shadow-md">
          <div className="flex items-center space-x-2.5 mb-4">
            <span className="w-8 h-8 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center font-black text-sm">
              1
            </span>
            <h3 className="font-bold text-slate-100 text-base font-display">Simple Past (Completed Events)</h3>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Used for fully finished past events. Yes/No structures start with <span className="text-teal-400 font-bold">Did</span> (or <span className="text-teal-300 font-bold">Was / Were</span> for state links).
          </p>

          <div className="bg-slate-950/50 border border-white/5 rounded-2xl p-4 space-y-3.5">
            <div className="flex items-center justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest text-center border-b border-white/5 pb-2">
              <span className="w-1/4">Helper</span>
              <span className="w-1/4">Subject</span>
              <span className="w-2/4">Verb (Base) + ...?</span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-slate-355 text-center">
              <span className="w-1/4 text-teal-400 font-extrabold">Did</span>
              <span className="w-1/4 text-slate-400">I / you / she / they</span>
              <span className="w-2/4 text-indigo-400 font-mono">start the homework?</span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-slate-355 text-center">
              <span className="w-1/4 text-teal-300 font-extrabold">Were</span>
              <span className="w-1/4 text-slate-400">you / they</span>
              <span className="w-2/4 text-teal-400 font-mono">happy yesterday?</span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-slate-355 text-center">
              <span className="w-1/4 text-teal-300 font-extrabold">Was</span>
              <span className="w-1/4 text-slate-400">he / she / it</span>
              <span className="w-2/4 text-teal-400 font-mono">at home?</span>
            </div>
          </div>

          <div className="mt-4 p-3.5 bg-amber-500/5 border border-amber-500/20 rounded-2xl flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-300 leading-normal">
              <strong className="font-black text-amber-200">The Common Past Trap:</strong> Never use the past tense of the main verb with "did"! Say "Did you <strong>go</strong>?", NOT "Did you went?".
            </p>
          </div>
        </div>

        {/* Past Continuous Rules Card */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-white/8 rounded-3xl p-6 shadow-md">
          <div className="flex items-center space-x-2.5 mb-4">
            <span className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-black text-sm">
              2
            </span>
            <h3 className="font-bold text-slate-100 text-base font-display">Past Continuous (Ongoing Action)</h3>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Used to query actions that were actively in progress at a specific past hour or when interrupted.
          </p>

          <div className="bg-slate-950/50 border border-white/5 rounded-2xl p-4 space-y-3.5">
            <div className="flex items-center justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest text-center border-b border-white/5 pb-2">
              <span className="w-1/4">Wh- / Helper</span>
              <span className="w-1/4">Subject</span>
              <span className="w-2/4">Verb (-ing) + ...?</span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-slate-355 text-center">
              <span className="w-1/4 text-teal-300 font-extrabold">Were</span>
              <span className="w-1/4 text-slate-400">you / they</span>
              <span className="w-2/4 text-indigo-400 font-mono">watching TV at 8 PM?</span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-slate-355 text-center text-indigo-300">
              <span className="w-1/4 text-purple-400">What was</span>
              <span className="w-1/4 text-slate-400">she</span>
              <span className="w-2/4 text-indigo-400 font-mono">doing when it crashed?</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="bg-slate-950/30 border border-white/5 p-2 rounded-xl text-center">
              <span className="block text-xs font-bold text-indigo-300 font-display">Did + Base</span>
              <span className="text-[10px] text-slate-500">Finished Event</span>
            </div>
            <div className="bg-slate-950/30 border border-white/5 p-2 rounded-xl text-center">
              <span className="block text-xs font-bold text-indigo-300 font-display">Was/Were + ing</span>
              <span className="text-[10px] text-slate-500">Action in Progress</span>
            </div>
            <div className="bg-slate-100/5 select-none p-2 rounded-xl text-center">
              <span className="block text-xs font-bold text-indigo-300 font-display">What time</span>
              <span className="text-[10px] text-slate-500 font-medium">Past schedule check</span>
            </div>
            <div className="bg-slate-105/5 select-none p-2 rounded-xl text-center">
              <span className="block text-xs font-bold text-indigo-300 font-display">Why was/were</span>
              <span className="text-[10px] text-slate-500">Reason for progress</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
