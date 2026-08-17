"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, FastForward, Sparkles, Volume2, VolumeX, CheckCircle } from "lucide-react";

interface TimerFiveMinutesProps {
  onTimerComplete?: () => void;
  dayNumber?: number;
}

export default function TimerFiveMinutes({
  onTimerComplete,
  dayNumber = 8,
}: TimerFiveMinutesProps) {
  // 5 minutes = 300 seconds
  const TOTAL_SECONDS = 300;
  // Phase 1 (Concept) is first 120s (from 300s down to 180s = 2 min)
  // Phase 2 (Micro-action) is remaining 180s (from 180s down to 0s = 3 min)
  const [timeLeft, setTimeLeft] = useState<number>(300);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"all" | "concept" | "action">("all");

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current as NodeJS.Timeout);
            setIsRunning(false);
            setHasCompleted(true);
            if (onTimerComplete) onTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft, onTimerComplete]);

  const togglePlay = () => {
    setIsRunning(!isRunning);
    if (timeLeft === 0) {
      setTimeLeft(TOTAL_SECONDS);
      setHasCompleted(false);
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(TOTAL_SECONDS);
    setHasCompleted(false);
  };

  const handleFastTest = () => {
    // Jump to 5 seconds remaining for quick testing
    setTimeLeft(5);
    setIsRunning(true);
    setHasCompleted(false);
  };

  const handleAddMinute = () => {
    setTimeLeft((prev) => Math.min(TOTAL_SECONDS, prev + 60));
  };

  // Format time MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  // Progress percentage (0 to 100%)
  const progressPercent = ((TOTAL_SECONDS - timeLeft) / TOTAL_SECONDS) * 100;

  // Determine current phase
  // Phase 1 (2 min concept) = 300 to 180s left (first 120s spent)
  // Phase 2 (3 min action) = 180 to 0s left (last 180s spent)
  const isPhase1 = timeLeft > 180;
  const isPhase2 = timeLeft <= 180 && timeLeft > 0;

  // Circular progress math
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="bg-white rounded-3xl border-2 border-[#1E293B] shadow-[5px_5px_0px_0px_#1E293B] p-5 sm:p-6 transition-all">
      {/* Header bar of Timer */}
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#FFF2EB] border-2 border-[#FF6B35] flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B35] animate-pulse"></span>
          </div>
          <div>
            <h3 className="font-display font-bold text-base sm:text-lg text-[#0F172A] leading-tight">
              Minuteur 5 Minutes
            </h3>
            <p className="text-xs text-[#64748B] font-medium">
              Session quotidienne • Jour {dayNumber}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#64748B] transition-colors cursor-pointer"
            title={soundEnabled ? "Sons activés" : "Sons désactivés"}
            aria-label="Toggle sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#FF6B35]" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <span
            className={`px-2.5 py-1 rounded-full text-xs font-bold border transition-colors ${
              hasCompleted
                ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                : isRunning
                ? "bg-[#FFF2EB] text-[#D63900] border-[#FF6B35] animate-pulse"
                : "bg-[#F1F5F9] text-[#64748B] border-[#CBD5E1]"
            }`}
          >
            {hasCompleted ? "✓ Session bouclée" : isRunning ? "En cours" : "Prêt"}
          </span>
        </div>
      </div>

      {/* Main Timer Display */}
      <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Circular Progress Gauge */}
        <div className="relative flex items-center justify-center shrink-0">
          <svg className="w-40 h-40 transform -rotate-90">
            {/* Background Circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#F1F5F9"
              strokeWidth="10"
              fill="transparent"
            />
            {/* Phase 1 Marker (first 40% = 2 min) */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#E2E8F0"
              strokeWidth="10"
              strokeDasharray={`${circumference * 0.4} ${circumference * 0.6}`}
              fill="transparent"
              className="opacity-40"
            />
            {/* Animated Progress Circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke={hasCompleted ? "#10B981" : "#FF6B35"}
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-300 ease-linear"
            />
          </svg>

          {/* Center Digital Time */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-mono text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              {formattedTime}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mt-0.5">
              {hasCompleted ? "Fini !" : isPhase1 ? "2 min Concept" : "3 min Action"}
            </span>
          </div>
        </div>

        {/* Phase Breakdown Indicators */}
        <div className="flex-1 w-full space-y-3">
          {/* Phase 1 Block */}
          <div
            className={`p-3.5 rounded-2xl border-2 transition-all ${
              isPhase1 && isRunning
                ? "bg-[#FFF2EB] border-[#FF6B35] shadow-[3px_3px_0px_0px_#FF6B35]"
                : !isPhase1 && timeLeft < 300
                ? "bg-[#F8FAFC] border-emerald-300 opacity-90"
                : "bg-[#F8FAFC] border-[#E2E8F0]"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1.5 text-[#0F172A]">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    !isPhase1 && timeLeft < 300
                      ? "bg-emerald-500"
                      : isPhase1 && isRunning
                      ? "bg-[#FF6B35] animate-ping"
                      : "bg-[#94A3B8]"
                  }`}
                ></span>
                Étape 1 : Assimiler le concept
              </span>
              <span className="text-[#64748B]">2 min</span>
            </div>
            <p className="text-xs text-[#475569] mt-1 leading-snug">
              Lecture rapide et claire, sans jargon pour comprendre le principe.
            </p>
          </div>

          {/* Phase 2 Block */}
          <div
            className={`p-3.5 rounded-2xl border-2 transition-all ${
              isPhase2 && isRunning
                ? "bg-[#FFF2EB] border-[#FF6B35] shadow-[3px_3px_0px_0px_#FF6B35]"
                : hasCompleted
                ? "bg-emerald-50 border-emerald-300"
                : "bg-[#F8FAFC] border-[#E2E8F0]"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1.5 text-[#0F172A]">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    hasCompleted
                      ? "bg-emerald-500"
                      : isPhase2 && isRunning
                      ? "bg-[#FF6B35] animate-ping"
                      : "bg-[#94A3B8]"
                  }`}
                ></span>
                Étape 2 : Micro-action pratique
              </span>
              <span className="text-[#64748B]">3 min</span>
            </div>
            <p className="text-xs text-[#475569] mt-1 leading-snug">
              Exécuter et valider le livrable du jour dans le formulaire dédié.
            </p>
          </div>
        </div>
      </div>

      {/* Timer Controls Row */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#F1F5F9]">
        <div className="flex items-center gap-2">
          {/* Main Play / Pause Button */}
          <button
            onClick={togglePlay}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all border-2 border-[#1E293B] cursor-pointer shadow-[3px_3px_0px_0px_#1E293B] active:translate-y-0.5 ${
              isRunning
                ? "bg-[#1E293B] text-white hover:bg-[#334155]"
                : "bg-[#FF6B35] text-white hover:bg-[#E55A25]"
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause</span>
              </>
            ) : hasCompleted ? (
              <>
                <RotateCcw className="w-4 h-4" />
                <span>Relancer (5 min)</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Démarrer le chrono</span>
              </>
            )}
          </button>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl border-2 border-[#E2E8F0] hover:border-[#1E293B] text-[#475569] hover:text-[#0F172A] bg-white transition-all cursor-pointer"
            title="Réinitialiser à 05:00"
            aria-label="Reset timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Test Actions for Founder / Tester */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleFastTest}
            className="px-3 py-1.5 rounded-lg bg-[#FFF2EB] hover:bg-[#FFE5D6] border border-[#FF6B35] text-[#D63900] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Tester la fin du chrono en 5 secondes"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>Tester fin (5s)</span>
          </button>

          <button
            onClick={handleAddMinute}
            className="px-2.5 py-1.5 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] border border-[#CBD5E1] text-[#475569] text-xs font-bold transition-colors cursor-pointer"
            title="Ajouter 1 minute"
          >
            +1 min
          </button>
        </div>
      </div>
    </div>
  );
}
