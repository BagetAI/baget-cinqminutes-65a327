"use client";

import { useState } from "react";
import {
  Calculator,
  FileText,
  Receipt,
  CheckSquare,
  Copy,
  Check,
  Download,
  Printer,
  Sparkles,
  Info,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

interface ToolsCalculatorsProps {
  deliverablesMap: Record<string, string>;
  projectTitle: string;
  learnerName: string;
}

export default function ToolsCalculators({
  deliverablesMap,
  projectTitle,
  learnerName,
}: ToolsCalculatorsProps) {
  const [activeSubTool, setActiveSubTool] = useState<"simulator" | "onepager" | "invoice" | "inpi">("simulator");

  // ==========================================
  // SIMULATOR STATE
  // ==========================================
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(2500);
  const [activityType, setActivityType] = useState<"bnc" | "bic_service" | "bic_vente">("bnc");
  const [hasAcre, setHasAcre] = useState<boolean>(false);
  const [hasPrelevementLibératoire, setHasPrelevementLibératoire] = useState<boolean>(false);

  // Rate constants (Official 2026 baseline for France micro-enterprise)
  const RATES = {
    bnc: { label: "Prestations intellectuelles / Conseil (BNC)", urssaf: 0.211, acre: 0.106, ir: 0.022, cfp: 0.002, plafond: 77700, seuilTva: 36800 },
    bic_service: { label: "Prestations commerciales / Artisanat (BIC)", urssaf: 0.212, acre: 0.106, ir: 0.017, cfp: 0.003, plafond: 77700, seuilTva: 36800 },
    bic_vente: { label: "Vente de marchandises / E-commerce", urssaf: 0.123, acre: 0.062, ir: 0.01, cfp: 0.001, plafond: 188700, seuilTva: 91900 },
  };

  const currentRateConfig = RATES[activityType];
  const effectiveUrssafRate = hasAcre ? currentRateConfig.acre : currentRateConfig.urssaf;
  const urssafAmount = monthlyRevenue * effectiveUrssafRate;
  const irAmount = hasPrelevementLibératoire ? monthlyRevenue * currentRateConfig.ir : 0;
  const cfpAmount = monthlyRevenue * currentRateConfig.cfp;
  const totalCharges = urssafAmount + irAmount + cfpAmount;
  const netIncome = Math.max(0, monthlyRevenue - totalCharges);
  const netPercentage = monthlyRevenue > 0 ? (netIncome / monthlyRevenue) * 100 : 0;
  const annualEstimate = monthlyRevenue * 12;

  // ==========================================
  // INVOICE BUILDER STATE
  // ==========================================
  const [invoiceNumber, setInvoiceNumber] = useState("FAC-2026-001");
  const [clientName, setClientName] = useState("Cabinet Conseil Alpha");
  const [clientAddress, setClientAddress] = useState("12 Rue de la Paix, 75002 Paris");
  const [serviceDescription, setServiceDescription] = useState(
    deliverablesMap["pricing_launch"] || "Pack accompagnement 8 publications LinkedIn optimisées"
  );
  const [invoiceAmount, setInvoiceAmount] = useState<number>(450);
  const [invoiceCopied, setInvoiceCopied] = useState(false);
  const [onePagerCopied, setOnePagerCopied] = useState(false);

  // ==========================================
  // INPI CHECKLIST STATE
  // ==========================================
  const [inpiChecks, setInpiChecks] = useState<Record<string, boolean>>({
    cni: true,
    domicile: true,
    non_condamnation: false,
    activite_code: true,
    compte_bancaire: false,
  });

  const toggleInpiCheck = (key: string) => {
    setInpiChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopyOnePager = () => {
    const text = `
=== ONE-PAGER COMMERCIAL : ${projectTitle.toUpperCase()} ===
Par : ${learnerName}

1. NOTRE PROMESSE :
"${deliverablesMap["value_proposition"] || "Accompagnement et création de valeur en 5 minutes par jour."}"

2. POUR QUI :
${deliverablesMap["ideal_client"] || "Professionnels et indépendants en quête de visibilité et de clarté."}

3. NOTRE PROTOCOLE EN 3 ÉTAPES :
${deliverablesMap["service_steps"] || "1. Cadrage et analyse du besoin\n2. Conception et exécution dédiée\n3. Livraison, validation et accompagnement"}

4. TARIFICATION FORFAITAIRE :
${deliverablesMap["pricing_launch"] || "Forfait clé en main transparent"}

5. NOTRE ENGAGEMENT QUALITÉ :
${deliverablesMap["guarantee"] || "Satisfaction garantie avec ajustements illimités"}

Contact direct : ${learnerName} • cinminutes.fr
    `.trim();

    navigator.clipboard.writeText(text);
    setOnePagerCopied(true);
    setTimeout(() => setOnePagerCopied(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Sub-tools Navigation */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#F1F5F9] rounded-2xl border-2 border-[#CBD5E1]">
        <button
          onClick={() => setActiveSubTool("simulator")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTool === "simulator"
              ? "bg-[#1E293B] text-white shadow-sm"
              : "text-[#475569] hover:text-[#0F172A]"
          }`}
        >
          <Calculator className="w-4 h-4 text-[#FF6B35]" />
          <span>Simulateur Cotisations 2026</span>
        </button>

        <button
          onClick={() => setActiveSubTool("onepager")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTool === "onepager"
              ? "bg-[#1E293B] text-white shadow-sm"
              : "text-[#475569] hover:text-[#0F172A]"
          }`}
        >
          <FileText className="w-4 h-4 text-[#FF6B35]" />
          <span>Générateur One-Pager</span>
        </button>

        <button
          onClick={() => setActiveSubTool("invoice")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTool === "invoice"
              ? "bg-[#1E293B] text-white shadow-sm"
              : "text-[#475569] hover:text-[#0F172A]"
          }`}
        >
          <Receipt className="w-4 h-4 text-[#FF6B35]" />
          <span>Modèle Devis & Facture</span>
        </button>

        <button
          onClick={() => setActiveSubTool("inpi")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTool === "inpi"
              ? "bg-[#1E293B] text-white shadow-sm"
              : "text-[#475569] hover:text-[#0F172A]"
          }`}
        >
          <CheckSquare className="w-4 h-4 text-[#FF6B35]" />
          <span>Checklist INPI Guichet Unique</span>
        </button>
      </div>

      {/* =========================================================================
          SUB-TOOL 1: SIMULATEUR COTISATIONS & NET 2026
         ========================================================================= */}
      {activeSubTool === "simulator" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fade-in">
          {/* Inputs Column */}
          <div className="lg:col-span-6 bg-white rounded-3xl border-2 border-[#1E293B] p-6 sm:p-7 shadow-[4px_4px_0px_0px_#1E293B] space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-[#E2E8F0]">
              <div className="w-10 h-10 rounded-2xl bg-[#FFF2EB] border border-[#FF6B35] flex items-center justify-center text-[#FF6B35]">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-display text-[#0F172A]">
                  Paramètres de votre activité
                </h3>
                <p className="text-xs text-[#64748B]">Taux officiels URSSAF & Fiscalité 2026</p>
              </div>
            </div>

            {/* Monthly Revenue Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#475569]">
                  Chiffre d'affaires mensuel estimé
                </label>
                <span className="text-base font-extrabold text-[#0F172A] font-display">
                  {monthlyRevenue.toLocaleString("fr-FR")} € / mois
                </span>
              </div>
              <input
                type="range"
                min={200}
                max={15000}
                step={100}
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                className="w-full h-2.5 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#FF6B35]"
              />
              <div className="flex justify-between text-[11px] text-[#94A3B8]">
                <span>200 €</span>
                <span>5 000 €</span>
                <span>10 000 €</span>
                <span>15 000 €</span>
              </div>
            </div>

            {/* Activity Type Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#475569]">
                Catégorie d'activité
              </label>
              <select
                value={activityType}
                onChange={(e) => setActivityType(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-[#CBD5E1] bg-[#F8FAFC] text-sm font-semibold text-[#0F172A] focus:border-[#FF6B35] focus:outline-none"
              >
                <option value="bnc">Prestations intellectuelles & Conseil (BNC ~21,1%)</option>
                <option value="bic_service">Prestations commerciales & Artisanales (BIC ~21,2%)</option>
                <option value="bic_vente">Vente de marchandises & Produits physiques (~12,3%)</option>
              </select>
            </div>

            {/* ACRE Checkbox */}
            <label className="flex items-start gap-3 p-3.5 rounded-2xl border-2 border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#FFF2EB]/40 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={hasAcre}
                onChange={(e) => setHasAcre(e.target.checked)}
                className="w-5 h-5 rounded border-[#CBD5E1] text-[#FF6B35] focus:ring-[#FF6B35] mt-0.5"
              />
              <div>
                <span className="text-xs font-extrabold text-[#0F172A] block">
                  Bénéficiaire de l'ACRE (-50% la 1ère année)
                </span>
                <span className="text-[11px] text-[#64748B]">
                  Accessible aux demandeurs d'emploi, jeunes &lt; 26 ans ou créateurs éligibles.
                </span>
              </div>
            </label>

            {/* Prélèvement libératoire */}
            <label className="flex items-start gap-3 p-3.5 rounded-2xl border-2 border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#FFF2EB]/40 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={hasPrelevementLibératoire}
                onChange={(e) => setHasPrelevementLibératoire(e.target.checked)}
                className="w-5 h-5 rounded border-[#CBD5E1] text-[#FF6B35] focus:ring-[#FF6B35] mt-0.5"
              />
              <div>
                <span className="text-xs font-extrabold text-[#0F172A] block">
                  Option Prélèvement Libératoire de l'IR ({currentRateConfig.ir * 100}%)
                </span>
                <span className="text-[11px] text-[#64748B]">
                  Paiement direct de l'impôt sur le revenu avec l'URSSAF (sous conditions de RFR).
                </span>
              </div>
            </label>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Result Card */}
            <div className="bg-[#1E293B] text-white rounded-3xl border-2 border-[#1E293B] p-6 sm:p-7 shadow-[6px_6px_0px_0px_#FF6B35] space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF6B35]">
                  Revenu Net Disponible Estimé
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FF6B35] text-white text-xs font-bold">
                  {netPercentage.toFixed(1)}% du CA
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-white font-display">
                  {Math.round(netIncome).toLocaleString("fr-FR")} €
                </span>
                <span className="text-sm font-bold text-[#94A3B8]">/ mois net</span>
              </div>

              {/* Annual projection */}
              <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-[#334155] flex items-center justify-between text-xs">
                <span className="text-[#94A3B8]">Projection annuelle sur 12 mois :</span>
                <span className="font-bold text-white text-sm">
                  {Math.round(netIncome * 12).toLocaleString("fr-FR")} € net / an
                </span>
              </div>

              {/* Breakdown Rows */}
              <div className="space-y-2.5 pt-2 border-t border-[#334155] text-xs">
                <div className="flex items-center justify-between text-[#CBD5E1]">
                  <span>Cotisations sociales URSSAF ({((effectiveUrssafRate) * 100).toFixed(1)}%) :</span>
                  <span className="font-bold text-red-300">
                    - {Math.round(urssafAmount).toLocaleString("fr-FR")} €
                  </span>
                </div>

                {hasPrelevementLibératoire && (
                  <div className="flex items-center justify-between text-[#CBD5E1]">
                    <span>Prélèvement libératoire IR ({((currentRateConfig.ir) * 100).toFixed(1)}%) :</span>
                    <span className="font-bold text-red-300">
                      - {Math.round(irAmount).toLocaleString("fr-FR")} €
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between text-[#CBD5E1]">
                  <span>Formation professionnelle (CFP {((currentRateConfig.cfp) * 100).toFixed(1)}%) :</span>
                  <span className="font-bold text-red-300">
                    - {Math.round(cfpAmount).toLocaleString("fr-FR")} €
                  </span>
                </div>

                <div className="flex items-center justify-between text-[#94A3B8] pt-2 border-t border-[#334155]">
                  <span>Total charges prélevées :</span>
                  <span className="font-extrabold text-white">
                    {Math.round(totalCharges).toLocaleString("fr-FR")} € / mois
                  </span>
                </div>
              </div>
            </div>

            {/* Threshold and Limits Card */}
            <div className="bg-white rounded-3xl border-2 border-[#1E293B] p-5 shadow-[4px_4px_0px_0px_#1E293B] space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#1E293B] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Plafonds & Seuils Légaux 2026</span>
              </h4>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <span className="text-[#64748B] block text-[11px]">Franchise de TVA :</span>
                  <span className="font-extrabold text-[#0F172A]">
                    {currentRateConfig.seuilTva.toLocaleString("fr-FR")} € / an
                  </span>
                  <span className="block text-[10px] text-emerald-700 mt-0.5">
                    {annualEstimate < currentRateConfig.seuilTva ? "✓ Sous le seuil (TVA non facturée)" : "⚠ Franchise dépassée"}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <span className="text-[#64748B] block text-[11px]">Plafond Micro-entreprise :</span>
                  <span className="font-extrabold text-[#0F172A]">
                    {currentRateConfig.plafond.toLocaleString("fr-FR")} € / an
                  </span>
                  <span className="block text-[10px] text-[#64748B] mt-0.5">
                    Régime simplifié garanti
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SUB-TOOL 2: GÉNÉRATEUR ONE-PAGER COMMERCIAL
         ========================================================================= */}
      {activeSubTool === "onepager" && (
        <div className="bg-white rounded-3xl border-2 border-[#1E293B] p-6 sm:p-8 shadow-[5px_5px_0px_0px_#1E293B] space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF2EB] border border-[#FF6B35] text-[#D63900] text-xs font-extrabold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Générateur Automatique</span>
              </div>
              <h3 className="text-2xl font-bold font-display text-[#0F172A]">
                Votre One-Pager de Vente
              </h3>
              <p className="text-xs sm:text-sm text-[#475569]">
                Une fiche commerciale épurée compilée à partir de vos micro-actions quotidiennes.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyOnePager}
                className="px-4 py-2.5 rounded-xl border-2 border-[#1E293B] bg-white text-xs font-bold text-[#0F172A] hover:bg-[#F8FAFC] transition-all cursor-pointer flex items-center gap-2 shadow-[2px_2px_0px_0px_#1E293B]"
              >
                {onePagerCopied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                    <span>Copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#FF6B35]" />
                    <span>Copier le texte</span>
                  </>
                )}
              </button>

              <button
                onClick={() => window.print()}
                className="p-2.5 rounded-xl border-2 border-[#CBD5E1] bg-white text-[#475569] hover:text-[#0F172A] cursor-pointer"
                title="Imprimer"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* One-Pager Preview Sheet */}
          <div className="border-2 border-[#1E293B] rounded-2xl p-6 sm:p-8 bg-[#F8FAFC] space-y-6 shadow-inner">
            {/* Header Lockup */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-[#CBD5E1]">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF6B35]">
                  Offre de Service Clé en Main
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-display mt-0.5">
                  {projectTitle}
                </h2>
                <p className="text-xs text-[#64748B] mt-1">
                  Présenté par <strong>{learnerName}</strong> • Proposition commerciale simplifiée
                </p>
              </div>

              <div className="px-4 py-2 rounded-xl bg-[#1E293B] text-white font-extrabold text-xs text-center self-start sm:self-auto">
                {deliverablesMap["pricing_launch"] || "Tarification au forfait"}
              </div>
            </div>

            {/* Promise Card */}
            <div className="p-5 rounded-2xl bg-[#FFF2EB] border-2 border-[#FF6B35] space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#D63900]">
                Notre Promesse Principale
              </span>
              <p className="text-base sm:text-lg font-bold text-[#0F172A] leading-relaxed">
                "{deliverablesMap["value_proposition"] || "J'aide les consultants indépendants à générer 2 rendez-vous qualifiés par mois sans passer des heures à rédiger."}"
              </p>
            </div>

            {/* Target & Problem */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-[#CBD5E1]">
                <span className="text-xs font-bold text-[#64748B] uppercase">Pour qui :</span>
                <p className="text-xs sm:text-sm text-[#0F172A] font-semibold mt-1">
                  {deliverablesMap["ideal_client"] || "Consultants et indépendants B2B en phase d'accélération."}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#CBD5E1]">
                <span className="text-xs font-bold text-[#64748B] uppercase">Problème résolu :</span>
                <p className="text-xs sm:text-sm text-[#0F172A] font-semibold mt-1">
                  {deliverablesMap["pain_point"] || "Manque de régularité et absence de demandes entrantes qualifiées."}
                </p>
              </div>
            </div>

            {/* 3 Step Protocol */}
            <div className="p-5 rounded-2xl bg-white border-2 border-[#1E293B] space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#1E293B]">
                Protocole d'intervention en 3 étapes
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <span className="w-5 h-5 rounded-md bg-[#1E293B] text-white text-xs font-bold flex items-center justify-center mb-2">1</span>
                  <div className="text-xs font-bold text-[#0F172A]">Cadrage & Diagnostic</div>
                  <p className="text-[11px] text-[#64748B] mt-0.5">Session 30 min pour caler vos besoins exacts.</p>
                </div>

                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <span className="w-5 h-5 rounded-md bg-[#FF6B35] text-white text-xs font-bold flex items-center justify-center mb-2">2</span>
                  <div className="text-xs font-bold text-[#0F172A]">Production & Rédaction</div>
                  <p className="text-[11px] text-[#64748B] mt-0.5">Livraison complète sous 5 jours ouvrés.</p>
                </div>

                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <span className="w-5 h-5 rounded-md bg-emerald-600 text-white text-xs font-bold flex items-center justify-center mb-2">3</span>
                  <div className="text-xs font-bold text-[#0F172A]">Validation & Lancement</div>
                  <p className="text-[11px] text-[#64748B] mt-0.5">Ajustements illimités et mise en ligne.</p>
                </div>
              </div>
            </div>

            {/* Pricing & Guarantee Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#1E293B] text-white">
              <div>
                <span className="text-xs text-[#FF6B35] font-bold uppercase">Garantie Qualité</span>
                <p className="text-xs text-[#CBD5E1]">
                  {deliverablesMap["guarantee"] || "Ajustements inclus jusqu'à validation complète."}
                </p>
              </div>

              <div className="text-center sm:text-right">
                <span className="text-xs text-[#94A3B8] block">Tarif forfaitaire net :</span>
                <span className="text-xl font-bold font-display text-white">
                  {deliverablesMap["pricing_launch"] || "450 €"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SUB-TOOL 3: MODÈLE DEVIS & FACTURE SIMPLIFIÉE 2026
         ========================================================================= */}
      {activeSubTool === "invoice" && (
        <div className="bg-white rounded-3xl border-2 border-[#1E293B] p-6 sm:p-8 shadow-[5px_5px_0px_0px_#1E293B] space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-extrabold uppercase tracking-wider mb-2">
                <Receipt className="w-3.5 h-3.5" />
                <span>Facturation Conforme 2026</span>
              </div>
              <h3 className="text-2xl font-bold font-display text-[#0F172A]">
                Émetteur de Facture Type
              </h3>
              <p className="text-xs sm:text-sm text-[#475569]">
                Générez une facture simplifiée avec toutes les mentions légales obligatoires pour micro-entrepreneur.
              </p>
            </div>

            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl border-2 border-[#1E293B] bg-[#1E293B] text-white text-xs font-bold hover:bg-[#334155] transition-all cursor-pointer flex items-center gap-2 shadow-[2px_2px_0px_0px_#FF6B35]"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimer la facture (PDF)</span>
            </button>
          </div>

          {/* Invoice Editable Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-[#F8FAFC] border-2 border-[#E2E8F0]">
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-[#475569]">N° Facture</label>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl border border-[#CBD5E1] bg-white text-xs font-bold text-[#0F172A]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-[#475569]">Nom du client</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl border border-[#CBD5E1] bg-white text-xs font-bold text-[#0F172A]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-[#475569]">Montant Forfaitaire (€)</label>
              <input
                type="number"
                value={invoiceAmount}
                onChange={(e) => setInvoiceAmount(Number(e.target.value))}
                className="w-full px-3 py-1.5 rounded-xl border border-[#CBD5E1] bg-white text-xs font-bold text-[#0F172A]"
              />
            </div>
          </div>

          {/* Printable Invoice Sheet */}
          <div className="p-8 rounded-2xl border-2 border-[#1E293B] bg-white space-y-6 shadow-sm">
            {/* Header info */}
            <div className="flex justify-between items-start border-b pb-6">
              <div>
                <h4 className="font-extrabold text-base text-[#0F172A]">{learnerName}</h4>
                <p className="text-xs text-[#64748B] mt-0.5">Entrepreneur Individuel (Micro-entreprise)</p>
                <p className="text-xs text-[#64748B]">SIRET : En cours d'attribution (ou N° officiel)</p>
                <p className="text-xs text-[#64748B]">Email : contact@cinqminutes.app</p>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-[#FF6B35] uppercase">FACTURE</span>
                <div className="text-xl font-extrabold text-[#0F172A] font-display">{invoiceNumber}</div>
                <div className="text-xs text-[#64748B] mt-1">Date : {new Date().toLocaleDateString("fr-FR")}</div>
                <div className="text-xs text-[#64748B]">Échéance : 30 jours à réception</div>
              </div>
            </div>

            {/* Client address */}
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] max-w-sm">
              <span className="text-[11px] font-bold text-[#64748B] uppercase">Facturé à :</span>
              <div className="text-sm font-bold text-[#0F172A] mt-0.5">{clientName}</div>
              <div className="text-xs text-[#475569]">{clientAddress}</div>
            </div>

            {/* Table */}
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-[#1E293B] bg-[#F1F5F9]">
                  <th className="py-2.5 px-4 font-bold text-[#0F172A]">Description de la prestation</th>
                  <th className="py-2.5 px-4 font-bold text-center text-[#0F172A] w-20">Qté</th>
                  <th className="py-2.5 px-4 font-bold text-right text-[#0F172A] w-32">Total Net</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                <tr>
                  <td className="py-3 px-4 font-medium text-[#0F172A]">
                    {serviceDescription}
                  </td>
                  <td className="py-3 px-4 text-center text-[#475569]">1</td>
                  <td className="py-3 px-4 text-right font-extrabold text-[#0F172A]">
                    {invoiceAmount.toFixed(2)} €
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Total */}
            <div className="flex justify-end pt-4">
              <div className="w-64 space-y-1.5 text-xs text-right">
                <div className="flex justify-between text-[#64748B]">
                  <span>Total HT :</span>
                  <span className="font-bold">{invoiceAmount.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-[#64748B]">
                  <span>TVA (0%) :</span>
                  <span className="font-bold">0,00 €</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-[#0F172A] border-t pt-2">
                  <span>Net à payer :</span>
                  <span>{invoiceAmount.toFixed(2)} €</span>
                </div>
              </div>
            </div>

            {/* Mandatory Mentions */}
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-[11px] text-[#64748B] space-y-1">
              <p className="font-bold text-[#0F172A]">Mentions légales obligatoires 2026 :</p>
              <p>• « TVA non applicable, art. 293 B du Code Général des Impôts »</p>
              <p>• Paiement à réception par virement bancaire sous 30 jours.</p>
              <p>• Pénalités de retard : 3 fois le taux d'intérêt légal + indemnité forfaitaire pour frais de recouvrement de 40 €.</p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SUB-TOOL 4: CHECKLIST INPI GUICHET UNIQUE
         ========================================================================= */}
      {activeSubTool === "inpi" && (
        <div className="bg-white rounded-3xl border-2 border-[#1E293B] p-6 sm:p-8 shadow-[5px_5px_0px_0px_#1E293B] space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF2EB] border border-[#FF6B35] text-[#D63900] text-xs font-extrabold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Formalité Officielle INPI</span>
              </div>
              <h3 className="text-2xl font-bold font-display text-[#0F172A]">
                Checklist d'Immatriculation Guichet Unique
              </h3>
              <p className="text-xs sm:text-sm text-[#475569]">
                Rassemblez les 5 prérequis obligatoires pour déposer votre déclaration en moins de 15 minutes sur formalites.entreprises.gouv.fr.
              </p>
            </div>
          </div>

          {/* Checklist Items */}
          <div className="space-y-3">
            <div
              onClick={() => toggleInpiCheck("cni")}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between gap-4 ${
                inpiChecks.cni ? "bg-emerald-50 border-emerald-300" : "bg-[#F8FAFC] border-[#E2E8F0]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-lg border flex items-center justify-center ${inpiChecks.cni ? "bg-emerald-500 text-white border-emerald-600" : "bg-white border-[#CBD5E1]"}`}>
                  {inpiChecks.cni && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
                <div>
                  <span className="font-bold text-sm text-[#0F172A] block">1. Pièce d'identité numérisée avec attestation manuscrite</span>
                  <span className="text-xs text-[#64748B]">Mention "J'atteste sur l'honneur que cette copie est conforme..." datée et signée.</span>
                </div>
              </div>
              <span className={`text-xs font-bold ${inpiChecks.cni ? "text-emerald-700" : "text-[#94A3B8]"}`}>
                {inpiChecks.cni ? "Prêt" : "À faire"}
              </span>
            </div>

            <div
              onClick={() => toggleInpiCheck("domicile")}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between gap-4 ${
                inpiChecks.domicile ? "bg-emerald-50 border-emerald-300" : "bg-[#F8FAFC] border-[#E2E8F0]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-lg border flex items-center justify-center ${inpiChecks.domicile ? "bg-emerald-500 text-white border-emerald-600" : "bg-white border-[#CBD5E1]"}`}>
                  {inpiChecks.domicile && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
                <div>
                  <span className="font-bold text-sm text-[#0F172A] block">2. Justificatif de domicile récent (&lt; 3 mois)</span>
                  <span className="text-xs text-[#64748B]">Facture d'électricité, box internet ou attestation d'hébergement.</span>
                </div>
              </div>
              <span className={`text-xs font-bold ${inpiChecks.domicile ? "text-emerald-700" : "text-[#94A3B8]"}`}>
                {inpiChecks.domicile ? "Prêt" : "À faire"}
              </span>
            </div>

            <div
              onClick={() => toggleInpiCheck("non_condamnation")}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between gap-4 ${
                inpiChecks.non_condamnation ? "bg-emerald-50 border-emerald-300" : "bg-[#F8FAFC] border-[#E2E8F0]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-lg border flex items-center justify-center ${inpiChecks.non_condamnation ? "bg-emerald-500 text-white border-emerald-600" : "bg-white border-[#CBD5E1]"}`}>
                  {inpiChecks.non_condamnation && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
                <div>
                  <span className="font-bold text-sm text-[#0F172A] block">3. Déclaration de non-condamnation et de filiation</span>
                  <span className="text-xs text-[#64748B]">Document standard attestant que vous n'avez pas d'interdiction de gérer.</span>
                </div>
              </div>
              <span className={`text-xs font-bold ${inpiChecks.non_condamnation ? "text-emerald-700" : "text-[#94A3B8]"}`}>
                {inpiChecks.non_condamnation ? "Prêt" : "À faire"}
              </span>
            </div>

            <div
              onClick={() => toggleInpiCheck("activite_code")}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between gap-4 ${
                inpiChecks.activite_code ? "bg-emerald-50 border-emerald-300" : "bg-[#F8FAFC] border-[#E2E8F0]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-lg border flex items-center justify-center ${inpiChecks.activite_code ? "bg-emerald-500 text-white border-emerald-600" : "bg-white border-[#CBD5E1]"}`}>
                  {inpiChecks.activite_code && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
                <div>
                  <span className="font-bold text-sm text-[#0F172A] block">4. Libellé et description précise de l'activité</span>
                  <span className="text-xs text-[#64748B]">Ex: Conseil en stratégie, rédaction de contenu, prestations informatiques.</span>
                </div>
              </div>
              <span className={`text-xs font-bold ${inpiChecks.activite_code ? "text-emerald-700" : "text-[#94A3B8]"}`}>
                {inpiChecks.activite_code ? "Prêt" : "À faire"}
              </span>
            </div>

            <div
              onClick={() => toggleInpiCheck("compte_bancaire")}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between gap-4 ${
                inpiChecks.compte_bancaire ? "bg-emerald-50 border-emerald-300" : "bg-[#F8FAFC] border-[#E2E8F0]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-lg border flex items-center justify-center ${inpiChecks.compte_bancaire ? "bg-emerald-500 text-white border-emerald-600" : "bg-white border-[#CBD5E1]"}`}>
                  {inpiChecks.compte_bancaire && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
                <div>
                  <span className="font-bold text-sm text-[#0F172A] block">5. Compte bancaire dédié prêt pour encaissements</span>
                  <span className="text-xs text-[#64748B]">Néobanque pro ou compte séparé pour isoler vos revenus d'activité.</span>
                </div>
              </div>
              <span className={`text-xs font-bold ${inpiChecks.compte_bancaire ? "text-emerald-700" : "text-[#94A3B8]"}`}>
                {inpiChecks.compte_bancaire ? "Prêt" : "À faire"}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF2EB] border border-[#FFD6C4] flex items-center justify-between text-xs">
            <span className="text-[#D63900] font-bold">
              Site officiel d'immatriculation gratuite : formalites.entreprises.gouv.fr
            </span>
            <span className="font-extrabold text-[#0F172A]">
              Coût officiel : 0 €
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
