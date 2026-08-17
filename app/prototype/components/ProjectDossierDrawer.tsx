"use client";

import { useState } from "react";
import { LessonDay, CURRICULUM_DATA } from "@/app/data/curriculumData";
import {
  FolderCheck,
  Download,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Printer,
  FileText,
  ShieldCheck,
  Award,
} from "lucide-react";

interface ProjectDossierDrawerProps {
  completedDays: number[];
  deliverablesMap: Record<string, string>;
  projectTitle: string;
  learnerName: string;
}

export default function ProjectDossierDrawer({
  completedDays,
  deliverablesMap,
  projectTitle,
  learnerName,
}: ProjectDossierDrawerProps) {
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState<"all" | "s1" | "s2" | "s3" | "s4">("all");

  const completedCount = completedDays.length;

  const handleCopyAll = () => {
    const textLines = [
      `=== DOSSIER DE CRÉATION D'ACTIVITÉ - CINQMINUTES ===`,
      `Porteur de projet : ${learnerName}`,
      `Projet : ${projectTitle}`,
      `Date d'export : ${new Date().toLocaleDateString("fr-FR")}`,
      `Progression : ${completedCount}/30 livrables validés`,
      `-----------------------------------------------------\n`,
    ];

    CURRICULUM_DATA.forEach((lesson) => {
      const isDone = completedDays.includes(lesson.dayNumber);
      const val = deliverablesMap[lesson.deliverableKey] || lesson.microAction.sampleValue;
      textLines.push(`[Jour ${lesson.dayNumber}] ${lesson.deliverableLabel} :`);
      textLines.push(isDone ? `✓ ${val}` : `(En attente de validation)`);
      textLines.push("");
    });

    navigator.clipboard.writeText(textLines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border-2 border-[#1E293B] shadow-[5px_5px_0px_0px_#1E293B] p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF2EB] border-2 border-[#1E293B] flex items-center justify-center text-[#FF6B35]">
              <FolderCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B35]">
                Génération continue
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0F172A]">
                Mon Dossier de Création d'Activité
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopyAll}
              className="px-4 py-2.5 rounded-xl border-2 border-[#1E293B] bg-white text-xs sm:text-sm font-bold text-[#0F172A] hover:bg-[#F8FAFC] transition-all cursor-pointer flex items-center gap-2 shadow-[2px_2px_0px_0px_#1E293B] active:translate-y-0.5"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span>Copié dans le presse-papier !</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#FF6B35]" />
                  <span>Copier le texte du dossier</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="p-2.5 rounded-xl border-2 border-[#CBD5E1] hover:border-[#1E293B] bg-white text-[#475569] hover:text-[#0F172A] transition-all cursor-pointer"
              title="Imprimer ou enregistrer en PDF"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Project Meta Info */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <span className="text-xs font-bold text-[#64748B] uppercase">Apprenant</span>
            <div className="text-sm font-extrabold text-[#0F172A] mt-0.5">{learnerName}</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <span className="text-xs font-bold text-[#64748B] uppercase">Intitulé du projet</span>
            <div className="text-sm font-extrabold text-[#0F172A] mt-0.5">{projectTitle}</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF2EB] border border-[#FFD6C4]">
            <span className="text-xs font-bold text-[#D63900] uppercase">Livrables validés</span>
            <div className="text-sm font-extrabold text-[#D63900] mt-0.5">
              {completedCount} sur 30 fiches
            </div>
          </div>
        </div>
      </div>

      {/* Structured Deliverables View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Module 1 & 2 */}
        <div className="space-y-6">
          {/* Section 1 : Idée & Proposition de valeur */}
          <div className="bg-white rounded-3xl border-2 border-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <h3 className="font-display font-bold text-lg text-[#0F172A] flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#FF6B35] text-white text-xs flex items-center justify-center font-bold">1</span>
                <span>Socle & Proposition de Valeur</span>
              </h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                Semaine 1 & 2
              </span>
            </div>

            {/* Deliverable Cards */}
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="flex items-center justify-between text-xs font-bold text-[#64748B] mb-1">
                  <span>J1 • Compétence d'ancrage</span>
                  <span className="text-emerald-600">✓ Validé</span>
                </div>
                <p className="text-sm text-[#0F172A] font-medium leading-relaxed">
                  {deliverablesMap["core_skill"] || "Rédaction de profils LinkedIn et pages de vente claires pour consultants indépendants."}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="flex items-center justify-between text-xs font-bold text-[#64748B] mb-1">
                  <span>J2 • Irritant majeur résolu</span>
                  <span className="text-emerald-600">✓ Validé</span>
                </div>
                <p className="text-sm text-[#0F172A] font-medium leading-relaxed">
                  {deliverablesMap["pain_point"] || "Ils n'ont pas de visibilité sur LinkedIn et n'arrivent pas à générer des demandes entrantes qualifiées."}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFF2EB] border border-[#FF6B35]">
                <div className="flex items-center justify-between text-xs font-bold text-[#D63900] mb-1">
                  <span>J8 • Promesse Irrésistible (Clé de vente)</span>
                  <span className="text-[#FF6B35]">🔥 Cœur d'offre</span>
                </div>
                <p className="text-sm sm:text-base text-[#0F172A] font-bold leading-relaxed">
                  "{deliverablesMap["value_proposition"] || "J'aide les consultants indépendants à générer 2 rendez-vous clients qualifiés par mois grâce à une présence LinkedIn optimisée, sans devoir passer des heures à rédiger eux-mêmes."}"
                </p>
              </div>
            </div>
          </div>

          {/* Section 2 : Tarifs & Modalités */}
          <div className="bg-white rounded-3xl border-2 border-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <h3 className="font-display font-bold text-lg text-[#0F172A] flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#FF6B35] text-white text-xs flex items-center justify-center font-bold">2</span>
                <span>Grille Tarifaire & Packaging</span>
              </h3>
              <span className="text-xs font-bold text-[#64748B] bg-[#F1F5F9] px-2.5 py-0.5 rounded-lg border border-[#CBD5E1]">
                Semaine 2
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="flex items-center justify-between text-xs font-bold text-[#64748B] mb-1">
                  <span>J10 • Tarif forfaitaire de lancement</span>
                  <span className="text-emerald-600 font-bold">✓ Forfait</span>
                </div>
                <p className="text-sm text-[#0F172A] font-medium">
                  {deliverablesMap["pricing_launch"] || "450 € TTC par mois (Pack Décollage 8 publications optimisées)"}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="flex items-center justify-between text-xs font-bold text-[#64748B] mb-1">
                  <span>J11 • Offre d'entrée (Pied dans la porte)</span>
                  <span className="text-emerald-600">✓ Démarrage</span>
                </div>
                <p className="text-sm text-[#0F172A] font-medium">
                  {deliverablesMap["front_offer"] || "Audit flash de votre profil LinkedIn + réécriture du titre accrocheur à 69 €."}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="flex items-center justify-between text-xs font-bold text-[#64748B] mb-1">
                  <span>J12 • Garantie sérénité</span>
                  <span className="text-emerald-600">✓ Confiance</span>
                </div>
                <p className="text-sm text-[#0F172A] font-medium">
                  {deliverablesMap["guarantee"] || "Garantie '100% aligné' : révisions illimitées jusqu'à validation intégrale."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Module 3 & 4 */}
        <div className="space-y-6">
          {/* Section 3 : Prospection & Premiers Clients */}
          <div className="bg-white rounded-3xl border-2 border-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <h3 className="font-display font-bold text-lg text-[#0F172A] flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#FF6B35] text-white text-xs flex items-center justify-center font-bold">3</span>
                <span>Plan d'Acquisition des 3 Premiers Clients</span>
              </h3>
              <span className="text-xs font-bold text-[#64748B] bg-[#F1F5F9] px-2.5 py-0.5 rounded-lg border border-[#CBD5E1]">
                Semaine 3
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="flex items-center justify-between text-xs font-bold text-[#64748B] mb-1">
                  <span>J15 • Premiers contacts réseau chaud</span>
                  <span className="text-[#64748B]">3 cibles</span>
                </div>
                <p className="text-xs sm:text-sm text-[#0F172A] font-medium whitespace-pre-line">
                  {deliverablesMap["warm_leads"] || "1. Nicolas (ex-collègue aujourd'hui consultant freelance)\n2. Camille (responsable comm rencontrée en meetup)\n3. Édouard (ami entrepreneur individuel)"}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="flex items-center justify-between text-xs font-bold text-[#64748B] mb-1">
                  <span>J17 • Modèle de message de prise de contact</span>
                  <span className="text-[#64748B]">Script</span>
                </div>
                <p className="text-xs sm:text-sm text-[#0F172A] font-medium italic">
                  "{deliverablesMap["outreach_script"] || "Bonjour [Prénom], j'ai lu avec attention ton dernier partage sur ton activité de conseil. Par curiosité, combien de temps passes-tu chaque semaine sur ta présence LinkedIn ?"}"
                </p>
              </div>
            </div>
          </div>

          {/* Section 4 : Cadre Légal & Facturation */}
          <div className="bg-white rounded-3xl border-2 border-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <h3 className="font-display font-bold text-lg text-[#0F172A] flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#FF6B35] text-white text-xs flex items-center justify-center font-bold">4</span>
                <span>Formalités Administratives & Cadre Légal</span>
              </h3>
              <span className="text-xs font-bold text-[#64748B] bg-[#F1F5F9] px-2.5 py-0.5 rounded-lg border border-[#CBD5E1]">
                Semaine 4
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="flex items-center justify-between text-xs font-bold text-[#64748B] mb-1">
                  <span>J22 • Statut juridique retenu</span>
                  <span className="text-emerald-600 font-bold">✓ Cadré</span>
                </div>
                <p className="text-sm text-[#0F172A] font-medium">
                  {deliverablesMap["legal_status_choice"] || "Micro-entreprise (Régime auto-entrepreneur individuel — Déclarations simplifiées URSSAF)"}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="flex items-center justify-between text-xs font-bold text-[#64748B] mb-1">
                  <span>J25 • Démarches Guichet Unique INPI</span>
                  <span className="text-emerald-600 font-bold">✓ Pièces</span>
                </div>
                <p className="text-sm text-[#0F172A] font-medium">
                  {deliverablesMap["inpi_checklist"] || "Pièces prêtes : CNI numérisée + Justificatif de domicile récent + Déclaration de non-condamnation."}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="flex items-center justify-between text-xs font-bold text-[#64748B] mb-1">
                  <span>J27 • Mentions obligatoires de facturation</span>
                  <span className="text-emerald-600 font-bold">✓ Conforme</span>
                </div>
                <p className="text-sm text-[#0F172A] font-medium">
                  {deliverablesMap["invoice_template"] || "Modèle conforme avec mention 'TVA non applicable, art. 293 B du CGI' et indemnité forfaitaire 40€."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
