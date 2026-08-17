"use client";

import { useState } from "react";
import { CURRICULUM_DATA, LessonDay } from "@/app/data/curriculumData";
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Clock,
  Check,
  Lock,
  Layers,
  ChevronRight,
  Flame,
  Award,
} from "lucide-react";

interface CurriculumMapViewProps {
  completedDays: number[];
  activeDayNumber: number;
  onSelectDay: (dayNumber: number) => void;
}

export default function CurriculumMapView({
  completedDays,
  activeDayNumber,
  onSelectDay,
}: CurriculumMapViewProps) {
  const [selectedWeekFilter, setSelectedWeekFilter] = useState<number | "all">("all");

  const weeks = [
    { weekNum: 1, title: "Semaine 1 : Idée & Validation du besoin", days: [1, 2, 3, 4, 5, 6, 7], tag: "Validation" },
    { weekNum: 2, title: "Semaine 2 : Offre & Tarification", days: [8, 9, 10, 11, 12, 13, 14], tag: "Offre" },
    { weekNum: 3, title: "Semaine 3 : Décrocher ses 3 premiers clients", days: [15, 16, 17, 18, 19, 20, 21], tag: "Acquisition" },
    { weekNum: 4, title: "Semaine 4 : Cadre juridique & Formalités", days: [22, 23, 24, 25, 26, 27, 28], tag: "Juridique" },
    { weekNum: 5, title: "Sprint Final : Lancement & Première vente", days: [29, 30], tag: "Lancement" },
  ];

  const filteredWeeks =
    selectedWeekFilter === "all"
      ? weeks
      : weeks.filter((w) => w.weekNum === selectedWeekFilter);

  const totalCompleted = completedDays.length;
  const progressPercent = Math.round((totalCompleted / 30) * 100);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border-2 border-[#1E293B] shadow-[5px_5px_0px_0px_#1E293B] p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF2EB] border border-[#FF6B35] text-[#D63900] text-xs font-extrabold uppercase tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Feuille de Route Complète</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0F172A]">
              Parcours 30 Jours CinqMinutes
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-1">
              De l'idée brute jusqu'à l'immatriculation et aux premiers contrats, 5 minutes par jour.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs font-bold text-[#64748B] uppercase">Progression</span>
              <div className="text-xl sm:text-2xl font-black text-[#0F172A] font-display">
                {totalCompleted} / 30 <span className="text-xs font-bold text-[#FF6B35]">({progressPercent}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 space-y-2">
          <div className="w-full h-3 bg-[#E2E8F0] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FF6B35] transition-all duration-500 rounded-full"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-bold text-[#64748B]">
            <span>Jour 1 : Idée & Compétences</span>
            <span>Jour 15 : Premiers prospects</span>
            <span>Jour 30 : Lancement officiel</span>
          </div>
        </div>

        {/* Week Filter Pills */}
        <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-[#F1F5F9]">
          <button
            onClick={() => setSelectedWeekFilter("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              selectedWeekFilter === "all"
                ? "bg-[#1E293B] text-white shadow-sm"
                : "bg-[#F8FAFC] border border-[#CBD5E1] text-[#475569] hover:text-[#0F172A]"
            }`}
          >
            Tout afficher (30 jours)
          </button>

          {weeks.map((w) => {
            const countDone = w.days.filter((d) => completedDays.includes(d)).length;
            const isSelected = selectedWeekFilter === w.weekNum;
            return (
              <button
                key={w.weekNum}
                onClick={() => setSelectedWeekFilter(w.weekNum)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#FF6B35] text-white shadow-sm"
                    : "bg-[#F8FAFC] border border-[#CBD5E1] text-[#475569] hover:text-[#0F172A]"
                }`}
              >
                <span>S{w.weekNum}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                    isSelected ? "bg-[#1E293B] text-white" : "bg-[#E2E8F0] text-[#0F172A]"
                  }`}
                >
                  {countDone}/{w.days.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Week Groups Grid */}
      <div className="space-y-8">
        {filteredWeeks.map((week) => {
          const weekLessons = CURRICULUM_DATA.filter((l) => week.days.includes(l.dayNumber));
          const completedInWeek = week.days.filter((d) => completedDays.includes(d)).length;
          const isWeekCompleted = completedInWeek === week.days.length;

          return (
            <div
              key={week.weekNum}
              className="bg-white rounded-3xl border-2 border-[#1E293B] shadow-[5px_5px_0px_0px_#1E293B] p-6 sm:p-8 space-y-6"
            >
              {/* Week Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-2xl border-2 flex items-center justify-center font-black text-sm ${
                      isWeekCompleted
                        ? "bg-emerald-500 border-emerald-600 text-white"
                        : "bg-[#1E293B] border-[#1E293B] text-white"
                    }`}
                  >
                    {isWeekCompleted ? "✓" : `S${week.weekNum}`}
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B35]">
                      {week.tag}
                    </span>
                    <h3 className="text-xl font-bold font-display text-[#0F172A]">
                      {week.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
                      isWeekCompleted
                        ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                        : "bg-[#F1F5F9] text-[#475569] border-[#CBD5E1]"
                    }`}
                  >
                    {completedInWeek} / {week.days.length} validés
                  </span>
                </div>
              </div>

              {/* Day Cards Grid for this Week */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {weekLessons.map((lesson) => {
                  const isDone = completedDays.includes(lesson.dayNumber);
                  const isCurrent = activeDayNumber === lesson.dayNumber;

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => onSelectDay(lesson.dayNumber)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between hover:-translate-y-0.5 ${
                        isCurrent
                          ? "bg-[#FFF2EB] border-[#FF6B35] shadow-[3px_3px_0px_0px_#1E293B] ring-2 ring-[#FF6B35]"
                          : isDone
                          ? "bg-white border-emerald-400 shadow-sm"
                          : "bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#CBD5E1]"
                      }`}
                    >
                      <div>
                        {/* Day & Status pill */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="px-2 py-0.5 rounded-md bg-[#1E293B] text-white text-[10px] font-bold">
                            Jour {lesson.dayNumber}
                          </span>

                          {isDone ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Fait</span>
                            </span>
                          ) : isCurrent ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D63900]">
                              <Flame className="w-3.5 h-3.5 text-[#FF6B35] fill-current" />
                              <span>En cours</span>
                            </span>
                          ) : (
                            <span className="text-[11px] text-[#94A3B8] font-medium">5 min</span>
                          )}
                        </div>

                        {/* Title */}
                        <h4 className="font-bold text-sm text-[#0F172A] leading-snug line-clamp-2">
                          {lesson.title}
                        </h4>

                        <p className="text-xs text-[#64748B] mt-1.5 line-clamp-2">
                          {lesson.subtitle}
                        </p>
                      </div>

                      {/* Bottom action trigger */}
                      <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                        <span className="text-[11px] font-bold text-[#FF6B35]">
                          {lesson.badge}
                        </span>
                        <div className="flex items-center gap-1 font-extrabold text-[#0F172A]">
                          <span>Ouvrir</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
