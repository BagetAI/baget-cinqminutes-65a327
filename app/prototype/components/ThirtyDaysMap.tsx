"use client";

import { useState } from "react";
import { LessonDay, CURRICULUM_DATA } from "@/app/data/curriculumData";
import {
  CheckCircle2,
  Lock,
  Sparkles,
  Flame,
  ArrowRight,
  Filter,
  Check,
  RotateCcw,
  Calendar,
  Compass,
  Zap,
} from "lucide-react";

interface ThirtyDaysMapProps {
  completedDays: number[];
  activeDayNumber: number;
  onSelectDay: (dayNumber: number) => void;
  onResetProgress: () => void;
  onCompleteAllDays: () => void;
}

export default function ThirtyDaysMap({
  completedDays,
  activeDayNumber,
  onSelectDay,
  onResetProgress,
  onCompleteAllDays,
}: ThirtyDaysMapProps) {
  const [selectedWeekFilter, setSelectedWeekFilter] = useState<number | "all">("all");

  const totalDays = CURRICULUM_DATA.length;
  const completedCount = completedDays.length;
  const progressPercent = Math.round((completedCount / totalDays) * 100);

  const filteredDays = CURRICULUM_DATA.filter((item) => {
    if (selectedWeekFilter === "all") return true;
    return item.week === selectedWeekFilter;
  });

  const weekTabs = [
    { id: "all", label: "Tout le parcours (30J)", count: "30" },
    { id: 1, label: "S1 : Idée & Problème", count: "J1-J7" },
    { id: 2, label: "S2 : Offre & Prix", count: "J8-J14" },
    { id: 3, label: "S3 : Premiers Clients", count: "J15-J21" },
    { id: 4, label: "S4 : Statut & Légal", count: "J22-J28" },
    { id: 5, label: "Sprint Final", count: "J29-J30" },
  ];

  return (
    <div className="space-y-8">
      {/* Progress Summary Big Card */}
      <div className="bg-[#1E293B] text-white rounded-3xl p-6 sm:p-8 border-2 border-[#1E293B] shadow-[6px_6px_0px_0px_#FF6B35]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#334155] text-[#FF6B35] text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>Votre feuille de route pas à pas</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
              Progression : {completedCount} sur {totalDays} jours ({progressPercent}%)
            </h2>
            <p className="text-[#94A3B8] text-sm sm:text-base max-w-xl">
              Chaque micro-action validée rapproche votre activité de son premier encaissement. Cliquez sur un jour pour ouvrir la leçon et son livrable.
            </p>
          </div>

          {/* Mini Stats Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-[#0F172A] p-4 rounded-2xl border border-[#334155]">
              <div className="flex items-center gap-1.5 text-xs text-[#94A3B8] font-bold">
                <Flame className="w-4 h-4 text-[#FF6B35]" />
                <span>Série active</span>
              </div>
              <div className="text-2xl font-extrabold text-white mt-1">5 jours 🔥</div>
            </div>

            <div className="bg-[#0F172A] p-4 rounded-2xl border border-[#334155]">
              <div className="flex items-center gap-1.5 text-xs text-[#94A3B8] font-bold">
                <Zap className="w-4 h-4 text-[#FF6B35]" />
                <span>Temps investi</span>
              </div>
              <div className="text-2xl font-extrabold text-white mt-1">
                {completedCount * 5} min
              </div>
            </div>

            <div className="bg-[#0F172A] p-4 rounded-2xl border border-[#334155] col-span-2 sm:col-span-1">
              <div className="flex items-center gap-1.5 text-xs text-[#94A3B8] font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Jour actif</span>
              </div>
              <div className="text-2xl font-extrabold text-[#FF6B35] mt-1">
                Jour {activeDayNumber}
              </div>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-8">
          <div className="flex items-center justify-between text-xs font-bold text-[#94A3B8] mb-2">
            <span>Départ (J1)</span>
            <span className="text-[#FF6B35] font-extrabold">{progressPercent}% accompli</span>
            <span>Activité lancée (J30)</span>
          </div>
          <div className="w-full h-4 bg-[#0F172A] rounded-full overflow-hidden border border-[#334155] p-0.5">
            <div
              className="h-full bg-gradient-to-r from-[#FF6B35] to-[#FFA07A] rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Quick Testing Controls Toolbar */}
        <div className="mt-6 pt-4 border-t border-[#334155] flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-[#94A3B8] font-medium">
            Outils de test du prototype :
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onResetProgress}
              className="px-3 py-1.5 rounded-xl bg-[#0F172A] hover:bg-[#334155] border border-[#475569] text-white font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#94A3B8]" />
              <span>Réinitialiser (J8 actif)</span>
            </button>

            <button
              onClick={onCompleteAllDays}
              className="px-3 py-1.5 rounded-xl bg-[#FF6B35] hover:bg-[#E55A25] text-white font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Tester état 100% (30/30)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Week Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {weekTabs.map((tab) => {
          const isActive = selectedWeekFilter === tab.id;
          return (
            <button
              key={tab.id.toString()}
              onClick={() => setSelectedWeekFilter(tab.id as number | "all")}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border-2 cursor-pointer flex items-center gap-2 shrink-0 ${
                isActive
                  ? "bg-[#1E293B] text-white border-[#1E293B] shadow-[3px_3px_0px_0px_#FF6B35]"
                  : "bg-white text-[#475569] border-[#E2E8F0] hover:border-[#CBD5E1]"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-2 py-0.5 rounded-lg text-[10px] font-extrabold ${
                  isActive ? "bg-[#FF6B35] text-white" : "bg-[#F1F5F9] text-[#64748B]"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 30 Days Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredDays.map((lesson) => {
          const isDone = completedDays.includes(lesson.dayNumber);
          const isCurrentActive = lesson.dayNumber === activeDayNumber;

          return (
            <div
              key={lesson.id}
              onClick={() => onSelectDay(lesson.dayNumber)}
              className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between group ${
                isCurrentActive
                  ? "bg-white border-[#FF6B35] shadow-[5px_5px_0px_0px_#FF6B35] ring-2 ring-[#FF6B35]/20 -translate-y-1"
                  : isDone
                  ? "bg-white border-[#CBD5E1] hover:border-[#1E293B] shadow-[3px_3px_0px_0px_#CBD5E1] hover:shadow-[4px_4px_0px_0px_#1E293B]"
                  : "bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#CBD5E1] opacity-90 hover:opacity-100"
              }`}
            >
              <div>
                {/* Header tag row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-7 h-7 rounded-xl font-extrabold text-xs flex items-center justify-center border-2 ${
                        isDone
                          ? "bg-emerald-500 border-emerald-600 text-white"
                          : isCurrentActive
                          ? "bg-[#FF6B35] border-[#1E293B] text-white"
                          : "bg-white border-[#CBD5E1] text-[#64748B]"
                      }`}
                    >
                      {isDone ? "✓" : `J${lesson.dayNumber}`}
                    </span>
                    <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                      {lesson.badge}
                    </span>
                  </div>

                  {isCurrentActive ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FFF2EB] text-[#D63900] border border-[#FF6B35] text-[10px] font-extrabold animate-pulse">
                      Jour en cours
                    </span>
                  ) : isDone ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 text-[10px] font-bold">
                      Validé
                    </span>
                  ) : (
                    <span className="text-[11px] text-[#94A3B8] font-medium flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      5 min
                    </span>
                  )}
                </div>

                {/* Day Title */}
                <h4 className="font-bold font-display text-base text-[#0F172A] leading-snug group-hover:text-[#FF6B35] transition-colors">
                  {lesson.title}
                </h4>

                {/* Subtitle / Objective */}
                <p className="text-xs text-[#475569] mt-2 line-clamp-2 leading-relaxed">
                  {lesson.subtitle}
                </p>
              </div>

              {/* Deliverable info bar */}
              <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs">
                <span className="text-[11px] font-bold text-[#64748B] truncate max-w-[170px]">
                  📦 {lesson.deliverableLabel}
                </span>

                <span className="font-bold text-[#FF6B35] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>Voir</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
