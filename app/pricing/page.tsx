import { Metadata } from "next";
import Navbar from "../components/Navbar";
import PricingSection from "../components/PricingSection";
import FaqAccordion from "../components/FaqAccordion";

export const metadata: Metadata = {
  title: "Tarifs & Formules | CinqMinutes",
  description:
    "Découvrez les formules CinqMinutes pour lancer votre activité en 5 minutes par jour : Formule Autonome, Promotion Guidée et Mentorat Pro.",
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-screen bg-[#F8FAFC]">
        <PricingSection />

        <section id="faq" className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 border-t-2 border-[#1E293B]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-4xl font-bold text-[#0F172A] font-display">
              Questions fréquentes sur nos formules
            </h2>
            <p className="text-[#475569] text-sm sm:text-base mt-2">
              Tout ce que vous devez savoir sur l'accès, le paiement et la résiliation.
            </p>
          </div>

          <FaqAccordion />
        </section>
      </main>

      <footer className="bg-[#0F172A] text-[#94A3B8] border-t-2 border-[#1E293B] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="https://u3ubwwjuukuy3kkt.public.blob.vercel-storage.com/logos/dd92a86a-bc31-46dd-a1ac-0659b865a327.png"
                alt="CinqMinutes"
                className="h-9 w-auto object-contain"
              />
              <span className="text-lg font-bold text-white font-display">
                Cinq<span className="text-[#FF6B35]">Minutes</span>
              </span>
            </div>

            <p className="text-xs text-[#64748B] text-center md:text-left">
              Conçu pour respecter les données personnelles et les principes du RGPD.
            </p>

            <p className="text-xs text-[#64748B]">
              &copy; {new Date().getFullYear()} CinqMinutes. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
