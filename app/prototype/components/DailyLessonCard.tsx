"use client";

import { useState, useEffect } from "react";
import { LessonDay } from "@/app/data/curriculumData";
import {
  CheckCircle2,
  Circle,
  Lightbulb,
  Rocket,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  HelpCircle,
  Clock,
  BookOpen,
  FileCheck,
  Bookmark,
  Share2,
} from "lucide-react";

interface DailyLessonCardProps {
  lesson: LessonDay;
  isCompleted: boolean;
  onToggleComplete: (dayNumber: number, deliverableValue?: string) => void;
  onSelectDay: (dayNumber: number) => void;
  savedDeliverable?: string;
  totalDays?: number;
}

export default function DailyLessonCard({
  lesson,
  isCompleted,
  onToggleComplete,
  onSelectDay,
  savedDeliverable = "",
  totalDays = 30,
}: DailyLessonCardProps) {
  const [inputValue, setInputValue] = useState<string>(
    savedDeliverable || lesson.microAction.sampleValue || ""
  );
  const [isSavedNotice, setIsSavedNotice] = useState(false);
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    setInputValue(savedDeliverable || lesson.microAction.sampleValue || "");
  }, [lesson, savedDeliverable]);

  const handleCheckboxClick = () => {
    onToggleComplete(lesson.dayNumber, inputValue);
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 3000);
  };

  const handleInputChange = (val: string) => {
    setInputValue(val);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Phase & Day Info */}
      <div className="bg-white rounded-3xl border-2 border-[#1E293B] shadow-[5px_5px_0px_0px_#1E293B] p-6">
        {/* Category & Status Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-[#1E293B] text-white text-xs font-bold uppercase tracking-wider">
              {lesson.weekTitle.split(":")[0]}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#FFF2EB] text-[#D63900] border border-[#FF6B35] text-xs font-bold">
              {lesson.badge}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs text-[#64748B] font-medium bg-[#F1F5F9] px-3 py-1 rounded-full border border-[#CBD5E1]">
              <Clock className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span>5 min chrono</span>
            </span>

            {isCompleted ? (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Jour validé</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#FF6B35] bg-[#FFF2EB] px-3 py-1 rounded-full border border-[#FF6B35]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>À valider aujourd'hui</span>
              </span>
            )}
          </div>
        </div>

        {/* Lesson Title & Subtitle */}
        <div className="mt-5">
          <div className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
            Jour {lesson.dayNumber} sur {totalDays}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] font-display tracking-tight mt-1">
            {lesson.title}
          </h2>
          <p className="text-[#475569] text-base sm:text-lg mt-2 font-medium leading-relaxed">
            {lesson.subtitle}
          </p>
        </div>
      </div>

      {/* =========================================================================
          PART 1 : CONCEPT CLÉ EN 2 MINUTES (ZÉRO JARGON)
         ========================================================================= */}
      <div className="bg-white rounded-3xl border-2 border-[#1E293B] shadow-[5px_5px_0px_0px_#1E293B] p-6 sm:p-8">
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF2EB] border-2 border-[#FF6B35] flex items-center justify-center text-[#FF6B35]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF6B35]">
                Partie 1 • {lesson.concept.readingTime}
              </span>
              <h3 className="text-xl font-bold font-display text-[#0F172A]">
                {lesson.concept.title}
              </h3>
            </div>
          </div>

          <span className="hidden sm:inline-flex px-3 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-bold text-[#475569]">
            Zéro jargon
          </span>
        </div>

        {/* Concept Summary Paragraph */}
        <p className="mt-5 text-base sm:text-lg text-[#334155] leading-relaxed font-normal">
          {lesson.concept.summary}
        </p>

        {/* 3 Key Takeaways Bullet List */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border-2 border-[#E2E8F0] space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#1E293B] flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-[#FF6B35]" />
            <span>Les 3 points d'ancrage essentiels</span>
          </div>
          <ul className="space-y-2.5">
            {lesson.concept.keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-[#334155]">
                <span className="w-5 h-5 rounded-full bg-[#FFF2EB] border border-[#FF6B35] text-[#D63900] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Good vs Bad Example Cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Example Bad */}
          <div className="p-4 rounded-2xl bg-red-50/70 border-2 border-red-200">
            <div className="flex items-center gap-2 text-xs font-bold text-red-700 uppercase tracking-wider mb-2">
              <span className="w-4 h-4 rounded-full bg-red-200 text-red-800 flex items-center justify-center text-[10px]">✕</span>
              <span>À éviter (flou ou abstrait)</span>
            </div>
            <p className="text-xs sm:text-sm text-red-900 italic leading-relaxed">
              "{lesson.concept.exampleBad}"
            </p>
          </div>

          {/* Example Good */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 border-2 border-emerald-300">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
              <span className="w-4 h-4 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center text-[10px]">✓</span>
              <span>À appliquer (clair et percutant)</span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
              "{lesson.concept.exampleGood}"
            </p>
          </div>
        </div>

        {/* Final Takeaway Quote */}
        <div className="mt-6 p-4 rounded-2xl bg-[#FFF2EB] border border-[#FFD6C4] flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-[#FF6B35] shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm font-bold text-[#D63900]">
            Règle d'or : {lesson.concept.takeaway}
          </p>
        </div>
      </div>

      {/* =========================================================================
          PART 2 : MICRO-ACTION GUIDÉE EN 3 MINUTES (LE LIVRABLE)
         ========================================================================= */}
      <div className="bg-white rounded-3xl border-2 border-[#1E293B] shadow-[6px_6px_0px_0px_#FF6B35] p-6 sm:p-8">
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF6B35] border-2 border-[#1E293B] flex items-center justify-center text-white shadow-sm">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF6B35]">
                Partie 2 • {lesson.microAction.executionTime}
              </span>
              <h3 className="text-xl font-bold font-display text-[#0F172A]">
                {lesson.microAction.title}
              </h3>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-[#FFF2EB] border border-[#FF6B35] text-xs font-bold text-[#D63900]">
            Action concrète
          </span>
        </div>

        {/* Instruction */}
        <p className="mt-5 text-base text-[#334155] font-medium leading-relaxed">
          {lesson.microAction.instruction}
        </p>

        {/* Interactive Worksheet Input */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1E293B]">
              {lesson.microAction.fieldLabel}
            </label>
            <button
              onClick={() => setShowTip(!showTip)}
              className="text-xs text-[#FF6B35] hover:text-[#D63900] font-bold flex items-center gap-1 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Conseil d'écriture</span>
            </button>
          </div>

          {showTip && (
            <div className="p-3 rounded-xl bg-[#FFF2EB] border border-[#FFD6C4] text-xs text-[#D63900] animate-fade-in">
              💡 {lesson.microAction.helpTip}
            </div>
          )}

          {/* Form Control based on fieldType */}
          {lesson.microAction.fieldType === "textarea" ? (
            <textarea
              rows={4}
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={lesson.microAction.placeholder}
              className="w-full p-4 rounded-2xl border-2 border-[#1E293B] bg-[#F8FAFC] focus:bg-white focus:border-[#FF6B35] focus:outline-none text-[#0F172A] text-sm sm:text-base font-medium transition-all shadow-inner leading-relaxed"
            />
          ) : lesson.microAction.fieldType === "options" && lesson.microAction.options ? (
            <div className="space-y-2.5">
              {lesson.microAction.options.map((opt, idx) => {
                const isSelected = inputValue === opt;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleInputChange(opt)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? "bg-[#FFF2EB] border-[#FF6B35] shadow-[3px_3px_0px_0px_#1E293B] font-bold text-[#0F172A]"
                        : "bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#CBD5E1] text-[#334155]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected
                            ? "border-[#FF6B35] bg-[#FF6B35] text-white"
                            : "border-[#CBD5E1] bg-white"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </span>
                      <span className="text-sm sm:text-base">{opt}</span>
                    </div>
                    {isSelected && (
                      <span className="text-xs font-bold text-[#FF6B35] uppercase tracking-wider">
                        Sélectionné
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <input
              type="text"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={lesson.microAction.placeholder}
              className="w-full px-4 py-3.5 rounded-2xl border-2 border-[#1E293B] bg-[#F8FAFC] focus:bg-white focus:border-[#FF6B35] focus:outline-none text-[#0F172A] text-sm sm:text-base font-medium transition-all shadow-inner"
            />
          )}

          {/* Real-time Deliverable Preview Pill */}
          <div className="p-4 rounded-2xl bg-[#F8FAFC] border-2 border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#475569]">
              <FileCheck className="w-4 h-4 text-[#FF6B35]" />
              <span>Généré pour votre dossier :</span>
              <span className="text-[#0F172A] font-extrabold">{lesson.deliverableLabel}</span>
            </div>
            <span className="text-[11px] text-[#64748B]">
              {inputValue ? "✓ Prêt à sauvegarder" : "Champ vide"}
            </span>
          </div>
        </div>

        {/* =========================================================================
            VALIDATION CHECKBOX & PRIMARY BUTTON
           ========================================================================= */}
        <div className="mt-8 pt-6 border-t-2 border-[#F1F5F9] space-y-4">
          <div
            onClick={handleCheckboxClick}
            className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${
              isCompleted
                ? "bg-emerald-50 border-emerald-400 shadow-[3px_3px_0px_0px_#10B981]"
                : "bg-[#FFF2EB] border-[#FF6B35] hover:bg-[#FFE5D6] shadow-[3px_3px_0px_0px_#1E293B]"
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div
                className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${
                  isCompleted
                    ? "bg-emerald-500 border-emerald-600 text-white"
                    : "bg-white border-[#1E293B] text-transparent hover:border-[#FF6B35]"
                }`}
              >
                <Check className={`w-5 h-5 stroke-[3] ${isCompleted ? "text-white" : "opacity-0"}`} />
              </div>
              <div>
                <span className="font-extrabold text-sm sm:text-base text-[#0F172A] block">
                  {isCompleted
                    ? `✓ Jour ${lesson.dayNumber} validé avec succès`
                    : `Cocher pour valider la micro-action du Jour ${lesson.dayNumber}`}
                </span>
                <span className="text-xs text-[#475569]">
                  {isCompleted
                    ? "Cliquez pour modifier ou retirer la validation"
                    : "Enregistre votre livrable et incrémente votre série quotidienne (+50 XP)"}
                </span>
              </div>
            </div>

            <span
              className={`hidden sm:inline-flex px-3 py-1.5 rounded-xl text-xs font-extrabold border uppercase tracking-wider ${
                isCompleted
                  ? "bg-emerald-600 text-white border-emerald-700"
                  : "bg-[#FF6B35] text-white border-[#1E293B]"
              }`}
            >
              {isCompleted ? "Validé" : "À faire"}
            </span>
          </div>

          {/* Action confirmation button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={handleCheckboxClick}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base border-2 border-[#1E293B] transition-all cursor-pointer flex items-center justify-center gap-2.5 shadow-[4px_4px_0px_0px_#1E293B] active:translate-y-0.5 ${
                isCompleted
                  ? "bg-white text-[#0F172A] hover:bg-[#F8FAFC]"
                  : "bg-[#FF6B35] text-white hover:bg-[#E55A25]"
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Enregistrer les modifications</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Valider le Jour {lesson.dayNumber} (+50 XP)</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {isSavedNotice && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-300 animate-fade-in flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Livrable enregistré dans votre Dossier Projet !
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation between days */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          onClick={() => onSelectDay(Math.max(1, lesson.dayNumber - 1))}
          disabled={lesson.dayNumber === 1}
          className="px-4 py-2.5 rounded-xl border-2 border-[#CBD5E1] bg-white text-sm font-bold text-[#475569] hover:text-[#0F172A] hover:border-[#1E293B] transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Jour précédent (J{lesson.dayNumber - 1})</span>
        </button>

        <span className="text-xs font-bold text-[#64748B]">
          Jour {lesson.dayNumber} / {totalDays}
        </span>

        <button
          onClick={() => onSelectDay(Math.min(totalDays, lesson.dayNumber + 1))}
          disabled={lesson.dayNumber === totalDays}
          className="px-4 py-2.5 rounded-xl border-2 border-[#1E293B] bg-[#1E293B] text-white text-sm font-bold hover:bg-[#334155] transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2 shadow-[2px_2px_0px_0px_#FF6B35]"
        >
          <span>Jour suivant (J{lesson.dayNumber + 1})</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
