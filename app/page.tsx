import Navbar from "./components/Navbar";
import WaitlistForm from "./components/WaitlistForm";
import FaqAccordion from "./components/FaqAccordion";
import GsapAnimations from "./components/GsapAnimations";
import {
  Sparkles,
  Zap,
  Target,
  CheckCircle,
  Clock,
  Compass,
  Layers,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Award,
  Lightbulb,
  Rocket,
  Users,
} from "lucide-react";

export default function Home() {
  const tickerItems = [
    "Validation d'idée sans budget",
    "Offre simple et claire",
    "Premier client en direct",
    "Statut juridique décodé",
    "Tarification sans hésiter",
    "Pitch express en 30 secondes",
    "Canaux de vente concrets",
    "Premières factures sereines",
  ];

  return (
    <>
      <GsapAnimations />
      <Navbar />

      <main className="flex-1">
        {/* =========================================================================
            HERO SECTION : Horizontal Band + Category Ticker
           ========================================================================= */}
        <section className="pt-12 pb-16 sm:pt-16 sm:pb-24 border-b-2 border-[#1E293B] bg-gradient-to-b from-[#FFF2EB]/40 to-[#F8FAFC]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Pill Eyebrow */}
            <div className="hero-stagger inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF2EB] border-2 border-[#FF6B35] text-[#D63900] font-bold text-xs sm:text-sm mb-6 uppercase tracking-wider shadow-sm">
              <Sparkles className="w-4 h-4 text-[#FF6B35]" />
              <span>Micro-apprentissage pour futurs créateurs</span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-stagger text-4xl sm:text-6xl md:text-7xl font-bold text-[#0F172A] tracking-tight leading-[1.08] font-display max-w-4xl mx-auto">
              Lancez votre activité en{" "}
              <span className="text-[#FF6B35] relative inline-block underline decoration-[#1E293B] decoration-4 underline-offset-8">
                5 minutes
              </span>{" "}
              par jour.
            </h1>

            {/* Terse Subheading (Under 25 words) */}
            <p className="hero-stagger mt-6 text-lg sm:text-xl text-[#475569] font-medium max-w-2xl mx-auto leading-relaxed">
              Une dose quotidienne sans jargon pour passer de l'idée au premier client sans se perdre dans la théorie.
            </p>

            {/* Hero Inline Form */}
            <div className="hero-stagger mt-10 max-w-xl mx-auto">
              <WaitlistForm variant="hero" />
            </div>
          </div>

          {/* Marquee Category Ticker */}
          <div className="mt-14 overflow-hidden py-3.5 bg-[#1E293B] border-y-2 border-[#1E293B]">
            <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
              {tickerItems.concat(tickerItems).map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-white font-bold text-sm tracking-wide uppercase">
                  <span className="w-2 h-2 rounded-full bg-[#FF6B35]"></span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prototype Quick Access Banner */}
          <div className="max-w-4xl mx-auto px-4 mt-8">
            <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-[#FFF2EB] border-2 border-[#FF6B35] flex items-center justify-center shrink-0 text-[#FF6B35]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#D63900]">
                    Prototype Interactif Déployé
                  </div>
                  <h4 className="text-sm sm:text-base font-extrabold text-[#0F172A]">
                    Testez l'expérience apprenant avec le minuteur de 5 min et le parcours 30 jours.
                  </h4>
                </div>
              </div>

              <a
                href="/prototype"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#FF6B35] hover:bg-[#E55A25] text-white font-bold text-xs sm:text-sm whitespace-nowrap border-2 border-[#1E293B] shadow-[2px_2px_0px_0px_#1E293B] active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <span>Accéder au prototype</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 1 : LE CONCEPT (Chunky Bento Cards)
           ========================================================================= */}
        <section id="concept" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E2E8F0] text-[#1E293B] font-bold text-xs uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span>Pourquoi 5 minutes suffisent</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#0F172A] font-display tracking-tight">
              Moins de théorie, plus d'action immédiate.
            </h2>
            <p className="text-[#475569] text-base sm:text-lg mt-3 font-medium">
              Chaque session transforme un principe abstrait en une action validée dans la journée.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1 */}
            <div className="card-reveal bg-white p-8 rounded-2xl border-2 border-[#1E293B] shadow-[5px_5px_0px_0px_#1E293B] flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#FFF2EB] border-2 border-[#1E293B] flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-[#FF6B35]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-display mb-2">
                  Zéro jargon technique
                </h3>
                <p className="text-[#475569] text-sm leading-relaxed">
                  Des explications limpides sans vocabulaire commercial obscur pour comprendre instantanément.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#F1F5F9] flex items-center gap-2 text-xs font-bold text-[#D63900]">
                <span>Accessible à tous</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="card-reveal bg-[#FFF2EB] p-8 rounded-2xl border-2 border-[#1E293B] shadow-[5px_5px_0px_0px_#FF6B35] flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white border-2 border-[#1E293B] flex items-center justify-center mb-6">
                  <Clock className="w-7 h-7 text-[#1E293B]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-display mb-2">
                  Une action par jour
                </h3>
                <p className="text-[#475569] text-sm leading-relaxed">
                  Une micro-tâche concrète à réaliser immédiatement pour progresser sans surcharge mentale.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#FFD6C4] flex items-center gap-2 text-xs font-bold text-[#1E293B]">
                <span>Résultats quotidiens</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 3 */}
            <div className="card-reveal bg-white p-8 rounded-2xl border-2 border-[#1E293B] shadow-[5px_5px_0px_0px_#1E293B] flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#F1F5F9] border-2 border-[#1E293B] flex items-center justify-center mb-6">
                  <TrendingUp className="w-7 h-7 text-[#1E293B]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-display mb-2">
                  Progression guidée
                </h3>
                <p className="text-[#475569] text-sm leading-relaxed">
                  Un parcours pas à pas pour construire les fondations de son projet en toute sérénité.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#F1F5F9] flex items-center gap-2 text-xs font-bold text-[#D63900]">
                <span>Parcours structuré</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2 : LE PARCOURS DEBUTANT (4 Step Roadmap)
           ========================================================================= */}
        <section id="parcours" className="py-20 bg-[#1E293B] text-white border-y-2 border-[#1E293B]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#334155] text-[#FF6B35] font-bold text-xs uppercase tracking-wider mb-3">
                <Compass className="w-3.5 h-3.5" />
                <span>Le parcours pas à pas</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold text-white font-display tracking-tight">
                Quatre étapes simples pour démarrer.
              </h2>
              <p className="text-[#94A3B8] text-base sm:text-lg mt-3 font-medium">
                Un chemin balisé pour passer de la curiosité au lancement réel.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Step 1 */}
              <div className="bg-[#0F172A] p-6 rounded-2xl border-2 border-[#334155] relative flex flex-col justify-between">
                <div>
                  <div className="inline-block px-3 py-1 rounded-lg bg-[#FF6B35] text-white font-bold text-xs uppercase mb-4">
                    Semaine 1
                  </div>
                  <h3 className="text-xl font-bold font-display text-white mb-2">
                    1. Valider l'idée
                  </h3>
                  <p className="text-[#94A3B8] text-sm leading-relaxed">
                    Identifier un besoin réel et tester l'intérêt du public sans dépenser le moindre euro.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs text-[#FF6B35] font-semibold">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Idée confrontée au réel</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-[#0F172A] p-6 rounded-2xl border-2 border-[#334155] relative flex flex-col justify-between">
                <div>
                  <div className="inline-block px-3 py-1 rounded-lg bg-[#FF6B35] text-white font-bold text-xs uppercase mb-4">
                    Semaine 2
                  </div>
                  <h3 className="text-xl font-bold font-display text-white mb-2">
                    2. Créer l'offre
                  </h3>
                  <p className="text-[#94A3B8] text-sm leading-relaxed">
                    Définir une proposition claire, fixer le juste prix et rédiger un message percutant.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs text-[#FF6B35] font-semibold">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Offre prête à présenter</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-[#0F172A] p-6 rounded-2xl border-2 border-[#334155] relative flex flex-col justify-between">
                <div>
                  <div className="inline-block px-3 py-1 rounded-lg bg-[#FF6B35] text-white font-bold text-xs uppercase mb-4">
                    Semaine 3
                  </div>
                  <h3 className="text-xl font-bold font-display text-white mb-2">
                    3. Premiers contacts
                  </h3>
                  <p className="text-[#94A3B8] text-sm leading-relaxed">
                    Activer les bons leviers pour obtenir ses premières conversations et opportunités.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs text-[#FF6B35] font-semibold">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Premiers prospects engagés</span>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-[#0F172A] p-6 rounded-2xl border-2 border-[#FF6B35] relative flex flex-col justify-between shadow-[4px_4px_0px_0px_#FF6B35]">
                <div>
                  <div className="inline-block px-3 py-1 rounded-lg bg-[#FF6B35] text-white font-bold text-xs uppercase mb-4">
                    Semaine 4
                  </div>
                  <h3 className="text-xl font-bold font-display text-white mb-2">
                    4. Formaliser et lancer
                  </h3>
                  <p className="text-[#94A3B8] text-sm leading-relaxed">
                    Comprendre les formalités de base et conclure sereinement ses premières prestations.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs text-[#FF6B35] font-semibold">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Activité opérationnelle</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3 : LA ROUTINE QUOTIDIENNE (3 Pillars)
           ========================================================================= */}
        <section id="routine" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF2EB] border border-[#FF6B35] text-[#D63900] font-bold text-xs uppercase tracking-wider mb-3">
              <Clock className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span>Format micro-apprentissage</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#0F172A] font-display tracking-tight">
              Une routine pensée pour les agendas serrés.
            </h2>
            <p className="text-[#475569] text-base sm:text-lg mt-3 font-medium">
              Chaque jour s'articule en deux temps simples à intégrer à votre quotidien.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Routine Block 1 */}
            <div className="bg-white p-8 rounded-3xl border-2 border-[#1E293B] shadow-[6px_6px_0px_0px_#1E293B]">
              <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-xl bg-[#1E293B] text-white font-bold text-sm mb-6">
                Étape 1 : 2 minutes
              </div>
              <h3 className="text-2xl font-bold font-display text-[#0F172A] mb-3">
                Le concept clé en synthèse
              </h3>
              <p className="text-[#475569] text-base leading-relaxed">
                Une explication directe et imagée sur un aspect pratique du lancement d'activité, lisible pendant une pause.
              </p>
              <div className="mt-6 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-3 text-xs text-[#334155] font-semibold">
                <Lightbulb className="w-5 h-5 text-[#FF6B35] shrink-0" />
                <span>Format compact pensé pour mobile et tablette</span>
              </div>
            </div>

            {/* Routine Block 2 */}
            <div className="bg-[#FFF2EB] p-8 rounded-3xl border-2 border-[#1E293B] shadow-[6px_6px_0px_0px_#FF6B35]">
              <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-xl bg-[#FF6B35] text-white font-bold text-sm mb-6">
                Étape 2 : 3 minutes
              </div>
              <h3 className="text-2xl font-bold font-display text-[#0F172A] mb-3">
                L'action guidée du jour
              </h3>
              <p className="text-[#475569] text-base leading-relaxed">
                Une tâche unique et ciblée à valider immédiatement pour construire concrètement votre projet.
              </p>
              <div className="mt-6 p-4 rounded-xl bg-white border border-[#FFD6C4] flex items-center gap-3 text-xs text-[#334155] font-semibold">
                <Rocket className="w-5 h-5 text-[#FF6B35] shrink-0" />
                <span>Application instantanée sans théorie superflue</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4 : POUR QUI EST FAIT CINQMINUTES ?
           ========================================================================= */}
        <section className="py-16 bg-[#F1F5F9] border-y-2 border-[#1E293B]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-4xl font-bold text-[#0F172A] font-display">
                Conçu pour démarrer de zéro.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border-2 border-[#CBD5E1] text-center">
                <div className="w-12 h-12 rounded-full bg-[#FFF2EB] text-[#FF6B35] flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-[#0F172A] mb-1">Débutants absolus</h4>
                <p className="text-xs text-[#64748B]">
                  Aucun bagage en gestion, marketing ou droit des affaires n'est nécessaire.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border-2 border-[#CBD5E1] text-center">
                <div className="w-12 h-12 rounded-full bg-[#FFF2EB] text-[#FF6B35] flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-[#0F172A] mb-1">Emploi du temps plein</h4>
                <p className="text-xs text-[#64748B]">
                  Avancez par petites sessions quotidiennes sans impacter votre travail actuel.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border-2 border-[#CBD5E1] text-center">
                <div className="w-12 h-12 rounded-full bg-[#FFF2EB] text-[#FF6B35] flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-[#0F172A] mb-1">Sans prise de risque</h4>
                <p className="text-xs text-[#64748B]">
                  Testez la viabilité de votre projet avant d'engager du temps ou des frais.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5 : FAQ ACCORDION
           ========================================================================= */}
        <section id="faq" className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-5xl font-bold text-[#0F172A] font-display tracking-tight">
              Questions fréquentes
            </h2>
            <p className="text-[#475569] text-base mt-2">
              Tout ce que vous devez savoir sur le format et la méthode.
            </p>
          </div>

          <FaqAccordion />
        </section>

        {/* =========================================================================
            SECTION 6 : WAITLIST CTA SECTION (Chunky Coral Card)
           ========================================================================= */}
        <section id="waitlist" className="py-20 bg-[#FF6B35] border-t-2 border-[#1E293B]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white font-bold text-xs uppercase tracking-wider mb-6">
              <Sparkles className="w-4 h-4 text-white" />
              <span>Session pilote en préparation</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white font-display tracking-tight leading-tight">
              Prêt à bâtir votre activité 5 minutes par jour ?
            </h2>

            <p className="mt-4 text-lg text-[#FFF2EB] max-w-xl mx-auto font-medium">
              Inscrivez-vous pour rejoindre le premier groupe pilote et tester la méthode en avant-première.
            </p>

            <div className="mt-10">
              <WaitlistForm variant="card" source="bottom_cta" />
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          FOOTER
         ========================================================================= */}
      <footer className="bg-[#0F172A] text-[#94A3B8] border-t-2 border-[#1E293B] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo lockup */}
            <div className="flex items-center gap-3">
              <img
                src="https://u3ubwwjuukuy3kkt.public.blob.vercel-storage.com/logos/dd92a86a-bc31-46dd-a1ac-0659b865a327.png"
                alt="CinqMinutes"
                className="h-10 w-auto object-contain"
              />
              <span className="text-xl font-bold text-white font-display">
                Cinq<span className="text-[#FF6B35]">Minutes</span>
              </span>
            </div>

            {/* Factual compliance line */}
            <p className="text-xs text-[#64748B] text-center md:text-left">
              Conçu pour respecter les données personnelles et les principes du RGPD.
            </p>

            {/* Copyright */}
            <p className="text-xs text-[#64748B]">
              &copy; {new Date().getFullYear()} CinqMinutes. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
