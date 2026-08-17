"use client";

import { useState } from "react";
import { CURRICULUM_DATA, LessonDay } from "@/app/data/curriculumData";
import TimerFiveMinutes from "@/app/prototype/components/TimerFiveMinutes";
import DailyLessonCard from "@/app/prototype/components/DailyLessonCard";
import CelebrationModal from "@/app/prototype/components/CelebrationModal";
import { Sparkles, Layers, Clock, ArrowRight, ShieldCheck, Award } from "lucide-react";

interface TodayLessonViewProps {
  activeDayNumber: number;
  completedDays: number[];
  deliverablesMap: Record<string, string>;
  onToggleComplete: (dayNumber: number, deliverableValue?: string) => Promise<void>;
  onSelectDay: (dayNumber: number) => void;
  onExploreCurriculum: () => void;
  streakCount: number;
}

export default function TodayLessonView({
  activeDayNumber,
  completedDays,
  deliverablesMap,
  onToggleComplete,
  onSelectDay,
  onExploreCurriculum,
  streakCount,
}: TodayLessonViewProps) {
  const [celebrationOpen, setCelebrationOpen] = useState(false);
  const [lastValidatedDay, setLastValidatedDay] = useState(activeDayNumber);

  const activeLesson: LessonDay =
    CURRICULUM_DATA.find((l) => l.dayNumber === activeDayNumber) || CURRICULUM_DATA[0];
  const isCompleted = completedDays.includes(activeLesson.dayNumber);

  const handleLessonValidation = async (dayNum: number, deliverableVal?: string) => {
    const wasAlreadyDone = completedDays.includes(dayNum);
    await onToggleComplete(dayNum, deliverableVal);

    if (!wasAlreadyDone) {
      setLastValidatedDay(dayNum);
      setCelebrationOpen(true);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 5-minute Timer & Routine Cards */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          {/* Real interactive 5-minute countdown */}
          <TimerFiveMinutes
            dayNumber={activeLesson.dayNumber}
            onTimerComplete={() => {}}
          />

          {/* Quick Routine Summary Card */}
          <div className="bg-white rounded-3xl border-2 border-[#1E293B] p-5 sm:p-6 shadow-[4px_4px_0px_0px_#1E293B] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                Votre routine en 2 temps
              </span>
              <span className="text-xs font-extrabold text-[#FF6B35] bg-[#FFF2EB] px-2.5 py-0.5 rounded-full border border-[#FF6B35]">
                5 min chrono
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="w-6 h-6 rounded-lg bg-[#1E293B] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0F172A]">
                    2 min : Assimiler le concept
                  </div>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Zéro jargon, exemples concrets 'à faire vs à éviter'.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FFF2EB] border border-[#FFD6C4]">
                <div className="w-6 h-6 rounded-lg bg-[#FF6B35] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0F172A]">
                    3 min : Micro-action du jour
                  </div>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Rédiger le livrable et valider la session (+50 XP).
                  </p>
                </div>
              </div>
            </div>

            {/* Jump to 30-day map */}
            <button
              onClick={onExploreCurriculum}
              className="w-full py-2.5 rounded-xl border-2 border-[#1E293B] bg-[#F8FAFC] hover:bg-white text-xs font-bold text-[#0F172A] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Layers className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span>Voir tout le parcours ({completedDays.length}/30 validés)</span>
            </button>
          </div>
        </div>

        {/* Right Column: Daily Lesson & Micro-Action Form */}
        <div className="lg:col-span-7">
          <DailyLessonCard
            lesson={activeLesson}
            isCompleted={isCompleted}
            onToggleComplete={handleLessonValidation}
            onSelectDay={onSelectDay}
            savedDeliverable={deliverablesMap[activeLesson.deliverableKey] || ""}
            totalDays={30}
          />
        </div>
      </div>

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={celebrationOpen}
        onClose={() => setCelebrationOpen(false)}
        dayNumber={lastValidatedDay}
        dayTitle={
          CURRICULUM_DATA.find((l) => l.dayNumber === lastValidatedDay)?.title ||
          "Micro-action validée"
        }
        streakCount={streakCount}
        onNextDay={() => {
          if (lastValidatedDay < 30) {
            onSelectDay(lastValidatedDay + 1);
          }
        }}
        isLastDay={lastValidatedDay === 30}
      />
    </div>
  );
}
