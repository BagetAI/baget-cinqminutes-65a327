"use client";

import React, { useState } from "react";
import {
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Users,
  UserCheck,
  HelpCircle,
  Layers,
  FileCheck,
  Award,
  CreditCard,
  ChevronDown,
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
      category: "Application & Outils",
      features: [
        {
          name: "Accès complet app web & mobile",
          autonome: "Inclus",
          guidee: "Inclus",
          pro: "Inclus",
        },
        {
          name: "60 micro-leçons (5 min / jour)",
          autonome: "Inclus",
          guidee: "Inclus",
          pro: "Inclus",
        },
        {
          name: "Minuteur 5 min & séries (streaks)",
          autonome: "Inclus",
          guidee: "Inclus",
          pro: "Inclus",
        },
        {
          name: "Générateurs (One-Pager, devis, CGV)",
          autonome: "Inclus",
          guidee: "Inclus",
          pro: "Inclus",
        },
        {
          name: "Export PDF du dossier de création",
          autonome: "Illimité",
          guidee: "Illimité",
          pro: "Illimité",
        },
      ],
    },
    {
      category: "Dynamique Collective & Retours",
      features: [
        {
          name: "Groupe privé de cohorte (25 créateurs max)",
          autonome: "—",
          guidee: "Inclus",
          pro: "Inclus",
        },
        {
          name: "Revues asynchrones des livrables",
          autonome: "—",
          guidee: "4 / semaine",
          pro: "Prioritaire",
        },
        {
          name: "Sprint live hebdo de déblocage",
          autonome: "—",
          guidee: "4 ateliers",
          pro: "Accès VIP",
        },
        {
          name: "Accès SaaS offert",
          autonome: "Abonnement",
          guidee: "3 mois inclus",
          pro: "6 mois inclus",
        },
      ],
    },
    {
      category: "Mentorat Individuel",
      features: [
        {
          name: "Diagnostic 1-on-1 en visio (45 min)",
          autonome: "—",
          guidee: "—",
          pro: "1 session",
        },
        {
          name: "Relecture personnalisée de l'offre",
          autonome: "—",
          guidee: "Revue groupe",
          pro: "Sur-mesure",
        },
        {
          name: "Validation du dossier INPI",
          autonome: "Checklist",
          guidee: "Revue groupe",
          pro: "Validation directe",
        },
        {
          name: "Support direct dédié par messagerie",
          autonome: "Email standard",
          guidee: "Canal promo",
          pro: "Canal direct 5j/7",
        },
      ],
    },
  ];

  return (
    <section id="tarifs" className="py-16 sm:py-24 bg-[#F8FAFC] border-t-2 border-[#1E293B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            HEADER : TITLE & SUBTITLE
           ========================================================================= */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF2EB] border border-[#FF6B35] text-[#D63900] font-bold text-xs uppercase tracking-wider mb-3">
            <CreditCard className="w-3.5 h-3.5 text-[#FF6B35]" />
            <span>Tarifs clairs • Sans engagement</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-[#0F172A] font-display tracking-tight">
            Des formules adaptées à votre rythme
          </h2>

          <p className="text-[#475569] text-base sm:text-lg mt-3 font-medium">
            Passez de l'idée aux premiers clients avec le niveau d'accompagnement adapté à vos besoins.
          </p>

          {/* Billing Interval Toggle */}
          <div className="mt-6 inline-flex items-center p-1 rounded-2xl bg-white border-2 border-[#1E293B] shadow-[2px_2px_0px_0px_#1E293B]">
            <button
              onClick={() => setBillingCycle("month")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                billingCycle === "month"
                  ? "bg-[#1E293B] text-white shadow-sm"
                  : "text-[#475569] hover:text-[#0F172A]"
              }`}
            >
              Mensuel
            </button>

            <button
              onClick={() => setBillingCycle("year")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === "year"
                  ? "bg-[#FF6B35] text-white shadow-sm"
                  : "text-[#475569] hover:text-[#0F172A]"
              }`}
            >
              <span>Annuel</span>
              <span className="px-1.5 py-0.5 rounded-md bg-[#1E293B] text-white text-[10px] font-black uppercase">
                -48%
              </span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            PRICING CARDS GRID (3 Tiers, clean & balanced)
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch max-w-6xl mx-auto">
          {/* =========================================================================
              TIER 1 : FORMULE AUTONOME
             ========================================================================= */}
          <div className="bg-white rounded-3xl border-2 border-[#1E293B] shadow-[5px_5px_0px_0px_#1E293B] p-6 sm:p-7 flex flex-col justify-between hover:-translate-y-1 transition-all">
            <div>
              {/* Header tags */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-[#F1F5F9] border border-[#CBD5E1] text-[#1E293B] text-xs font-bold uppercase tracking-wider">
                  Autonomie
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-300">
                  Essai 7j offert
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-2xl font-extrabold font-display text-[#0F172A]">
                Autonome
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                Pour avancer seul, à votre propre rythme, avec l'application complète.
              </p>

              {/* Price Display */}
              <div className="mt-5 p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                {billingCycle === "month" ? (
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-[#0F172A] font-display">19 €</span>
                      <span className="text-xs font-bold text-[#64748B]">/ mois</span>
                    </div>
                    <p className="text-[11px] text-[#64748B] mt-0.5">Sans engagement, résiliable en 1 clic</p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-[#0F172A] font-display">119 €</span>
                      <span className="text-xs font-bold text-[#64748B]">/ an</span>
                      <span className="text-[11px] font-bold text-[#D63900] ml-1">(9,90 €/mois)</span>
                    </div>
                    <p className="text-[11px] text-[#D63900] mt-0.5 font-bold">Économisez 109 € par an</p>
                  </div>
                )}
              </div>

              {/* Concise Feature List */}
              <ul className="mt-5 space-y-2.5 text-xs sm:text-sm text-[#334155]">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF6B35] stroke-[3] shrink-0" />
                  <span>Accès complet app web & mobile</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF6B35] stroke-[3] shrink-0" />
                  <span>60 micro-leçons (5 min / jour)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF6B35] stroke-[3] shrink-0" />
                  <span>Minuteur, séries & points XP</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF6B35] stroke-[3] shrink-0" />
                  <span>Générateurs (One-Pager, devis, CGV)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF6B35] stroke-[3] shrink-0" />
                  <span>Export PDF du dossier de création</span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-6 pt-5 border-t border-[#F1F5F9]">
              <a
                href={billingCycle === "month" ? PAYMENT_URLS.autonome_monthly : PAYMENT_URLS.autonome_annual}
                className="w-full py-3 px-4 rounded-xl bg-[#1E293B] hover:bg-[#334155] text-white font-bold text-sm border-2 border-[#1E293B] shadow-[3px_3px_0px_0px_#FF6B35] hover:shadow-[1px_1px_0px_0px_#FF6B35] active:translate-y-0.5 transition-all flex items-center justify-center gap-2 text-center"
              >
                <span>{billingCycle === "month" ? "Démarrer (19 € / mois)" : "Démarrer (119 € / an)"}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* =========================================================================
              TIER 2 : PROMOTION GUIDEE (FEATURED)
             ========================================================================= */}
          <div className="bg-[#FFF2EB] rounded-3xl border-2 border-[#1E293B] shadow-[7px_7px_0px_0px_#1E293B] p-6 sm:p-7 flex flex-col justify-between relative ring-2 ring-[#FF6B35] hover:-translate-y-1 transition-all">
            {/* Top Ribbon */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FF6B35] text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full border-2 border-[#1E293B] shadow-[2px_2px_0px_0px_#1E293B] flex items-center gap-1.5 whitespace-nowrap">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Le plus choisi • 25 places</span>
            </div>

            <div>
              {/* Header tags */}
              <div className="flex items-center justify-between gap-2 mb-3 mt-1">
                <span className="px-2.5 py-0.5 rounded-full bg-[#1E293B] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <Users className="w-3 h-3 text-[#FF6B35]" />
                  <span>Collectif</span>
                </span>
                <span className="text-xs font-extrabold text-[#D63900]">
                  Bootcamp 30 Jours
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-2xl font-extrabold font-display text-[#0F172A]">
                Promotion Guidée
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] mt-1">
                L'énergie d'un petit groupe pour valider son offre avec retours réguliers.
              </p>

              {/* Price Display */}
              <div className="mt-5 p-3.5 rounded-2xl bg-white border-2 border-[#1E293B] shadow-[2px_2px_0px_0px_#FF6B35]">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#0F172A] font-display">199 €</span>
                  <span className="text-xs font-bold text-[#64748B]">/ session</span>
                </div>
                <p className="text-[11px] text-[#D63900] mt-0.5 font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Paiement unique • 3 mois d'accès app inclus</span>
                </p>
              </div>

              {/* Concise Feature List */}
              <ul className="mt-5 space-y-2.5 text-xs sm:text-sm text-[#0F172A]">
                <li className="flex items-center gap-2 font-bold">
                  <Check className="w-4 h-4 text-[#FF6B35] stroke-[3] shrink-0" />
                  <span>Tout le contenu Autonome inclus</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF6B35] stroke-[3] shrink-0" />
                  <span>Groupe privé (25 créateurs max)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF6B35] stroke-[3] shrink-0" />
                  <span>4 revues par semaine de vos livrables</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF6B35] stroke-[3] shrink-0" />
                  <span>Sprint live hebdo de déblocage</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF6B35] stroke-[3] shrink-0" />
                  <span>Feedback personnalisé sur votre offre</span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-6 pt-5 border-t border-[#FFD6C4]">
              <a
                href={PAYMENT_URLS.promotion_guidee}
                className="w-full py-3 px-4 rounded-xl bg-[#FF6B35] hover:bg-[#E55A25] text-white font-bold text-sm border-2 border-[#1E293B] shadow-[3px_3px_0px_0px_#1E293B] hover:shadow-[1px_1px_0px_0px_#1E293B] active:translate-y-0.5 transition-all flex items-center justify-center gap-2 text-center"
              >
                <span>Rejoindre la promotion (199 €)</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* =========================================================================
              TIER 3 : ACCOMPAGNEMENT PRO
             ========================================================================= */}
          <div className="bg-white rounded-3xl border-2 border-[#1E293B] shadow-[5px_5px_0px_0px_#1E293B] p-6 sm:p-7 flex flex-col justify-between hover:-translate-y-1 transition-all">
            <div>
              {/* Header tags */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-[#1E293B] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-[#FF6B35]" />
                  <span>1-on-1</span>
                </span>
                <span className="text-[11px] font-bold text-[#D63900] bg-[#FFF2EB] px-2 py-0.5 rounded-full border border-[#FF6B35]">
                  Sur-Mesure
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-2xl font-extrabold font-display text-[#0F172A]">
                Accompagnement Pro
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                Mentorat individuel direct pour sécuriser chaque étape de votre lancement.
              </p>

              {/* Price Display */}
              <div className="mt-5 p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#0F172A] font-display">390 €</span>
                  <span className="text-xs font-bold text-[#64748B]">/ session</span>
                </div>
                <p className="text-[11px] text-[#64748B] mt-0.5 font-medium">
                  Paiement unique • 6 mois d'accès app inclus
                </p>
              </div>

              {/* Concise Feature List */}
              <ul className="mt-5 space-y-2.5 text-xs sm:text-sm text-[#334155]">
                <li className="flex items-center gap-2 font-bold">
                  <Check className="w-4 h-4 text-[#FF6B35] stroke-[3] shrink-0" />
                  <span>Tout le contenu Promotion inclus</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF6B35] stroke-[3] shrink-0" />
                  <span>1 diagnostic individuel en visio (45 min)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF6B35] stroke-[3] shrink-0" />
                  <span>Relecture ligne à ligne de votre offre</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF6B35] stroke-[3] shrink-0" />
                  <span>Validation de votre dossier INPI</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF6B35] stroke-[3] shrink-0" />
                  <span>Support direct dédié par messagerie (5j/7)</span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-6 pt-5 border-t border-[#F1F5F9]">
              <a
                href={PAYMENT_URLS.accompagnement_pro}
                className="w-full py-3 px-4 rounded-xl bg-[#1E293B] hover:bg-[#334155] text-white font-bold text-sm border-2 border-[#1E293B] shadow-[3px_3px_0px_0px_#FF6B35] hover:shadow-[1px_1px_0px_0px_#FF6B35] active:translate-y-0.5 transition-all flex items-center justify-center gap-2 text-center"
              >
                <span>Réserver le mentorat (390 €)</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact help line */}
        <div className="text-center mt-8">
          <button
            onClick={() => handleOpenContact("Demande de conseil / Devis")}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#475569] hover:text-[#FF6B35] transition-colors cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-[#FF6B35]" />
            <span>Une question avant de choisir ? Discuter avec nous ou demander un devis</span>
          </button>
        </div>

        {/* =========================================================================
            TRUST / REASSURANCE BAR
           ========================================================================= */}
        <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-white border border-[#E2E8F0] flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#0F172A]">Paiement 100% sécurisé</div>
              <div className="text-[11px] text-[#64748B]">Chiffrement SSL & 3D Secure</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-[#E2E8F0] flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FFF2EB] text-[#D63900] flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#0F172A]">Garantie 14 jours</div>
              <div className="text-[11px] text-[#64748B]">Satisfait ou remboursé</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-[#E2E8F0] flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#F1F5F9] text-[#1E293B] flex items-center justify-center shrink-0">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#0F172A]">Facture avec TVA</div>
              <div className="text-[11px] text-[#64748B]">Déductible en frais pro</div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            STREAMLINED COMPARISON TABLE (COLLAPSIBLE)
           ========================================================================= */}
        <div className="mt-10 max-w-4xl mx-auto">
          <button
            onClick={() => setShowComparisonTable(!showComparisonTable)}
            className="w-full py-3 px-5 rounded-2xl bg-white border-2 border-[#1E293B] shadow-[3px_3px_0px_0px_#1E293B] hover:bg-[#F8FAFC] transition-all cursor-pointer flex items-center justify-between gap-3 text-left"
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4 text-[#FF6B35]" />
              <span className="font-bold text-xs sm:text-sm text-[#0F172A]">
                {showComparisonTable
                  ? "Masquer le tableau comparatif détaillé"
                  : "Comparer les 3 formules en détail"}
              </span>
            </div>

            <span
              className={`p-1 rounded-lg border border-[#CBD5E1] transition-transform duration-200 shrink-0 ${
                showComparisonTable ? "rotate-180 bg-[#1E293B] text-white" : "bg-[#F8FAFC] text-[#1E293B]"
              }`}
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </span>
          </button>

          {showComparisonTable && (
            <div className="mt-4 bg-white rounded-2xl border-2 border-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] overflow-hidden animate-fade-in">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#1E293B] text-white">
                      <th className="py-3 px-4 font-bold w-2/5">Fonctionnalité</th>
                      <th className="py-3 px-3 font-bold text-center w-1/5">Autonome</th>
                      <th className="py-3 px-3 font-bold text-center bg-[#FF6B35] text-white w-1/5">
                        Promotion
                      </th>
                      <th className="py-3 px-3 font-bold text-center w-1/5">Pro</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {comparisonRows.map((cat, catIdx) => (
                      <React.Fragment key={`cat-group-${catIdx}`}>
                        <tr className="bg-[#F8FAFC]">
                          <td
                            colSpan={4}
                            className="py-2 px-4 text-[11px] font-black uppercase tracking-wider text-[#1E293B] border-t border-b border-[#CBD5E1]"
                          >
                            {cat.category}
                          </td>
                        </tr>
                        {cat.features.map((feat, featIdx) => (
                          <tr key={`feat-${catIdx}-${featIdx}`} className="hover:bg-[#FFF2EB]/20">
                            <td className="py-2.5 px-4 font-medium text-[#0F172A]">{feat.name}</td>
                            <td className="py-2.5 px-3 text-center text-[#64748B]">{feat.autonome}</td>
                            <td className="py-2.5 px-3 text-center font-bold text-[#D63900] bg-[#FFF2EB]/40">
                              {feat.guidee}
                            </td>
                            <td className="py-2.5 px-3 text-center font-bold text-[#0F172A]">{feat.pro}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
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
