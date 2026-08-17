"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Faut-il deja avoir une idee precise avant de demarrer ?",
    answer:
      "Non, le tout premier module est concu pour vous aider a identifier des opportunites simples adaptees a vos competences et a vos interets, sans pression.",
  },
  {
    question: "Combien de temps l'apprentissage prend-il reellement chaque jour ?",
    answer:
      "Exactement 5 minutes : 2 minutes pour assimiler un concept fondamental sans jargon, puis 3 minutes pour completer une micro-action pratique.",
  },
  {
    question: "Ai-je besoin de connaissances juridiques, comptables ou techniques ?",
    answer:
      "Aucune connaissance prealable n'est requise. Tout est vulgarise avec des exemples clairs et concrets pour que chaque notion soit facile a appliquer.",
  },
  {
    question: "Quel type d'activite puis-je apprendre a lancer ?",
    answer:
      "La methode s'applique a toute premiere activite independante : prestation de services, artisanat, activite freelance, conseil, ou vente de produits simples.",
  },
  {
    question: "Comment se deroule l'acces a la premiere session ?",
    answer:
      "L'inscription sur la liste d'attente reserve votre place pour le premier groupe pilote. Vous recevrez vos acces et la premiere lecon directement des le lancement.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {FAQ_ITEMS.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`border-2 rounded-2xl transition-all duration-200 bg-white ${
              isOpen
                ? "border-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B]"
                : "border-[#E2E8F0] hover:border-[#CBD5E1]"
            }`}
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="font-bold text-base sm:text-lg text-[#0F172A]">
                {item.question}
              </span>
              <span
                className={`p-2 rounded-xl border-2 transition-transform duration-200 shrink-0 ${
                  isOpen
                    ? "rotate-180 bg-[#FF6B35] text-white border-[#1E293B]"
                    : "bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]"
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </span>
            </button>

            {isOpen && (
              <div className="px-6 pb-6 pt-1 text-[#475569] text-sm sm:text-base leading-relaxed border-t border-[#F1F5F9]">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
