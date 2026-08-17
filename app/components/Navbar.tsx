"use client";

import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#F8FAFC]/90 backdrop-blur-md border-b-2 border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Confident Logo + Brand Lockup */}
          <a href="#" className="flex items-center gap-3.5 group">
            <img
              src="https://u3ubwwjuukuy3kkt.public.blob.vercel-storage.com/logos/dd92a86a-bc31-46dd-a1ac-0659b865a327.png"
              alt="CinqMinutes logo"
              className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <span className="text-2xl font-bold text-[#0F172A] tracking-tight font-display">
              Cinq<span className="text-[#FF6B35]">Minutes</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#concept"
              className="text-sm font-bold text-[#475569] hover:text-[#FF6B35] transition-colors"
            >
              Le concept
            </a>
            <a
              href="#parcours"
              className="text-sm font-bold text-[#475569] hover:text-[#FF6B35] transition-colors"
            >
              Le parcours
            </a>
            <a
              href="#routine"
              className="text-sm font-bold text-[#475569] hover:text-[#FF6B35] transition-colors"
            >
              La routine
            </a>
            <a
              href="#tarifs"
              className="text-sm font-bold text-[#475569] hover:text-[#FF6B35] transition-colors"
            >
              Tarifs
            </a>
            <a
              href="/prototype"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#FF6B35] hover:text-[#D63900] transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-pulse"></span>
              <span>Prototype App</span>
            </a>
            <a
              href="#faq"
              className="text-sm font-bold text-[#475569] hover:text-[#FF6B35] transition-colors"
            >
              FAQ
            </a>
          </nav>

          {/* CTA Header */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/sign-in"
              className="text-sm font-bold text-[#1E293B] hover:text-[#FF6B35] transition-colors px-2"
            >
              Connexion
            </a>
            <a
              href="/sign-up"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF6B35] text-white font-bold text-sm hover:bg-[#E55A25] transition-all shadow-[3px_3px_0px_0px_#1E293B] hover:shadow-[1px_1px_0px_0px_#1E293B] active:translate-y-0.5"
            >
              <span>Accéder à l'application</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl border-2 border-[#1E293B] bg-white text-[#0F172A] focus:outline-none"
              aria-label="Ouvrir le menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="md:hidden border-b-2 border-[#1E293B] bg-white px-4 pt-4 pb-6 space-y-3">
          <a
            href="#concept"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-bold text-[#0F172A] hover:bg-[#F8FAFC]"
          >
            Le concept
          </a>
          <a
            href="#parcours"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-bold text-[#0F172A] hover:bg-[#F8FAFC]"
          >
            Le parcours
          </a>
          <a
            href="#routine"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-bold text-[#0F172A] hover:bg-[#F8FAFC]"
          >
            La routine
          </a>
          <a
            href="#tarifs"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-bold text-[#0F172A] hover:bg-[#F8FAFC]"
          >
            Tarifs & Formules
          </a>
          <a
            href="#faq"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-bold text-[#0F172A] hover:bg-[#F8FAFC]"
          >
            FAQ
          </a>
          <a
            href="/prototype"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-base font-bold text-[#D63900] bg-[#FFF2EB] border border-[#FF6B35]"
          >
            <span>Tester le prototype interactif</span>
            <span className="text-xs bg-[#FF6B35] text-white px-2 py-0.5 rounded-md">Démo</span>
          </a>
          <div className="pt-2 space-y-2">
            <a
              href="/sign-in"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-[#1E293B] bg-white text-[#0F172A] font-bold text-sm"
            >
              <span>Se connecter</span>
            </a>
            <a
              href="/sign-up"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#FF6B35] text-white font-bold text-base shadow-[3px_3px_0px_0px_#1E293B]"
            >
              <span>Créer un compte & Démarrer</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
