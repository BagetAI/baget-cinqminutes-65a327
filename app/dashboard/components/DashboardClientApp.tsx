"use client";

import { useState, useEffect } from "react";
import DashboardHeader from "./DashboardHeader";
import TodayLessonView from "./TodayLessonView";
import CurriculumMapView from "./CurriculumMapView";
import DossierAndToolsView from "./DossierAndToolsView";
import CohortCommunityView from "./CohortCommunityView";
import SettingsView from "./SettingsView";
import { Loader2, Sparkles, AlertCircle } from "lucide-react";

interface DashboardClientAppProps {
  initialUser?: {
    id: string;
    name: string;
    email: string;
  };
}

export default function DashboardClientApp({ initialUser }: DashboardClientAppProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // User and Progress State
  const [userName, setUserName] = useState(initialUser?.name || "Apprenant");
  const [userEmail, setUserEmail] = useState(initialUser?.email || "");
  const [activeTab, setActiveTab] = useState<"today" | "curriculum" | "dossier" | "community" | "settings">("today");
  const [activeDayNumber, setActiveDayNumber] = useState<number>(1);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [streakCount, setStreakCount] = useState<number>(1);
  const [xpPoints, setXpPoints] = useState<number>(0);
  const [deliverablesMap, setDeliverablesMap] = useState<Record<string, string>>({});

  // Project Meta
  const [projectTitle, setProjectTitle] = useState("Mon Projet d'Activité");
  const [projectDescription, setProjectDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [activityType, setActivityType] = useState("Conseil & Prestations B2B");
  const [reminderTime, setReminderTime] = useState("08:30");

  // Load progress from real PostgreSQL API
  const loadUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/user/progress");
      if (!res.ok) {
        throw new Error("Failed to load user data");
      }
      const data = await res.json();

      if (data.user) {
        setUserName(data.user.name || "Apprenant");
        setUserEmail(data.user.email || "");
      }

      if (data.progress) {
        setActiveDayNumber(data.progress.currentDay || 1);
        setStreakCount(data.progress.streakCount || 1);
        setXpPoints(data.progress.xpPoints || 0);
        setProjectTitle(data.progress.projectTitle || "Mon Projet d'Activité");
        setProjectDescription(data.progress.projectDescription || "");
        setTargetAudience(data.progress.targetAudience || "");
        setActivityType(data.progress.activityType || "Conseil & Prestations B2B");
        setReminderTime(data.progress.reminderTime || "08:30");
      }

      if (Array.isArray(data.completedDays)) {
        setCompletedDays(data.completedDays);
      }

      if (data.deliverablesMap) {
        setDeliverablesMap(data.deliverablesMap);
      }
    } catch (err: any) {
      console.error("Error loading user progress:", err);
      setError("Impossible de charger les données du parcours.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  // Handle lesson completion toggle
  const handleToggleComplete = async (dayNum: number, deliverableVal?: string) => {
    const isAlreadyDone = completedDays.includes(dayNum);
    const newStatus = !isAlreadyDone;

    // Optimistic UI update
    if (newStatus) {
      setCompletedDays((prev) => (prev.includes(dayNum) ? prev : [...prev, dayNum]));
      setXpPoints((prev) => prev + 50);
      setStreakCount((prev) => prev + 1);
    } else {
      setCompletedDays((prev) => prev.filter((d) => d !== dayNum));
      setXpPoints((prev) => Math.max(0, prev - 50));
    }

    if (deliverableVal) {
      setDeliverablesMap((prev) => ({
        ...prev,
        [`day_${dayNum}`]: deliverableVal,
      }));
    }

    try {
      const res = await fetch("/api/user/lessons/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dayNumber: dayNum,
          deliverableKey: `day_${dayNum}`,
          deliverableValue: deliverableVal || "",
          markCompleted: newStatus,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.completedDays) setCompletedDays(data.completedDays);
        if (data.deliverablesMap) setDeliverablesMap(data.deliverablesMap);
        if (data.progress) {
          setXpPoints(data.progress.xpPoints);
          setStreakCount(data.progress.streakCount);
        }
      }
    } catch (err) {
      console.error("Error saving lesson completion:", err);
    }
  };

  // Handle settings update
  const handleUpdateSettings = async (settings: {
    projectTitle: string;
    projectDescription: string;
    targetAudience: string;
    activityType: string;
    reminderTime: string;
  }) => {
    try {
      const res = await fetch("/api/user/progress", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setProjectTitle(settings.projectTitle);
        setProjectDescription(settings.projectDescription);
        setTargetAudience(settings.targetAudience);
        setActivityType(settings.activityType);
        setReminderTime(settings.reminderTime);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error updating settings:", err);
      return false;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl border-2 border-[#1E293B] shadow-[6px_6px_0px_0px_#1E293B] text-center space-y-4 max-w-sm w-full">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF2EB] border-2 border-[#FF6B35] flex items-center justify-center mx-auto text-[#FF6B35]">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
          <h3 className="font-extrabold font-display text-lg text-[#0F172A]">
            Chargement de votre session...
          </h3>
          <p className="text-xs text-[#64748B]">
            Synchronisation de votre progression et de votre micro-action du jour.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl border-2 border-red-500 shadow-[6px_6px_0px_0px_#1E293B] text-center space-y-4 max-w-sm w-full">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
          <h3 className="font-extrabold font-display text-lg text-[#0F172A]">
            Erreur de connexion
          </h3>
          <p className="text-xs text-[#64748B]">{error}</p>
          <button
            onClick={loadUserData}
            className="w-full py-2.5 rounded-xl bg-[#1E293B] text-white text-xs font-bold hover:bg-[#334155]"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans pb-16">
      {/* Dashboard Top Header */}
      <DashboardHeader
        userName={userName}
        userEmail={userEmail}
        streakCount={streakCount}
        xpPoints={xpPoints}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        activeDayNumber={activeDayNumber}
        completedDaysCount={completedDays.length}
      />

      {/* Subheader Banner with Project Context */}
      <div className="bg-[#FFF2EB]/40 border-b-2 border-[#1E293B] py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B35] animate-pulse shrink-0"></span>
            <span className="font-bold text-[#0F172A]">
              Projet en cours :{" "}
              <strong className="text-[#D63900]">{projectTitle}</strong>
            </span>
            <span className="text-[#94A3B8] hidden md:inline">•</span>
            <span className="text-[#64748B] hidden md:inline">{activityType}</span>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center font-semibold text-[#64748B]">
            <span>
              Livrables :{" "}
              <strong className="text-[#0F172A]">{completedDays.length}/30 validés</strong>
            </span>
            <span>•</span>
            <span>
              Prochaine micro-action :{" "}
              <strong className="text-[#FF6B35]">Jour {activeDayNumber} (5 min)</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex-1 w-full">
        {activeTab === "today" && (
          <TodayLessonView
            activeDayNumber={activeDayNumber}
            completedDays={completedDays}
            deliverablesMap={deliverablesMap}
            onToggleComplete={handleToggleComplete}
            onSelectDay={(dayNum) => setActiveDayNumber(dayNum)}
            onExploreCurriculum={() => setActiveTab("curriculum")}
            streakCount={streakCount}
          />
        )}

        {activeTab === "curriculum" && (
          <CurriculumMapView
            completedDays={completedDays}
            activeDayNumber={activeDayNumber}
            onSelectDay={(dayNum) => {
              setActiveDayNumber(dayNum);
              setActiveTab("today");
            }}
          />
        )}

        {activeTab === "dossier" && (
          <DossierAndToolsView
            completedDays={completedDays}
            deliverablesMap={deliverablesMap}
            projectTitle={projectTitle}
            learnerName={userName}
          />
        )}

        {activeTab === "community" && (
          <CohortCommunityView
            currentUserName={userName}
            currentDayNumber={activeDayNumber}
          />
        )}

        {activeTab === "settings" && (
          <SettingsView
            userName={userName}
            userEmail={userEmail}
            projectTitle={projectTitle}
            projectDescription={projectDescription}
            targetAudience={targetAudience}
            activityType={activityType}
            reminderTime={reminderTime}
            onUpdateSettings={handleUpdateSettings}
          />
        )}
      </main>
    </div>
  );
}
