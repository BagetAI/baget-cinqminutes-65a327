"use client";

import { useState } from "react";
import {
  Check,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  Users,
  UserCheck,
  MessageSquare,
  HelpCircle,
  Clock,
  Layers,
  FileCheck,
  Award,
  CreditCard,
  Lock,
  ChevronDown,
  Info,
} from "lucide-react";
import OrderContactModal from "./OrderContactModal";

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"month" | "year">("month");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedPlanForContact, setSelectedPlanForContact] = useState("Formule Autonome");
  const [showComparisonTable, setShowComparisonTable] = useState(false);

  // Real Baget Payment URLs
  const PAYMENT_URLS = {
    autonome_monthly: "https://app.baget.ai/api/platform/v1/pay/c3610e59-6f3e-4c95-861d-1777300617ad",
    autonome_annual: "https://app.baget.ai/api/platform/v1/pay/0d29a086-9228-4031-87db-3a81f43e146a",
    promotion_guidee: "https://app.baget.ai/api/platform/v1/pay/7d387dfd-b30e-41c1-9f18-d2449c2e1b86",
    accompagnement_pro: "https://app.baget.ai/api/platform/v1/pay/52607aad-d073-4c16-a9f9-fb787b9e54b5",
  };

  const handleOpenContact = (planName: string) => {
    setSelectedPlanForContact(planName);
    setIsContactModalOpen(true);
  };

  const comparisonRows = [
    {
      category: "Accès Logiciel & Pédagogie",
      features: [
        {
          name: "Accès illimité à l'application web & mobile",
          autonome: "Inclus",
          guidee: "Inclus",
          pro: "Inclus",
        },
        {
          name: "60 leçons interactives (format 5 min / jour)",
          autonome: "Inclus",
          guidee: "Inclus",
          pro: "Inclus",
        },
        {
          name: "Minuteur 5 min, séries (streaks) et XP",
          autonome: "Inclus",
          guidee: "Inclus",
          pro: "Inclus",
        },
        {
          name: "Générateur automatique d'actifs (One-Pager, devis, CGV)",
          autonome: "Inclus",
          guidee: "Inclus",
          pro: "Inclus",
        },
        {
          name: "Export complet du Dossier Projet en PDF",
          autonome: "Illimité",
          guidee: "Illimité",
          pro: "Illimité",
        },
      ],
    },
    {
      category: "Animation & Dynamique Collective",
      features: [
        {
          name: "Groupe privé de promotion (cohorte 25 créateurs max)",
          autonome: "—",
          guidee: "Inclus",
          pro: "Inclus",
        },
        {
          name: "4 revues asynchrones de vos livrables par semaine",
          autonome: "—",
          guidee: "Inclus (par l'équipe)",
          pro: "Inclus (prioritaire)",
        },
        {
          name: "Sprint hebdomadaire en direct et sessions de déblocage",
          autonome: "—",
          guidee: "Inclus (4 ateliers)",
          pro: "Inclus (accès VIP)",
        },
        {
          name: "Cérémonie de lancement et mise en réseau",
          autonome: "—",
          guidee: "Inclus",
          pro: "Inclus",
        },
      ],
    },
    {
      category: "Accompagnement Sur-Mesure 1-on-1",
      features: [
        {
          name: "Diagnostic individuel de votre offre (session 45 min)",
          autonome: "—",
          guidee: "—",
          pro: "1 session 1-on-1 vidéo",
        },
        {
          name: "Relecture et validation du dossier d'immatriculation INPI",
          autonome: "Checklist guidée",
          guidee: "Revue collective",
          pro: "Validation ligne à ligne",
        },
        {
          name: "Support direct dédié par messagerie",
          autonome: "Email standard",
          guidee: "Canal de promotion",
          pro: "Canal prioritaire 5j/7",
        },
        {
          name: "Durée d'accès SaaS incluse",
          autonome: "Abonnement actif",
          guidee: "3 mois offerts",
          pro: "6 mois offerts",
        },
      ],
    },
  ];

  return (
    <section id="tarifs" className="py-20 sm:py-28 bg-[#F8FAFC] border-t-2 border-[#1E293B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            HEADER : TITLE & SUBTITLE
           ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF2EB] border-2 border-[#FF6B35] text-[#D63900] font-bold text-xs sm:text-sm uppercase tracking-wider mb-4 shadow-sm">
            <CreditCard className="w-4 h-4 text-[#FF6B35]" />
            <span>Tarifs transparents • Zéro engagement caché</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#0F172A] font-display tracking-tight leading-tight">
            Choisissez la formule adaptée à votre rythme.
          </h2>

          <p className="text-[#475569] text-base sm:text-lg mt-4 font-medium leading-relaxed">
            De l'autonomie totale au mentorat individuel, une méthode claire pour valider votre offre et décrocher vos premiers clients sans perdre de temps.
          </p>

          {/* Billing Interval Toggle for Autonome */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-white border-2 border-[#1E293B] shadow-[3px_3px_0px_0px_#1E293B]">
            <button
              onClick={() => setBillingCycle("month")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                billingCycle === "month"
                  ? "bg-[#1E293B] text-white shadow-sm"
                  : "text-[#475569] hover:text-[#0F172A]"
              }`}
            >
              Facturation mensuelle
            </button>

            <button
              onClick={() => setBillingCycle("year")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                billingCycle === "year"
                  ? "bg-[#FF6B35] text-white shadow-sm"
                  : "text-[#475569] hover:text-[#0F172A]"
              }`}
            >
              <span>Facturation annuelle</span>
              <span className="px-2 py-0.5 rounded-lg bg-[#1E293B] text-white text-[10px] font-black uppercase tracking-wider">
                -48%
              </span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            PRICING CARDS GRID (3 Tiers)
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-7xl mx-auto">
          {/* =========================================================================
              TIER 1 : FORMULE AUTONOME
             ========================================================================= */}
          <div className="bg-white rounded-3xl border-2 border-[#1E293B] shadow-[6px_6px_0px_0px_#1E293B] p-6 sm:p-8 flex flex-col justify-between hover:-translate-y-1 transition-transform relative">
            <div>
              {/* Badge */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-[#F1F5F9] border border-[#CBD5E1] text-[#1E293B] text-xs font-extrabold uppercase tracking-wider">
                  Formule 100% Autonome
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-300">
                  Essai 7j offert
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0F172A]">
                Formule Autonome
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] mt-2 font-medium leading-relaxed">
                Idéal pour avancer à votre propre rythme avec l'application, les exercices quotidiens et les générateurs d'actifs.
              </p>

              {/* Price */}
              <div className="mt-6 p-4 rounded-2xl bg-[#F8FAFC] border-2 border-[#E2E8F0]">
                {billingCycle === "month" ? (
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl sm:text-5xl font-black text-[#0F172A] font-display">
                        19 €
                      </span>
                      <span className="text-sm font-bold text-[#64748B]">/ mois</span>
                    </div>
                    <p className="text-xs text-[#64748B] mt-1 font-medium">
                      Sans engagement, annulable à tout moment en 1 clic.
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl sm:text-5xl font-black text-[#0F172A] font-display">
                        119 €
                      </span>
                      <span className="text-sm font-bold text-[#64748B]">/ an</span>
                    </div>
                    <p className="text-xs text-[#D63900] mt-1 font-extrabold">
                      Soit 9,90 € / mois (économisez 109 € / an).
                    </p>
                  </div>
                )}
              </div>

              {/* Feature list */}
              <div className="mt-6 space-y-3">
                <div className="text-xs font-extrabold uppercase tracking-wider text-[#1E293B] pb-1">
                  Ce qui est inclus :
                </div>

                <ul className="space-y-2.5 text-xs sm:text-sm text-[#334155]">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#FF6B35] stroke-[3] shrink-0 mt-0.5" />
                    <span>
                      <strong>Accès illimité</strong> à l'application web & mobile
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#FF6B35] stroke-[3] shrink-0 mt-0.5" />
                    <span>
                      <strong>60 leçons interactives</strong> calibrées en 5 min chrono
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#FF6B35] stroke-[3] shrink-0 mt-0.5" />
                    <span>
                      <strong>Minuteur 5 min</strong> et compteur de séries (streaks)
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#FF6B35] stroke-[3] shrink-0 mt-0.5" />
                    <span>
                      <strong>Générateur d'actifs</strong> : One-Pager, devis type, modèle CGV
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#FF6B35] stroke-[3] shrink-0 mt-0.5" />
                    <span>
                      <strong>Export PDF illimité</strong> de votre Dossier de Création
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 text-[#64748B]">
                    <Check className="w-4 h-4 text-emerald-600 stroke-[3] shrink-0 mt-0.5" />
                    <span>Mises à jour pédagogiques continues 2026</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8 pt-6 border-t-2 border-[#F1F5F9] space-y-3">
              <a
                href={
                  billingCycle === "month"
                    ? PAYMENT_URLS.autonome_monthly
                    : PAYMENT_URLS.autonome_annual
                }
                className="w-full py-4 px-6 rounded-2xl bg-[#1E293B] hover:bg-[#334155] text-white font-extrabold text-sm sm:text-base border-2 border-[#1E293B] shadow-[4px_4px_0px_0px_#FF6B35] hover:shadow-[2px_2px_0px_0px_#FF6B35] active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <span>
                  {billingCycle === "month"
                    ? "Démarrer l'accès mensuel (19 €)"
                    : "Démarrer l'accès annuel (119 €)"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => handleOpenContact("Formule Autonome")}
                className="w-full py-2.5 text-xs font-bold text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Poser une question sur cette formule</span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              TIER 2 : PROMOTION GUIDEE (BOOTCAMP 30 JOURS) - HIGHLIGHTED
             ========================================================================= */}
          <div className="bg-[#FFF2EB] rounded-3xl border-2 border-[#1E293B] shadow-[8px_8px_0px_0px_#1E293B] p-6 sm:p-8 flex flex-col justify-between relative ring-2 ring-[#FF6B35] hover:-translate-y-1 transition-transform">
            {/* Top Ribbon */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF6B35] text-white text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full border-2 border-[#1E293B] shadow-[2px_2px_0px_0px_#1E293B] flex items-center gap-1.5 whitespace-nowrap">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Le plus choisi • Session 25 places</span>
            </div>

            <div>
              {/* Badge */}
              <div className="flex items-center justify-between gap-2 mb-4 mt-2">
                <span className="px-3 py-1 rounded-full bg-[#1E293B] text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#FF6B35]" />
                  <span>Bootcamp 30 Jours</span>
                </span>
                <span className="text-xs font-black text-[#D63900] uppercase">
                  Promotion #1
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0F172A]">
                Promotion Guidée
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] mt-2 font-medium leading-relaxed">
                L'émulation d'une cohorte à taille humaine pour passer de l'idée aux premiers clients avec revues hebdomadaires.
              </p>

              {/* Price */}
              <div className="mt-6 p-4 rounded-2xl bg-white border-2 border-[#1E293B] shadow-[3px_3px_0px_0px_#FF6B35]">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl sm:text-5xl font-black text-[#0F172A] font-display">
                    199 €
                  </span>
                  <span className="text-sm font-bold text-[#64748B]">/ session</span>
                </div>
                <p className="text-xs text-[#D63900] mt-1 font-extrabold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Inclut 3 mois d'accès SaaS complet offerts</span>
                </p>
              </div>

              {/* Feature list */}
              <div className="mt-6 space-y-3">
                <div className="text-xs font-extrabold uppercase tracking-wider text-[#1E293B] pb-1 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#FF6B35]" />
                  <span>Tout le contenu autonome, plus :</span>
                </div>

                <ul className="space-y-2.5 text-xs sm:text-sm text-[#0F172A]">
                  <li className="flex items-start gap-2.5 font-bold">
                    <Check className="w-4 h-4 text-[#FF6B35] stroke-[3] shrink-0 mt-0.5" />
                    <span>
                      <strong>Groupe privé d'entraide</strong> (cohorte de 25 créateurs max)
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 font-bold">
                    <Check className="w-4 h-4 text-[#FF6B35] stroke-[3] shrink-0 mt-0.5" />
                    <span>
                      <strong>4 revues asynchrones par semaine</strong> de vos livrables par notre équipe
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#FF6B35] stroke-[3] shrink-0 mt-0.5" />
                    <span>
                      <strong>Sprint hebdomadaire en direct</strong> pour débloquer les freins
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#FF6B35] stroke-[3] shrink-0 mt-0.5" />
                    <span>
                      <strong>Feedback personnalisé</strong> sur votre One-Pager et vos tarifs
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#FF6B35] stroke-[3] shrink-0 mt-0.5" />
                    <span>
                      <strong>Cérémonie de lancement</strong> et mise en avant de votre activité
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8 pt-6 border-t-2 border-[#FFD6C4] space-y-3">
              <a
                href={PAYMENT_URLS.promotion_guidee}
                className="w-full py-4 px-6 rounded-2xl bg-[#FF6B35] hover:bg-[#E55A25] text-white font-extrabold text-sm sm:text-base border-2 border-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] hover:shadow-[2px_2px_0px_0px_#1E293B] active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <span>Rejoindre la promotion guidée (199 €)</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <div className="flex items-center justify-between text-xs font-bold text-[#64748B] px-1">
                <span>Places limitées (25 max)</span>
                <button
                  onClick={() => handleOpenContact("Promotion Guidée (Bootcamp 30 Jours)")}
                  className="text-[#D63900] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Question sur la promo</span>
                </button>
              </div>
            </div>
          </div>

          {/* =========================================================================
              TIER 3 : ACCOMPAGNEMENT INDIVIDUEL PRO
             ========================================================================= */}
          <div className="bg-white rounded-3xl border-2 border-[#1E293B] shadow-[6px_6px_0px_0px_#1E293B] p-6 sm:p-8 flex flex-col justify-between hover:-translate-y-1 transition-transform relative">
            <div>
              {/* Badge */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-[#1E293B] text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-[#FF6B35]" />
                  <span>Mentorat Sur-Mesure</span>
                </span>
                <span className="text-xs font-bold text-[#D63900] bg-[#FFF2EB] px-2.5 py-0.5 rounded-full border border-[#FF6B35]">
                  Individuel 1-on-1
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0F172A]">
                Accompagnement Pro
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] mt-2 font-medium leading-relaxed">
                Pour les porteurs de projet qui veulent un regard expert direct, une validation personnalisée et un déblocage prioritaire.
              </p>

              {/* Price */}
              <div className="mt-6 p-4 rounded-2xl bg-[#F8FAFC] border-2 border-[#E2E8F0]">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl sm:text-5xl font-black text-[#0F172A] font-display">
                    390 €
                  </span>
                  <span className="text-sm font-bold text-[#64748B]">/ session</span>
                </div>
                <p className="text-xs text-[#475569] mt-1 font-semibold">
                  Inclut 6 mois d'accès SaaS complet + suivi individuel dédié.
                </p>
              </div>

              {/* Feature list */}
              <div className="mt-6 space-y-3">
                <div className="text-xs font-extrabold uppercase tracking-wider text-[#1E293B] pb-1">
                  Ce qui est inclus en plus :
                </div>

                <ul className="space-y-2.5 text-xs sm:text-sm text-[#334155]">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#FF6B35] stroke-[3] shrink-0 mt-0.5" />
                    <span>
                      <strong>Diagnostic individuel 1-on-1 (45 min)</strong> en visioconférence
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#FF6B35] stroke-[3] shrink-0 mt-0.5" />
                    <span>
                      <strong>Relecture ligne à ligne de votre offre</strong> et de votre proposition
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#FF6B35] stroke-[3] shrink-0 mt-0.5" />
                    <span>
                      <strong>Validation de votre dossier INPI</strong> et démarches d'immatriculation
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#FF6B35] stroke-[3] shrink-0 mt-0.5" />
                    <span>
                      <strong>Support prioritaire direct 5j/7</strong> par messagerie dédiée
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#FF6B35] stroke-[3] shrink-0 mt-0.5" />
                    <span>
                      <strong>Garantie sérénité</strong> : itérations jusqu'à validation complète
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8 pt-6 border-t-2 border-[#F1F5F9] space-y-3">
              <a
                href={PAYMENT_URLS.accompagnement_pro}
                className="w-full py-4 px-6 rounded-2xl bg-[#1E293B] hover:bg-[#334155] text-white font-extrabold text-sm sm:text-base border-2 border-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] hover:shadow-[2px_2px_0px_0px_#1E293B] active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <span>Réserver mon accompagnement (390 €)</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => handleOpenContact("Accompagnement Individuel Pro")}
                className="w-full py-2.5 rounded-xl border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-xs font-bold text-[#0F172A] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span>Demander un échange préalable / Devis</span>
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            TRUST & REASSURANCE BAR
           ========================================================================= */}
        <div className="mt-14 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white border-2 border-[#E2E8F0] flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0F172A]">
                Paiement Sécurisé
              </h4>
              <p className="text-xs text-[#64748B] mt-0.5">
                Règlement par CB sécurisé via Baget (protocole SSL / 3D Secure).
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border-2 border-[#E2E8F0] flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#FFF2EB] border border-[#FF6B35] text-[#D63900] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0F172A]">
                Garantie 14 Jours
              </h4>
              <p className="text-xs text-[#64748B] mt-0.5">
                Satisfait ou remboursé sans justification sur toutes nos offres.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border-2 border-[#E2E8F0] flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#F1F5F9] border border-[#CBD5E1] text-[#1E293B] flex items-center justify-center shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0F172A]">
                Facturation Pro Conforme
              </h4>
              <p className="text-xs text-[#64748B] mt-0.5">
                Facture avec TVA émise automatiquement pour vos frais professionnels.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            DETAILED COMPARISON TABLE TOGGLE
           ========================================================================= */}
        <div className="mt-14 max-w-5xl mx-auto">
          <button
            onClick={() => setShowComparisonTable(!showComparisonTable)}
            className="w-full py-4 px-6 rounded-2xl bg-white border-2 border-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] hover:bg-[#F8FAFC] transition-all cursor-pointer flex items-center justify-between gap-4 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#FFF2EB] border border-[#FF6B35] text-[#D63900] flex items-center justify-center shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <span className="font-extrabold text-sm sm:text-base text-[#0F172A] block">
                  {showComparisonTable
                    ? "Masquer le tableau comparatif détaillé"
                    : "Afficher le tableau comparatif complet des 3 formules"}
                </span>
                <span className="text-xs text-[#64748B]">
                  Comparez fonctionnalité par fonctionnalité les 3 paliers d'accompagnement
                </span>
              </div>
            </div>

            <span
              className={`p-2 rounded-xl border border-[#CBD5E1] transition-transform duration-200 shrink-0 ${
                showComparisonTable ? "rotate-180 bg-[#1E293B] text-white" : "bg-[#F8FAFC] text-[#1E293B]"
              }`}
            >
              <ChevronDown className="w-4 h-4" />
            </span>
          </button>

          {showComparisonTable && (
            <div className="mt-6 bg-white rounded-3xl border-2 border-[#1E293B] shadow-[6px_6px_0px_0px_#1E293B] overflow-hidden animate-fade-in">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#1E293B] text-white border-b-2 border-[#1E293B]">
                      <th className="py-4 px-6 font-display text-sm font-bold w-2/5">
                        Fonctionnalités & Services
                      </th>
                      <th className="py-4 px-4 font-bold text-center w-1/5">
                        Formule Autonome
                      </th>
                      <th className="py-4 px-4 font-bold text-center bg-[#FF6B35] text-white w-1/5">
                        Promotion Guidée
                      </th>
                      <th className="py-4 px-4 font-bold text-center w-1/5">
                        Accompagnement Pro
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {comparisonRows.map((cat, catIdx) => (
                      <>
                        <tr key={`cat-${catIdx}`} className="bg-[#F8FAFC]">
                          <td
                            colSpan={4}
                            className="py-3 px-6 text-xs font-black uppercase tracking-wider text-[#1E293B] border-t border-b border-[#CBD5E1]"
                          >
                            {cat.category}
                          </td>
                        </tr>
                        {cat.features.map((feat, featIdx) => (
                          <tr
                            key={`feat-${catIdx}-${featIdx}`}
                            className="hover:bg-[#FFF2EB]/30 transition-colors"
                          >
                            <td className="py-3.5 px-6 font-medium text-[#0F172A]">
                              {feat.name}
                            </td>
                            <td className="py-3.5 px-4 text-center text-[#475569] font-semibold">
                              {feat.autonome}
                            </td>
                            <td className="py-3.5 px-4 text-center font-bold text-[#D63900] bg-[#FFF2EB]/60">
                              {feat.guidee}
                            </td>
                            <td className="py-3.5 px-4 text-center font-bold text-[#0F172A]">
                              {feat.pro}
                            </td>
                          </tr>
                        ))}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer with direct action triggers */}
              <div className="p-6 bg-[#F8FAFC] border-t-2 border-[#E2E8F0] grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xs font-bold text-[#0F172A] mb-1">Formule Autonome</div>
                  <a
                    href={PAYMENT_URLS.autonome_monthly}
                    className="inline-block px-4 py-2 rounded-xl bg-[#1E293B] text-white text-xs font-bold hover:bg-[#334155] transition-colors"
                  >
                    Choisir Autonome (19€/m)
                  </a>
                </div>

                <div>
                  <div className="text-xs font-bold text-[#D63900] mb-1">Promotion Guidée</div>
                  <a
                    href={PAYMENT_URLS.promotion_guidee}
                    className="inline-block px-4 py-2 rounded-xl bg-[#FF6B35] text-white text-xs font-bold hover:bg-[#E55A25] transition-colors"
                  >
                    Rejoindre la Promotion (199€)
                  </a>
                </div>

                <div>
                  <div className="text-xs font-bold text-[#0F172A] mb-1">Accompagnement Pro</div>
                  <a
                    href={PAYMENT_URLS.accompagnement_pro}
                    className="inline-block px-4 py-2 rounded-xl bg-[#1E293B] text-white text-xs font-bold hover:bg-[#334155] transition-colors"
                  >
                    Réserver Pro (390€)
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Point de Contact & Order Modal */}
      <OrderContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        defaultPlan={selectedPlanForContact}
      />
    </section>
  );
}
