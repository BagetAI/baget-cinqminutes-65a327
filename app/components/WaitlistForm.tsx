"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface WaitlistFormProps {
  variant?: "hero" | "card";
  className?: string;
  source?: string;
}

export default function WaitlistForm({
  variant = "hero",
  className = "",
  source = "homepage",
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [goal, setGoal] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMessage("Veuillez saisir une adresse email valide.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch(
        "https://app.baget.ai/api/public/databases/48ff5016-4dd6-4b8f-acbd-2ef0a0605a09/rows",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              email: email.trim(),
              first_name: firstName.trim() || undefined,
              goal: goal.trim() || undefined,
            },
          }),
        }
      );

      if (response.ok) {
        setStatus("success");
        setEmail("");
        setFirstName("");
        setGoal("");
      } else {
        const errorData = await response.json().catch(() => null);
        setStatus("error");
        setErrorMessage(
          errorData?.message || "Une erreur est survenue lors de l'enregistrement. Merci de réessayer."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage("Impossible de contacter le serveur. Veuillez vérifier votre connexion.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-[#FFF2EB] border-2 border-[#FF6B35] text-[#0F172A] p-6 rounded-2xl flex items-start gap-4 shadow-sm animate-fade-in">
        <CheckCircle2 className="w-7 h-7 text-[#FF6B35] shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-lg text-[#0F172A]">Inscription confirmee !</h4>
          <p className="text-sm text-[#334155] mt-1">
            Merci de votre confiance. Vous recevrez votre invitation exclusive des l'ouverture de la premiere session.
          </p>
        </div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <form onSubmit={handleSubmit} className={`w-full max-w-lg mx-auto ${className}`}>
        <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#1E293B] shadow-[6px_6px_0px_0px_#1E293B] space-y-4">
          <div className="space-y-1 text-left">
            <label htmlFor="card-name" className="block text-xs font-bold uppercase tracking-wider text-[#475569]">
              Votre prenom (optionnel)
            </label>
            <input
              id="card-name"
              type="text"
              placeholder="Ex. Alexandre"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#E2E8F0] focus:border-[#FF6B35] focus:outline-none text-[#0F172A] bg-[#F8FAFC] transition-colors"
            />
          </div>

          <div className="space-y-1 text-left">
            <label htmlFor="card-email" className="block text-xs font-bold uppercase tracking-wider text-[#475569]">
              Votre adresse email <span className="text-[#FF6B35]">*</span>
            </label>
            <input
              id="card-email"
              type="email"
              required
              placeholder="vous@exemple.fr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#E2E8F0] focus:border-[#FF6B35] focus:outline-none text-[#0F172A] bg-[#F8FAFC] transition-colors"
            />
          </div>

          <div className="space-y-1 text-left">
            <label htmlFor="card-goal" className="block text-xs font-bold uppercase tracking-wider text-[#475569]">
              Votre objectif (optionnel)
            </label>
            <select
              id="card-goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#E2E8F0] focus:border-[#FF6B35] focus:outline-none text-[#0F172A] bg-[#F8FAFC] transition-colors text-sm"
            >
              <option value="">Selectionnez votre profil</option>
              <option value="debutant_sans_idee">Je veux me lancer mais je cherche l'idee</option>
              <option value="idee_a_tester">J'ai une idee et je veux la tester</option>
              <option value="activite_secondaire">Je souhaite creer une activite secondaire</option>
            </select>
          </div>

          {status === "error" && (
            <div className="flex items-center gap-2 text-xs font-semibold text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-4 px-6 rounded-xl bg-[#FF6B35] text-white font-bold text-base hover:bg-[#E55A25] active:translate-y-0.5 transition-all shadow-[4px_4px_0px_0px_#1E293B] hover:shadow-[2px_2px_0px_0px_#1E293B] border-2 border-[#1E293B] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Inscription en cours...</span>
              </>
            ) : (
              <>
                <span>Rejoindre la premiere session</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          <p className="text-[11px] text-center text-[#64748B] pt-1">
            Acces anticipe gratuit. Pas de spam, desinscription en un clic.
          </p>
        </div>
      </form>
    );
  }

  // Hero inline form layout
  return (
    <form onSubmit={handleSubmit} className={`w-full max-w-xl mx-auto ${className}`}>
      <div className="flex flex-col sm:flex-row gap-2.5 p-2 bg-white rounded-2xl border-2 border-[#1E293B] shadow-[5px_5px_0px_0px_#1E293B]">
        <input
          type="email"
          required
          placeholder="Entrez votre email professionnel ou perso"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-3.5 rounded-xl border border-transparent focus:border-[#FF6B35] focus:bg-[#FFF2EB]/20 focus:outline-none text-[#0F172A] placeholder:text-[#94A3B8] text-sm sm:text-base font-medium"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="py-3.5 px-6 rounded-xl bg-[#FF6B35] text-white font-bold text-sm sm:text-base hover:bg-[#E55A25] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-sm disabled:opacity-70"
        >
          {status === "loading" ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <span>Rejoindre l'acces anticipe</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {status === "error" && (
        <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200 text-left">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="flex items-center justify-center gap-4 mt-3 text-xs text-[#64748B] font-medium">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#FF6B35]"></span>
          Session pilote gratuite
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#1E293B]"></span>
          5 min par jour
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
          Sans engagement
        </span>
      </div>
    </form>
  );
}
