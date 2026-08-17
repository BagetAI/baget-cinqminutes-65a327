"use client";

import { CheckCircle, Sparkles, Flame, ArrowRight, X, Trophy } from "lucide-react";

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  dayNumber: number;
  dayTitle: string;
  streakCount: number;
  onNextDay: () => void;
  isLastDay?: boolean;
}

export default function CelebrationModal({
  isOpen,
  onClose,
  dayNumber,
  dayTitle,
  streakCount,
  onNextDay,
  isLastDay = false,
}: CelebrationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border-2 border-[#1E293B] shadow-[8px_8px_0px_0px_#1E293B] p-6 sm:p-8 text-center space-y-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl border border-[#CBD5E1] text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Big Celebration Icon */}
        <div className="w-20 h-20 rounded-3xl bg-[#FFF2EB] border-2 border-[#FF6B35] flex items-center justify-center mx-auto shadow-[4px_4px_0px_0px_#FF6B35]">
          {isLastDay ? (
            <Trophy className="w-10 h-10 text-[#FF6B35]" />
          ) : (
            <Sparkles className="w-10 h-10 text-[#FF6B35]" />
          )}
        </div>

        {/* Titles */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 text-xs font-extrabold uppercase tracking-wider mb-2">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Micro-action validée</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0F172A]">
            {isLastDay ? "Parcours 30 Jours Complété !" : `Jour ${dayNumber} Validé !`}
          </h3>

          <p className="text-sm text-[#475569] mt-1 font-medium">
            "{dayTitle}" est maintenant enregistré dans votre Dossier Projet.
          </p>
        </div>

        {/* Gamification Badge Box */}
        <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#F8FAFC] border-2 border-[#E2E8F0]">
          <div className="flex flex-col items-center justify-center p-2">
            <div className="flex items-center gap-1 text-[#D63900] font-extrabold text-xl">
              <Flame className="w-5 h-5 fill-current text-[#FF6B35]" />
              <span>{streakCount} jours</span>
            </div>
            <span className="text-[11px] text-[#64748B] font-bold uppercase mt-0.5">
              Série maintenue
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 border-l border-[#E2E8F0]">
            <div className="text-xl font-extrabold text-[#1E293B] flex items-center gap-1">
              <span className="text-[#FF6B35]">+50</span>
              <span>XP</span>
            </div>
            <span className="text-[11px] text-[#64748B] font-bold uppercase mt-0.5">
              Niveau supérieur
            </span>
          </div>
        </div>

        {/* Primary CTA Button */}
        <div className="space-y-2.5 pt-2">
          {!isLastDay ? (
            <button
              onClick={() => {
                onClose();
                onNextDay();
              }}
              className="w-full py-4 px-6 rounded-2xl bg-[#FF6B35] hover:bg-[#E55A25] text-white font-extrabold text-base border-2 border-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] hover:shadow-[2px_2px_0px_0px_#1E293B] active:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Découvrir le Jour {dayNumber + 1}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-4 px-6 rounded-2xl bg-[#FF6B35] hover:bg-[#E55A25] text-white font-extrabold text-base border-2 border-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Voir mon Dossier Projet Final</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full py-2.5 text-xs font-bold text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer"
          >
            Rester sur la vue du Jour {dayNumber}
          </button>
        </div>
      </div>
    </div>
  );
}
