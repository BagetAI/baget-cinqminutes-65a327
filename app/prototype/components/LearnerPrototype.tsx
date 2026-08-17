"use client";

import { useState } from "react";
import Link from "next/link";
import { CURRICULUM_DATA, DEMO_PROFILES, LessonDay } from "@/app/data/curriculumData";
import TimerFiveMinutes from "./TimerFiveMinutes";
import DailyLessonCard from "./DailyLessonCard";
import ThirtyDaysMap from "./ThirtyDaysMap";
import ProjectDossierDrawer from "./ProjectDossierDrawer";
import CelebrationModal from "./CelebrationModal";
import {
  Flame,
  Award,
  Calendar,
  Sparkles,
  Layers,
  FileCheck,
  RotateCcw,
  ArrowLeft,
  UserCheck,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

export default function LearnerPrototype() {
  // Demo profile state
  const [activeProfileIndex, setActiveProfileIndex] = useState(0);
  const currentProfile = DEMO_PROFILES[activeProfileIndex];

  // Core App State
  const [activeTab, setActiveTab] = useState<"today" | "curriculum" | "dossier">("today");
  const [activeDayNumber, setActiveDayNumber] = useState<number>(currentProfile.currentDay);
  const [completedDays, setCompletedDays] = useState<number[]>(currentProfile.completedDays);
  const [streakCount, setStreakCount] = useState<number>(currentProfile.streakDays);
  const [xpPoints, setXpPoints] = useState<number>(currentProfile.xp);
  const [deliverablesMap, setDeliverablesMap] = useState<Record<string, string>>({
    core_skill: "Rédaction de profils LinkedIn et pages de vente claires pour consultants indépendants.",
    pain_point: "Ils n'ont pas de visibilité sur LinkedIn et n'arrivent pas à générer des demandes entrantes qualifiées.",
    market_proof: "Des agences de ghostwriting facturent 800€/mois pour 8 posts, des freelances entre 350€ et 500€.",
    ideal_client: "Consultants B2B et formateurs solos en France qui veulent 2 rendez-vous qualifiés par semaine sans prospecter à la main.",
    differentiation_axis: "Rapidité d'exécution (livré en moins de 72h)",
    elevator_pitch: "J'aide les consultants solos à attirer des demandes entrantes sur LinkedIn sans passer 2h par jour à rédiger.",
    week1_review: "3 feux verts confirmés (Compétence + Marché + Cible)",
    value_proposition: "J'aide les consultants indépendants à générer 2 rendez-vous clients qualifiés par mois grâce à une présence LinkedIn optimisée, sans devoir passer des heures à rédiger eux-mêmes.",
  });

  // Modal State
  const [celebrationModalOpen, setCelebrationModalOpen] = useState(false);
  const [lastValidatedDay, setLastValidatedDay] = useState<number>(8);

  const activeLesson: LessonDay =
    CURRICULUM_DATA.find((l) => l.dayNumber === activeDayNumber) || CURRICULUM_DATA[0];

  // Toggle validation for a specific day
  const handleToggleComplete = (dayNum: number, deliverableValue?: string) => {
    const isAlreadyDone = completedDays.includes(dayNum);

    if (isAlreadyDone) {
      // Uncomplete day
      setCompletedDays((prev) => prev.filter((d) => d !== dayNum));
      setXpPoints((prev) => Math.max(0, prev - 50));
    } else {
      // Complete day
      setCompletedDays((prev) => [...prev, dayNum]);
      setStreakCount((prev) => prev + 1);
      setXpPoints((prev) => prev + 50);
      setLastValidatedDay(dayNum);
      setCelebrationModalOpen(true);
    }

    if (deliverableValue && activeLesson) {
      setDeliverablesMap((prev) => ({
        ...prev,
        [activeLesson.deliverableKey]: deliverableValue,
      }));
    }
  };

  // Switch learner profile preset
  const handleProfileSwitch = (index: number) => {
    setActiveProfileIndex(index);
    const p = DEMO_PROFILES[index];
    setActiveDayNumber(p.currentDay);
    setCompletedDays(p.completedDays);
    setStreakCount(p.streakDays);
    setXpPoints(p.xp);
  };

  // Reset to initial demo state
  const handleResetProgress = () => {
    const p = DEMO_PROFILES[0];
    setActiveDayNumber(8);
    setCompletedDays([1, 2, 3, 4, 5, 6, 7]);
    setStreakCount(5);
    setXpPoints(350);
    setActiveTab("today");
  };

  // Complete all 30 days for testing end state
  const handleCompleteAllDays = () => {
    const all = Array.from({ length: 30 }, (_, i) => i + 1);
    setCompletedDays(all);
    setStreakCount(30);
    setXpPoints(1500);
    setActiveDayNumber(30);
  };

  const isCurrentLessonDone = completedDays.includes(activeLesson.dayNumber);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans pb-16">
      {/* =========================================================================
          TOP NAV BAR FOR APP PROTOTYPE
         ========================================================================= */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-[#1E293B] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Logo & Prototype Indicator */}
            <div className="flex items-center gap-3.5 shrink-0">
              <Link href="/" className="flex items-center gap-3 group">
                <img
                  src="https://u3ubwwjuukuy3kkt.public.blob.vercel-storage.com/logos/dd92a86a-bc31-46dd-a1ac-0659b865a327.png"
                  alt="CinqMinutes"
                  className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
                />
                <span className="text-xl font-bold text-[#0F172A] font-display hidden sm:inline">
                  Cinq<span className="text-[#FF6B35]">Minutes</span>
                </span>
              </Link>

              <div className="h-6 w-[2px] bg-[#E2E8F0] hidden sm:block"></div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#FFF2EB] border border-[#FF6B35] text-[#D63900] text-xs font-extrabold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-ping"></span>
                <span>App Apprenant (Démo)</span>
              </span>
            </div>

            {/* Navigation Tabs (Today, 30-Day Map, Dossier) */}
            <nav className="hidden md:flex items-center gap-1.5 p-1 bg-[#F1F5F9] rounded-2xl border-2 border-[#CBD5E1]">
              <button
                onClick={() => setActiveTab("today")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === "today"
                    ? "bg-[#1E293B] text-white shadow-sm"
                    : "text-[#475569] hover:text-[#0F172A]"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span>Vue du Jour (J{activeDayNumber})</span>
              </button>

              <button
                onClick={() => setActiveTab("curriculum")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === "curriculum"
                    ? "bg-[#1E293B] text-white shadow-sm"
                    : "text-[#475569] hover:text-[#0F172A]"
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span>Parcours 30 Jours</span>
                <span className="px-1.5 py-0.5 rounded-md bg-[#334155] text-white text-[10px]">
                  {completedDays.length}/30
                </span>
              </button>

              <button
                onClick={() => setActiveTab("dossier")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === "dossier"
                    ? "bg-[#1E293B] text-white shadow-sm"
                    : "text-[#475569] hover:text-[#0F172A]"
                }`}
              >
                <FileCheck className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span>Dossier Projet</span>
              </button>
            </nav>

            {/* Streak, XP and Back to Landing */}
            <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
              {/* Streak Badge */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF2EB] border-2 border-[#1E293B] shadow-[2px_2px_0px_0px_#1E293B]">
                <Flame className="w-4 h-4 text-[#FF6B35] fill-current animate-bounce" />
                <span className="text-xs font-black text-[#0F172A]">{streakCount}j</span>
              </div>

              {/* XP Badge */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border-2 border-[#CBD5E1]">
                <Award className="w-4 h-4 text-[#FF6B35]" />
                <span className="text-xs font-extrabold text-[#1E293B]">{xpPoints} XP</span>
              </div>

              {/* Link back to marketing site */}
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border-2 border-[#1E293B] bg-white text-[#0F172A] hover:bg-[#F8FAFC] text-xs font-bold transition-all shadow-[2px_2px_0px_0px_#1E293B] active:translate-y-0.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Retour au site</span>
              </Link>
            </div>
          </div>

          {/* Mobile Tab bar */}
          <div className="flex md:hidden items-center justify-around gap-1 py-2 border-t border-[#E2E8F0]">
            <button
              onClick={() => setActiveTab("today")}
              className={`flex-1 py-2 text-center text-xs font-bold rounded-lg ${
                activeTab === "today" ? "bg-[#1E293B] text-white" : "text-[#475569]"
              }`}
            >
              Jour {activeDayNumber}
            </button>
            <button
              onClick={() => setActiveTab("curriculum")}
              className={`flex-1 py-2 text-center text-xs font-bold rounded-lg ${
                activeTab === "curriculum" ? "bg-[#1E293B] text-white" : "text-[#475569]"
              }`}
            >
              Parcours ({completedDays.length}/30)
            </button>
            <button
              onClick={() => setActiveTab("dossier")}
              className={`flex-1 py-2 text-center text-xs font-bold rounded-lg ${
                activeTab === "dossier" ? "bg-[#1E293B] text-white" : "text-[#475569]"
              }`}
            >
              Dossier
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          LEARNER HERO SUBHEADER & PROFILE CONTROLS
         ========================================================================= */}
      <div className="bg-[#FFF2EB]/40 border-b-2 border-[#1E293B] py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Active Learner Snapshot */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1E293B] text-white font-black text-sm flex items-center justify-center border-2 border-[#1E293B] shadow-sm">
              {currentProfile.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-[#0F172A]">{currentProfile.name}</span>
                <span className="text-xs text-[#64748B] font-medium hidden sm:inline">•</span>
                <span className="text-xs text-[#64748B] font-medium hidden sm:inline">
                  {currentProfile.projectTitle}
                </span>
              </div>
              <p className="text-xs text-[#475569] font-semibold">{currentProfile.role}</p>
            </div>
          </div>

          {/* Persona preset switcher for testing */}
          <div className="flex items-center gap-2 self-end sm:self-center text-xs">
            <span className="text-[#64748B] font-bold hidden md:inline">Profil de test :</span>
            <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-[#CBD5E1]">
              {DEMO_PROFILES.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => handleProfileSwitch(idx)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                    activeProfileIndex === idx
                      ? "bg-[#FF6B35] text-white"
                      : "text-[#475569] hover:bg-[#F1F5F9]"
                  }`}
                >
                  {p.name.split(" ")[0]}
                </button>
              ))}
            </div>

            <button
              onClick={handleResetProgress}
              className="p-1.5 rounded-xl border border-[#CBD5E1] bg-white text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
              title="Réinitialiser l'état démo"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MAIN CONTENT VIEW AREA
         ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex-1 w-full">
        {/* VIEW 1 : TODAY'S VIEW */}
        {activeTab === "today" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: 5-minute Timer & Quick Roadmap */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              {/* The 5-Minute Timer */}
              <TimerFiveMinutes
                dayNumber={activeLesson.dayNumber}
                onTimerComplete={() => {
                  // Optional callback
                }}
              />

              {/* Quick Today's Summary Card */}
              <div className="bg-white rounded-3xl border-2 border-[#1E293B] p-5 shadow-[4px_4px_0px_0px_#1E293B] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                    Votre routine en 2 temps
                  </span>
                  <span className="text-xs font-extrabold text-[#FF6B35]">5 min</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
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

                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FFF2EB] border border-[#FFD6C4]">
                    <div className="w-6 h-6 rounded-lg bg-[#FF6B35] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0F172A]">
                        3 min : Micro-action du jour
                      </div>
                      <p className="text-xs text-[#64748B] mt-0.5">
                        Rédiger le livrable et cocher la case de validation.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Switch to Full 30-Day View link */}
                <button
                  onClick={() => setActiveTab("curriculum")}
                  className="w-full py-2.5 rounded-xl border-2 border-[#1E293B] bg-[#F8FAFC] hover:bg-white text-xs font-bold text-[#0F172A] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5 text-[#FF6B35]" />
                  <span>Explorer tout le parcours (30 jours)</span>
                </button>
              </div>
            </div>

            {/* Right Column: Daily Lesson & Micro-Action Card */}
            <div className="lg:col-span-7">
              <DailyLessonCard
                lesson={activeLesson}
                isCompleted={isCurrentLessonDone}
                onToggleComplete={handleToggleComplete}
                onSelectDay={(d) => setActiveDayNumber(d)}
                savedDeliverable={deliverablesMap[activeLesson.deliverableKey]}
                totalDays={CURRICULUM_DATA.length}
              />
            </div>
          </div>
        )}

        {/* VIEW 2 : 30-DAY MAP */}
        {activeTab === "curriculum" && (
          <ThirtyDaysMap
            completedDays={completedDays}
            activeDayNumber={activeDayNumber}
            onSelectDay={(d) => {
              setActiveDayNumber(d);
              setActiveTab("today");
            }}
            onResetProgress={handleResetProgress}
            onCompleteAllDays={handleCompleteAllDays}
          />
        )}

        {/* VIEW 3 : PROJECT DOSSIER */}
        {activeTab === "dossier" && (
          <ProjectDossierDrawer
            completedDays={completedDays}
            deliverablesMap={deliverablesMap}
            projectTitle={currentProfile.projectTitle}
            learnerName={currentProfile.name}
          />
        )}
      </main>

      {/* Celebration Modal when completing a day */}
      <CelebrationModal
        isOpen={celebrationModalOpen}
        onClose={() => setCelebrationModalOpen(false)}
        dayNumber={lastValidatedDay}
        dayTitle={
          CURRICULUM_DATA.find((l) => l.dayNumber === lastValidatedDay)?.title ||
          "Micro-action validée"
        }
        streakCount={streakCount}
        onNextDay={() => {
          if (lastValidatedDay < 30) {
            setActiveDayNumber(lastValidatedDay + 1);
            setActiveTab("today");
          }
        }}
        isLastDay={lastValidatedDay === 30}
      />
    </div>
  );
}
