"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  Settings,
  User,
  Bell,
  Sparkles,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  LogOut,
  Clock,
  Briefcase,
} from "lucide-react";

interface SettingsViewProps {
  userName: string;
  userEmail: string;
  projectTitle: string;
  projectDescription: string;
  targetAudience: string;
  activityType: string;
  reminderTime: string;
  onUpdateSettings: (settings: {
    projectTitle: string;
    projectDescription: string;
    targetAudience: string;
    activityType: string;
    reminderTime: string;
  }) => Promise<boolean>;
}

export default function SettingsView({
  userName,
  userEmail,
  projectTitle: initialProjectTitle,
  projectDescription: initialProjectDescription,
  targetAudience: initialTargetAudience,
  activityType: initialActivityType,
  reminderTime: initialReminderTime,
  onUpdateSettings,
}: SettingsViewProps) {
  const router = useRouter();
  const [projectTitle, setProjectTitle] = useState(initialProjectTitle || "Mon Projet d'Activité");
  const [projectDescription, setProjectDescription] = useState(initialProjectDescription || "");
  const [targetAudience, setTargetAudience] = useState(initialTargetAudience || "");
  const [activityType, setActivityType] = useState(initialActivityType || "Conseil & Prestations B2B");
  const [reminderTime, setReminderTime] = useState(initialReminderTime || "08:30");

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);
    setErrorMsg("");

    try {
      const ok = await onUpdateSettings({
        projectTitle: projectTitle.trim(),
        projectDescription: projectDescription.trim(),
        targetAudience: targetAudience.trim(),
        activityType,
        reminderTime,
      });

      if (ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      } else {
        setErrorMsg("Une erreur est survenue lors de la sauvegarde.");
      }
    } catch (err) {
      setErrorMsg("Impossible de joindre le serveur.");
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/sign-in");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border-2 border-[#1E293B] shadow-[5px_5px_0px_0px_#1E293B] p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF2EB] border border-[#FF6B35] text-[#D63900] text-xs font-extrabold uppercase tracking-wider mb-2">
              <Settings className="w-3.5 h-3.5" />
              <span>Configuration</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0F172A]">
              Paramètres du Projet & Compte
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-1">
              Personnalisez les détails de votre activité et vos préférences de routine.
            </p>
          </div>
        </div>

        {/* User Snapshot */}
        <div className="mt-6 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#1E293B] text-white font-extrabold text-sm flex items-center justify-center border-2 border-[#1E293B]">
              {userName ? userName.slice(0, 2).toUpperCase() : "CM"}
            </div>
            <div>
              <div className="font-extrabold text-base text-[#0F172A]">{userName}</div>
              <div className="text-xs text-[#64748B]">{userEmail}</div>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="px-4 py-2 rounded-xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Se déconnecter</span>
          </button>
        </div>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Project Details */}
        <div className="bg-white rounded-3xl border-2 border-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] p-6 sm:p-8 space-y-5">
          <h3 className="text-lg font-bold font-display text-[#0F172A] flex items-center gap-2 pb-3 border-b border-[#E2E8F0]">
            <Briefcase className="w-5 h-5 text-[#FF6B35]" />
            <span>Détails de votre Activité</span>
          </h3>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#475569]">
                Intitulé de votre projet / nom commercial
              </label>
              <input
                type="text"
                required
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="Ex : Conseil Rédaction LinkedIn & Copywriting B2B"
                className="w-full px-4 py-3 rounded-xl border-2 border-[#CBD5E1] bg-[#F8FAFC] text-sm text-[#0F172A] font-bold focus:border-[#FF6B35] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#475569]">
                  Type d'activité principale
                </label>
                <select
                  value={activityType}
                  onChange={(e) => setActivityType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-[#CBD5E1] bg-[#F8FAFC] text-sm text-[#0F172A] font-medium focus:border-[#FF6B35] focus:outline-none"
                >
                  <option value="Conseil & Prestations B2B">Conseil & Prestations B2B</option>
                  <option value="Freelance Digital & Créatif">Freelance Digital & Créatif</option>
                  <option value="Coaching & Formation">Coaching & Formation</option>
                  <option value="Artisanat & Services locaux">Artisanat & Services locaux</option>
                  <option value="Produits digitaux & E-commerce">Produits digitaux & E-commerce</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#475569]">
                  Cible prioritaire (Persona en bref)
                </label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="Ex : Consultants indépendants solos"
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-[#CBD5E1] bg-[#F8FAFC] text-sm text-[#0F172A] font-medium focus:border-[#FF6B35] focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#475569]">
                Description rapide du service proposé
              </label>
              <textarea
                rows={3}
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Ex : Rédaction hebdomadaire de publications et optimisation de profils pour générer des rendez-vous qualifiés..."
                className="w-full px-4 py-2.5 rounded-xl border-2 border-[#CBD5E1] bg-[#F8FAFC] text-sm text-[#0F172A] font-medium focus:border-[#FF6B35] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Routine & Reminder Slot */}
        <div className="bg-white rounded-3xl border-2 border-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] p-6 sm:p-8 space-y-5">
          <h3 className="text-lg font-bold font-display text-[#0F172A] flex items-center gap-2 pb-3 border-b border-[#E2E8F0]">
            <Clock className="w-5 h-5 text-[#FF6B35]" />
            <span>Votre Routine Quotidienne de 5 Minutes</span>
          </h3>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#475569]">
                Créneau horaire favori pour votre session de 5 min
              </label>
              <select
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-[#CBD5E1] bg-[#F8FAFC] text-sm text-[#0F172A] font-medium focus:border-[#FF6B35] focus:outline-none"
              >
                <option value="08:30">Matin avec le café (08h30)</option>
                <option value="12:45">Pause déjeuner (12h45)</option>
                <option value="18:30">Fin de journée / Soirée (18h30)</option>
                <option value="21:00">Calme du soir (21h00)</option>
              </select>
              <p className="text-[11px] text-[#64748B] mt-1">
                La régularité est le secret des porteurs de projet qui arrivent au bout de leur création.
              </p>
            </div>
          </div>
        </div>

        {/* Save button & status */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            {savedSuccess && (
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-300 animate-fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <span>Paramètres enregistrés avec succès !</span>
              </div>
            )}
            {errorMsg && (
              <div className="flex items-center gap-2 text-xs font-bold text-red-600 bg-red-50 px-4 py-2 rounded-xl border border-red-200">
                <AlertCircle className="w-4 h-4" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#1E293B] hover:bg-[#FF6B35] text-white font-extrabold text-sm sm:text-base border-2 border-[#1E293B] shadow-[3px_3px_0px_0px_#FF6B35] hover:shadow-[1px_1px_0px_0px_#1E293B] active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sauvegarde en cours...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Enregistrer mes paramètres</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
